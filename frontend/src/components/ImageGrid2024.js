import React from 'react';
import BLANK from '../images/blank.png';
import './ImageGrid2024.css';

/**
 * ImageGrid2024 component renders a grid of album images in a specific pattern
 * @param {Object} props - Component props
 * @param {Array} props.topItems - Array of track items with album images
 * @param {string} props.altText - Alternative text for images
 */
const ImageGrid2024 = ({ topItems, altText = "Album cover" }) => {
  // Helper function to get image URL or return blank
  const getImageUrl = (index) => {
    if (!topItems || !topItems[index] || !topItems[index].album || !topItems[index].album.images) {
      return BLANK;
    }
    return topItems[index].album.images[2]?.url || BLANK;
  };
  
  // Grid pattern data
  const gridPattern = [
    // Row 1
    [0, 1, 2, null, 3, 4, 5, null, 6, 7, 8, null, 9, null, 10],
    // Row 2
    [null, null, 11, null, 12, null, 13, null, null, null, 14, null, 15, null, 16],
    // Row 3
    [17, 18, 19, null, 20, null, 21, null, 22, 23, 24, null, 25, 26, 27],
    // Row 4
    [28, null, null, null, 29, null, 30, null, 31, null, null, null, null, null, 32],
    // Row 5
    [33, 34, 35, null, 36, 37, 38, null, 39, 40, 41, null, null, null, 42]
  ];
  
  return (
    <div className="image-grid">
      {gridPattern.map((row, rowIndex) => (
        <div className="grid-row" key={`row-${rowIndex}`}>
          {row.map((itemIndex, cellIndex) => (
            <img 
              key={`cell-${rowIndex}-${cellIndex}`}
              src={itemIndex !== null ? getImageUrl(itemIndex) : BLANK}
              alt={itemIndex !== null ? `${altText} ${itemIndex + 1}` : "spacer"}
              width={itemIndex !== null ? 25 : 10}
              className={itemIndex === null ? "grid-spacer" : "grid-item"}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid2024;