import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import { motion } from 'framer-motion';
import { zoomFadeInAnimation } from '@/styles/Animations';
import {
  bootableSoasData,
  mockupImage,
} from '@/constants/TryNowData/bootableSoasData';
import StepsToUse from '@/components/TryNow/StepsToUse';

const BootableSoasPage = () => {
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

        <StepsToUse />
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
