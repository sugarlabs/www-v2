import { motion } from 'framer-motion';
import { fadeInUpAnimation, zoomFadeInAnimation } from '@/styles/Animations.ts';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import Paragraph from '@/components/TryNow/Paragraph';
import LogoCards from '@/components/TryNow/LogoCards';
import TeamSection from '@/components/TryNow/TeamSection';
import NumberedCard from '@/components/TryNow/NumberedCard';
import {
  musicBlocksData,
  mockupImage,
  musicblockstext,
  musicBlocksSections,
  foundabug,
  musicBlocksLogoCards,
  teamMembers,
  numberedCards1,
  numberedCards2,
} from '@/constants/TryNowData/musicBlocksData';

const MusicBlocksPage = () => {
  return (
    <div className="relative">
      {/* Floating SVGs */}
      <motion.div
        className="absolute top-[10vh] left-[5vw] sm:left-[30vw] z-[-1] pointer-events-none"
        variants={fadeInUpAnimation}
        initial="initial"
        animate="animate"
      >
        <img
          src="assets/FloatingSVGs/music-block-1.svg"
          alt="Music Block 1"
          className="w-[clamp(100px,10vw,180px)]"
        />
      </motion.div>

      <motion.div
        className="absolute top-[65vh] right-[5vw] sm:right-[50vw] z-[-1] pointer-events-none"
        variants={fadeInUpAnimation}
        initial="initial"
        animate="animate"
      >
        <img
          src="assets/FloatingSVGs/music-block-2.svg"
          alt="Music Block 2"
          className="w-[clamp(80px,9vw,160px)]"
        />
      </motion.div>

      <motion.div
        className="absolute top-[10vh] right-[10vw] sm:right-[15vw] z-[-1] pointer-events-none"
        variants={fadeInUpAnimation}
        initial="initial"
        animate="animate"
      >
        <img
          src="assets/FloatingSVGs/music-block-3.svg"
          alt="Music Block 3"
          className="w-[clamp(90px,10vw,170px)]"
        />
      </motion.div>

      {/* Main Content */}
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <FeatureSection data={musicBlocksData} />

        <p className="flex justify-center">
          <span className="text-[#436EA6]">Learn music</span>
          &nbsp;<span>,</span>&nbsp;
          <span className="text-[#FEC613]">math</span>
          &nbsp;<span>, and</span>&nbsp;
          <span className="text-[#AB486A]">programming</span>
          &nbsp;together.
        </p>

        <div className="w-[80%] mx-auto flex justify-center">
          <img
            src={musicblockstext.path}
            alt="Music Blocks"
            className="w-[60%] max-w-xs"
          />
        </div>

        <div className="w-[80%] mx-auto flex justify-center">
          <motion.img
            src={mockupImage.path}
            alt="MusicBlocksMockup"
            variants={zoomFadeInAnimation}
            initial="initial"
            animate="animate"
            className="w-[80%] mx-auto"
          />
        </div>

        <p className="w-[80%] mx-auto flex justify-center">
          Music Blocks is an American-made educational software that teaches
          music, math, and programming all at once. By combining blocks that
          indicate instruments and rhythms, and by changing the pitch values,
          children can create music from scratch, even if they are not familiar
          with music, are not good at math, or are new to programming. It is a
          groundbreaking software that allows children to learn these things.
        </p>

        {/* Render Paragraph components dynamically */}
        {musicBlocksSections.map((section, index) => (
          <Paragraph
            key={index}
            title={section.title}
            content={section.content}
            button={section.button}
            links={section.links}
          />
        ))}

        <h2 className="text-3xl sm:text-4xl font-semibold border-b-2 border-gray-300 pb-2 font-[Caveat] text-center mx-auto w-fit mt-10">
          What can you do with{' '}
          <span className="text-[#68A6F7]">Music Blocks</span>??
        </h2>

        <LogoCards data={musicBlocksLogoCards} />

        <h2 className="text-3xl sm:text-4xl font-semibold border-b-2 border-gray-300 pb-2 font-[Caveat] text-center mx-auto w-fit mt-10">
          How <span className="text-[#68A6F7]">Music Blocks</span> help your
          child's education??
        </h2>

        {/* Card Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {numberedCards1.map((card, index) => (
            <NumberedCard
              key={index}
              number={card.number}
              title={card.title}
              description={card.description}
              image={card.image}
              borderColor={card.borderColor}
            />
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {numberedCards2.map((card, index) => (
            <NumberedCard
              key={index}
              number={card.number}
              title={card.title}
              description={card.description}
              image={card.image}
              borderColor={card.borderColor}
            />
          ))}
        </div>

        <div>
          <TeamSection members={teamMembers} />
        </div>

        {/* Render Paragraph components dynamically */}
        {foundabug.map((section, index) => (
          <Paragraph
            key={index}
            title={section.title}
            content={section.content}
            button={section.button}
            links={section.links}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default MusicBlocksPage;
