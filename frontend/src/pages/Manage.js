import React from 'react';
import './Manage.css';
import MemberForm from '../components/MemberForm';
import ExpenseForm from '../components/ExpenseForm'; // Importar el formulario de gastos

const Manage = () => {
  const handleMemberAdded = () => {
    console.log('Nuevo miembro añadido exitosamente!');
    // Logic for success after adding member
  };

  const handleExpenseAdded = () => {
    console.log('Nuevo gasto registrado exitosamente!');
    // Logic for success after adding expense
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
          <MemberForm onSuccess={handleMemberAdded} />
        </div>
        <div className="action-card">
          <h3>Registrar Gasto</h3>
          <ExpenseForm onSuccess={handleExpenseAdded} /> {/* Integrar el formulario de gastos */}
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
