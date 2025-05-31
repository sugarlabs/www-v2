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
  {
    question: 'How does Sugar Labs sustain its operations?',
    answer:
      'Sugar Labs is supported by donations, community contributions, and mentorship programs like Google Summer of Code. It relies heavily on its global volunteer network.',
    category: 'general',
  },
  {
    question: 'What age group is Sugar Labs software primarily designed for?',
    answer:
      'Sugar Labs focuses primarily on children in the K–6 age range, aiming to provide them with interactive tools for experiential learning.',
    category: 'general',
  },

  {
    question: 'Can I contribute to Sugar Labs if I am not a programmer?',
    answer:
      'Absolutely! Non-programmers can contribute through translations, documentation, user testing, outreach, or by creating educational content.',
    category: 'development',
  },
  {
    question: 'How can I find beginner-friendly issues to contribute to?',
    answer:
      'Sugar Labs uses GitHub for tracking issues. You can filter for labels like "good first issue" or "beginner" to find suitable tasks.',
    category: 'development',
  },

  {
    question: 'How do Sugar Activities support different subjects?',
    answer:
      'Sugar Activities cover a wide range of subjects like math, science, reading, music, and programming—each encouraging learning through exploration and play.',
    category: 'activities',
  },
  {
    question:
      'Can Sugar Activities be used without the full Sugar environment?',
    answer:
      'Many Sugar Activities can run independently on GNU/Linux or through web-based alternatives such as Sugarizer, which provides a full Sugar experience https://www.sugarlabs.org/sugarizer/',
    category: 'activities',
  },

  {
    question: 'What is Sugar on a Stick?',
    answer:
      'Sugar on a Stick (SoaS) is a version of Sugar that can run from a bootable USB drive. It allows users to try Sugar without installing anything on their computer. Learn more at https://www.sugarlabs.org/sugarizer/',
    category: 'installation',
  },
  {
    question: 'Can I run Sugar on Windows or macOS?',
    answer:
      'While the original Sugar is Linux-based and typically run via virtualization tools like VirtualBox, you can use Sugarizer, a web-based version of Sugar, on Windows, macOS, and other platforms. Learn more at https://www.sugarlabs.org/sugarizer/',
    category: 'installation',
  },
  {
    question: 'Where can I download the Sugar Learning Platform?',
    answer:
      'You can download Sugar preloaded on Fedora SoaS - https://fedoraproject.org/spins/soas/download or Trisquel - https://trisquel.info/en/download',
    category: 'installation',
  },
];

export default faqs;
