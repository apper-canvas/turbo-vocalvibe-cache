import React from 'react';

      const RangeSlider = ({ value, onChange, min = "0", max = "100", className = '', ...props }) => {
        return (
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            className={`accent-primary ${className}`}
            {...props}
          />
        );
      };

      export default RangeSlider;