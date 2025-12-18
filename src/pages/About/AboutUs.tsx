import { motion } from 'framer-motion';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import HeroSection from '@/components/AboutUs/HeroSection';
import TextMaskSection from '@/components/AboutUs/TextMaskSection';
import { SECTIONS } from '@/constants/aboutUs';
import SECTION_CONTENTS from '@/components/AboutUs';
import Section from '@/components/AboutUs/Section';

const AboutUs = () => {
  return (
    <>
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full relative"
      >
        <HeroSection />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TextMaskSection />

          {SECTIONS.map((section) => {
            const SectionContent = SECTION_CONTENTS[section.id];

            return (
              <Section
                id={section.id}
                title={section.title}
                description={section.description}
              >
                <SectionContent />
              </Section>
            );
          })}
        </div>
      </motion.main>
      <Footer />
    </>
  );
};

export default AboutUs;
