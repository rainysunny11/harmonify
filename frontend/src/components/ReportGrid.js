import React from 'react';
import FlippedCard from './FlippedCard';
import './ReportGrid.css';

/**
 * Reusable grid component for displaying either artists or tracks
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to display
 * @param {string} props.type - Type of items ('artist' or 'track')
 * @param {Object} props.flippedCards - State object tracking which cards are flipped
 * @param {Function} props.onToggleFlip - Function to handle card flip
 * @param {boolean} props.isDownloading - Whether component is being downloaded
 */
const ReportGrid = ({ 
  items, 
  type, 
  flippedCards, 
  onToggleFlip, 
  isDownloading 
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="col-12 text-center py-4">
        <p>No data available for this time period</p>
      </div>
    );
  }

  return (
    <div className="grid-wrapper">
      {items.slice(0, 9).map((item, index) => {
        // Prepare data based on item type
        const id = `${type}-${item.id}`;
        const isFlipped = flippedCards[id] || false;
        
        // Configure props based on type
        let imageUrl, title, subtitle, extraInfo;
        
        if (type === 'artist') {
          imageUrl = item.images && item.images[0] ? item.images[0].url : '/placeholder-artist.png';
          title = item.name;
          subtitle = item.genres && item.genres.length > 0 
            ? item.genres.slice(0, 2).join(', ')
            : 'Artist';
        } else if (type === 'track') {
          imageUrl = item.album && item.album.images && item.album.images[0] 
            ? item.album.images[0].url 
            : '/placeholder-album.png';
          title = item.name;
          subtitle = item.artists.map(artist => artist.name).join(', ');
          extraInfo = item.album.name;
        }
        
        return (
          <FlippedCard
            key={id}
            id={id}
            index={index}
            isFlipped={isFlipped}
            onToggleFlip={onToggleFlip}
            imageUrl={imageUrl}
            title={title}
            subtitle={subtitle}
            extraInfo={extraInfo}
            disableFlip={isDownloading}
          />
        );
      })}
    </div>
  );
};

export default ReportGrid;