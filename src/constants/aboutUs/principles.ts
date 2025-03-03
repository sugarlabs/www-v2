export interface Principle {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const principles: Principle[] = [
  {
    id: 1,
    title: 'Open Learning',
    description:
      'We believe in making education accessible to everyone through open-source software and collaborative learning environments.',
    image: '/assets/Images/teach.jpg',
  },
  {
    id: 2,
    title: 'Community Driven',
    description:
      'Our success relies on active participation from a diverse community of contributors who share common educational goals.',
    image: '/assets/Images/teach1.jpg',
  },
  {
    id: 3,
    title: 'Innovation',
    description:
      'We encourage creative problem-solving and innovative approaches to educational technology development.',
    image: '/assets/Images/teach2.jpeg',
  },
  {
    id: 4,
    title: 'Collaboration',
    description:
      'Working together while maintaining independence allows each participant to contribute their unique perspective.',
    image: '/assets/Images/teach.jpg',
  },
  {
    id: 5,
    title: 'Sustainability',
    description:
      'Building lasting solutions that can be maintained and improved by the community over time.',
    image: '/assets/Images/teach1.jpg',
  },
];

export const principlesContent = {
  sectionId: 'principles',
  title: {
    prefix: 'Our',
    highlight: 'Principles',
  },
  description:
    "In order for Sugar Labs to be successful, it needs the participation of a large number of people who share common goals while maintaining independence, so that each participant has the ability to act independently. For these reasons, Sugar Labs subscribes to the principles described here, which are the author's own translation of an original text in Spanish.",
  featuredImage: '/assets/Images/teach1.jpg',
};
