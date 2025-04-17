import { MotionProps } from 'framer-motion';

export interface Goal {
  title: string;
  description: string;
}

interface ProgressItem {
  percent: number;
  label: string;
  color: string;
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
    title: 'Power users, involved in feedback',
    description:
      'Reach one hundred "power" users, regularly providing their feedback to the development community, by the end of 2025',
  },
  {
    title: 'Leadership in education',
    description:
      'Take fifteen actions (e.g. conferences, articles, events-led) in 2025 that help us establish ourselves as leaders in education technology.',
  },
  {
    title: 'New Sugar Stories',
    description: 'Publish five new Sugar Stories from the community in 2025.',
  },
  {
    title: 'Establish 150k in annual revenue',
    description:
      'In order to magnify our impact, we aim to establish 150k in annual revenue by the end of 2025. These funds will help us establish our operations, starting by hiring one full-time staff and three part time workers to serve our stakeholders.',
  },
  {
    title: '200 volunteers',
    description:
      'In order to best serve our community, our goal is to have twenty active mentors, and 180 active volunteers.',
  },
  {
    title: '1,000 people on Matrix',
    description:
      'Our main mode of communication is on Matrix chat. Our goal in 2025 is to have 1,000 users on our chat, discussing ideas, designs, and development for our community-led suite of learning tools.',
  },
];

// Define progress metrics for each area
export const progressItems: ProgressItem[] = [
  {
    percent: 20,
    label: '100 power users',
    color: 'from-orange-400 to-orange-600',
  },
  {
    percent: 33,
    label: 'Leadership in education',
    color: 'from-orange-300 to-orange-500',
  },
  {
    percent: 40,
    label: 'Five new Sugar Stories',
    color: 'from-orange-500 to-orange-700',
  },
  {
    percent: 2,
    label: 'Operating budget of 150k',
    color: 'from-orange-600 to-orange-800',
  },
  {
    percent: 33,
    label: '200 volunteers',
    color: 'from-orange-200 to-orange-400',
  },
  {
    percent: 100,
    label: '1,000 people on our Matrix chat',
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
