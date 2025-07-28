import React, { useState, useEffect } from 'react';
import MemberForm from '../components/MemberForm'; // Import the MemberForm component
import './Members.css'; // Import the CSS file

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [editingMember, setEditingMember] = useState(null); // State to hold member data for editing
  const [message, setMessage] = useState(null); // State for success/error messages

  // Base URL for your API
  // IMPORTANT: You will need to replace this with your actual backend API URL
  const API_BASE_URL = 'http://localhost:8000/api'; 

  // Function to fetch members
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/members/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err);
      setMessage({ type: 'error', text: 'Error al cargar miembros.' });
    } finally {
      setLoading(false);
    }
  };

  // Fetch members when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  // Function to handle saving a new or edited member
  const handleSaveMember = async (memberData) => {
    setError(null);
    setMessage(null);
    try {
      const method = memberData.miembro_id ? 'PUT' : 'POST'; // Use PUT for editing, POST for new
      const url = memberData.miembro_id 
        ? `${API_BASE_URL}/members/${memberData.miembro_id}/` 
        : `${API_BASE_URL}/members/`; // API endpoint

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if your API requires them
          // 'Authorization': 'Bearer YOUR_TOKEN',
        },
        body: JSON_stringify(memberData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        throw new Error(errorData.detail || `Error al guardar miembro: ${response.status}`);
      }

      // After saving, fetch the updated list of members
      await fetchMembers();
      setShowForm(false); // Hide the form
      setEditingMember(null); // Clear editing state
      setMessage({ type: 'success', text: 'Miembro guardado exitosamente.' });
    } catch (err) {
      setError(err);
      setMessage({ type: 'error', text: err.message });
    }
  };

  // Function to handle canceling the form
  const handleCancelForm = () => {
    setShowForm(false); // Hide the form
    setEditingMember(null); // Clear editing state
  };

  // Function to handle editing a member
  const handleEditMember = (member) => {
    // Ensure date format is YYYY-MM-DD for input type="date"
    const formattedMember = { ...member };
    if (formattedMember.fecha_nacimiento) {
      formattedMember.fecha_nacimiento = new Date(formattedMember.fecha_nacimiento).toISOString().split('T')[0];
    }
    setEditingMember(formattedMember);
    setShowForm(true);
  };

  // Function to handle deleting a member
  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar a este miembro?')) {
      return;
    }
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/members/${memberId}/`, {
        method: 'DELETE',
        headers: {
          // Add authorization headers if your API requires them
          // 'Authorization': 'Bearer YOUR_TOKEN',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        throw new Error(errorData.detail || `Error al eliminar miembro: ${response.status}`);
      }

      // After deleting, fetch the updated list of members
      await fetchMembers();
      setMessage({ type: 'success', text: 'Miembro eliminado exitosamente.' });
    } catch (err) {
      setError(err);
      setMessage({ type: 'error', text: err.message });
    }
  };

  if (loading) {
    return <div className="members-page">Cargando miembros...</div>;
  }

  if (error && !message) { // Display initial error if no message set by fetchMembers
    return <div className="members-page error-message">Error: {error.message}</div>;
  }

  return (
    <main className="members-page">
      <h1>Gestión de Miembros</h1>

      {message && (
        <div className={`message ${message.type}-message`}>
          {message.text}
        </div>
      )}

      <button onClick={() => {
        setEditingMember(null); // Ensure no old data for new form
        setShowForm(true);
      }}>Registrar Nuevo Miembro</button>

      {showForm && (
        <div className="form-modal-overlay">
          <div className="form-modal-content">
            <MemberForm
              onSave={handleSaveMember}
              onCancel={handleCancelForm}
              initialData={editingMember}
            />
          </div>
        </div>
      )}

      <div className="members-table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.miembro_id}>
                  <td>{member.nombre} {member.apellido}</td>
                  <td>{member.email}</td>
                  <td>{member.telefono}</td>
                  <td>{member.estado}</td>
                  <td>{new Date(member.fecha_registro).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEditMember(member)}>Editar</button>
                    <button onClick={() => handleDeleteMember(member.miembro_id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron miembros.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Members;
