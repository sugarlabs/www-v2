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

  const buttonClasses = `inline-flex items-center justify-center px-3.5 py-1.5 sm:px-5 sm:py-2 border border-transparent rounded-full shadow-sm sm:text-l font-medium text-white bg-gradient-to-r ${styles.button} transition-all duration-200 whitespace-nowrap`;
  const buttonAnimationProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
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
          className={`w-full bg-gradient-to-r ${styles.background} border-b ${styles.border} shadow-sm overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 md:px-8 relative">
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-y-3 sm:gap-y-0">
                  <div className="flex items-center w-full sm:w-auto">
                    {shouldRotate && (
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevBanner}
                        className={`hidden sm:flex p-1.5 rounded-full hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${styles.text} touch-manipulation mr-2`}
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
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </motion.button>
                    )}

                    <div
                      className={`flex p-2 sm:p-2.5 rounded-full bg-white/40 backdrop-blur-sm ${styles.border} shadow-sm shrink-0`}
                    >
                      <span className={styles.icon}>
                        <PromoIcon theme={currentBanner.theme || 'primary'} />
                      </span>
                    </div>

                    <div className="ml-3 sm:ml-3.5 pr-2 flex-1">
                      <p
                        className={`font-medium ${styles.text} text-sm sm:text-base leading-tight`}
                      >
                        {currentBanner.title}
                      </p>
                      {currentBanner.description && (
                        <p
                          className={`text-xs sm:text-sm ${styles.text} opacity-80 mt-0.5 line-clamp-2 sm:line-clamp-none`}
                        >
                          {currentBanner.description}
                        </p>
                      )}
                    </div>

                    {shouldRotate && (
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextBanner}
                        className={`hidden sm:flex p-1.5 rounded-full hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${styles.text} touch-manipulation ml-2`}
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
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 mt-2 sm:mt-0 self-end sm:self-auto">
                    {renderButton()}

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeBanner}
                      className={`flex p-1.5 rounded-full hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${styles.text} touch-manipulation`}
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
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
