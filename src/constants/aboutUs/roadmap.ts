export interface RoadmapItem {
  title: string;
  description?: string;
  borderColor?: string;
  backgroundColor?: string;
  stepColor?: string;
}

export const roadmapItems: RoadmapItem[] = [
  {
    title: 'Mission, vision, values',
    description:
      'Establishing our foundational principles, creating founding documents and holding elections to our Board of Directors.',
    borderColor: 'border-red-500',
    stepColor: 'bg-red-500',
  },
  {
    title: 'Community building',
    description:
      'Work to establish a community of teachers and learners, maintaining ways that we can community and work together to solve problems.',
    borderColor: 'border-red-400',
    stepColor: 'bg-purple-500',
  },
  {
    title: 'Development of learning tools',
    description: 'Design, develop, and deploy software tools for learning.',
    borderColor: 'border-red-300',
    stepColor: 'bg-blue-500',
  },
  {
    title: 'Study impact',
    description:
      'Showcase student work, publish teacher and developer stories, and poll users to better understand our impact. Make adjustments based on results.',
    borderColor: 'border-blue-400',
    stepColor: 'bg-red-500',
  },
  {
    title: 'Strategic growth',
    description:
      'Work with partners to broaden our reach and deepen our impact.',
    borderColor: 'border-blue-500',
    stepColor: 'bg-purple-500',
  },
];

export const roadmapContent = {
  sectionId: 'roadmap',
  title: {
    prefix: 'Our',
    highlight: 'Roadmap',
  },
  description:
    'Our strategic roadmap outlines our key milestones and future directions as we continue to grow and innovate.',
};
