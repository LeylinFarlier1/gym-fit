// ARCHIVO: frontend/src/pages/members/MemberListPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/data/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { UserPlus, Edit } from 'lucide-react';
import './MemberListPage.css';
import { api } from '../../services/api'; // <-- 1. Importamos nuestro servicio de API

const MemberListPage = () => {
  const navigate = useNavigate();
  
  // --- 2. Creamos estados para manejar los datos, la carga y los errores ---
  const [members, setMembers] = useState([]); // Para guardar la lista de miembros
  const [isLoading, setIsLoading] = useState(true); // Para saber si estamos cargando datos
  const [error, setError] = useState(null); // Para guardar cualquier error de la API

  // --- 3. Usamos useEffect para llamar a la API cuando el componente se monta ---
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true); // Empezamos a cargar
        setError(null); // Limpiamos errores anteriores
        const data = await api.members.getAll(); // Llamamos a la API
        setMembers(data); // Guardamos los datos en el estado
      } catch (err) {
        setError('No se pudo cargar la lista de miembros. Por favor, intente más tarde.'); // Guardamos el mensaje de error
        console.error(err);
      } finally {
        setIsLoading(false); // Terminamos de cargar (ya sea con éxito o con error)
      }
    };

    fetchMembers();
  }, []); // El array vacío `[]` asegura que esto se ejecute solo una vez

  // --- 4. Definimos las columnas para la tabla ---
  // Asegúrate de que los 'key' coincidan con los nombres de los campos en tu serializador de Django
  const columns = [
    { key: 'first_name', header: 'Nombre' },
    { key: 'last_name', header: 'Apellido' },
    { key: 'email', header: 'Email' },
    { 
      key: 'membership_status', // Asumiendo que tienes un campo así en tu modelo/serializador
      header: 'Estado',
      render: (row) => <StatusBadge status={row.membership_status || 'expired'} />
    },
    { 
      key: 'actions', 
      header: 'Acciones',
      render: (row) => (
        <Button variant="secondary" onClick={(e) => { e.stopPropagation(); navigate(`/members/${row.id}/edit`)}}>
          <Edit size={16} /> Editar
        </Button>
      )
    }
  ];

  // --- 5. Renderizamos condicionalmente según el estado de carga o error ---
  if (isLoading) {
    return <div>Cargando miembros...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="member-list-page">
      <div className="page-header">
        <h1>Miembros</h1>
        <Button variant="primary" onClick={() => navigate('/members/new')}>
          <UserPlus size={16} /> Nuevo Miembro
        </Button>
      </div>
      <DataTable 
        columns={columns} 
        data={members} // Usamos los datos del estado, no los de ejemplo
        onRowClick={(row) => navigate(`/members/${row.id}`)}
      />
    </div>
  );
};

export default MemberListPage;
