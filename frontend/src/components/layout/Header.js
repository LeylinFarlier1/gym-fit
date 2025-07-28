import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={20} className="search-icon" />
        <input type="text" placeholder="Búsqueda global..." />
      </div>
      <div className="header-actions">
        <button className="action-btn">
          <Bell size={20} />
        </button>
        <button className="action-btn">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};
