import React from 'react';
      import ApperIcon from '../ApperIcon';

      const Input = ({
        iconName,
        iconClassName = '',
        className = '',
        wrapperClassName = '',
        ...props
      }) => {
        return (
          <div className={`relative ${wrapperClassName}`}>
            {iconName && (
              <ApperIcon
                name={iconName}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
              />
            )}
            <input
              className={`w-full pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors ${iconName ? 'pl-10' : ''} ${className}`}
              {...props}
            />
          </div>
        );
      };

      export default Input;