import { SectionId } from '@/constants/aboutUs';
import MissionSection from '@/components/AboutUs/MissionSection';
import PrinciplesSection from '@/components/AboutUs/PrinciplesSection';
import GoalsSection from '@/components/AboutUs/GoalsSection';
import ProjectsSection from '@/components/AboutUs/ProjectSection';
import RoadmapSection from '@/components/AboutUs/RoadmapSection';

const SECTION_CONTENTS: Record<SectionId, () => React.JSX.Element> = {
  mission: () => <MissionSection />,
  principles: () => <PrinciplesSection />,
  goals: () => <GoalsSection />,
  projects: () => <ProjectsSection />,
  roadmap: () => <RoadmapSection />,
};

export default SECTION_CONTENTS;
