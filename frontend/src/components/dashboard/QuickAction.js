import React from 'react';
import './QuickAction.css';

export const QuickAction = ({ icon, label, onClick }) => (
  <button className="quick-action" onClick={onClick}>
    <div className="action-icon">{icon}</div>
    <span>{label}</span>
  </button>
);
