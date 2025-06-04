import React from 'react';
      import { motion } from 'framer-motion';
      import FeaturedSongCard from '../molecules/FeaturedSongCard';
      import Text from '../atoms/Text';

      const FeaturedSongsSection = ({ songs, loading }) => {
        return (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Text as="h2" className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Trending Songs
                  </span>
                </Text>
                <Text className="text-gray-400 text-center max-w-2xl mx-auto">
                  Discover the most popular karaoke tracks and sing along with the latest hits
                </Text>
              </motion.div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                      <div className="w-full h-32 bg-gray-700 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {songs.map((song, index) => (
                    <FeaturedSongCard key={song.id} song={song} index={index} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      };

      export default FeaturedSongsSection;