import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';
      import IconButton from '../atoms/IconButton';
      import RangeSlider from '../atoms/RangeSlider';
      import Text from '../atoms/Text';

      const PlayerControls = ({
        isPlaying,
        onPlayPause,
        isRecording,
        onRecordToggle,
        recordingDuration,
        volume,
        onVolumeChange,
        formatTime,
      }) => {
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <ApperIcon name="Volume2" className="w-5 h-5 text-gray-400" />
              <RangeSlider
                value={volume}
                onChange={onVolumeChange}
                className="w-20"
              />
              <Text className="text-sm text-gray-400 w-8">{volume}%</Text>
            </div>

            {/* Play/Pause Button */}
            <IconButton
              iconName={isPlaying ? "Pause" : "Play"}
              onClick={onPlayPause}
              className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full shadow-neon hover:shadow-cyan-glow"
              iconClassName="w-8 h-8 text-white"
            />

            {/* Record Button */}
            <IconButton
              iconName={isRecording ? "Square" : "Mic"}
              onClick={onRecordToggle}
              className={`w-16 h-16 rounded-full ${
                isRecording
                  ? 'bg-red-500 shadow-red-500/50 shadow-lg pulse-neon'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              iconClassName="w-6 h-6 text-white"
            />

            {/* Recording Duration */}
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/50"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <Text className="text-red-400 font-mono text-sm">
                  {formatTime(recordingDuration)}
                </Text>
              </motion.div>
            )}
          </div>
        );
      };

      export default PlayerControls;