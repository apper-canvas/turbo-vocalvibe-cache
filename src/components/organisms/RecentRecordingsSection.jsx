import React from 'react';
      import { motion } from 'framer-motion';
      import RecordingCard from '../molecules/RecordingCard';
      import Text from '../atoms/Text';

      const RecentRecordingsSection = ({ recordings, songs }) => {
        return (
          <section className="py-16 bg-black/40">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Text as="h2" className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    Recent Performances
                  </span>
                </Text>
                <Text className="text-gray-400 text-center max-w-2xl mx-auto">
                  Check out the latest recordings from our community of singers
                </Text>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recordings.map((recording, index) => {
                  const song = songs.find(s => s.id === recording.songId);
                  return (
                    <RecordingCard
                      key={recording.id}
                      recording={recording}
                      song={song}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        );
      };

      export default RecentRecordingsSection;