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
          className="absolute top-25 left-5 sm:left-120"
          variants={fadeInUpAnimation}
          initial="initial"
          animate="animate"
        >
          <img
            src="assets/FloatingSVGs/turtle-blocks-1.svg"
            alt="Turtle Blocks 1"
            className="w-30 sm:w-40"
          />
        </motion.div>

        <motion.div
          className="absolute top-95 right-10 sm:right-155"
          variants={fadeInUpAnimation}
          initial="initial"
          animate="animate"
        >
          <img
            src="assets/FloatingSVGs/turtle-blocks-2.svg"
            alt="Turtle Blocks 2"
            className="w-12 sm:w-25"
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
