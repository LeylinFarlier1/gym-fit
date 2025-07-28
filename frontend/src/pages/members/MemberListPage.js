import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/data/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { UserPlus, Edit } from 'lucide-react';
import './MemberListPage.css';

const MemberListPage = () => {
  const navigate = useNavigate();
  
  // Mock data - replace with API call
  const membersData = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', status: 'active' },
    { id: 2, name: 'Ana Gómez', email: 'ana.gomez@example.com', status: 'expired' },
    { id: 3, name: 'Carlos Sánchez', email: 'carlos.sanchez@example.com', status: 'pending' },
    { id: 4, name: 'Laura Torres', email: 'laura.torres@example.com', status: 'active' },
  ];

  const columns = [
    { key: 'name', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { 
      key: 'status', 
      header: 'Estado',
      render: (row) => <StatusBadge status={row.status} />
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
        data={membersData} 
        onRowClick={(row) => navigate(`/members/${row.id}`)}
      />
    </div>
  );
};
export default MemberListPage;
