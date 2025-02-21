import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import MainPage from './pages/MainPage';
import AboutUs from './pages/About/AboutUs';
import Mission from './pages/About/Mission';
import Leadership from './pages/About/Leadership';
import ContactUs from './pages/About/ContactUs';
import FAQs from './pages/About/FAQs';
import CommunityNews from './pages/News/CommunityNews';
import Events from './pages/News/Events';
import PressRelease from './pages/News/PressRelease';
import SugarStories from './pages/News/SugarStories';
import TrySugar from './pages/TrySugar';
import JoinDevelopment from './pages/JoinDevelopment';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <MainPage /> },
      { path: `about-us`, element: <AboutUs /> },
      { path: `mission`, element: <Mission /> },
      { path: `leadership`, element: <Leadership /> },
      { path: `contact-us`, element: <ContactUs /> },
      { path: `faqs`, element: <FAQs /> },
      { path: `community-news`, element: <CommunityNews /> },
      { path: `events`, element: <Events /> },
      { path: `press-release`, element: <PressRelease /> },
      { path: `sugar-stories`, element: <SugarStories /> },
      { path: `try-sugar`, element: <TrySugar /> },
      { path: `join-development`, element: <JoinDevelopment /> },
      { path: `volunteer`, element: <Volunteer /> },
      { path: `donate`, element: <Donate /> },
      { path: `products`, element: <Products /> },
    ],
  },
]);

export default router;
