export interface Principle {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const principles: Principle[] = [
  {
    id: 1,
    title: 'Learning as a verb',
    description:
      'Knowledge is a noun, learning is a verb. Instead of curating prescribed information to be instructed, we create tools for learning. Our methodology is called *Constructionism*.',
    image: 'assets/Images/teach.jpg',
  },
  {
    id: 2,
    title: 'Free and open',
    description:
      'We believe that learners can learn not just *with* their tools but also *from* their tools. This is why we distribute all our software and curriculae as free/libre/open (FLO)',
    image: 'assets/Images/teach1.jpg',
  },
  {
    id: 3,
    title: 'Equitable',
    description:
      'By helping others learn and grow, we learn and grow as well. We also help make the world a better place for ourselves and others.',
    image: 'assets/Images/teach2.jpeg',
  },
  {
    id: 4,
    title: 'Community led',
    description:
      'We work with our friends, both locally and globally, to design and develop learning tools meaningful for their communities.',
    image: 'assets/Images/teach.jpg',
  },
  {
    id: 5,
    title: 'Accessible',
    description:
      'We aim to make our learning tools accessible to as many youth as we possibly can.',
    image: 'assets/Images/teach1.jpg',
  },
  {
    id: 6,
    title: 'Hard fun',
    description:
      'Our work is challenging, but it’s also fun. We work hard to be playful and inspiring.',
    image: 'assets/Images/teach1.jpg',
  },
];

export const principlesContent = {
  sectionId: 'principles',
  title: {
    prefix: 'Our',
    highlight: 'Principles',
  },
  description:
    "Sugar Labs is founded on a set of fundamental principles that guide our work. We believe, for example, that learning is a verb, and we therefore create tools to learn with. We also believe in the freedom to study how one's tools work, and we therefore license all our work under a FLO license. Read on to learn more about our commitment to these principles, as well as our commitment to equity, community, accessibility, and hard fun.",
  featuredImage: 'assets/Images/teach1.jpg',
};
