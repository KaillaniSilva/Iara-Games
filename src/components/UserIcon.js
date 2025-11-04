import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './UserIcon.css';

const UserIcon = ({ onLoginClick }) => {
  const { usuario, autenticado, fazerLogout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    if (menuAberto) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAberto]);

  const handleIconClick = () => {
    if (autenticado) {
      setMenuAberto(!menuAberto);
    } else {
      onLoginClick();
    }
  };

  const handleLogout = () => {
    fazerLogout();
    setMenuAberto(false);
  };

  return (
    <div className="menu-container" ref={menuRef}>
      <button 
        className="icon-pessoa-btn"
        onClick={handleIconClick}
        title={autenticado ? 'Menu do usuário' : 'Fazer login'}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {menuAberto && autenticado && (
        <div className="menu-dropdown">
          <div className="menu-item menu-user-info">
            <div className="menu-user-name">{usuario?.nome}</div>
            <div className="menu-user-email">{usuario?.email}</div>
          </div>
          <div className="menu-divider"></div>
          <button className="menu-item menu-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserIcon;

