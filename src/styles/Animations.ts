import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInBottom: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const bounce: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const floatingCircle: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 0.8,
    scale: 1,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

export const simpleFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const subtleRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export const simpleGridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const numberCounter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const statCard: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
    },
  },
};

export const statGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const headerReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};

export const testimonialCard: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -8,
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15,
    },
  },
};

export const testimonialHeading: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export const decorativeElement: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
  float: {
    y: [0, -7, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

export const testimonialText: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};

export const avatarReveal: Variants = {
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15,
    },
  },
};

export const marqueeContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: { duration: 0.3 },
  },
};

export const goalSectionAnimations = {
  goalItem: slideInLeft,
  progressBar: {
    hidden: { width: 0 },
    visible: (percent: number) => ({
      width: `${percent}%`,
      transition: { duration: 1, ease: 'easeOut' },
    }),
  },
  flowContainer: subtleRise,
  statCard: statCard,
  insightsBox: subtleRise,
  overallProgressBar: {
    hidden: { width: 0 },
    visible: (percent: number) => ({
      width: `${percent}%`,
      transition: { duration: 1.5, ease: 'easeOut' },
    }),
  },
};

// Hero Section animations
export const heroAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  },
  letterAnimation: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  decoration: {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'backOut' },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.5, duration: 0.8 },
    },
  },
  underline: {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: '100%',
      opacity: 1,
      transition: { delay: 1.2, duration: 0.8 },
    },
  },
  floatingCircle: {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: [0, 1.5, 1],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 3,
        delay: i * 0.5,
        repeat: Infinity,
        repeatType: 'loop',
      },
    }),
  },
  hoverText: {
    initial: {},
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 },
    },
  },
  mouseFollow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.2,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.3 },
    },
  },
};

export const missionSectionAnimations = {
  // Container animations for staggered children
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },

  // Individual item animations
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },

  // Main image animations
  mainImageVariants: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
    hover: {
      scale: 1.03,
      transition: { duration: 0.4 },
    },
  },

  // Underline animation for title
  titleUnderlineVariants: {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: { delay: 0.5, duration: 0.4 },
    },
  },

  // Image hover animations
  imageHoverVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      transition: {
        duration: 0.4,
      },
    },
  },

  // Image scale animation
  imageScaleVariants: {
    initial: { scale: 1 },
    hover: {
      scale: 1.15,
      transition: { duration: 0.4 },
    },
  },
};

// Principles Section animations
export const principlesSectionAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },

  card: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },

  title: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },

  description: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 },
    },
  },

  featureImage: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      translateY: -10,
      transition: { duration: 0.3 },
    },
  },

  overlay: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  },

  cardImage: {
    hidden: { opacity: 0.9 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  },
};

// Projects Section animations
export const projectsSectionAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },

  projectCard: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -8,
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3 },
    },
  },

  learnMoreButton: {
    hidden: { opacity: 0.9 },
    hover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  },

  title: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 },
    },
  },

  imageContainer: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  },
};

export const roadmapSectionAnimations = {
  // Line connecting roadmap items
  connectingLine: {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: { duration: 1.2, ease: 'easeInOut' },
    },
  },

  // Individual roadmap items/cards
  roadmapCard: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.3,
      },
    }),
  },

  // Section title
  title: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },

  // Description paragraph
  description: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.8, duration: 0.5 },
    },
  },

  // Number indicator
  stepNumber: {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
        delay: i * 0.3 + 0.3,
      },
    }),
  },

  // Card hover effect
  cardHover: {
    scale: 1.03,
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { duration: 0.3 },
  },
};
