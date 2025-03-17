import { createBrowserRouter } from 'react-router-dom';
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

const router = createBrowserRouter([
  { path: `/`, element: <MainPage /> },
  { path: `/about-us`, element: <AboutUs /> },
  { path: `/leadership`, element: <Leadership /> },
  { path: `/contact-us`, element: <ContactUs /> },
  { path: `/faqs`, element: <FAQs /> },
  { path: `/news`, element: <NewsPage /> },
  { path: `/news/:category`, element: <NewsPage /> },
  { path: `/news/:category/:slug`, element: <NewsDetailPage /> },
  { path: `/more`, element: <MorePage /> },
  { path: `/more/:slug`, element: <MorePage /> },
  { path: `/try-sugar`, element: <TrySugar /> },
  { path: `/join-development`, element: <JoinDevelopment /> },
  { path: `/volunteer`, element: <Volunteer /> },
  { path: `/donate`, element: <Donate /> },
  { path: `/products`, element: <Products /> },
  { path: `/turtleblocks`, element: <TurtleBlocksPage /> },
  { path: `/sugarizer`, element: <SugarizerPage /> },
  { path: `/bootablesoas`, element: <BootableSoasPage /> },
  { path: `/trisquel`, element: <TrisquelPage /> },
  { path: `/raspberry`, element: <RaspberryPiPage /> },
  { path: `/musicblocks`, element: <MusicBlocksPage /> },
]);

export default router;
