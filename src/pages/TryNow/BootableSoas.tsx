import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import FeatureSection from '@/components/TryNow/FeatureSection';
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

        <img src={mockupImage.path} alt="TurtleMockup" />

        <StepsToUse />
      </main>
      <Footer />
    </div>
  );
};

export default BootableSoasPage;
