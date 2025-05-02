import React from 'react';
import './FlippedCard.css';

/**
 * Reusable FlippedCard component for displaying both artist and track cards
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the card
 * @param {number} props.index - Position/rank of the item
 * @param {boolean} props.isFlipped - Whether the card is currently flipped
 * @param {Function} props.onToggleFlip - Function to handle card flip
 * @param {string} props.imageUrl - URL for the card's front image
 * @param {string} props.title - Main title for the back of the card
 * @param {string} props.subtitle - Subtitle for the back of the card (e.g., artist name)
 * @param {string} props.extraInfo - Optional additional text for the back of card (e.g., album name)
 * @param {boolean} props.disableFlip - Whether to disable flip interaction (for screenshots)
 */
const FlippedCard = ({ 
  id,
  index, 
  isFlipped, 
  onToggleFlip, 
  imageUrl, 
  title, 
  subtitle, 
  extraInfo,
  disableFlip
}) => {
  return (
    <div className="square-item">
      <div className="square-content">
        <div 
          className={`flip-card ${isFlipped ? 'flipped' : ''}`} 
          onClick={() => !disableFlip && onToggleFlip(id)}
        >
          <div className="flip-card-inner">
            {/* Front of card */}
            <div className="flip-card-front">
              <div className="card-rank">{index + 1}</div>
              <img 
                src={imageUrl || '/placeholder.png'} 
                alt={title}
                crossOrigin="anonymous"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* Back of card */}
            <div className="flip-card-back">
              <div className="back-content">
                <div className="card-rank">{index + 1}</div>
                <h3 className="back-title">{title}</h3>
                <p className="back-subtitle">{subtitle}</p>
                {extraInfo && <p className="back-subtitle">{extraInfo}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippedCard;