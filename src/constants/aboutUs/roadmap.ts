export interface RoadmapItem {
  title: string;
  description?: string;
  borderColor?: string;
  backgroundColor?: string;
  stepColor?: string;
}

export const roadmapItems: RoadmapItem[] = [
  {
    title: 'Mission, Vision, Values',
    description: 'Establishing our foundational principles',
    borderColor: 'border-red-500',
    stepColor: 'bg-red-500',
  },
  {
    title: 'Distribution',
    description: 'Ensuring our software reaches users worldwide',
    borderColor: 'border-red-400',
    stepColor: 'bg-purple-500',
  },
  {
    title: 'Deployments',
    description: 'Implementing solutions in educational settings',
    borderColor: 'border-red-300',
    stepColor: 'bg-blue-500',
  },
  {
    title: 'Quality Assurance',
    description: 'Maintaining high standards through testing',
    borderColor: 'border-blue-400',
    stepColor: 'bg-red-500',
  },
  {
    title: 'Infrastructures',
    description: 'Building robust systems for growth',
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
