import React, { useState } from 'react';
import './MemberForm.css'; // Ensure CSS is imported

const API_BASE_URL = 'http://localhost:8000/api/'; // Define API base URL

const MemberForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    estado: 'potencial', // Default state
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    notas_administrativas: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null); // Reset status on new submission
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}miembros/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.email ? `Error: ${errorData.email[0]}` : 'Error al añadir el miembro');
      }

      // Assuming successful creation returns the new member data
      const newMember = await response.json();
      console.log('Nuevo miembro añadido:', newMember);

      setSubmitStatus('success');
      // Clear the form after successful submission
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fecha_nacimiento: '',
        estado: 'potencial', // Reset to default state
        direccion: '',
        ciudad: '',
        codigo_postal: '',
        notas_administrativas: '',
      });

      if (onSuccess) {
        onSuccess(newMember); // Call the success handler passed from parent
      }

    } catch (error) {
      console.error('Error adding member:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Hubo un error desconocido al añadir el miembro.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="member-form">
      {submitStatus === 'success' && (
        <div className="success-message">Miembro añadido exitosamente!</div>
      )}
      {submitStatus === 'error' && (
        <div className="error-message">Error: {errorMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="estado">Estado:</label>
        <select id="estado" name="estado" value={formData.estado} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="congelado">Congelado</option>
          <option value="potencial">Potencial</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="ciudad">Ciudad:</label>
        <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="codigo_postal">Código Postal:</label>
        <input type="text" id="codigo_postal" name="codigo_postal" value={formData.codigo_postal} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="notas_administrativas">Notas Administrativas:</label>
        <textarea id="notas_administrativas" name="notas_administrativas" value={formData.notas_administrativas} onChange={handleChange}></textarea>
      </div>

      <button type="submit">Añadir Miembro</button>
    </form>
  );
};

export default MemberForm;
