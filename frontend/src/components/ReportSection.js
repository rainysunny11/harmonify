import React, { useRef } from 'react';
import ReportGrid from './ReportGrid';
import html2canvas from 'html2canvas';
import './ReportSection.css';

/**
 * Section component that contains a title, download button, and grid
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {Array} props.items - Items to display in the grid
 * @param {string} props.type - Type of items ('artist' or 'track')
 * @param {string} props.timeRange - Current time range for data
 * @param {string} props.timeRangeLabel - Formatted label for the time range
 * @param {Object} props.flippedCards - State object tracking which cards are flipped
 * @param {Function} props.onToggleFlip - Function to handle card flip
 * @param {boolean} props.isDownloading - Whether section is being downloaded
 * @param {Function} props.setIsDownloading - Function to update download state
 */
const ReportSection = ({ 
  title, 
  items, 
  type, 
  timeRange, 
  timeRangeLabel,
  flippedCards, 
  onToggleFlip, 
  isDownloading, 
  setIsDownloading 
}) => {
  const gridRef = useRef(null);

  // Function to download grid as image
  const downloadAsImage = async () => {
    if (!gridRef.current) return;
    
    setIsDownloading(true);
    
    // Store current state of flipped cards
    // const currentFlippedState = {...flippedCards};
    
    // Reset all cards to show front face
    // onToggleFlip({}, true);
    
    // Wait a moment for the state to update and cards to show front face
    // setTimeout(async () => {
      try {
        // Capture with improved settings
        const canvas = await html2canvas(gridRef.current, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#1e1e1e",
          scale: 2,
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = `top-${type}s-${timeRange}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error creating image:", error);
        alert("Could not download the image. This might be due to CORS restrictions.");
      } finally {
        // Restore previous card states
        setIsDownloading(false);
      }
    // }, 100);
  };

  return (
    <div className="y2k-container mb-5 position-relative">
      <h3 className="y2k-heading">
        Top {type === 'artist' ? 'Artists' : 'Tracks'}
      </h3>
      
      <button
        className="download-button"
        onClick={downloadAsImage}
        disabled={isDownloading}
      >
        {isDownloading ? 'Processing...' : 'Save Image'}
      </button>
      
      <div ref={gridRef}>
        <ReportGrid 
          items={items}
          type={type}
          flippedCards={flippedCards}
          onToggleFlip={onToggleFlip}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  );
};

export default ReportSection;