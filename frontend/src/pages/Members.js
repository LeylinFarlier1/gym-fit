import React from 'react';
import './Members.css'; // Crearemos este archivo después

const Members = ({ data, loading, error }) => {
  return (
    <main className="main-content">
      <header className="page-header">
        <h1 className="page-title">Gestión de Miembros</h1>
        <h2 className="page-subtitle">Busca, filtra y gestiona a todos los miembros.</h2>
      </header>
      {/* Aquí irá la barra de búsqueda y filtros */}
      <div className="members-table-container">
        {/* Aquí irá la tabla de miembros */}
        <p>Tabla de miembros próximamente...</p>
      </div>
    </main>
  );
};

export default Members;
