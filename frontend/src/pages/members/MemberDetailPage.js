import React from 'react';
import { useParams } from 'react-router-dom';
const MemberDetailPage = () => {
  const { id } = useParams();
  return <div><h1>Detalle del Miembro {id}</h1><p>Aquí se mostrará la información completa del miembro.</p></div>;
};
export default MemberDetailPage;
