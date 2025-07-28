import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

const API_BASE_URL = 'http://localhost:8000/api/';

const ExpenseForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    categoria_gasto: '',
    monto: '',
    fecha_gasto: '',
    proveedor: '',
    descripcion: '',
    personal_id_relacionado: '', // Will need to fetch personal list
  });

  const [categories, setCategories] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [loadingDeps, setLoadingDeps] = useState(true);
  const [errorDeps, setErrorDeps] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const [categoriesResponse, personnelResponse] = await Promise.all([
          fetch(`${API_BASE_URL}categorias-gasto/`).then(res => res.json()),
          fetch(`${API_BASE_URL}personal/`).then(res => res.json())
        ]);
        setCategories(categoriesResponse);
        setPersonnel(personnelResponse);
        setLoadingDeps(false);
      } catch (error) {
        console.error('Error fetching expense form dependencies:', error);
        setErrorDeps('Error al cargar datos necesarios para el formulario.');
        setLoadingDeps(false);
      }
    };

    fetchDependencies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null); // Reset status on new submission
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}gastos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
         // Improved error message handling
        const errorMsg = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join(', ');
        throw new Error(`Error al registrar el gasto: ${errorMsg}`);
      }

      const newExpense = await response.json();
      console.log('Nuevo gasto registrado:', newExpense);

      setSubmitStatus('success');
      // Clear the form after successful submission
      setFormData({
        categoria_gasto: '',
        monto: '',
        fecha_gasto: '',
        proveedor: '',
        descripcion: '',
        personal_id_relacionado: '',
      });

      if (onSuccess) {
        onSuccess(newExpense);
      }

    } catch (error) {
      console.error('Error registering expense:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Hubo un error desconocido al registrar el gasto.');
    }
  };

  if (loadingDeps) return <div>Cargando formulario de gasto...</div>;
  if (errorDeps) return <div>Error: {errorDeps}</div>;

  return (
    <form onSubmit={handleSubmit} className="expense-form">
       {submitStatus === 'success' && (
        <div className="success-message">Gasto registrado exitosamente!</div>
      )}
      {submitStatus === 'error' && (
        <div className="error-message">Error: {errorMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="categoria_gasto">Categoría de Gasto:</label>
        <select id="categoria_gasto" name="categoria_gasto" value={formData.categoria_gasto} onChange={handleChange} required>
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat.categoria_gasto_id} value={cat.categoria_gasto_id}>
              {cat.nombre_categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="monto">Monto:</label>
        <input type="number" id="monto" name="monto" value={formData.monto} onChange={handleChange} required step="0.01" />
      </div>
      
      <div className="form-group">
        <label htmlFor="fecha_gasto">Fecha del Gasto:</label>
        <input type="date" id="fecha_gasto" name="fecha_gasto" value={formData.fecha_gasto} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="proveedor">Proveedor (Opcional):</label>
        <input type="text" id="proveedor" name="proveedor" value={formData.proveedor} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción (Opcional):</label>
        <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="personal_id_relacionado">Personal Relacionado (Opcional):</label>
        <select id="personal_id_relacionado" name="personal_id_relacionado" value={formData.personal_id_relacionado} onChange={handleChange}>
          <option value="">Selecciona personal</option>
          {personnel.map(person => (
            <option key={person.personal_id} value={person.personal_id}>
              {person.nombre} {person.apellido}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Registrar Gasto</button>
    </form>
  );
};

export default ExpenseForm;
