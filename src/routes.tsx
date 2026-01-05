import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { redirectRoutes } from '@/redirects';
import { withSuspense } from '@/utils/route-utils';

// Lazy imports
const MainPage = lazy(() => import('@/pages/MainPage'));
const AboutUs = lazy(() => import('@/pages/About/AboutUs'));
const Leadership = lazy(() => import('@/pages/About/Leadership'));
const ContactUs = lazy(() => import('@/pages/About/ContactUs'));
const FAQs = lazy(() => import('@/pages/About/FAQs'));
const TrySugar = lazy(() => import('@/pages/TrySugar'));
const JoinDevelopment = lazy(() => import('@/pages/JoinDevelopment'));
const Volunteer = lazy(() => import('@/pages/Volunteer'));
const Donate = lazy(() => import('@/pages/Donate'));
const Products = lazy(() => import('@/pages/Products'));
const NewsPage = lazy(() => import('@/pages/News/NewsPage'));
const NewsDetailPage = lazy(() => import('@/pages/News/NewsDetailPage'));
const AuthorPage = lazy(() => import('@/pages/News/AuthorPage'));
const TagPage = lazy(() => import('@/pages/News/TagPage'));
const MorePage = lazy(() => import('@/pages/More'));
const TurtleBlocksPage = lazy(() => import('@/pages/TryNow/TurtleBlocks'));
const SugarizerPage = lazy(() => import('@/pages/TryNow/Sugarizer'));
const BootableSoasPage = lazy(() => import('@/pages/TryNow/BootableSoas'));
const TrisquelPage = lazy(() => import('@/pages/TryNow/Trisquel'));
const RaspberryPiPage = lazy(() => import('@/pages/TryNow/Raspberry'));
const MusicBlocksPage = lazy(() => import('@/pages/TryNow/MusicBlocks'));
const FlatHubPage = lazy(() => import('@/pages/TryNow/FlatHub'));
const Matrix = lazy(() => import('@/pages/Matrix'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const Contributors = lazy(() => import('@/pages/Contributors'));
const AuthorsPage = lazy(() => import('@/pages/News/AuthorsPage'));

const router = createBrowserRouter([
  ...redirectRoutes,
  { path: '/', element: withSuspense(MainPage) },
  { path: '/about-us', element: withSuspense(AboutUs) },
  { path: '/leadership', element: withSuspense(Leadership) },
  { path: '/contact-us', element: withSuspense(ContactUs) },
  { path: '/faqs', element: withSuspense(FAQs) },
  { path: '/news', element: withSuspense(NewsPage) },
  { path: '/news/:category', element: withSuspense(NewsPage) },
  { path: '/news/:category/:slug', element: withSuspense(NewsDetailPage) },
  { path: '/authors/:slug', element: withSuspense(AuthorPage) },
  { path: '/authors', element: withSuspense(AuthorsPage) },
  { path: '/tags/:tag', element: withSuspense(TagPage) },
  { path: '/more', element: withSuspense(MorePage) },
  { path: '/more/:slug', element: withSuspense(MorePage) },
  { path: '/try-sugar', element: withSuspense(TrySugar) },
  { path: '/join-development', element: withSuspense(JoinDevelopment) },
  { path: '/volunteer', element: withSuspense(Volunteer) },
  { path: '/donate', element: withSuspense(Donate) },
  { path: '/products', element: withSuspense(Products) },
  { path: '/turtleblocks', element: withSuspense(TurtleBlocksPage) },
  { path: '/sugarizer', element: withSuspense(SugarizerPage) },
  { path: '/bootablesoas', element: withSuspense(BootableSoasPage) },
  { path: '/trisquel', element: withSuspense(TrisquelPage) },
  { path: '/raspberry', element: withSuspense(RaspberryPiPage) },
  { path: '/musicblocks', element: withSuspense(MusicBlocksPage) },
  { path: '/flathub', element: withSuspense(FlatHubPage) },
  { path: '/contact-us/:matrix', element: withSuspense(Matrix) },
  { path: '/profiles', element: withSuspense(Contributors) },
  { path: '*', element: withSuspense(NotFoundPage) },
]);

export default router;
