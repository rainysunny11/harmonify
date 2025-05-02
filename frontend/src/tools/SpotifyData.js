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

// Tim Range
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
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        return null;
    }
};

// Fetch user's top artists
export const getTopArtists = async (token, timeRange = 'short_term', limit = 10) => {
    try {
        const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`, 
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