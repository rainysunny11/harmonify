import './App.css';
import React, { useState, useEffect } from 'react';
import BLANK from './images/blank.png'

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

  useEffect(() => {
    const spotifyToken = getTokenFromURL().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      setLoggedIn(true);

      // Fetch data from Spotify API
      fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=43', {
        headers: {
          'Authorization': `Bearer ${spotifyToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTopTracks(data.items))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <div className="App">
      {(!loggedIn) &&(
        <>
          <h2>What did I listen to last year?</h2>
          <button 
            onClick={() => window.location.href = 'http://localhost:8888/'} 
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
              <div class="grid">
                <div class="row">
                  <img src={topTracks[0].album.images[2]?.url} width="25" />
                  <img src={topTracks[1].album.images[2]?.url} width="25" />
                  <img src={topTracks[2].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[3].album.images[2]?.url} width="25" />
                  <img src={topTracks[4].album.images[2]?.url} width="25" />
                  <img src={topTracks[5].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[6].album.images[2]?.url} width="25" />
                  <img src={topTracks[7].album.images[2]?.url} width="25" />
                  <img src={topTracks[8].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[9].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[10].album.images[2]?.url} width="25" />
                </div>
                <div class="row">
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[11].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[12].album.images[2]?.url}width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[13].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[14].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[15].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[16].album.images[2]?.url} width="25" />
                </div>
                <div class="row">
                  <img src={topTracks[17].album.images[2]?.url} width="25" />
                  <img src={topTracks[18].album.images[2]?.url} width="25" />
                  <img src={topTracks[19].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[20].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[21].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[22].album.images[2]?.url} width="25" />
                  <img src={topTracks[23].album.images[2]?.url} width="25" />
                  <img src={topTracks[24].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[25].album.images[2]?.url} width="25" />
                  <img src={topTracks[26].album.images[2]?.url} width="25" />
                  <img src={topTracks[27].album.images[2]?.url} width="25" />
                </div>
                <div class="row">
                  <img src={topTracks[28].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[29].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[30].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[31].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[32].album.images[2]?.url} width="25" />
                </div>
                <div class="row">
                  <img src={topTracks[33].album.images[2]?.url} width="25" />
                  <img src={topTracks[34].album.images[2]?.url} width="25" />
                  <img src={topTracks[35].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[36].album.images[2]?.url} width="25" />
                  <img src={topTracks[37].album.images[2]?.url} width="25" />
                  <img src={topTracks[38].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={topTracks[39].album.images[2]?.url} width="25" />
                  <img src={topTracks[40].album.images[2]?.url} width="25" />
                  <img src={topTracks[41].album.images[2]?.url} width="25" />
                  <img src={BLANK} width="10" />
                  <img src={BLANK} width="25" />
                  <img src={BLANK} width="25" />
                  <img src={topTracks[42].album.images[2]?.url} width="25" />
                </div>
              </div>
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
