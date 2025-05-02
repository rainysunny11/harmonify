// React
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Pages
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import GroupPage from './pages/GroupPage';
import Navbar from './components/Navbar';
// Components and Tools
import { getTokenFromURL } from './tools/SpotifyData.js';
// Style
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Config
import config from './config.js';

const backend_url = config.BACKEND_URL;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Authentication
  useEffect(() => {
    const existingToken = localStorage.getItem('spotify_token');
    
    const spotifyToken = getTokenFromURL().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      localStorage.setItem('spotify_token', spotifyToken);
      setLoggedIn(true);
    } else if (existingToken) {
      setLoggedIn(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Show Navbar only if logged in */}
        {loggedIn && <Navbar onLogout={handleLogout} />}

        <Routes>
          <Route 
            path="/" 
            element={<HomePage loginUrl={backend_url} isLoggedIn={loggedIn} />} 
          />
          
          <Route 
            path="/report" 
            element={
              loggedIn ? <ReportPage /> : <Navigate to="/" />
            } 
          />
          
          <Route 
            path="/group" 
            element={
              loggedIn ? <GroupPage /> : <Navigate to="/" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;