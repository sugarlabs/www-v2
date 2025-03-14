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
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <FeatureSection data={musicBlocksData} />

        <p className="flex justify-center">
          <span className="text-[#436EA6]">Learn music</span>,{' '}
          <span className="text-[#FEC613]"> math</span>, and{' '}
          <span className="text-[#AB486A]"> programming</span> together.
        </p>

        <div className="w-[80%] mx-auto flex justify-center">
          <img
            src={musicblockstext.path}
            alt="Music Blocks"
            className="w-[60%] max-w-xs"
          />
        </div>

        <div className="w-[80%] mx-auto flex justify-center">
          <img src={mockupImage.path} alt="TurtleMockup" />
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
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default MusicBlocksPage;
