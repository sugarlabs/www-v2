import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import Paragraph from '@/components/TryNow/Paragraph';
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
        <FeatureSection data={turtleBlocksData} />

        <p className="w-[80%] mx-auto flex justify-center font-bold">
          Note: Turtle Blocks JS closely parallels the Python version of Turtle
          Blocks, the version included in the Sugar distribution. Sugar users
          probably want to use Turtle Blocks rather than Turtle Blocks JS.
        </p>

        <img src={mockupImage.path} alt="TurtleMockup" />

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
