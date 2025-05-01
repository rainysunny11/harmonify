import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import config from './config.js';
import TimeRangeSelector from './report/TimeRangeSelector';
import { getTokenFromURL, getTopTracks, getTopArtists, getTimeRangeLabel } from './report/spotifyService';
import 'bootstrap/dist/css/bootstrap.min.css';
import html2canvas from 'html2canvas';

const backend_url = config.BACKEND_URL;

function App() {
  // State management (without token in state)
  const [loggedIn, setLoggedIn] = useState(false);
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [timeRange, setTimeRange] = useState('short_term');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  
  // Refs for the sections we want to download
  const artistsGridRef = useRef(null);
  const tracksGridRef = useRef(null);

  // Handle initial authentication
  useEffect(() => {
    // Check localStorage first
    const existingToken = localStorage.getItem('spotify_token');
    
    // Then check URL for a new token
    const spotifyToken = getTokenFromURL().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      // New login - save token and set logged in
      localStorage.setItem('spotify_token', spotifyToken);
      setLoggedIn(true);
      fetchSpotifyData(spotifyToken, timeRange);
    } else if (existingToken) {
      // Existing login - use stored token
      setLoggedIn(true);
      fetchSpotifyData(existingToken, timeRange);
    } else {
      setIsLoading(false);
    }
  }, []);
  
  // Handle time range changes
  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('spotify_token');
      if (token) {
        fetchSpotifyData(token, timeRange);
      }
    }
  }, [timeRange, loggedIn]);
  
  // Reset flipped cards when changing time range
  useEffect(() => {
    setFlippedCards({});
  }, [timeRange]);
  
  // Function to fetch data from Spotify
  const fetchSpotifyData = async (token, range) => {
    setIsLoading(true);
    
    try {
      // Get top tracks
      const tracks = await getTopTracks(token, range, 9);
      if (tracks) setTopTracks(tracks);
      
      // Get top artists
      const artists = await getTopArtists(token, range, 9);
      if (artists) setTopArtists(artists);
    } catch (error) {
      console.error("Error fetching data:", error);
      // If unauthorized, log out
      if (error.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle time range selection
  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
  };
  
  // Handle card flip
  const toggleCardFlip = (id) => {
    // Don't toggle when downloading
    if (isDownloading) return;
    
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Custom time range selector with Y2K style
  const CustomTimeSelector = ({ currentTimeRange, onChange }) => {
    const timeOptions = [
      { value: 'short_term', label: '4 Weeks' },
      { value: 'medium_term', label: '6 Months' },
      { value: 'long_term', label: 'All Time' }
    ];
    
    return (
      <div className="time-selector">
        {timeOptions.map(option => (
          <div 
            key={option.value}
            className={`time-option ${currentTimeRange === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    );
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    setLoggedIn(false);
    setTopTracks(null);
    setTopArtists(null);
  };

  // Function to download grid as image
  const downloadAsImage = async (ref, fileName) => {
    if (!ref.current) return;
    
    setIsDownloading(true);
    
    // First, ensure all cards are showing front face for the screenshot
    const currentFlippedState = {...flippedCards};
    setFlippedCards({});
    
    // Wait a moment for the state to update and cards to flip back
    setTimeout(async () => {
      try {
        // Capture with improved settings
        const canvas = await html2canvas(ref.current, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#1e1e1e",
          scale: 2,
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error creating image:", error);
        alert("Could not download the image. This might be due to CORS restrictions.");
      } finally {
        // Restore previous card states
        setFlippedCards(currentFlippedState);
        setIsDownloading(false);
      }
    }, 100);
  };

  return (
    <div className="App">
      {/* Login Screen */}
      {(!loggedIn) && (
        <div className="welcome-container d-flex justify-content-center align-items-center text-center min-vh-100">
          <div className="welcome-gradient"></div>
          <div className="welcome-box">
            <h1 className="welcome-title">Harmonify 2000</h1>
            <p className="welcome-subtitle">Discover your music profile</p>
            <button
              onClick={() => window.location.href = backend_url}
              className="y2k-btn d-flex align-items-center mx-auto"
            >
              Connect with Spotify
            </button>
          </div>
        </div>
      )}

      {/* Main App */}
      {loggedIn && (
        <>
          {/* Header */}
          <div className="header-bar mb-4">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <h2 className="m-0">Harmonify 2000</h2>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="y2k-logout d-flex align-items-center"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <div className="container">
            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading your data...</p>
              </div>
            ) : (
              <>
                {/* Time Range Selector */}
                <div className="text-center mb-5">
                  <h3 className="mb-4">Your Spotify Statistics</h3>
                  <CustomTimeSelector 
                    currentTimeRange={timeRange} 
                    onChange={handleTimeRangeChange}
                  />
                </div>

                {/* Top Artists Grid */}
                <div className="y2k-container mb-5 position-relative">
                  <h3 className="y2k-heading">
                    Your Top Artists {getTimeRangeLabel(timeRange)}
                  </h3>
                  
                  <button
                    className="download-button"
                    onClick={() => downloadAsImage(artistsGridRef, `top-artists-${timeRange}.png`)}
                    disabled={isDownloading}
                  >
                    {isDownloading ? 'Processing...' : 'Save Image'}
                  </button>
                  
                  <div ref={artistsGridRef}>
                    <div className="grid-wrapper">
                      {topArtists && topArtists.length > 0 ? (
                        topArtists.slice(0, 9).map((artist, index) => (
                          <div key={artist.id} className="square-item">
                            <div className="square-content">
                              <div 
                                className={`flip-card ${flippedCards['artist-'+artist.id] ? 'flipped' : ''}`} 
                                onClick={() => toggleCardFlip('artist-'+artist.id)}
                              >
                                <div className="flip-card-inner">
                                  {/* Front of card */}
                                  <div className="flip-card-front">
                                    <div className="card-rank">{index + 1}</div>
                                    <img 
                                      src={artist.images && artist.images[0] ? artist.images[0].url : '/placeholder-artist.png'} 
                                      alt={artist.name}
                                      crossOrigin="anonymous"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  </div>
                                  
                                  {/* Back of card */}
                                  <div className="flip-card-back">
                                    <div className="back-content">
                                      <div className="card-rank">{index + 1}</div>
                                      <h3 className="back-title">{artist.name}</h3>
                                      <p className="back-subtitle">
                                        {artist.genres && artist.genres.length > 0 
                                          ? artist.genres.slice(0, 2).join(', ')
                                          : 'Artist'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-4">
                          <p>No data available for this time period</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top Tracks Grid */}
                <div className="y2k-container mb-5 position-relative">
                  <h3 className="y2k-heading">
                    Your Top Tracks {getTimeRangeLabel(timeRange)}
                  </h3>
                  
                  <button
                    className="download-button"
                    onClick={() => downloadAsImage(tracksGridRef, `top-tracks-${timeRange}.png`)}
                    disabled={isDownloading}
                  >
                    {isDownloading ? 'Processing...' : 'Save Image'}
                  </button>
                  
                  <div ref={tracksGridRef}>
                    <div className="grid-wrapper">
                      {topTracks && topTracks.length > 0 ? (
                        topTracks.slice(0, 9).map((track, index) => (
                          <div key={track.id} className="square-item">
                            <div className="square-content">
                              <div 
                                className={`flip-card ${flippedCards['track-'+track.id] ? 'flipped' : ''}`} 
                                onClick={() => toggleCardFlip('track-'+track.id)}
                              >
                                <div className="flip-card-inner">
                                  {/* Front of card */}
                                  <div className="flip-card-front">
                                    <div className="card-rank">{index + 1}</div>
                                    <img 
                                      src={track.album && track.album.images && track.album.images[0] ? track.album.images[0].url : '/placeholder-album.png'} 
                                      alt={track.name}
                                      crossOrigin="anonymous"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  </div>
                                  
                                  {/* Back of card */}
                                  <div className="flip-card-back">
                                    <div className="back-content">
                                      <div className="card-rank">{index + 1}</div>
                                      <h3 className="back-title">{track.name}</h3>
                                      <p className="back-subtitle">
                                        {track.artists.map(artist => artist.name).join(', ')}
                                      </p>
                                      <p className="back-subtitle">
                                        {track.album.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-4">
                          <p>No data available for this time period</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="footer">
                  <p>Harmonify 2000 • Connect through music • {new Date().getFullYear()}</p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;