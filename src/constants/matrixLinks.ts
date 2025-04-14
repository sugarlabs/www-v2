export interface MatrixLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
}

export const matrixLinks: MatrixLink[] = [
  {
    id: 'webdev',
    title: 'Web Development',
    description:
      'Join our web development community room to discuss HTML, CSS, JavaScript, and modern frameworks.',
    url: 'https://matrix.to/#/#webdev:matrix.org',
    icon: 'code',
  },
  {
    id: 'development',
    title: 'Development',
    description:
      'General software development discussions, problem-solving, and coding challenges.',
    url: 'https://matrix.to/#/#development:matrix.org',
    icon: 'terminal',
  },
  {
    id: 'organization',
    title: 'Organization',
    description:
      "Discussion about our organization's projects, events, and planning.",
    url: 'https://matrix.to/#/#organization:matrix.org',
    icon: 'building',
  },
];
