import { Variants, Easing } from 'framer-motion';

// Define proper easing functions
const easeOut: Easing = [0.22, 1, 0.36, 1];
const easeInOut: Easing = [0.4, 0, 0.2, 1];
const backOut: Easing = [0.175, 0.885, 0.32, 1.275];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideInBottom: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const bounce: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring' as const,
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
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const subtleRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
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
      ease: easeOut,
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
      ease: easeOut,
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
      ease: easeOut,
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
      ease: easeOut,
    },
  },
  hover: {
    y: -8,
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      type: 'spring' as const,
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
      ease: easeOut,
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
      type: 'spring' as const,
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
      ease: easeInOut,
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
      type: 'spring' as const,
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
      ease: easeOut,
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
      transition: { duration: 1, ease: easeOut },
    }),
  },
  flowContainer: subtleRise,
  statCard: statCard,
  insightsBox: subtleRise,
  overallProgressBar: {
    hidden: { width: 0 },
    visible: (percent: number) => ({
      width: `${percent}%`,
      transition: { duration: 1.5, ease: easeOut },
    }),
  },
};

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
      transition: { duration: 0.6, ease: easeOut },
    },
  },
  decoration: {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: backOut },
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
  hoverText: {
    initial: {},
    hover: {
      scale: 1.05,
      transition: { type: 'spring' as const, stiffness: 300 },
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
        ease: easeOut,
      },
    },
  },

  // Main image animations
  mainImageVariants: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: easeOut },
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
        ease: easeOut,
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
      transition: { duration: 1.2, ease: easeInOut },
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
        type: 'spring' as const,
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

export const dividerVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '6rem',
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: easeOut,
    },
  },
};

export const faqPageAnimations = {
  // Page section animations
  pageSection: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  },

  // Text content animations
  headingText: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  },

  paragraphText: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut, delay: 0.2 },
    },
  },

  // Hero image animation
  heroImage: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  },

  // Quick answers grid container
  quickAnswersContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },

  // Quick answer card animation
  quickAnswerCard: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  },

  // Icon in quick answer cards
  quickAnswerIcon: {
    hidden: { rotate: -10, scale: 0.9 },
    visible: (index: number) => ({
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    }),
  },

  // FAQ container
  faqContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },

  // FAQ item animation
  faqItem: {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: easeOut,
      },
    }),
  },

  // FAQ question button hover
  faqQuestionButton: {
    initial: {},
    hover: {
      x: 5,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
      },
    },
  },

  // FAQ toggle icon animation
  faqToggleIcon: (isOpen: boolean): Variants => ({
    initial: { rotate: 0 },
    animate: {
      rotate: isOpen ? 180 : 0,
      transition: { duration: 0.3 },
    },
  }),

  // FAQ answer animation
  faqAnswer: (isOpen: boolean): Variants => ({
    initial: { height: 0, opacity: 0 },
    animate: {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      transition: { duration: 0.3 },
    },
  }),
};

export const teamSectionAnimations = {
  section: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  },

  heading: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut, delay: 0.2 },
    },
  },

  memberCard: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  },

  memberImage: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut, delay: 0.3 },
    },
  },
};

export const paragraphAnimations = {
  section: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  },

  text: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  },

  listItem: (index: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.1 },
    },
  }),

  button: {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  },
};

export const numberedCardAnimations = {
  card: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  },

  numberCircle: {
    hover: {
      rotate: 10,
      transition: { duration: 0.3 },
    },
  },

  image: {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  },
};

export const logoCardAnimations = {
  card: {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut, delay: index * 0.15 },
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  },

  logoContainer: {
    hover: {
      rotate: 10,
      transition: { duration: 0.3 },
    },
  },

  button: {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  },
};

export const featureSectionAnimations = {
  section: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  },

  textContainer: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  },

  imageContainer: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  },

  image: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  },

  button: {
    hover: {
      scale: 1.3,
      transition: { type: 'spring' as const, stiffness: 300 },
    },
  },

  note: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
  },
};

export const buttonAnimation: Variants = {
  whileHover: {
    scale: 1.05,
    transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
  },
  whileTap: {
    scale: 0.95,
    transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
  },
};

export const fadeInUpAnimation: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 1.5,
      ease: easeOut,
    },
  },
};

export const zoomFadeInAnimation: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1,
      duration: 1.5,
      ease: easeOut,
    },
  },
};

export const zoomInAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const fadeInDelayed = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, delay: 0.5 },
  },
};

export const cardFadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: index * 0.2 },
  }),
};

export const lineAnimation = {
  hidden: { height: 0 },
  visible: {
    height: '100%',
    transition: { duration: 1.5, ease: easeInOut },
  },
};

export const floatUpAndFade = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: easeOut,
      type: 'spring' as const,
      damping: 25,
      stiffness: 100,
    },
  },
};

export const floatUpAndFadeDelayed = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: easeOut,
      delay: 0.3,
      type: 'spring' as const,
      damping: 20,
      stiffness: 120,
    },
  },
};

export const iconFloat = {
  hidden: {
    opacity: 0,
    y: 30,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      delay: 0.6,
    },
  },
};
