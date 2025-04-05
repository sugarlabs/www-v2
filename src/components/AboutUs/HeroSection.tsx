import { motion } from 'framer-motion';
import { heroAnimations } from '@/styles/Animations';
import {
  fadeIn,
  slideInLeft,
  slideInBottom,
  bounce,
  staggerContainer,
  subtleRise,
  dividerVariants,
} from '@/styles/Animations';

const HeroSection = () => {
  const title = 'ABOUT US'.split('');

  return (
    <motion.div
      className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20 overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced background elements with gradient overlays - repositioned for mobile */}
      <motion.div
        className="absolute top-5 left-5 sm:top-10 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 blur-xl sm:blur-2xl opacity-60 dark:opacity-40"
        variants={fadeIn}
        custom={0.2}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-emerald-300 to-teal-400 blur-xl sm:blur-2xl opacity-50 dark:opacity-30"
        variants={fadeIn}
        custom={0.4}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 blur-xl sm:blur-2xl opacity-40 dark:opacity-20"
        variants={fadeIn}
        custom={0.6}
        initial="hidden"
        animate="visible"
      />

      {/* Main content container with subtle rise effect */}
      <motion.div
        className="relative z-10 max-w-full"
        variants={subtleRise}
        initial="hidden"
        animate="visible"
      >
        {/* Main title with animated letters - improved sizing for mobile */}
        <motion.h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-9 tracking-tight relative inline-block font-Caveat">
          <div className="flex justify-center items-center relative">
            {title.map((letter, index) => (
              <motion.span
                key={index}
                variants={heroAnimations.letterAnimation}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  index >= title.length - 2
                    ? 'text-blue-800 dark:text-blue-600'
                    : 'text-slate-800 dark:text-slate-200'
                }
                whileHover={{
                  scale: 1.2,
                  rotate: Math.random() * 10 - 5,
                  transition: { duration: 0.2 },
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}

            {/* Enhanced animated underline with gradient - adjusted for mobile */}
            <motion.div
              className="absolute -z-10 h-3 sm:h-6 bottom-1 sm:bottom-2 left-0 transform -skew-x-6 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-300 opacity-70 dark:opacity-80"
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </div>
        </motion.h1>

        {/* Decorative divider - adjusted for consistent spacing */}
        <motion.div
          className="w-16 sm:w-24 h-1 sm:h-1.5 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-blue-500 to-slate-500"
          variants={dividerVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Enhanced subtitle with improved animation and mobile sizing */}
        <motion.h2
          className="text-xl sm:text-3xl md:text-4xl mb-8 sm:mb-12 max-w-xs sm:max-w-lg md:max-w-3xl mx-auto leading-relaxed font-Caveat relative text-slate-700 dark:text-slate-200"
          variants={slideInBottom}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.span
            className="relative inline-block"
            variants={heroAnimations.hoverText}
            whileHover="hover"
          >
            A
            <span className="text-rose-500 dark:text-rose-400 font-semibold">
              {' '}
              Community
            </span>
          </motion.span>{' '}
          of{' '}
          <motion.span
            className="relative inline-block"
            variants={heroAnimations.hoverText}
            whileHover="hover"
          >
            <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
              Open Source
            </span>
          </motion.span>{' '}
          <motion.span
            variants={bounce}
            animate="visible"
            className="inline-block"
          >
            Enthusiasts
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* Enhanced interactive mouse-follow effect - adjusted size for mobile */}
      <motion.div
        className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-full blur-2xl sm:blur-3xl opacity-30 dark:opacity-20"
        variants={heroAnimations.mouseFollow}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        style={{
          mixBlendMode: 'multiply',
        }}
      />
    </motion.div>
  );
};

export default HeroSection;
