import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themeConfig } from '@/components/Banner/Theme';
import { PromoIcon } from '@/components/Banner/Icon';
import { Link } from 'react-router-dom';
import { BannerConfig } from '@/constants/Banner';

interface PromoBannerProps {
  bannerConfigs: Record<string, BannerConfig>;
  autoRotateInterval?: number;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  bannerConfigs,
  autoRotateInterval = 4000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const bannerConfigsArray = Object.values(bannerConfigs);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentBanner = bannerConfigsArray[currentBannerIndex];
  const styles = themeConfig[currentBanner.theme || 'primary'];

  const totalBanners = bannerConfigsArray.length;
  const shouldRotate = totalBanners > 1;

  const prevBanner = useCallback(() => {
    if (!shouldRotate) return;
    setDirection(-1);
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? totalBanners - 1 : prevIndex - 1,
    );
  }, [shouldRotate, totalBanners]);

  // Navigate to next banner
  const nextBanner = useCallback(() => {
    if (!shouldRotate) return;
    setDirection(1);
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % totalBanners);
  }, [shouldRotate, totalBanners]);

  // Auto-rotate banners
  useEffect(() => {
    if (!shouldRotate || isPaused) return;

    const intervalId = setInterval(() => {
      nextBanner();
    }, autoRotateInterval);

    return () => clearInterval(intervalId);
  }, [nextBanner, autoRotateInterval, isPaused, shouldRotate]);

  const closeBanner = () => {
    setIsVisible(false);
  };

  const buttonClasses = `inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 border border-transparent rounded-full shadow-lg sm:text-base font-semibold text-white bg-gradient-to-r ${styles.button} transition-all duration-300 whitespace-nowrap hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2`;
  const buttonAnimationProps = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.98 },
  };

  const bannerVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const renderButton = () => {
    if (!currentBanner.buttonText || !currentBanner.buttonLink) return null;

    if (currentBanner.isExternalLink) {
      return (
        <motion.a
          {...buttonAnimationProps}
          href={currentBanner.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          {currentBanner.buttonText}
        </motion.a>
      );
    } else {
      return (
        <motion.div {...buttonAnimationProps}>
          <Link to={currentBanner.buttonLink} className={buttonClasses}>
            {currentBanner.buttonText}
          </Link>
        </motion.div>
      );
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className={`w-full bg-gradient-to-r ${styles.background} border-b ${styles.border} shadow-lg overflow-hidden relative`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 md:px-8 relative z-10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentBannerIndex}
                custom={direction}
                variants={bannerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'tween',
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                className="w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-y-3 sm:gap-y-0 sm:gap-x-4">
                  <div className="flex items-center w-full sm:w-auto">
                    {shouldRotate && (
                      <motion.button
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          cursor: 'pointer',
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevBanner}
                        className={`hidden sm:flex p-2 rounded-full hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all ${styles.text} touch-manipulation mr-3 backdrop-blur-sm`}
                        aria-label="Previous banner"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </motion.button>
                    )}

                    <motion.div
                      className={`flex p-2.5 sm:p-3 rounded-full bg-white/50 backdrop-blur-md ${styles.border} shadow-md shrink-0 ring-1 ring-white/30`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`${styles.icon} text-lg sm:text-xl`}>
                        <PromoIcon theme={currentBanner.theme || 'primary'} />
                      </span>
                    </motion.div>

                    <div className="ml-3 sm:ml-4 pr-2 flex-1">
                      <p
                        className={`font-bold ${styles.text} text-sm sm:text-lg leading-tight`}
                      >
                        {currentBanner.title}
                      </p>
                      {currentBanner.description && (
                        <p
                          className={`text-xs sm:text-sm ${styles.text} opacity-85 mt-1 line-clamp-2 sm:line-clamp-none`}
                        >
                          {currentBanner.description}
                        </p>
                      )}
                    </div>

                    {shouldRotate && (
                      <motion.button
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          cursor: 'pointer',
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextBanner}
                        className={`hidden sm:flex p-2 rounded-full hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all ${styles.text} touch-manipulation ml-3 backdrop-blur-sm`}
                        aria-label="Next banner"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 mt-3 sm:mt-0 self-end sm:self-auto">
                    {renderButton()}

                    <motion.button
                      whileHover={{
                        scale: 1.15,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeBanner}
                      className={`flex p-2 rounded-full hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all ${styles.text} touch-manipulation backdrop-blur-sm`}
                      aria-label="Dismiss"
                    >
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicators */}
            {shouldRotate && (
              <motion.div
                className="flex justify-center gap-2.5 mt-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {bannerConfigsArray.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentBannerIndex ? 1 : -1);
                      setCurrentBannerIndex(index);
                    }}
                    className={`rounded-full transition-all cursor-pointer backdrop-blur-sm ring-1 ${
                      index === currentBannerIndex
                        ? `h-2 ${styles.progress} w-8 shadow-md ring-gray-400 dark:ring-white/40`
                        : `h-2 bg-gray-400 dark:bg-white/40 hover:bg-gray-600 dark:hover:bg-white/60 w-2 ring-gray-300 dark:ring-white/20 hover:ring-gray-500 dark:hover:ring-white/40`
                    }`}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.85 }}
                    aria-label={`Go to banner ${index + 1}`}
                    layout
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
