import Header from '../sections/Header';
import Footer from '../sections/Footer';
import Stats from '../components/Stats.tsx';
import Try from '../components/Try.tsx';
import Info from '../components/Info.tsx';
import Testimonials from "../components/Testimonials";

const MainPage = () => {
  return (
    <>
      <Header />
      <Info />
      <Stats />
      <Testimonials />
      <Try />
      <Footer />
    </>
  );
};

export default MainPage;
