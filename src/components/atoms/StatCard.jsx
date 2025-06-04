import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';

      const StatCard = ({ iconName, label, value, delay = 0 }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <ApperIcon name={iconName} className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-2">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </motion.div>
        );
      };

      export default StatCard;