import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';
      import Image from '../atoms/Image';
      import Text from '../atoms/Text';

      const FeaturedSongCard = ({ song, index }) => {
        const defaultAlbumArt = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop`;

        const formatDuration = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300"
          >
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <Image
                src={song.albumArt || defaultAlbumArt}
                alt={song.title}
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="p-3 bg-primary rounded-full shadow-neon">
                  <ApperIcon name="Play" className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            <Text as="h3" className="font-semibold text-white mb-1 truncate">{song.title}</Text>
            <Text className="text-gray-400 text-sm truncate">{song.artist}</Text>
            <div className="flex items-center justify-between mt-4">
              <Text className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">
                {song.genre}
              </Text>
              <Text className="text-xs text-gray-400">
                {formatDuration(song.duration)}
              </Text>
            </div>
          </motion.div>
        );
      };

      export default FeaturedSongCard;