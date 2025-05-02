// React
import React from 'react';
import { Link } from 'react-router-dom';
// Style
import './HomePage.css';

const HomePage = ({ loginUrl, isLoggedIn }) => {
  return (
    <div className="welcome-container d-flex justify-content-center align-items-center text-center min-vh-100">
      <div className="welcome-gradient"></div>
      <div className="welcome-box">
        <h1 className="welcome-title">Harmonify</h1>
        <p className="welcome-subtitle">Connect Through Music</p>
        
        {isLoggedIn ? (
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex gap-3">
              <Link to="/report" className="y2k-btn">
                My Report
              </Link>
              <Link to="/group" className="y2k-btn">
                Group Session
              </Link>
            </div>
          </div>
        ) : (
          <button
            onClick={() => window.location.href = loginUrl}
            className="y2k-btn d-flex align-items-center mx-auto"
          >
            Connect with Spotify
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;