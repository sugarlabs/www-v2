import Header from '../sections/Header';
import Footer from '../sections/Footer';
import Stats from '../components/Stats.tsx';
import Try from '../components/Try.tsx';
import Info from '../components/Info.tsx';
import { Testimonials } from '@/components/Testimonials';
import { TryMore } from '@/components/TryMore3D';
import Donation from '@/components/Donation.tsx';

const MainPage = () => {
  return (
    <>
      <Header />
      <Info />
      <Stats />
      <Testimonials />
      <Try />
      <TryMore />
      <Donation />
      <Footer />
    </>
  );
};

export default MainPage;
