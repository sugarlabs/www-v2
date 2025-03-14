import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import Paragraph from '@/components/TryNow/Paragraph';
import LogoCards from '@/components/TryNow/LogoCards';
import {
  trisquelSections,
  trisquelData,
  trisquelLogoCards,
} from '@/constants/TryNowData/trisquelData';

const TrisquelPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <FeatureSection data={trisquelData} />

        {/* Render Paragraph components dynamically */}
        {trisquelSections.map((section, index) => (
          <Paragraph
            key={index}
            title={section.title}
            content={section.content}
            button={section.button}
          />
        ))}

        <h2 className="text-3xl sm:text-4xl font-semibold border-b-2 border-gray-300 pb-2 font-[Caveat] text-center mx-auto w-fit mt-10">
          Learn and Try!
        </h2>

        <LogoCards data={trisquelLogoCards} />
      </main>
      <Footer />
    </div>
  );
};

export default TrisquelPage;
