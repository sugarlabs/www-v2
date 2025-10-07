import { createBrowserRouter } from 'react-router-dom';
import { redirectRoutes } from '@/redirects';
import OnboardingWrapper from '@/components/OnboardingWrapper';
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
import AuthorPage from '@/pages/News/AuthorPage';
import TagPage from '@/pages/News/TagPage';
import MorePage from '@/pages/More';
import TurtleBlocksPage from '@/pages/TryNow/TurtleBlocks';
import SugarizerPage from '@/pages/TryNow/Sugarizer';
import BootableSoasPage from '@/pages/TryNow/BootableSoas';
import TrisquelPage from '@/pages/TryNow/Trisquel';
import RaspberryPiPage from '@/pages/TryNow/Raspberry';
import MusicBlocksPage from '@/pages/TryNow/MusicBlocks';
import FlatHubPage from '@/pages/TryNow/FlatHub';
import Matrix from '@/pages/Matrix';
import NotFoundPage from '@/pages/NotFoundPage';
import Contributors from '@/pages/Contributors';

const router = createBrowserRouter([
  ...redirectRoutes,
  {
    path: '/',
    element: (
      <OnboardingWrapper>
        <MainPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/about-us',
    element: (
      <OnboardingWrapper>
        <AboutUs />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/leadership',
    element: (
      <OnboardingWrapper>
        <Leadership />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/contact-us',
    element: (
      <OnboardingWrapper>
        <ContactUs />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/faqs',
    element: (
      <OnboardingWrapper>
        <FAQs />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/news',
    element: (
      <OnboardingWrapper>
        <NewsPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/news/:category',
    element: (
      <OnboardingWrapper>
        <NewsPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/news/:category/:slug',
    element: (
      <OnboardingWrapper>
        <NewsDetailPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/authors/:slug',
    element: (
      <OnboardingWrapper>
        <AuthorPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/tags/:tag',
    element: (
      <OnboardingWrapper>
        <TagPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/more',
    element: (
      <OnboardingWrapper>
        <MorePage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/more/:slug',
    element: (
      <OnboardingWrapper>
        <MorePage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/try-sugar',
    element: (
      <OnboardingWrapper>
        <TrySugar />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/join-development',
    element: (
      <OnboardingWrapper>
        <JoinDevelopment />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/volunteer',
    element: (
      <OnboardingWrapper>
        <Volunteer />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/donate',
    element: (
      <OnboardingWrapper>
        <Donate />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/products',
    element: (
      <OnboardingWrapper>
        <Products />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/turtleblocks',
    element: (
      <OnboardingWrapper>
        <TurtleBlocksPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/sugarizer',
    element: (
      <OnboardingWrapper>
        <SugarizerPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/bootablesoas',
    element: (
      <OnboardingWrapper>
        <BootableSoasPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/trisquel',
    element: (
      <OnboardingWrapper>
        <TrisquelPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/raspberry',
    element: (
      <OnboardingWrapper>
        <RaspberryPiPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/musicblocks',
    element: (
      <OnboardingWrapper>
        <MusicBlocksPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/flathub',
    element: (
      <OnboardingWrapper>
        <FlatHubPage />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/contact-us/:matrix',
    element: (
      <OnboardingWrapper>
        <Matrix />
      </OnboardingWrapper>
    ),
  },
  {
    path: '/profiles',
    element: (
      <OnboardingWrapper>
        <Contributors />
      </OnboardingWrapper>
    ),
  },
  {
    path: '*',
    element: (
      <OnboardingWrapper>
        <NotFoundPage />
      </OnboardingWrapper>
    ),
  },
]);

export default router;
