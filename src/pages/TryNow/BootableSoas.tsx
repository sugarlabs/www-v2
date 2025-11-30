import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import { motion } from 'framer-motion';
import { zoomFadeInAnimation } from '@/styles/Animations';
import {
  bootableSoasData,
  logocardsdata,
  mockupImage,
  SugarSteps,
} from '@/constants/TryNowData/bootableSoasData';
import StepsToUse, { useScroll } from '@/components/TryNow/StepsToUse';
import LogoCard from '@/components/TryNow/LogoCard';
import { useState } from 'react';

const BootableSoasPage = () => {
  const [selectedSteps, setSelectedSteps] = useState(SugarSteps[0]);
  const { stepsRef, scrollToSteps } = useScroll();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <FeatureSection data={bootableSoasData} />

        <motion.img
          src={mockupImage.path}
          alt="BootableSoasMockup"
          variants={zoomFadeInAnimation}
          initial="initial"
          animate="animate"
          className="w-[80%] mx-auto"
        />

        <h2 className="text-3xl sm:text-4xl font-semibold border-b-2 border-gray-300 pb-2 font-[Caveat] text-center mx-auto w-fit mt-10">
          Try it now!
        </h2>

        <section className="w-[90%] mx-auto py-6 grid grid-cols-2 gap-6">
          {logocardsdata.map((card, idx) => {
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
                  const found = SugarSteps.find(
                    (g) =>
                      g.heading.toLowerCase().includes(key) || g.is === key,
                  );
                  if (found) {
                    setSelectedSteps(found);
                    requestAnimationFrame(() => scrollToSteps());
                  }
                }}
              />
            );
          })}
        </section>
        {/* SugarSteps is an array; pass the first group object to StepsToUse */}
        <div ref={stepsRef}>
          <StepsToUse {...selectedSteps} />
        </div>
        <motion.div>
          <p className="justify-self-center mt-4 text-2xl text-gray-700">
            Cut to the chase and get your pre-installed Sugar on a Stick{' '}
            <a
              className="text-blue-700 hover:underline font-semibold"
              href={'/Products'}
            >
              now!
            </a>
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default BootableSoasPage;
