import './App.css';
import React, { useState, useEffect } from 'react';
import ImageGrid2024 from './report/ImageGrid2024';
import config from './config.js';

const url = config.BACKEND_URL;
console.log("Backend URL:", url);


const getTokenFromURL = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    const spotifyToken = getTokenFromURL().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      setLoggedIn(true);

      // Fetch data from Spotify API
      fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=43', {
        headers: {
          'Authorization': `Bearer ${spotifyToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTopTracks(data.items))
        .catch((error) => console.error("Error fetching user data:", error));

      fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10', {
        headers: {
          'Authorization': `Bearer ${spotifyToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTopArtists(data.items))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <div className="App">
      {(!loggedIn) &&(
        <>
          <h2>What did I listen to last year?</h2>
          <button 
            onClick={() => window.location.href = url} 
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          >
          I want to know
          </button>
        </>
      )}
      
      {loggedIn && (
        <>
          <h3>Your Top Tracks Last Year</h3>
          {topTracks && topTracks.length > 0 ? (
            <div>
              <ImageGrid2024 topItems={topTracks}/>
            </div>
            
          ) : (
            <p>Loading your top tracks...</p>  // Handle case when data is still loading
          )}

          <h3>Your Top Artists Last Month</h3>
          {topArtists && topArtists.length > 0 ? (
   
            <div>
              {topArtists.map((item, index) => (
                <li key={index}>{index + 1}. {item.name}</li>
              ))}
            </div>
          ) : (
            <p>Loading your top artists...</p>  // Handle case when data is still loading
          )}

          <h3>Your Top Tracks Last Month</h3>
          {topTracks && topTracks.length > 0 ? (
            <div>
              {topTracks.slice(1, 11).map((item, index) => (
                <li key={index}>{index + 1}. {item.name}</li>
              ))}
            </div>
            
          ) : (
            <p>Loading your top tracks...</p>  // Handle case when data is still loading
          )}
        </>
      )}
    </div>
  );
}

export default App;
