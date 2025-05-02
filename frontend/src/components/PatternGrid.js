import React, { useEffect, useState } from 'react';
import BLANK from '../images/blank.png';
import './PatternGrid.css';

/**
 * PatternGrid component renders a grid of album images in specific patterns
 * @param {Object} props - Component props
 * @param {Array} props.topItems - Array of track items with album images
 * @param {string} props.altText - Alternative text for images
 * @param {string} props.pattern - Preset pattern to use ('year2024', 'apr')
 * @param {string} props.text - Custom text to display (letters and numbers)
 */
const PatternGrid = ({ 
  topItems, 
  altText = "Album cover", 
  pattern = 'year2024', 
  text = '' 
}) => {
  const [imageSize, setImageSize] = useState(25);
  
  // Update image size based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      
      // Calculate appropriate sizes based on viewport
      if (viewportWidth < 576) {
        // Mobile phones
        setImageSize(18);
      } else if (viewportWidth < 768) {
        // Tablets
        setImageSize(22);
      } else if (viewportWidth < 992) {
        // Small laptops
        setImageSize(25);
      } else {
        // Larger screens
        setImageSize(30);
      }
    };
    
    // Initial size calculation
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Helper function to get image URL or return blank
  const getImageUrl = (index) => {
    if (!topItems || !topItems[index] || !topItems[index].album || !topItems[index].album.images) {
      return BLANK;
    }
    return topItems[index].album.images[2]?.url || BLANK;
  };
  
  // Define patterns for each character
  const charPatterns = {
    // Numbers 0-9
    '0': [
      [0, 1, 2],
      [3, null, 4],
      [5, null, 6],
      [7, null, 8],
      [9, 10, 11]
    ],
    '1': [
      [null, 0, null],
      [1, 2, null],
      [null, 3, null],
      [null, 4, null],
      [5, 6, 7]
    ],
    '2': [
      [0, 1, 2],
      [null, null, 3],
      [4, 5, 6],
      [7, null, null],
      [8, 9, 10]
    ],
    '3': [
      [0, 1, 2],
      [null, null, 3],
      [4, 5, 6],
      [null, null, 7],
      [8, 9, 10]
    ],
    '4': [
      [0, null, 1],
      [2, null, 3],
      [4, 5, 6],
      [null, null, 7],
      [null, null, 8]
    ],
    '5': [
      [0, 1, 2],
      [3, null, null],
      [4, 5, 6],
      [null, null, 7],
      [8, 9, 10]
    ],
    '6': [
      [0, 1, 2],
      [3, null, null],
      [4, 5, 6],
      [7, null, 8],
      [9, 10, 11]
    ],
    '7': [
      [0, 1, 2],
      [null, null, 3],
      [null, null, 4],
      [null, null, 5],
      [null, null, 6]
    ],
    '8': [
      [0, 1, 2],
      [3, null, 4],
      [5, 6, 7],
      [8, null, 9],
      [10, 11, 12]
    ],
    '9': [
      [0, 1, 2],
      [3, null, 4],
      [5, 6, 7],
      [null, null, 8],
      [9, 10, 11]
    ],
    // Letters
    'A': [
      [0, 1, 2],
      [3, null, 4],
      [5, 6, 7],
      [8, null, 9],
      [10, null, 11]
    ],
    'B': [
      [0, 1, 2],
      [3, null, 4],
      [5, 6, 7],
      [8, null, 9],
      [10, 11, 12]
    ],
    'C': [
      [0, 1, 2],
      [3, null, null],
      [4, null, null],
      [5, null, null],
      [6, 7, 8]
    ],
    'D': [
      [0, 1, 2],
      [3, null, 4],
      [5, null, 6],
      [7, null, 8],
      [9, 10, 11]
    ],
    'E': [
      [0, 1, 2],
      [3, null, null],
      [4, 5, 6],
      [7, null, null],
      [8, 9, 10]
    ],
    'F': [
      [0, 1, 2],
      [3, null, null],
      [4, 5, 6],
      [7, null, null],
      [8, null, null]
    ],
    'G': [
      [0, 1, 2],
      [3, null, null],
      [4, null, 5],
      [6, null, 7],
      [8, 9, 10]
    ],
    'H': [
      [0, null, 1],
      [2, null, 3],
      [4, 5, 6],
      [7, null, 8],
      [9, null, 10]
    ],
    'I': [
      [0, 1, 2],
      [null, 3, null],
      [null, 4, null],
      [null, 5, null],
      [6, 7, 8]
    ],
    'J': [
      [0, 1, 2],
      [null, null, 3],
      [null, null, 4],
      [5, null, 6],
      [7, 8, 9]
    ],
    'K': [
      [0, null, 1],
      [2, null, 3],
      [4, 5, null],
      [6, null, 7],
      [8, null, 9]
    ],
    'L': [
      [0, null, null],
      [1, null, null],
      [2, null, null],
      [3, null, null],
      [4, 5, 6]
    ],
    'M': [
      [0, null, 1],
      [2, 3, 4],
      [5, null, 6],
      [7, null, 8],
      [9, null, 10]
    ],
    'N': [
      [0, null, 1],
      [2, 3, 4],
      [5, 6, 7],
      [8, 9, 10],
      [11, null, 12]
    ],
    'O': [
      [0, 1, 2],
      [3, null, 4],
      [5, null, 6],
      [7, null, 8],
      [9, 10, 11]
    ],
    'P': [
      [0, 1, 2],
      [3, null, 4],
      [5, 6, 7],
      [8, null, null],
      [9, null, null]
    ],
    'Q': [
      [0, 1, 2],
      [3, null, 4],
      [5, null, 6],
      [7, null, 8],
      [9, 10, 11]
    ],
    'R': [
      [0, 1, 2],
      [3, null, 4],
      [5, 6, 7],
      [8, 9, null],
      [10, null, 11]
    ],
    'S': [
      [0, 1, 2],
      [3, null, null],
      [4, 5, 6],
      [null, null, 7],
      [8, 9, 10]
    ],
    'T': [
      [0, 1, 2],
      [null, 3, null],
      [null, 4, null],
      [null, 5, null],
      [null, 6, null]
    ],
    'U': [
      [0, null, 1],
      [2, null, 3],
      [4, null, 5],
      [6, null, 7],
      [8, 9, 10]
    ],
    'V': [
      [0, null, 1],
      [2, null, 3],
      [4, null, 5],
      [6, null, 7],
      [null, 8, null]
    ],
    'W': [
      [0, null, 1],
      [2, null, 3],
      [4, null, 5],
      [6, 7, 8],
      [9, null, 10]
    ],
    'X': [
      [0, null, 1],
      [2, null, 3],
      [null, 4, null],
      [5, null, 6],
      [7, null, 8]
    ],
    'Y': [
      [0, null, 1],
      [2, null, 3],
      [null, 4, null],
      [null, 5, null],
      [null, 6, null]
    ],
    'Z': [
      [0, 1, 2],
      [null, null, 3],
      [null, 4, null],
      [5, null, null],
      [6, 7, 8]
    ],
  };
  
  // Preset grid patterns
  const presetPatterns = {
    // Default 2024 pattern
    year2024: [
      [0, 1, 2, null, 3, 4, 5, null, 6, 7, 8, null, 9, null, 10],
      [null, null, 11, null, 12, null, 13, null, null, null, 14, null, 15, null, 16],
      [17, 18, 19, null, 20, null, 21, null, 22, 23, 24, null, 25, 26, 27],
      [28, null, null, null, 29, null, 30, null, 31, null, null, null, null, null, 32],
      [33, 34, 35, null, 36, 37, 38, null, 39, 40, 41, null, null, null, 42]
    ],
    // APR pattern
    apr: [
      [0, 1, 2, null, 3, 4, 5, null, 6, 7, 8],
      [9, null, 10, null, 11, null, 12, null, 13, null, 14],
      [15, 16, 17, null, 18, 19, 20, null, 21, 22, 23],
      [24, null, 25, null, 26, null, null, null, 27, 28, null],
      [29, null, 30, null, 31, null, null, null, 32, null, 33]
    ]
  };
  
  // Function to build a custom pattern from text
  const buildCustomPattern = (text) => {
    if (!text) return null;
    
    // Convert input to uppercase
    const upperText = text.toUpperCase();
    
    // Parse each character and build a grid
    let combinedPattern = [];
    let itemIndexOffset = 0;
    
    // Initialize with 5 empty rows (character height)
    for (let i = 0; i < 5; i++) {
      combinedPattern.push([]);
    }
    
    // Process each character
    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      
      // Skip if pattern for this character doesn't exist
      if (!charPatterns[char]) continue;
      
      // Get pattern for current character
      const currentPattern = charPatterns[char];
      
      // Add separator column if not the first character
      if (i > 0) {
        for (let row = 0; row < 5; row++) {
          combinedPattern[row].push(null);
        }
      }
      
      // Add character pattern with adjusted indices
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < currentPattern[row].length; col++) {
          const val = currentPattern[row][col];
          // Adjust the index by offset or keep null
          combinedPattern[row].push(val !== null ? val + itemIndexOffset : null);
        }
      }
      
      // Calculate max index used for this character
      const maxIndex = Math.max(...currentPattern.flat().filter(v => v !== null));
      itemIndexOffset += maxIndex + 1;
    }
    
    return combinedPattern;
  };
  
  // Determine which pattern to use
  let selectedPattern;
  
  if (text) {
    // Use custom text pattern
    selectedPattern = buildCustomPattern(text);
  } else {
    // Use a preset pattern
    selectedPattern = presetPatterns[pattern] || presetPatterns.year2024;
  }
  
  // If we couldn't build a pattern, use default
  if (!selectedPattern) {
    selectedPattern = presetPatterns.year2024;
  }
  
  return (
    <div className="image-grid">
      {selectedPattern.map((row, rowIndex) => (
        <div className="grid-row" key={`row-${rowIndex}`}>
          {row.map((itemIndex, cellIndex) => (
            <div 
              key={`cell-${rowIndex}-${cellIndex}`}
              className="grid-cell"
              style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
            >
              <img 
                src={itemIndex !== null ? getImageUrl(itemIndex) : BLANK}
                alt={itemIndex !== null ? `${altText} ${itemIndex + 1}` : "spacer"}
                className={itemIndex === null ? "grid-spacer" : "grid-item"}
                width={imageSize}
                height={imageSize}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatternGrid;