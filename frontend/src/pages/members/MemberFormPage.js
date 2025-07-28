import React from 'react';
import { useParams } from 'react-router-dom';
const MemberFormPage = () => {
  const { id } = useParams();
  return <div><h1>{id ? 'Editar' : 'Crear'} Miembro</h1><p>Aquí irá el formulario para {id ? 'editar' : 'crear'} un miembro.</p></div>;
};
export default MemberFormPage;
