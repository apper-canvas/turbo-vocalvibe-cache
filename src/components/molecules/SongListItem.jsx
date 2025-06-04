import React from 'react';
      import { motion } from 'framer-motion';
      import Image from '../atoms/Image';
      import Text from '../atoms/Text';

      const SongListItem = ({ song, isSelected, onClick, formatTime }) => {
        const defaultAlbumArt = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop`;

        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(song)}
            className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
              isSelected
                ? 'bg-primary/20 border border-primary/50 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={song.albumArt || defaultAlbumArt}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <Text as="h4" className="font-medium truncate">{song.title}</Text>
                <Text className="text-sm text-gray-400 truncate">{song.artist}</Text>
                <Text className="text-xs text-gray-500">{formatTime(song.duration)}</Text>
              </div>
            </div>
          </motion.button>
        );
      };

      export default SongListItem;