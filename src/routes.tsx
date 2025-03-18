import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import AboutUs from '@/pages/About/AboutUs';
import Leadership from '@/pages/About/Leadership';
import ContactUs from '@/pages/About/ContactUs';
import FAQs from '@/pages/About/FAQs';
import TrySugar from '@/pages/TrySugar';
import JoinDevelopment from '@/pages/JoinDevelopment';
import Volunteer from '@/pages/Volunteer';
import Donate from '@/pages/Donate';
import Products from '@/pages/Products';
import NewsPage from '@/pages/News/NewsPage';
import NewsDetailPage from '@/pages/News/NewsDetailPage';
import MorePage from '@/pages/More';
import TurtleBlocksPage from '@/pages/TryNow/TurtleBlocks';
import SugarizerPage from '@/pages/TryNow/Sugarizer';
import BootableSoasPage from '@/pages/TryNow/BootableSoas';
import TrisquelPage from '@/pages/TryNow/Trisquel';
import RaspberryPiPage from '@/pages/TryNow/Raspberry';
import MusicBlocksPage from '@/pages/TryNow/MusicBlocks';

const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/leadership" element={<Leadership />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/faqs" element={<FAQs />} />
    <Route path="/news" element={<NewsPage />} />
    <Route path="/news/:category" element={<NewsPage />} />
    <Route path="/news/:category/:slug" element={<NewsDetailPage />} />
    <Route path="/more" element={<MorePage />} />
    <Route path="/more/:slug" element={<MorePage />} />
    <Route path="/try-sugar" element={<TrySugar />} />
    <Route path="/join-development" element={<JoinDevelopment />} />
    <Route path="/volunteer" element={<Volunteer />} />
    <Route path="/donate" element={<Donate />} />
    <Route path="/products" element={<Products />} />
    <Route path="/turtleblocks" element={<TurtleBlocksPage />} />
    <Route path="/sugarizer" element={<SugarizerPage />} />
    <Route path="/bootablesoas" element={<BootableSoasPage />} />
    <Route path="/trisquel" element={<TrisquelPage />} />
    <Route path="/raspberry" element={<RaspberryPiPage />} />
    <Route path="/musicblocks" element={<MusicBlocksPage />} />
  </Routes>
);

export default Router;
