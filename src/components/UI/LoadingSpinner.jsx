// File: reefstars-frontend/src/components/UI/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const Container = fullScreen ? 'div' : React.Fragment;
  const containerProps = fullScreen ? {
    className: "fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
  } : {};

  return (
    <Container {...containerProps}>
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Animated Waves Icon */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`${sizes[size]} text-ocean-500`}
        >
          <Waves className="w-full h-full" />
        </motion.div>

        {/* Loading Dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-ocean-400 rounded-full"
            />
          ))}
        </div>

        {/* Loading Text */}
        {text && (
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`${textSizes[size]} text-gray-600 font-medium`}
          >
            {text}
          </motion.p>
        )}
      </div>
    </Container>
  );
};

export default LoadingSpinner;