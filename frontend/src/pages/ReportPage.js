import React, { useState, useEffect } from 'react';
import TimeRangeSelector from '../components/TimeRangeSelector';
import ReportSection from '../components/ReportSection';
import MosaicSection from '../components/MosaicSection';
import { getTopTracks, getTopArtists, getTimeRangeLabel } from '../tools/SpotifyData';
import './Pages.css';
import Footer from '../components/footer';

const ReportPage = () => {
  // State management
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [timeRange, setTimeRange] = useState('short_term');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [customMosaicText, setCustomMosaicText] = useState('');

  // Handle initial data loading
  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (token) {
      fetchSpotifyData(token, timeRange);
    } else {
      setIsLoading(false);
    }
  }, [timeRange]);
  
  // Handle time range changes - reset flipped cards
  useEffect(() => {
    setFlippedCards({});
  }, [timeRange]);
  
  // Function to fetch data from Spotify
  const fetchSpotifyData = async (token, range) => {
    setIsLoading(true);
    
    try {
      // Get top tracks (get more for the custom text patterns - need at least 100)
      const tracks = await getTopTracks(token, range, 100);
      if (tracks) setTopTracks(tracks);
      
      // Get top artists
      const artists = await getTopArtists(token, range, 9);
      if (artists) setTopArtists(artists);
    } catch (error) {
      console.error("Error fetching data:", error);
      // If unauthorized, clear token (App.js will handle redirect)
      if (error.status === 401) {
        localStorage.removeItem('spotify_token');
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
  const handleToggleFlip = (id, reset = false, restore = false) => {
    if (isDownloading) return;
    
    if (reset) {
      // Reset all cards to not flipped
      setFlippedCards({});
    } else if (restore) {
      // Restore to a previous state
      setFlippedCards(id); // In this case, 'id' is actually the full state object
    } else {
      // Toggle single card
      setFlippedCards(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };
  
  // Determine which pattern to use based on time range
  const getMosaicPattern = () => {
    switch (timeRange) {
      case 'medium_term': // 6 months
        return 'apr';
      case 'short_term': // 1 month
      case 'long_term': // 1 year
      default:
        return 'year2024';
    }
  };

  // Get default text based on time range
  const getDefaultText = () => {
    switch (timeRange) {
      case 'short_term':
        return 'Apr';
      case 'medium_term':
        return '240502';
      case 'long_term':
        return '2024';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      {/* Page Title */}
      <div className="page-title">
        <h2>Your Spotify Report</h2>
      </div>
      
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
            <TimeRangeSelector 
              currentTimeRange={timeRange} 
              onChange={handleTimeRangeChange}
            />
          </div>

          {/* Artists Section */}
          <ReportSection
            title="Your Top Artists"
            items={topArtists}
            type="artist"
            timeRange={timeRange}
            timeRangeLabel={getTimeRangeLabel(timeRange)}
            flippedCards={flippedCards}
            onToggleFlip={handleToggleFlip}
            isDownloading={isDownloading}
            setIsDownloading={setIsDownloading}
          />

          {/* Tracks Section */}
          <ReportSection
            title="Your Top Tracks"
            items={topTracks ? topTracks.slice(0, 9) : null}
            type="track"
            timeRange={timeRange}
            timeRangeLabel={getTimeRangeLabel(timeRange)}
            flippedCards={flippedCards}
            onToggleFlip={handleToggleFlip}
            isDownloading={isDownloading}
            setIsDownloading={setIsDownloading}
          />
          
          {/* Mosaic Section - with pattern based on time range and custom text support */}
          <MosaicSection 
            items={topTracks}
            timeRange={timeRange}
            timeRangeLabel={getTimeRangeLabel(timeRange)}
            pattern={getMosaicPattern()}
            customText={customMosaicText || getDefaultText()}
          />
          
          <Footer/>
        </>
      )}
    </div>
  );
};

export default ReportPage;