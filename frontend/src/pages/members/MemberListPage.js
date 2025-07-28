import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/data/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { UserPlus, Edit } from 'lucide-react';
import './MemberListPage.css';
import { api } from '../../services/api';

const MemberListPage = () => {
  const navigate = useNavigate();
  
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await api.members.getAll();
        setMembers(data);
      } catch (err) {
        setError('No se pudo cargar la lista de miembros. Por favor, intente más tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const columns = [
    { key: 'nombre', header: 'Nombre' }, 
    { key: 'apellido', header: 'Apellido' },
    { key: 'email', header: 'Email' },
    { 
      key: 'fecha_registro', 
      header: 'Fecha Registro',
      render: (row) => {
        return new Date(row.fecha_registro).toLocaleDateString('es-AR', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
      }
    },
    { 
      key: 'estado',
      header: 'Estado',
      render: (row) => {
        // SOLUCIÓN MEJORADA: Hacemos el mapeo insensible a mayúsculas.
        const statusMap = {
          'potencial': 'pending', // Clave en minúscula
          'activo': 'active',
          'vencido': 'expired'
        };
        
        const backendStatusText = (row.estado || '').trim();
        // Convertimos el estado del backend a minúsculas ANTES de buscarlo en el mapa
        const backendStatusKey = backendStatusText.toLowerCase(); 
        const frontendStatusClass = statusMap[backendStatusKey] || 'expired';

        // Mostramos el texto original del backend, pero usamos la clase CSS correcta
        return <StatusBadge status={frontendStatusClass} label={backendStatusText} />;
      }
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

  if (isLoading) {
    return <div>Cargando miembros...</div>;
  }

  if (error) {
    return <div className="error-message" style={{color: 'red'}}>{error}</div>;
  }
  
  // Para que la solución funcione, el componente StatusBadge.js debe ser flexible.
  // Aquí está el código recomendado para `src/components/ui/StatusBadge.js`:
  /*
  import React from 'react';
  import './StatusBadge.css';

  export const StatusBadge = ({ status, label }) => {
    // El 'status' que se recibe aquí es la clase CSS (ej. 'pending')
    // El 'label' es el texto a mostrar (ej. 'Potencial')
    return (
      <span className={`status-badge status-${status}`}>
        {label}
      </span>
    );
  };
  */

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
        data={members}
        onRowClick={(row) => navigate(`/members/${row.id}`)}
      />
    </div>
  );
};

export default MemberListPage;

