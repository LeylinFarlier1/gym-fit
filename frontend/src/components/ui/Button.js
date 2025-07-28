import React from 'react';
import './Button.css';

export const Button = ({ children, onClick, variant = "primary", type = "button" }) => {
  return (
    <button type={type} className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
