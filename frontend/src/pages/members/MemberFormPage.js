
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
// --- CORRECCIÓN DE RUTA ---
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import './MemberFormPage.css';

const MemberFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [serverError, setServerError] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (isEditing) {
      const fetchMember = async () => {
        try {
          const member = await api.members.getById(id);
          setValue('nombre', member.nombre);
          setValue('apellido', member.apellido);
          setValue('email', member.email);
          setValue('telefono', member.telefono);
          if (member.fecha_nacimiento) {
            setValue('fecha_nacimiento', member.fecha_nacimiento.split('T')[0]);
          }
          setValue('estado', member.estado);
        } catch (error) {
          console.error("Failed to fetch member", error);
          setServerError("No se pudieron cargar los datos del miembro.");
        }
      };
      fetchMember();
    }
  }, [id, isEditing, setValue]);

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      if (isEditing) {
        await api.members.update(id, data);
      } else {
        await api.members.create(data);
      }
      navigate('/members');
    } catch (error) {
      console.error("Failed to save member", error);
      setServerError("No se pudo guardar el miembro. Verifique los datos e intente de nuevo.");
    }
  };

  return (
    <div className="member-form-page">
      <h1>{isEditing ? 'Editar Miembro' : 'Registrar Nuevo Miembro'}</h1>
      
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="member-form">
          <div className="form-row">
            <Input
              label="Nombre"
              {...register('nombre', { required: 'El nombre es obligatorio' })}
            />
            <Input
              label="Apellido"
              {...register('apellido', { required: 'El apellido es obligatorio' })}
            />
          </div>

          <Input
            label="Email"
            type="email"
            {...register('email', { 
              required: 'El email es obligatorio',
              pattern: {
                value: /^\S+@\S+$/i,
                message: "El formato del email no es válido"
              }
            })}
          />

          <div className="form-row">
            <Input
              label="Teléfono"
              type="tel"
              {...register('telefono')}
            />
            <Input
              label="Fecha de Nacimiento"
              type="date"
              {...register('fecha_nacimiento')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado" className="form-label">Estado</label>
            <select 
              id="estado" 
              className="form-select"
              {...register('estado', { required: 'El estado es obligatorio' })}
            >
              <option value="Potencial">Potencial</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            {errors.estado && <span className="error-message">{errors.estado.message}</span>}
          </div>

          {serverError && <p className="error-message server-error">{serverError}</p>}

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => navigate('/members')}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Miembro'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MemberFormPage;

