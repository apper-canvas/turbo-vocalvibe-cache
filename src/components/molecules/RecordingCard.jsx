import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';

      const RecordingCard = ({ recording, song, index }) => {
        const formatDuration = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="Mic" className="w-6 h-6 text-white" />
              </div>
              <div>
                <Text as="h3" className="font-semibold text-white">{song?.title || "Unknown Song"}</Text>
                <Text className="text-gray-400 text-sm">{song?.artist || "Unknown Artist"}</Text>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" className="w-4 h-4 text-gray-400" />
                <Text className="text-sm text-gray-400">
                  {formatDuration(recording.duration)}
                </Text>
              </div>
              {recording.score && (
                <div className="flex items-center gap-2">
                  <ApperIcon name="Star" className="w-4 h-4 text-accent" />
                  <Text className="text-sm text-accent font-semibold">{recording.score}%</Text>
                </div>
              )}
            </div>
            <Button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg" iconName="Play">
              Play Recording
            </Button>
          </motion.div>
        );
      };

      export default RecordingCard;