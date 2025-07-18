import { createBrowserRouter } from 'react-router-dom';
import { redirectRoutes } from '@/redirects';
import LazyPage from '@/components/shared/LazyPage';

// Import lazy-loaded components
import {
  MainPage,
  AboutUs,
  Leadership,
  ContactUs,
  FAQs,
  TrySugar,
  JoinDevelopment,
  Volunteer,
  Donate,
  Products,
  NewsPage,
  NewsDetailPage,
  AuthorPage,
  TagPage,
  MorePage,
  TurtleBlocksPage,
  SugarizerPage,
  BootableSoasPage,
  TrisquelPage,
  RaspberryPiPage,
  MusicBlocksPage,
  FlatHubPage,
  Matrix,
  NotFoundPage,
  Contributors,
} from '@/pages/lazyPages';

const router = createBrowserRouter([
  ...redirectRoutes,
  {
    path: '/',
    element: <MainPage />, // Keep main page eager loaded for better initial experience
  },
  {
    path: '/about-us',
    element: (
      <LazyPage loadingText="Loading About Us..." componentName="AboutUs">
        <AboutUs />
      </LazyPage>
    ),
  },
  {
    path: '/leadership',
    element: (
      <LazyPage loadingText="Loading Leadership..." componentName="Leadership">
        <Leadership />
      </LazyPage>
    ),
  },
  {
    path: '/contact-us',
    element: (
      <LazyPage loadingText="Loading Contact Us..." componentName="ContactUs">
        <ContactUs />
      </LazyPage>
    ),
  },
  {
    path: '/faqs',
    element: (
      <LazyPage loadingText="Loading FAQs..." componentName="FAQs">
        <FAQs />
      </LazyPage>
    ),
  },
  {
    path: '/news',
    element: (
      <LazyPage loadingText="Loading News..." componentName="NewsPage">
        <NewsPage />
      </LazyPage>
    ),
  },
  {
    path: '/news/:category',
    element: (
      <LazyPage loadingText="Loading News..." componentName="NewsPage">
        <NewsPage />
      </LazyPage>
    ),
  },
  {
    path: '/news/:category/:slug',
    element: (
      <LazyPage loadingText="Loading Article..." componentName="NewsDetailPage">
        <NewsDetailPage />
      </LazyPage>
    ),
  },
  {
    path: '/authors/:slug',
    element: (
      <LazyPage loadingText="Loading Author..." componentName="AuthorPage">
        <AuthorPage />
      </LazyPage>
    ),
  },
  {
    path: '/tags/:tag',
    element: (
      <LazyPage loadingText="Loading Tag..." componentName="TagPage">
        <TagPage />
      </LazyPage>
    ),
  },
  {
    path: '/more',
    element: (
      <LazyPage loadingText="Loading More..." componentName="MorePage">
        <MorePage />
      </LazyPage>
    ),
  },
  {
    path: '/more/:slug',
    element: (
      <LazyPage loadingText="Loading Page..." componentName="MorePage">
        <MorePage />
      </LazyPage>
    ),
  },
  {
    path: '/try-sugar',
    element: (
      <LazyPage loadingText="Loading Try Sugar..." componentName="TrySugar">
        <TrySugar />
      </LazyPage>
    ),
  },
  {
    path: '/join-development',
    element: (
      <LazyPage
        loadingText="Loading Join Development..."
        componentName="JoinDevelopment"
      >
        <JoinDevelopment />
      </LazyPage>
    ),
  },
  {
    path: '/volunteer',
    element: (
      <LazyPage loadingText="Loading Volunteer..." componentName="Volunteer">
        <Volunteer />
      </LazyPage>
    ),
  },
  {
    path: '/donate',
    element: (
      <LazyPage loadingText="Loading Donate..." componentName="Donate">
        <Donate />
      </LazyPage>
    ),
  },
  {
    path: '/products',
    element: (
      <LazyPage loadingText="Loading Products..." componentName="Products">
        <Products />
      </LazyPage>
    ),
  },
  {
    path: '/turtleblocks',
    element: (
      <LazyPage
        loadingText="Loading Turtle Blocks..."
        componentName="TurtleBlocksPage"
      >
        <TurtleBlocksPage />
      </LazyPage>
    ),
  },
  {
    path: '/sugarizer',
    element: (
      <LazyPage
        loadingText="Loading Sugarizer..."
        componentName="SugarizerPage"
      >
        <SugarizerPage />
      </LazyPage>
    ),
  },
  {
    path: '/bootablesoas',
    element: (
      <LazyPage
        loadingText="Loading Bootable SOAS..."
        componentName="BootableSoasPage"
      >
        <BootableSoasPage />
      </LazyPage>
    ),
  },
  {
    path: '/trisquel',
    element: (
      <LazyPage loadingText="Loading Trisquel..." componentName="TrisquelPage">
        <TrisquelPage />
      </LazyPage>
    ),
  },
  {
    path: '/raspberry',
    element: (
      <LazyPage
        loadingText="Loading Raspberry Pi..."
        componentName="RaspberryPiPage"
      >
        <RaspberryPiPage />
      </LazyPage>
    ),
  },
  {
    path: '/musicblocks',
    element: (
      <LazyPage
        loadingText="Loading Music Blocks..."
        componentName="MusicBlocksPage"
      >
        <MusicBlocksPage />
      </LazyPage>
    ),
  },
  {
    path: '/flathub',
    element: (
      <LazyPage loadingText="Loading FlatHub..." componentName="FlatHubPage">
        <FlatHubPage />
      </LazyPage>
    ),
  },
  {
    path: '/contact-us/:matrix',
    element: (
      <LazyPage loadingText="Loading Matrix..." componentName="Matrix">
        <Matrix />
      </LazyPage>
    ),
  },
  {
    path: '/profiles',
    element: (
      <LazyPage
        loadingText="Loading Contributors..."
        componentName="Contributors"
      >
        <Contributors />
      </LazyPage>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />, // Keep 404 page eager loaded for better error handling
  },
]);

export default router;
