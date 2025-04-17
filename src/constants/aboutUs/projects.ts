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
    title: 'Sugar on a Stick (SoaS)',
    description:
      'A USB version of the Sugar platform, an environment made for kids to learn and explore. It can be used to temporarily boot into SoaS or to install onto your computer.',
    tags: ['Distribution', 'Portable'],
    imageUrl: 'assets/Images/SOAS.jpeg',
    link: '/bootablesoas',
  },
  {
    title: 'Google Summer of Code (GSoC)',
    description:
      'GSoC is a global program, hosted by Google, focused on bringing more student developers into free/libre/open (FLO) software development.',
    tags: ['Community', 'Development'],
    imageUrl: 'assets/Images/GSOC.png',
    exlink:
      'https://summerofcode.withgoogle.com/programs/2025/organizations/sugar-labs',
  },
  {
    title: 'Music Blocks',
    description:
      'A visual programming language for exploring musical concepts. Based on the tried-and-true Logo programming language, you can blend art, geometry, and music to make challenging and fun creations.',
    tags: ['Education', 'Creative'],
    progress: 75,
    imageUrl: 'assets/TryNowImages/musicBlocks1.png',
    link: '/musicblocks',
  },
  {
    title: 'Sugarizer',
    description:
      'Multi-platform implementation of the Sugar Learning Platform. Versions are available for the web, as well as for iOS, Android, Windows, and GNU/Linux.',
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
    'Sugar Labs develops and maintains several key projects that support our educational mission. These projects range from complete kid-friendly desktop environments to specific applications, each designed to enhance learning through technology.',
  ctaText: 'Learn more',
  displayProjectCount: 2,
};
