import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stats, statisticsData } from '@/constants/Stats.ts';
import {
  headerReveal,
  numberCounter,
  imageReveal,
  container,
  item,
} from '@/styles/Animations';

const Stats = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isTouchDevice] = useState(
    () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  );
  const gridRef = useRef<HTMLDivElement>(null);
  const prevIsMobileRef = useRef<boolean>(window.innerWidth < 1024);

  // Reset component state when switching between mobile and desktop views
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const prevIsMobile = prevIsMobileRef.current;

      // Reset states when switching between mobile and desktop
      if (isMobile !== prevIsMobile) {
        setActiveCardIndex(null);
        setHoveredCardIndex(null);
        prevIsMobileRef.current = isMobile;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside to reset active state
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setActiveCardIndex(null);
        setHoveredCardIndex(null);
      }
    };

    // Add event listeners for both mouse and touch
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-10 sm:py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="relative mb-12 sm:mb-16 md:mb-24">
        <div className="absolute left-0 top-1/2 w-full h-0.5 sm:h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 transform -translate-y-1/2 opacity-30"></div>

        <motion.div
          className="relative z-10 text-center mx-auto max-w-2xl bg-white dark:bg-gray-900 px-2 py-2 sm:py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1 variants={headerReveal} className="text-center">
            <motion.span
              className="block text-black dark:text-white font-Caveat text-5xl sm:text-6xl md:text-7xl mb-1 sm:mb-2"
              variants={headerReveal}
              custom={1}
            >
              What
            </motion.span>
            <motion.div
              className="text-transparent bg-clip-text bg-gradient-to-r 
                        from-red-500 to-orange-500 font-Pacifico text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2"
              variants={headerReveal}
              custom={2}
            >
              numbers
            </motion.div>
            <motion.span
              className="text-black dark:text-white italic font-serif text-2xl sm:text-3xl md:text-4xl"
              variants={headerReveal}
              custom={3}
            >
              say for us?
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-Roboto mt-4 sm:mt-6"
            variants={headerReveal}
            custom={4}
          >
            Sugar Labs, founded in 2008, has had{' '}
            <span className="italic">an impact on the lives of many</span>. Here
            are some of the statistics we are tracking
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="mb-8 sm:mb-12 md:mb-16"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-950/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border border-green-200 dark:border-green-800"
          variants={item}
          whileHover="hover"
        >
          <div className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-12">
            <h3 className="text-gray-700 dark:text-gray-200 text-xl sm:text-2xl font-medium mb-3 sm:mb-4 font-AnonymousPro">
              Kids whose lives have been enriched by using the Sugar Learning
              Platform.
            </h3>
            <motion.div
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-8 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent font-Caveat"
              variants={numberCounter}
            >
              3,000,000+
            </motion.div>
            <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
          </div>

          <motion.div
            className="w-full lg:w-1/2 h-48 sm:h-56 md:h-64 lg:h-96 relative"
            variants={imageReveal}
          >
            <img
              src={stats.kidlaptop}
              alt="Student with laptop"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Top Row - 2 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full justify-items-center max-w-3xl">
          {statisticsData.slice(1, 3).map((stat, index) => (
            <motion.div
              key={index}
              className={`rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 ${stat.bgColor} border ${stat.borderColor} w-full max-w-sm`}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="h-32 sm:h-36 md:h-44 relative overflow-hidden"
                variants={imageReveal}
              >
                <img
                  src={stat.imageSrc}
                  alt={stat.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.gradient}`}
                ></div>
              </motion.div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-gray-700 dark:text-gray-200 text-sm sm:text-base md:text-lg font-medium mb-3 font-AnonymousPro leading-relaxed">
                  {stat.title}
                </h3>
                <motion.div
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3 sm:mb-4 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent font-Caveat whitespace-nowrap`}
                  variants={numberCounter}
                >
                  {stat.value}
                </motion.div>
                <div
                  className={`w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r ${stat.gradient} opacity-50 rounded-full mt-1 sm:mt-2`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row - 3 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full justify-items-center max-w-5xl">
          {statisticsData.slice(3).map((stat, index) => (
            <motion.div
              key={index}
              className={`rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 ${stat.bgColor} border ${stat.borderColor} w-full max-w-sm`}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="h-32 sm:h-36 md:h-44 relative overflow-hidden"
                variants={imageReveal}
              >
                <img
                  src={stat.imageSrc}
                  alt={stat.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.gradient}`}
                ></div>
              </motion.div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-gray-700 dark:text-gray-200 text-sm sm:text-base md:text-lg font-medium mb-3 font-AnonymousPro leading-relaxed">
                  {stat.title}
                </h3>
                <motion.div
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3 sm:mb-4 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent font-Caveat whitespace-nowrap`}
                  variants={numberCounter}
                >
                  {stat.value}
                </motion.div>
                <div
                  className={`w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r ${stat.gradient} opacity-50 rounded-full mt-1 sm:mt-2`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Closing Section with Interactive Element */}
      <motion.div
        className="text-center mt-10 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Join us and make a difference
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 text-sm sm:text-base md:text-lg">
          These numbers represent more than statistics - they represent lives
          changed through education and technology. Sugar Labs continues to grow
          and impact communities worldwide.
        </p>

        {/* Interactive Stats Summary - Grid Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto px-2"
        >
          {statisticsData.map((stat, index) => {
            const isActive = activeCardIndex === index;
            // Only use hover on non-touch devices
            const isHovered = !isTouchDevice && hoveredCardIndex === index;
            const showFullText = isActive || isHovered;

            return (
              <motion.div
                key={index}
                className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg ${stat.bgColor} border ${stat.borderColor} flex flex-col items-center justify-center relative cursor-pointer overflow-hidden`}
                whileHover={
                  !isTouchDevice
                    ? {
                        scale: 1.05,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }
                    : undefined
                }
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // On mobile, toggle active state; on desktop, set active and clear hover
                  if (isActive) {
                    setActiveCardIndex(null);
                    setHoveredCardIndex(null);
                  } else {
                    setActiveCardIndex(index);
                    setHoveredCardIndex(null);
                  }
                }}
                onHoverStart={() => {
                  if (!isTouchDevice) {
                    setHoveredCardIndex(index);
                  }
                }}
                onHoverEnd={() => {
                  if (!isTouchDevice) {
                    setHoveredCardIndex(null);
                  }
                }}
                onTouchStart={(e) => {
                  // Prevent hover from triggering on touch devices
                  e.stopPropagation();
                }}
                layout
              >
                <span
                  className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} text-base sm:text-xl md:text-2xl`}
                >
                  {stat.value}
                </span>
                {/* Text container with smooth animations */}
                <motion.div
                  className="w-full flex flex-col items-center min-h-[1.5rem]"
                  layout
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <AnimatePresence mode="wait">
                    {!showFullText ? (
                      <motion.span
                        key="truncated"
                        className="text-gray-700 dark:text-gray-300 text-2xs sm:text-xs md:text-sm text-center mt-0.5 sm:mt-1 line-clamp-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {stat.title.split('.')[0].substring(0, 12)}
                        {stat.title.split('.')[0].length > 12 ? '...' : ''}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="full"
                        className="text-gray-700 dark:text-gray-300 text-2xs sm:text-xs md:text-sm text-center mt-0.5 sm:mt-1 whitespace-normal px-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {stat.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
