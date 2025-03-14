import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import Paragraph from '@/components/TryNow/Paragraph';
import {
  raspberrydata,
  raspberrySections,
} from '@/constants/TryNowData/raspberryPiData';

const RaspberryPiPage = () => {
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
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default RaspberryPiPage;
