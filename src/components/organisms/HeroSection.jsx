import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';
      import Button from '../atoms/Button';
      import Text from '../atoms/Text';

      const HeroSection = () => {
        return (
          <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-30"></div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <Text as="h1" className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent glow-text">
                    Sing Your Heart Out
                  </span>
                </Text>
                <Text className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                  Experience the ultimate karaoke platform with real-time lyrics, professional recording, and seamless sharing
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-neon hover:shadow-cyan-glow"
                    iconName="Play"
                    iconClassName="w-5 h-5"
                  >
                    Start Singing Now
                  </Button>
                  <Button
                    className="px-8 py-4 bg-transparent border-2 border-secondary text-secondary font-semibold rounded-xl hover:bg-secondary hover:text-black"
                    iconName="Music"
                    iconClassName="w-5 h-5"
                  >
                    Browse Songs
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        );
      };

      export default HeroSection;