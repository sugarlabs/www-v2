import teachImage from '/assets/Images/teach.jpg';
import teach1Image from '/assets/Images/teach1.jpg';
import discussImage from '/assets/Images/discuss.jpeg';
import teach2Image from '/assets/Images/teach2.jpeg';
import learnImage from '/assets/Images/learn.jpg';

export interface ImageConfig {
  src: string;
  alt: string;
  caption?: string;
}

interface HeroContent {
  title: string;
  description: string;
}

export const heroContent: HeroContent = {
  title: 'SUGAR LABS',
  description: `Whether you're a young learner, teacher, or a budding developer,
  we believe Sugar Labs has something for you. Read on to learn more
  about our award-winning Sugar Learning Platform and how to join our
  diverse community of teachers and learners.`,
};

export const images: Record<string, ImageConfig> = {
  main: {
    src: teachImage,
    alt: 'Sugar Labs Learning Environment',
  },
  bottom1: {
    src: teach2Image,
    alt: 'Sugar Labs Collaboration',
    caption: 'Collaborative Learning Environment',
  },
  bottom2: {
    src: teach1Image,
    alt: 'Sugar Labs Teaching',
    caption: 'Interactive Teaching Tools',
  },
  bottom3: {
    src: discussImage,
    alt: 'Sugar Labs Learning',
    caption: 'Global Learning Community',
  },
};

export const mission = {
  learnImage,
};
