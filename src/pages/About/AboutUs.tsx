import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import NavigationLinks from '@/components/shared/NavigationLinks';
import HeroSection from '@/components/AboutUs/HeroSection';
import TextMaskSection from '@/components/AboutUs/TextMaskSection';
import MissionSection from '@/components/AboutUs/MissionSection';
import PrinciplesSection from '@/components/AboutUs/PrinciplesSection';
import GoalsSection from '@/components/AboutUs/GoalsSection';
import ProjectsSection from '@/components/AboutUs/ProjectSection';
import RoadmapSection from '@/components/AboutUs/RoadmapSection';

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-orange-50">
      <Header />
      <div className="min-h-screen font-sans">
        <motion.div
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="container mx-auto px-4 py-16 max-w-6xl"
        >
          <HeroSection />
          <NavigationLinks />
          <TextMaskSection />

          <div className="space-y-32 my-24">
            <MissionSection />
            <PrinciplesSection />
            <GoalsSection />
            <ProjectsSection />
            <RoadmapSection />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
