import React from 'react';
import './TimeRangeSelector.css';

/**
 * Component for selecting time range of Spotify data
 */
const TimeRangeSelector = ({ currentTimeRange, onChange }) => {
  const timeRanges = [
    { value: 'short_term', label: 'Last Month' },
    { value: 'medium_term', label: 'Last 6 Months' },
    { value: 'long_term', label: 'Last Year' }
  ];

  return (
    <div className="time-range-selector mb-4">
      <div className="btn-group" role="group" aria-label="Time range selection">
        {timeRanges.map(range => (
          <button
            key={range.value}
            type="button"
            className={`btn ${currentTimeRange === range.value ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onChange(range.value)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;