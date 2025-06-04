import React from 'react';

      const ProgressBar = ({ progress, duration, currentTime, onSeek, formatTime, className = '' }) => {
        const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

        return (
          <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div
              className="w-full h-2 bg-gray-700 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                const newTime = Math.floor(percentage * duration);
                onSeek(newTime);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        );
      };

      export default ProgressBar;