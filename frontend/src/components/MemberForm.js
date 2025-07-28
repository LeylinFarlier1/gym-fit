import React, { useState } from 'react';

const MemberForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    estado: 'potencial', // Default state as per your schema
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    notas_administrativas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? 'Editar Miembro' : 'Registrar Nuevo Miembro'}</h2>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="fecha_nacimiento"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="congelado">Congelado</option>
          <option value="potencial">Potencial</option>
        </select>
      </div>
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="codigo_postal">Código Postal:</label>
        <input
          type="text"
          id="codigo_postal"n
          name="codigo_postal"
          value={formData.codigo_postal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="notas_administrativas">Notas Administrativas:</label>
        <textarea
          id="notas_administrativas"
          name="notas_administrativas"
          value={formData.notas_administrativas}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default MemberForm;