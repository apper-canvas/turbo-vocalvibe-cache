import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';

      const Button = ({
        children,
        className = '',
        iconName,
        iconClassName = '',
        whileHover = { scale: 1.05 },
        whileTap = { scale: 0.95 },
        ...props
      }) => {
        return (
          <motion.button
            whileHover={whileHover}
            whileTap={whileTap}
            className={`flex items-center justify-center gap-3 transition-all duration-300 ${className}`}
            {...props}
          >
            {iconName && <ApperIcon name={iconName} className={iconClassName} />}
            {children}
          </motion.button>
        );
      };

      export default Button;