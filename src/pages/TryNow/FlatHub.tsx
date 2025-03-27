import { motion } from 'framer-motion';
import { fadeInUpAnimation } from '@/styles/Animations.ts';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import Paragraph from '@/components/TryNow/Paragraph';
import LogoCards from '@/components/TryNow/LogoCards';
import NumberedCard from '@/components/TryNow/NumberedCard';
import {
  flathubData,
  flathubSections,
  flathubLogoCards,
  numberedCards1,
  numberedCards2,
} from '@/constants/TryNowData/flathubData';

const FlatHubPage = () => {
  return (
    <div className="relative">
      {/* Floating SVGs */}
      <motion.div
        className="absolute top-[10vh] md:top-[15vh] left-[5vw] md:left-[35vw] z-[-1] pointer-events-none"
        variants={fadeInUpAnimation}
        initial="initial"
        animate="animate"
      >
        <img
          src="assets/FloatingSVGs/flathub-1.svg"
          alt="Flathub SVG 1"
          className="w-[clamp(100px,10vw,150px)]"
        />
      </motion.div>

      <motion.div
        className="absolute top-[10vh] sm:top-[65vh] right-[5vw] xs:right-[50vw] z-[-1] pointer-events-none"
        variants={fadeInUpAnimation}
        initial="initial"
        animate="animate"
      >
        <img
          src="assets/FloatingSVGs/flathub-2.svg"
          alt="Flathub SVG 2"
          className="w-[clamp(40px,9vw,16px)]"
        />
      </motion.div>

      <Header />

      <FeatureSection data={flathubData} />

      {flathubSections.map((section, index) => (
        <Paragraph
          key={index}
          title={section.title}
          content={section.content}
          button={section.button}
          buttonLink={section.buttonLink}
        />
      ))}

      <h2 className="text-3xl sm:text-4xl font-semibold border-b-2 border-gray-300 pb-2 font-[Caveat] text-center mx-auto w-fit mt-10">
        What can you do with <span className="text-[#68A6F7]">Flathub</span>?
      </h2>

      <div className="flex justify-center">
        <LogoCards data={flathubLogoCards} />
      </div>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 my-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-center font-Caveat">
            Getting Started
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-6 p-4">
            {numberedCards1.map((card, index) => (
              <NumberedCard
                key={index}
                number={card.number}
                title={card.title}
                description={card.description}
                borderColor={card.borderColor}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-center font-[Caveat]">
            Next Steps
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-6 p-4">
            {numberedCards2.map((card, index) => (
              <NumberedCard
                key={index}
                number={card.number}
                title={card.title}
                description={card.description}
                borderColor={card.borderColor}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FlatHubPage;
