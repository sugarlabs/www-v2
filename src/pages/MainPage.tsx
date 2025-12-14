import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Stats from '@/components/Stats.tsx';
import Try from '@/components/Try.tsx';
import Info from '@/components/Info.tsx';
import { Testimonials } from '@/components/Testimonials';
import { TryMore } from '@/components/TryMore3D';
import Donation from '@/components/Donation.tsx';
import PromoBanner from '@/sections/Banner';
import { bannerConfigs } from '@/constants/Banner';
import SEO from '@/components/shared/SEO';
import { pageSEO } from '@/constants/SEO';

const MainPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <SEO
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        keywords={pageSEO.home.keywords}
      />
      <Header />
      <PromoBanner bannerConfigs={bannerConfigs} />
      <Info />
      <Stats />
      <Testimonials />
      <Try />
      <TryMore />
      <Donation />
      <Footer />
    </div>
  );
};

export default MainPage;
