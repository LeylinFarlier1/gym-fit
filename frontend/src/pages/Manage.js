import React from 'react';
import './Manage.css';
import MemberForm from '../components/MemberForm'; // Importar el formulario

const Manage = () => {
  const handleMemberAdded = () => {
    // Logic to handle success, e.g., show a success message or clear the form
    console.log('Nuevo miembro añadido exitosamente!');
    // You might want to clear the form here
  };

  return (
    <main className="main-content">
      <header className="page-header">
        <h1 className="page-title">Panel de Gestión</h1>
        <h2 className="page-subtitle">Añade nuevos registros a la base de datos.</h2>
      </header>
      
      <div className="management-actions">
        <div className="action-card">
          <h3>Añadir Nuevo Miembro</h3>
          <MemberForm onSuccess={handleMemberAdded} /> {/* Integrar el formulario */}
        </div>
        <div className="action-card">
          <h3>Registrar Gasto</h3>
          <p>Formulario para registrar un nuevo gasto próximamente...</p>
        </div>
        <div className="action-card">
          <h3>Crear Plan de Membresía</h3>
          <p>Formulario para crear un nuevo tipo de membresía próximamente...</p>
        </div>
      </div>
    </main>
  );
};

export default Manage;
