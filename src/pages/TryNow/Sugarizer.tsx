import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
import LogoCards from '@/components/TryNow/LogoCards';
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

        <img src={mockupImage.path} alt="TurtleMockup" />

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
