export interface Project {
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  progress?: number;
  link?: string;
  exlink?: string;
}

export const projects: Project[] = [
  {
    title: 'Sugar on a Stick',
    description: 'A live USB version of the Sugar platform',
    tags: ['Distribution', 'Portable'],
    imageUrl: 'assets/Images/SOAS.jpeg',
    link: '/bootablesoas',
  },
  {
    title: 'Google Summer of Code',
    description:
      'GSOC is a global program focused on bringing more student developers into open source software development',
    tags: ['Community', 'Development'],
    imageUrl: 'assets/Images/GSOC.png',
    exlink:
      'https://summerofcode.withgoogle.com/programs/2025/organizations/sugar-labs',
  },
  {
    title: 'Music Blocks',
    description: 'A programming environment for exploring musical concepts',
    tags: ['Education', 'Creative'],
    progress: 75,
    imageUrl: 'assets/TryNowImages/musicBlocks1.png',
    link: '/musicblocks',
  },
  {
    title: 'Sugarizer',
    description: 'Web implementation of the Sugar platform for modern browsers',
    tags: ['Web', 'Mobile'],
    progress: 80,
    imageUrl: 'assets/TryNowImages/sugarizer.png',
    link: '/sugarizer',
  },
];

export const projectIcons = [
  { color: 'bg-orange-100', icon: '🖥️', title: 'Sugar' },
  { color: 'bg-orange-200', icon: '🎵', title: 'Music Blocks' },
  { color: 'bg-orange-300', icon: '🌐', title: 'Sugarizer' },
  { color: 'bg-orange-100', icon: '🎮', title: 'Activities' },
];

export const projectsContent = {
  sectionId: 'projects',
  title: {
    prefix: 'Our',
    highlight: 'Projects',
  },
  description:
    'Sugar Labs develops and maintains several key projects that support our educational mission. These projects range from complete distributions to specific applications, each designed to enhance learning through technology.',
  ctaText: 'Learn more',
  displayProjectCount: 2,
};
