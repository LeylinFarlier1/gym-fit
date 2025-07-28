import React from 'react';
import './Input.css';

export const Input = ({ label, id, type = 'text', ...props }) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="form-group">
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      <input type={type} id={inputId} className="form-input" {...props} />
    </div>
  );
};