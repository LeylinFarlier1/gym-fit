import React from 'react';
import './Manage.css';
import MemberForm from '../components/MemberForm';
import ExpenseForm from '../components/ExpenseForm';
import MembershipPlanForm from '../components/MembershipPlanForm'; // Import the new form

const Manage = () => {
  const handleMemberAdded = () => {
    console.log('Nuevo miembro añadido exitosamente!');
    // Logic for success after adding member, e.g., refetch members list in App.js
  };

  const handleExpenseAdded = () => {
    console.log('Nuevo gasto registrado exitosamente!');
    // Logic for success after adding expense
  };

  const handleMembershipPlanAdded = () => {
    console.log('Nuevo plan de membresía creado exitosamente!');
    // Logic for success after adding plan, e.g., refetch plans list in App.js
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
          <ExpenseForm onSuccess={handleExpenseAdded} />
        </div>
        <div className="action-card">
          <h3>Crear Plan de Membresía</h3>
          <MembershipPlanForm onSuccess={handleMembershipPlanAdded} /> {/* Integrate the new form */}
        </div>
      </div>
    </main>
  );
};

export default Manage;
