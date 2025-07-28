import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, DollarSign, UserCog, Palette } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/members', icon: Users, label: 'Miembros' },
  { to: '/schedule', icon: Calendar, label: 'Calendario' },
  { to: '/finances', icon: DollarSign, label: 'Finanzas' },
  { to: '/staff', icon: UserCog, label: 'Personal' },
  { to: '/style-guide', icon: Palette, label: 'Guía de Estilos' },
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Gym Fit</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
