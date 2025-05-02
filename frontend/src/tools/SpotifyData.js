/**
 * Spotify API service functions
 * Handles all API requests to Spotify
 */

// Get token from URL hash parameters
export const getTokenFromURL = () => {
    return window.location.hash.substring(1).split('&').reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

// Time Range
export const getTimeRangeLabel = (timeRange) => {
    switch (timeRange) {
        case 'short_term':
        return 'Last Month';
        case 'medium_term':
        return 'Last 6 Months';
        case 'long_term':
        return 'Last Year';
        default:
        return 'Last Month';
    }
};
  
// Fetch user's top tracks
export const getTopTracks = async (token, timeRange = 'short_term', limit = 10) => {
    try {
      // Spotify API has a max limit of 50 items per request
      const maxSingleRequestLimit = 50;
      
      // If requested limit is <= 50, make a single request
      if (limit <= maxSingleRequestLimit) {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Error fetching top tracks: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items;
      } 
      // If requested limit > 50, make multiple requests
      else {
        // First request: Get first 50 items
        const firstResponse = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${maxSingleRequestLimit}&offset=0`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        
        if (!firstResponse.ok) {
          throw new Error(`Error fetching top tracks: ${firstResponse.status}`);
        }
        
        const firstData = await firstResponse.json();
        
        // Calculate remaining items to fetch
        const remaining = Math.min(limit - maxSingleRequestLimit, maxSingleRequestLimit);
        
        // If we need more items, make a second request
        if (remaining > 0) {
          const secondResponse = await fetch(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${remaining}&offset=${maxSingleRequestLimit}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          
          if (!secondResponse.ok) {
            throw new Error(`Error fetching additional top tracks: ${secondResponse.status}`);
          }
          
          const secondData = await secondResponse.json();
          
          // Combine the results
          return [...firstData.items, ...secondData.items];
        }
        
        return firstData.items;
      }
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      return null;
    }
  };

// Fetch user's top artists
export const getTopArtists = async (token, timeRange = 'short_term', limit = 10) => {
    try {
        // Spotify API has a max limit of 50 items per request
        const maxLimit = Math.min(limit, 50);
        
        const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${maxLimit}`, 
        {
            headers: {
            'Authorization': `Bearer ${token}`,
            },
        }
        );
        
        if (!response.ok) {
        throw new Error(`Error fetching top artists: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error fetching top artists:", error);
        return null;
    }
};