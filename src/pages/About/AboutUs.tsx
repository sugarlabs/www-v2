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
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="relative z-20">
        <Header />
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full relative z-10"
      >
        <HeroSection />

        <div className="w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <NavigationLinks />
            <TextMaskSection />
          </div>
        </div>

        <MissionSection />

        <div className="w-full">
          <PrinciplesSection />
        </div>

        <GoalsSection />

        <div className="w-full">
          <ProjectsSection />
        </div>

        <RoadmapSection />
      </motion.main>

      <Footer />
    </div>
  );
};

export default AboutUs;
