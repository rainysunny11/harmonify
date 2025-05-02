import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  return (
    <div className="header-bar">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* Hamburger menu button - visible on mobile only */}
            <button 
              className="navbar-toggle"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-icon">
                <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`}></span>
              </span>
            </button>

            <Link to="/" className="navbar-brand ms-3" onClick={closeMenu}>
              <h2 className="m-0">Harmonify</h2>
            </Link>
            
            {/* Navigation links - desktop view */}
            <div className="nav-links-desktop ms-4">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/report" 
                className={`nav-link ${location.pathname === '/report' ? 'active' : ''}`}
              >
                My Report
              </Link>
              <Link 
                to="/group" 
                className={`nav-link ${location.pathname === '/group' ? 'active' : ''}`}
              >
                Group Session
              </Link>
            </div>
          </div>
          
          <button 
            onClick={onLogout} 
            className="y2k-logout d-flex align-items-center"
          >
            Logout
          </button>
        </div>
        
        {/* Mobile dropdown menu */}
        <div className={`nav-links-mobile ${menuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link-mobile ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/report" 
            className={`nav-link-mobile ${location.pathname === '/report' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            My Report
          </Link>
          <Link 
            to="/group" 
            className={`nav-link-mobile ${location.pathname === '/group' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Group Session
          </Link>
        </div>
    </div>
  );
};

export default Navbar;