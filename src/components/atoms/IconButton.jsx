import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';

      const IconButton = ({
        iconName,
        iconClassName = '',
        className = '',
        whileHover = { scale: 1.1 },
        whileTap = { scale: 0.9 },
        ...props
      }) => {
        return (
          <motion.button
            whileHover={whileHover}
            whileTap={whileTap}
            className={`flex items-center justify-center transition-all duration-300 ${className}`}
            {...props}
          >
            <ApperIcon name={iconName} className={iconClassName} />
          </motion.button>
        );
      };

      export default IconButton;