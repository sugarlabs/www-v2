import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import Paragraph from '@/components/TryNow/Paragraph';
import LogoCard from '@/components/TryNow/LogoCard';
import { useState } from 'react';
import {
  raspberrydata,
  raspberrySections,
  raspberryLogoCards,
  raspberrySteps,
} from '@/constants/TryNowData/raspberryPiData';
import StepsToUse from '@/components/TryNow/StepsToUse';
import { useScroll } from '@/components/TryNow/useScroll';

const RaspberryPiPage = () => {
  const [selectedSteps, setSelectedSteps] = useState(raspberrySteps[0]);
  const { stepsRef, scrollToSteps } = useScroll();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <FeatureSection data={raspberrydata} />

        {/* Render Paragraph components dynamically */}
        {raspberrySections.map((section, index) => (
          <Paragraph
            key={index}
            title={section.title}
            content={section.content}
            button={section.button}
            links={section.links}
          />
        ))}
        <section className="w-[90%] mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {raspberryLogoCards.map((card, idx) => {
            const key = card.title.replace(/^using\s+/i, '').toLowerCase();
            const isSelected =
              selectedSteps?.heading.toLowerCase().includes(key) || false;
            return (
              <LogoCard
                key={idx}
                logo={card.logo}
                title={card.title}
                selected={isSelected}
                onClick={() => {
                  const found = raspberrySteps.find(
                    (g) =>
                      g.heading.toLowerCase().includes(key) || g.is === key,
                  );
                  if (found) {
                    setSelectedSteps(found);
                    // scroll only when user clicks
                    // use rAF to ensure layout updated
                    requestAnimationFrame(() => scrollToSteps());
                  }
                }}
              />
            );
          })}
        </section>

        {/* Render the currently selected steps group */}
        <div ref={stepsRef}>
          <StepsToUse
            key={selectedSteps?.heading || 'steps'}
            {...selectedSteps}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RaspberryPiPage;
