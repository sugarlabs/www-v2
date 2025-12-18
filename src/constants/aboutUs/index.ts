type SECTION = {
  id: string
  title: string
  description?: string
}
export const SECTIONS: SECTION[] = [
  {
    id: 'mission',
    title: 'Our Mission'
  },
  {
    id: 'principles',
    title: 'Our Principles'
  },
  {
    id: 'goals',
    title: 'Our Goals',
    description: 'At Sugar Labs, we strive to create a vibrant ecosystem where technology empowers education. Our strategic goals focus on expanding our impact while maintaining our core values.'
  },
  {
    id: 'projects',
    title: 'Our Projects',
    description: 'Sugar Labs develops and maintains several key projects that support our educational mission. These projects range from complete kid-friendly desktop environments to specific applications, each designed to enhance learning through technology.'
  },
  {
    id: 'roadmap',
    title: 'Our Roadmap',
    description: 'Our strategic roadmap outlines our key milestones and future directions as we continue to grow and innovate.'
  },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];