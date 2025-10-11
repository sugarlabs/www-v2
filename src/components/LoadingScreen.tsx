import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/LoadingAnimations.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingMessages = [
    'Getting ready for fun learning...',
    'Loading cool activities...',
    'Preparing creative tools...',
    'Almost ready to play!',
  ];

  const funIcons = ['🎨', '🧮', '🔬', '💻', '🎵', '📚', '🎯', '🌟', '🚀', '💡'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onComplete, loadingMessages.length]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 flex items-center justify-center"
        >
          {/* Simple Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-orange-300 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
            {/* Sugar Labs Logo - Simple and Fun */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.6 }}
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl loading-float">
                <span className="text-6xl">🍭</span>
              </div>
            </motion.div>

            {/* Simple Title */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold font-Caveat text-orange-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Sugar Labs
            </motion.h1>

            {/* Fun Floating Icons */}
            <div className="relative mb-8">
              {funIcons.map((icon, index) => (
                <motion.span
                  key={index}
                  className="absolute text-3xl"
                  style={{
                    left: `${15 + index * 9}%`,
                    top: `${-5 + (index % 2) * 15}px`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 2 + index * 0.1,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {icon}
                </motion.span>
              ))}
            </div>

            {/* Simple Loading Message */}
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-orange-600 mb-2 font-Caveat">
                Welcome to Sugar Labs!
              </h2>
              <p className="text-lg text-gray-700 font-Roboto">
                {loadingMessages[currentMessage]}
              </p>
            </motion.div>

            {/* Simple Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-orange-200 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <motion.p
                className="text-sm text-orange-600 mt-2 font-Roboto"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {Math.round(progress)}% Complete
              </motion.p>
            </div>

            {/* Simple Fun Fact */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-orange-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-700 font-Roboto">
                <span className="font-semibold text-orange-600">Fun Fact:</span>{' '}
                Sugar Labs helps kids learn through creative computing! 🎨✨
              </p>
            </motion.div>

            {/* Simple Loading Dots */}
            <div className="flex justify-center space-x-3 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-orange-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
