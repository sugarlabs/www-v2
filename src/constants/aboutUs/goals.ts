import { MotionProps, Variants } from 'framer-motion';

export interface Goal {
  title: string;
  description: string;
}

interface ProgressItem extends Variants {
  label: string;
  percent: number;
  color: string;
  [key: string]: string | number;
}
export interface SectionContentType {
  title: {
    main: string;
    highlight: string;
  };
  introduction: string;
  progressTitle: string;
  resetViewButtonText: string;
  insightsTitle: string;
}

export interface AnimationsType {
  goalItem: {
    initial: MotionProps['initial'];
    whileInView: MotionProps['whileInView'];
    whileHover: MotionProps['whileHover'];
  };
  progressBar: {
    initial: MotionProps['initial'];
    duration: number;
  };
  flowContainer: {
    initial: MotionProps['initial'];
    whileInView: MotionProps['whileInView'];
    transition: MotionProps['transition'];
  };
  customNode: {
    initial: MotionProps['initial'];
    animate: MotionProps['animate'];
    whileHover: MotionProps['whileHover'];
    whileTap: MotionProps['whileTap'];
  };
}

// Define the goals for the organization
export const goals: Goal[] = [
  {
    title: 'Global Education Impact',
    description:
      'Reach 1 million students worldwide with our educational tools by 2026',
  },
  {
    title: 'Open Source Advocacy',
    description:
      'Foster a new generation of open source contributors through mentorship programs',
  },
  {
    title: 'Educational Innovation',
    description:
      'Develop cutting-edge learning platforms that adapt to diverse learning styles',
  },
  {
    title: 'Community Building',
    description:
      'Create sustainable global communities of practice around educational technology',
  },
  {
    title: 'Digital Equity',
    description:
      'Ensure technology access for underrepresented and underserved communities worldwide',
  },
];

// Define progress metrics for each area
export const progressItems: ProgressItem[] = [
  {
    percent: 75,
    label: 'Education Impact',
    color: 'from-orange-400 to-orange-600',
  },
  {
    percent: 60,
    label: 'Community Growth',
    color: 'from-orange-300 to-orange-500',
  },
  {
    percent: 85,
    label: 'Innovation',
    color: 'from-orange-500 to-orange-700',
  },
  {
    percent: 45,
    label: 'Global Reach',
    color: 'from-orange-600 to-orange-800',
  },
  {
    percent: 70,
    label: 'Open Source Adoption',
    color: 'from-orange-200 to-orange-400',
  },
];

// Section text content
export const sectionContent: SectionContentType = {
  title: {
    main: 'Our ',
    highlight: 'Goals',
  },
  introduction:
    'At Sugar Labs, we strive to create a vibrant ecosystem where technology empowers education. Our strategic goals focus on expanding our impact while maintaining our core values.',
  progressTitle: 'Our Progress',
  resetViewButtonText: 'Reset View',
  insightsTitle: 'Progress Insights',
};

// Animation settings
export const animations: AnimationsType = {
  goalItem: {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    whileHover: { x: 10, backgroundColor: '#fef2f2' },
  },
  progressBar: {
    initial: { width: 0 },
    duration: 1,
  },
  flowContainer: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  customNode: {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
    whileHover: {
      scale: 1.05,
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderColor: '#ef4444',
    },
    whileTap: { scale: 0.95 },
  },
};
