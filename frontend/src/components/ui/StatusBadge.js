import React from 'react';
import './StatusBadge.css';

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { label: 'Activo' },
    pending: { label: 'Pendiente' },
    expired: { label: 'Vencido' }
  };

  return (
    <span className={`status-badge status-${status}`}>
      {statusConfig[status]?.label || 'Desconocido'}
    </span>
  );
};
