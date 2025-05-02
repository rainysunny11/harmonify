import React, { useRef, useState } from 'react';
import ImageGrid2024 from './ImageGrid2024';
import html2canvas from 'html2canvas';
import './MosaicSection.css';

/**
 * MosaicSection component displays a section with an ImageGrid2024 mosaic
 * @param {Object} props - Component props
 * @param {Array} props.items - Track items to display in the mosaic
 * @param {string} props.timeRangeLabel - Formatted label for the time range
 * @param {string} props.timeRange - Current time range value
 */
const MosaicSection = ({ items, timeRangeLabel, timeRange }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const mosaicRef = useRef(null);
  
  // Check if we have enough items for the grid
  const hasEnoughItems = items && items.length >= 43;
  
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
      link.download = `music-mosaic-${timeRange}.png`;
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

  return (
    <div className="y2k-container mb-5 position-relative">
      <h3 className="y2k-heading">Your Music Mosaic {timeRangeLabel}</h3>
      
      {hasEnoughItems && (
        <button
          className="download-button"
          onClick={downloadMosaic}
          disabled={isDownloading}
        >
          {isDownloading ? 'Processing...' : 'Save Mosaic'}
        </button>
      )}
      
      {hasEnoughItems ? (
        <div className="mosaic-container" ref={mosaicRef}>
          <div className="mosaic-description mb-4">
            <p>This unique pattern showcases your music taste as visual art. Each album cover tells a story about your listening preferences.</p>
          </div>
          
          <div className="mosaic-grid-wrapper">
            <ImageGrid2024 topItems={items} altText="Album art" />
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p>Not enough data to create a mosaic. We need at least 43 tracks.</p>
          <p>Keep listening to more music to unlock this feature!</p>
        </div>
      )}
    </div>
  );
};

export default MosaicSection;