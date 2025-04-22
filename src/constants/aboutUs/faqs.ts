export const FAQ_CATEGORIES = [
  'all',
  'general',
  'development',
  'activities',
  'installation',
] as const;
export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export interface FAQ {
  question: string;
  answer: string;
  category: Exclude<FaqCategory, 'all'>;
}

const faqs: FAQ[] = [
  {
    question: 'What is Sugar Labs?',
    answer:
      'Sugar Labs, a 501(c)(3) non-profit foundation, serves as a support base and gathering place for the community of educators and software developers who want to extend the Sugar platform and who have been creating Sugar-compatible applications.',
    category: 'general',
  },
  {
    question: 'What is the mission of Sugar Labs?',
    answer:
      'The overarching mission of Sugar Labs is to support the Sugar platform through software development, and community outreach and support. The purpose of the Sugar platform is provide a software and content environment that enhances learning.',
    category: 'general',
  },
  {
    question: 'What are the principles that guide Sugar Labs?',
    answer:
      'Sugar Labs subscribes to principle that learning thrives within a culture of freedom of expression, hence it has a natural affinity with the free software movement.',
    category: 'general',
  },
  {
    question:
      'What makes Sugar different from other educational software platforms?',
    answer:
      'The Sugar interface, in its departure from the desktop metaphor for computing, is the first serious attempt to create a user interface that is based on both cognitive and social constructivism.',
    category: 'development',
  },
  {
    question: 'Who can use Sugar and how do they benefit?',
    answer:
      'Sugar is a free software project, freely available to anyone who wants to use it or improve upon it. The Sugar platform was designed for young children (K–6), but it is finding applicability in a number of different venues.',
    category: 'general',
  },
  {
    question: 'Are there any platforms where Sugar runs on?',
    answer:
      'The Sugar Learning Platform is a leading learning platform that began in the famous One Laptop Per Child project. It is used every day by nearly 3 million children around the world.',
    category: 'installation',
  },
  {
    question: 'What are some popular Sugar Activities for beginners?',
    answer:
      'Some popular Sugar Activities for beginners include TurtleBlocks (for learning programming through graphics), Write (for writing and journaling), Calculate (for mathematics), Read (for e-books), and Speak (a text-to-speech activity). These activities are designed to be both engaging and educational, helping children learn through exploration and play.',
    category: 'activities',
  },
];

export default faqs;
