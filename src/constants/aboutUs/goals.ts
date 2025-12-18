import { MotionProps } from 'framer-motion';

export interface Goal {
  title: string;
  description: string;
  category?: string;
}

export interface AnimationsType {
  goalItem: {
    initial: MotionProps['initial'];
    whileInView: MotionProps['whileInView'];
    whileHover: MotionProps['whileHover'];
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

export const goals: Goal[] = [
  {
    title: 'Power users, involved in feedback',
    description:
      'Reach one hundred "power" users, regularly providing their feedback to the development community, by the end of 2025',
    category: 'Community',
  },
  {
    title: 'Leadership in education',
    description:
      'Take fifteen actions (e.g. conferences, articles, events-led) in 2025 that help us establish ourselves as leaders in education technology.',
    category: 'Education',
  },
  {
    title: 'New Sugar Stories',
    description: 'Publish five new Sugar Stories from the community in 2025.',
    category: 'Content',
  },
  {
    title: 'Establish 150k in annual revenue',
    description:
      'In order to magnify our impact, we aim to establish 150k in annual revenue by the end of 2025. These funds will help us establish our operations, starting by hiring one full-time staff and three part time workers to serve our stakeholders.',
    category: 'Sustainability',
  },
  {
    title: '200 volunteers',
    description:
      'In order to best serve our community, our goal is to have twenty active mentors, and 180 active volunteers.',
    category: 'Community',
  },
  {
    title: '1,000 people on Matrix',
    description:
      'Our main mode of communication is on Matrix chat. Our goal in 2025 is to have 1,000 users on our chat, discussing ideas, designs, and development for our community-led suite of learning tools.',
    category: 'Communication',
  },
];

// Animation settings
export const animations: AnimationsType = {
  goalItem: {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    whileHover: { x: 10, backgroundColor: '#fef2f2' },
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
