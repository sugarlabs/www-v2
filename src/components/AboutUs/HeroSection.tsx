import { motion } from 'framer-motion';
import { heroAnimations } from '@/styles/Animations';

const HeroSection = () => {
  const title = 'ABOUT US'.split('');

  return (
    <motion.div
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      variants={heroAnimations.container}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-red-100 blur-xl"
        variants={heroAnimations.decoration}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-orange-100 blur-xl"
        variants={heroAnimations.decoration}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      />

      {/* Main title with animated letters */}
      <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight relative inline-block font-Caveat">
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
                ease: 'easeOut',
              }}
              className={index >= title.length - 2 ? 'text-red-500' : ''}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}

          {/* Animated underline */}
          <motion.div
            className="absolute -z-10 h-5 bottom-2 left-0 transform -skew-x-6"
            variants={heroAnimations.underline}
            initial="hidden"
            animate="visible"
          />
        </div>
      </motion.h1>

      {/* Subtitle with animated reveal */}
      <motion.h2
        className="text-3xl md:text-4xl mb-12 max-w-3xl mx-auto leading-relaxed font-Caveat relative"
        variants={heroAnimations.subtitle}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          className="relative inline-block"
          variants={heroAnimations.hoverText}
          whileHover="hover"
        >
          A<span className="text-red-500"> Community</span>
        </motion.span>{' '}
        of{' '}
        <motion.span
          className="relative inline-block"
          variants={heroAnimations.hoverText}
          whileHover="hover"
        >
          <span className="text-red-500">Open Source</span>
        </motion.span>{' '}
        Enthusiasts
      </motion.h2>

      {/* Animated decorative circles */}
      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-red-500/10"
            style={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            variants={heroAnimations.floatingCircle}
            animate="visible"
            custom={i}
          />
        ))}
      </div>

      {/* Interactive mouse-follow effect */}
      <motion.div
        className="absolute w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20"
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
