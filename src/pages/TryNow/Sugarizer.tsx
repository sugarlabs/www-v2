import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import LogoCards from '@/components/TryNow/LogoCards';
import { motion } from 'framer-motion';
import { fadeInUpAnimation, zoomFadeInAnimation } from '@/styles/Animations.ts';
import {
  logoCardsData,
  sugarizerData,
  mockupImage,
} from '@/constants/TryNowData/sugarizerData';

const SugarizerPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <FeatureSection data={sugarizerData} />

        {/* Floating SVGs */}
        <motion.div
          className="absolute top-[28vh] left-[5vw] sm:left-[30vw] z-[-1] pointer-events-none"
          variants={fadeInUpAnimation}
          initial="initial"
          animate="animate"
        >
          <img
            src="assets/FloatingSVGs/sugarizer-1.svg"
            alt="Sugarizer 1"
            className="w-[clamp(100px,10vw,180px)]"
          />
        </motion.div>

        <motion.img
          src={mockupImage.path}
          alt="SugarizerMockup"
          variants={zoomFadeInAnimation}
          initial="initial"
          animate="animate"
          className="w-[80%] mx-auto"
        />

        <h2 className="text-3xl sm:text-4xl font-semibold border-b-2 border-gray-300 pb-2 font-[Caveat] text-center mx-auto w-fit mt-10">
          Try it now!
        </h2>
        {/* Logo Cards Section */}
        <LogoCards data={logoCardsData} />
      </main>
      <Footer />
    </div>
  );
};

export default SugarizerPage;
