import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PageLoader from '@/components/shared/PageLoader';
import { redirectRoutes } from '@/redirects';

// Helper function to handle lazy loading with our custom fallback
const lazyLoad = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
) => {
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyComponent />
    </Suspense>
  );
};

const MainPage = () => lazyLoad(() => import('@/pages/MainPage'));
const AboutUs = () => lazyLoad(() => import('@/pages/About/AboutUs'));
const Leadership = () => lazyLoad(() => import('@/pages/About/Leadership'));
const ContactUs = () => lazyLoad(() => import('@/pages/About/ContactUs'));
const FAQs = () => lazyLoad(() => import('@/pages/About/FAQs'));
const TrySugar = () => lazyLoad(() => import('@/pages/TrySugar'));
const JoinDevelopment = () => lazyLoad(() => import('@/pages/JoinDevelopment'));
const Volunteer = () => lazyLoad(() => import('@/pages/Volunteer'));
const Donate = () => lazyLoad(() => import('@/pages/Donate'));
const Products = () => lazyLoad(() => import('@/pages/Products'));
const NewsPage = () => lazyLoad(() => import('@/pages/News/NewsPage'));
const NewsDetailPage = () =>
  lazyLoad(() => import('@/pages/News/NewsDetailPage'));
const AuthorPage = () => lazyLoad(() => import('@/pages/News/AuthorPage'));
const TagPage = () => lazyLoad(() => import('@/pages/News/TagPage'));
const MorePage = () => lazyLoad(() => import('@/pages/More'));
const TurtleBlocksPage = () =>
  lazyLoad(() => import('@/pages/TryNow/TurtleBlocks'));
const SugarizerPage = () => lazyLoad(() => import('@/pages/TryNow/Sugarizer'));
const BootableSoasPage = () =>
  lazyLoad(() => import('@/pages/TryNow/BootableSoas'));
const TrisquelPage = () => lazyLoad(() => import('@/pages/TryNow/Trisquel'));
const RaspberryPiPage = () =>
  lazyLoad(() => import('@/pages/TryNow/Raspberry'));
const MusicBlocksPage = () =>
  lazyLoad(() => import('@/pages/TryNow/MusicBlocks'));
const FlatHubPage = () => lazyLoad(() => import('@/pages/TryNow/FlatHub'));
const Matrix = () => lazyLoad(() => import('@/pages/Matrix'));
const NotFoundPage = () => lazyLoad(() => import('@/pages/NotFoundPage'));
const Contributors = () => lazyLoad(() => import('@/pages/Contributors'));
const AuthorsPage = () => lazyLoad(() => import('@/pages/News/AuthorsPage'));

const router = createBrowserRouter([
  ...redirectRoutes,
  { path: '/', element: <MainPage /> },
  { path: '/about-us', element: <AboutUs /> },
  { path: '/leadership', element: <Leadership /> },
  { path: '/contact-us', element: <ContactUs /> },
  { path: '/faqs', element: <FAQs /> },
  { path: '/news', element: <NewsPage /> },
  { path: '/news/:category', element: <NewsPage /> },
  { path: '/news/:category/:slug', element: <NewsDetailPage /> },
  { path: '/authors/:slug', element: <AuthorPage /> },
  { path: '/authors', element: <AuthorsPage /> },
  { path: '/tags/:tag', element: <TagPage /> },
  { path: '/more', element: <MorePage /> },
  { path: '/more/:slug', element: <MorePage /> },
  { path: '/try-sugar', element: <TrySugar /> },
  { path: '/join-development', element: <JoinDevelopment /> },
  { path: '/volunteer', element: <Volunteer /> },
  { path: '/donate', element: <Donate /> },
  { path: '/products', element: <Products /> },
  { path: '/turtleblocks', element: <TurtleBlocksPage /> },
  { path: '/sugarizer', element: <SugarizerPage /> },
  { path: '/bootablesoas', element: <BootableSoasPage /> },
  { path: '/trisquel', element: <TrisquelPage /> },
  { path: '/raspberry', element: <RaspberryPiPage /> },
  { path: '/musicblocks', element: <MusicBlocksPage /> },
  { path: '/flathub', element: <FlatHubPage /> },
  { path: '/contact-us/:matrix', element: <Matrix /> },
  { path: '/profiles', element: <Contributors /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
