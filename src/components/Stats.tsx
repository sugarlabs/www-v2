import { useState } from 'react';
import { motion } from 'framer-motion';
import { statisticsData } from '@/constants/Stats.ts';
import {
  headerReveal,
  numberCounter,
  imageReveal,
  container,
  item,
} from '@/styles/Animations';

const Stats = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

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

      {/* Stats Grid */}
      <motion.div
        className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* 3 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full justify-items-center max-w-5xl">
          {statisticsData.map((stat, index) => (
            <motion.div
              key={index}
              className="w-full max-w-sm h-[400px] sm:h-[420px] md:h-[450px]"
              variants={item}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              >
                {/* Front Face - Image with Count */}
                <div
                  className={`absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg border ${stat.borderColor} ${stat.bgColor}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Image */}
                    <motion.div
                      className="flex-1 relative overflow-hidden"
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

                    {/* Count below image */}
                    <div className="p-4 sm:p-5 md:p-6 bg-white/95 dark:bg-gray-800/95">
                      <motion.div
                        className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent font-Caveat text-center`}
                        variants={numberCounter}
                      >
                        {stat.value}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Back Face - Text Description */}
                <div
                  className={`absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg border ${stat.borderColor} ${stat.bgColor}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="h-full flex flex-col justify-center items-center p-6 sm:p-8 md:p-10">
                    <h3 className="text-gray-700 dark:text-gray-200 text-base sm:text-lg md:text-xl font-medium text-center font-AnonymousPro leading-relaxed">
                      {stat.title}
                    </h3>

                    <div
                      className={`w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-gradient-to-r ${stat.gradient} opacity-50 rounded-full mt-4 sm:mt-6`}
                    ></div>
                  </div>
                </div>
              </motion.div>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto px-2">
          {statisticsData.map((stat, index) => {
            const isActive = activeCardIndex === index;
            const showFullText = isActive;

            return (
              <motion.div
                key={index}
                className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg ${stat.bgColor} border ${stat.borderColor} flex flex-col items-center justify-center relative group cursor-pointer`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={() => setActiveCardIndex(isActive ? null : index)}
              >
                <span
                  className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} text-base sm:text-xl md:text-2xl`}
                >
                  {stat.value}
                </span>
                {/* Truncated text - visible by default, hidden on hover (desktop) or when active (mobile) */}
                <span
                  className={`text-gray-700 dark:text-gray-300 text-2xs sm:text-xs md:text-sm text-center mt-0.5 sm:mt-1 line-clamp-1 ${showFullText ? 'hidden' : ''} lg:block lg:group-hover:hidden`}
                >
                  {stat.title.split('.')[0].substring(0, 12)}
                  {stat.title.split('.')[0].length > 12 ? '...' : ''}
                </span>
                {/* Full text - visible on hover (desktop) or when active (mobile) */}
                <span
                  className={`text-gray-700 dark:text-gray-300 text-2xs sm:text-xs md:text-sm text-center mt-0.5 sm:mt-1 whitespace-normal px-1 ${showFullText ? 'block' : 'hidden'} lg:hidden lg:group-hover:block`}
                >
                  {stat.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
