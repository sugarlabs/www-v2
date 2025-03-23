import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import Paragraph from '@/components/TryNow/Paragraph';
import { motion } from 'framer-motion';
import { fadeInUpAnimation, zoomFadeInAnimation } from '@/styles/Animations.ts';
import {
  turtleBlocksData,
  turtleBlocksSections,
  mockupImage,
} from '@/constants/TryNowData/turtleBlocksData';

const TurtleBlocksPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        {/* Floating SVGs */}
        <motion.div
          className="absolute top-[10vh] left-[5vw] sm:left-[30vw] z-[0] pointer-events-none"
          variants={fadeInUpAnimation}
          initial="initial"
          animate="animate"
        >
          <img
            src="assets/FloatingSVGs/turtle-blocks-1.svg"
            alt="Turtle Blocks 1"
            className="w-[clamp(100px,10vw,180px)]"
          />
        </motion.div>

        <motion.div
          className="absolute top-[60vh] right-[5vw] sm:right-[50vw] z-[-1] pointer-events-none"
          variants={fadeInUpAnimation}
          initial="initial"
          animate="animate"
        >
          <img
            src="assets/FloatingSVGs/turtle-blocks-2.svg"
            alt="Turtle Blocks 2"
            className="w-[clamp(80px,9vw,160px)]"
          />
        </motion.div>

        <FeatureSection data={turtleBlocksData} />

        <p className="w-[80%] mx-auto flex justify-center font-bold">
          Note: Turtle Blocks JS closely parallels the Python version of Turtle
          Blocks, the version included in the Sugar distribution. Sugar users
          probably want to use Turtle Blocks rather than Turtle Blocks JS.
        </p>

        <motion.img
          src={mockupImage.path}
          alt="TurtleMockup"
          variants={zoomFadeInAnimation}
          initial="initial"
          animate="animate"
          className="w-[80%] mx-auto"
        />

        {/* Render Paragraph components dynamically */}
        {turtleBlocksSections.map((section, index) => (
          <Paragraph
            key={index}
            title={section.title}
            content={section.content}
            button={section.button}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default TurtleBlocksPage;
