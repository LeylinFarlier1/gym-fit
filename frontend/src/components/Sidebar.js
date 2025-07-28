import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = ['Dashboard', 'Miembros']; // Añadiremos más aquí en el futuro

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1 className="brand-logo">Gym Fit</h1>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li
            key={item}
            className={`menu-item ${activeView === item.toLowerCase() ? 'active' : ''}`}
            onClick={() => setActiveView(item.toLowerCase())}
          >
            {/* Aquí irían los iconos en el futuro */}
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
