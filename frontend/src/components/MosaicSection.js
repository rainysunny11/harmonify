import React, { useRef, useState } from 'react';
import PatternGrid from './PatternGrid';
import html2canvas from 'html2canvas';
import './MosaicSection.css';

/**
 * MosaicSection component displays a section with a PatternGrid mosaic
 * @param {Object} props - Component props
 * @param {Array} props.items - Track items to display in the mosaic
 * @param {string} props.timeRangeLabel - Formatted label for the time range
 * @param {string} props.timeRange - Current time range value
 * @param {string} props.pattern - Pattern to use for the grid ('year2024', 'apr')
 * @param {string} props.customText - Optional custom text to display instead of a preset pattern
 */
const MosaicSection = ({ 
  items, 
  timeRangeLabel, 
  timeRange, 
  pattern = 'year2024', 
  customText = '' 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [inputText, setInputText] = useState(customText);
  const [displayText, setDisplayText] = useState(customText);
  const mosaicRef = useRef(null);
  
  // Calculate required items based on text or pattern
  const getRequiredItemsCount = () => {
    if (displayText) {
      // Calculate based on text pattern
      let count = 0;
      const upperText = displayText.toUpperCase();
      
      for (let i = 0; i < upperText.length; i++) {
        const char = upperText[i];
        // Each character can use up to 13 items (for number 8)
        // Add a buffer to be safe
        count += 15;
      }
      
      return count;
    } else {
      // Preset patterns
      return pattern === 'apr' ? 34 : 43;
    }
  };
  
  // Check if we have enough items for the grid
  const requiredItemsCount = getRequiredItemsCount();
  const hasEnoughItems = items && items.length >= requiredItemsCount;
  
  // Function to download mosaic as image
  const downloadMosaic = async () => {
    if (!mosaicRef.current || !hasEnoughItems) return;
    
    setIsDownloading(true);
    
    try {
      // Capture with improved settings
      const canvas = await html2canvas(mosaicRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#1a1a1a",
        scale: 2,
      });
      
      // Create download link
      const link = document.createElement('a');
      const filename = displayText 
        ? `music-mosaic-${displayText.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`
        : `music-mosaic-${timeRange}.png`;
        
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error creating mosaic image:", error);
      alert("Could not download the image. This might be due to CORS restrictions.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Handle text input change
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };
  
  // Apply the text pattern
  const applyText = () => {
    // Validate: limit to reasonable length and allowed characters
    const validText = inputText.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 15);
    setDisplayText(validText);
  };
  
  // Clear custom text
  const clearText = () => {
    setInputText('');
    setDisplayText('');
  };

  return (
    <div className="y2k-container mb-5 position-relative">
      <h3 className="y2k-heading">Music Mosaic</h3>
      
      {/* Text pattern controls */}
      <div className="mosaic-controls mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={inputText}
            onChange={handleTextChange}
            maxLength={6}
          />
          <button
            className="btn y2k-btn-sm"
            onClick={applyText}
          >
            Apply
          </button>
          <button 
            className="btn y2k-btn-outline-sm"
            onClick={clearText}
          >
            <span className="text">Clear</span>
          </button>
        </div>
        <small className="text">
          Letters and numbers only. Max 6 characters.
        </small>
      </div>
      
      {hasEnoughItems && (
        <button
          className="download-button"
          onClick={downloadMosaic}
          disabled={isDownloading}
        >
          {isDownloading ? 'Processing...' : 'Save'}
        </button>
      )}
      
      {hasEnoughItems ? (
        <div className="mosaic-container" ref={mosaicRef}>
          
          <div className="mosaic-grid-wrapper">
            <PatternGrid 
              topItems={items} 
              altText="Album art" 
              pattern={pattern}
              text={displayText}
            />
          </div>
        </div>
      ) : (
        <div className="text">
          <p>6 characters max please!</p>
        </div>
      )}
    </div>
  );
};

export default MosaicSection;