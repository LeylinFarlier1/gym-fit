import React, { useState } from 'react';
import './MembershipPlanForm.css';

const API_BASE_URL = 'http://localhost:8000/api/';

const MembershipPlanForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre_plan: '',
    descripcion: '',
    precio: '',
    duracion_dias: '',
    numero_clases: '',
    tipo_plan: 'Solo Pilates', // Default value based on models.py choices
    activo: true, // Default value
  });

  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null); // Reset status on new submission
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}planes-membresia/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
         const errorMsg = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join(', ');
        throw new Error(`Error al crear el plan de membresía: ${errorMsg}`);
      }

      const newPlan = await response.json();
      console.log('Nuevo plan de membresía creado:', newPlan);

      setSubmitStatus('success');
      // Clear the form after successful submission
      setFormData({
        nombre_plan: '',
        descripcion: '',
        precio: '',
        duracion_dias: '',
        numero_clases: '',
        tipo_plan: 'Solo Pilates', // Reset to default
        activo: true, // Reset to default
      });

      if (onSuccess) {
        onSuccess(newPlan);
      }

    } catch (error) {
      console.error('Error creating membership plan:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Hubo un error desconocido al crear el plan.');
    }
  };

  // Options for tipo_plan based on models.py choices
  const tipoPlanChoices = [
    'Solo Pilates',
    'Solo Gimnasio',
    'Completo',
    'Bono',
  ];

  return (
    <form onSubmit={handleSubmit} className="membership-plan-form">
       {submitStatus === 'success' && (
        <div className="success-message">Plan de membresía creado exitosamente!</div>
      )}
      {submitStatus === 'error' && (
        <div className="error-message">Error: {errorMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="nombre_plan">Nombre del Plan:</label>
        <input type="text" id="nombre_plan" name="nombre_plan" value={formData.nombre_plan} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción (Opcional):</label>
        <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} required step="0.01" />
      </div>
      
      <div className="form-group">
        <label htmlFor="duracion_dias">Duración en Días (Para planes de período fijo):</label>
        <input type="number" id="duracion_dias" name="duracion_dias" value={formData.duracion_dias} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="numero_clases">Número de Clases (Para planes tipo bono):</label>
        <input type="number" id="numero_clases" name="numero_clases" value={formData.numero_clases} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="tipo_plan">Tipo de Plan:</label>
        <select id="tipo_plan" name="tipo_plan" value={formData.tipo_plan} onChange={handleChange} required>
          {tipoPlanChoices.map(choice => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="activo">Activo:</label>
        <input type="checkbox" id="activo" name="activo" checked={formData.activo} onChange={handleChange} />
      </div>

      <button type="submit">Crear Plan</button>
    </form>
  );
};

export default MembershipPlanForm;
