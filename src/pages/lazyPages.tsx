import { lazy } from 'react';

// Main pages - keep these eager loaded for better initial experience
export { default as MainPage } from './MainPage';

// About pages - lazy load these as they're secondary
export const AboutUs = lazy(() => import('./About/AboutUs'));
export const Leadership = lazy(() => import('./About/Leadership'));
export const ContactUs = lazy(() => import('./About/ContactUs'));
export const FAQs = lazy(() => import('./About/FAQs'));

// News pages - lazy load as they contain heavy markdown content
export const NewsPage = lazy(() => import('./News/NewsPage'));
export const NewsDetailPage = lazy(() => import('./News/NewsDetailPage'));
export const AuthorPage = lazy(() => import('./News/AuthorPage'));
export const TagPage = lazy(() => import('./News/TagPage'));

// More pages - lazy load as they're less frequently accessed
export const MorePage = lazy(() => import('./More'));

// Try Sugar pages - lazy load as they're feature pages
export const TrySugar = lazy(() => import('./TrySugar'));
export const JoinDevelopment = lazy(() => import('./JoinDevelopment'));
export const Volunteer = lazy(() => import('./Volunteer'));
export const Donate = lazy(() => import('./Donate'));
export const Products = lazy(() => import('./Products'));

// Try Now pages - lazy load as they're detailed feature pages
export const TurtleBlocksPage = lazy(() => import('./TryNow/TurtleBlocks'));
export const SugarizerPage = lazy(() => import('./TryNow/Sugarizer'));
export const BootableSoasPage = lazy(() => import('./TryNow/BootableSoas'));
export const TrisquelPage = lazy(() => import('./TryNow/Trisquel'));
export const RaspberryPiPage = lazy(() => import('./TryNow/Raspberry'));
export const MusicBlocksPage = lazy(() => import('./TryNow/MusicBlocks'));
export const FlatHubPage = lazy(() => import('./TryNow/FlatHub'));

// Other pages - lazy load as they're less frequently accessed
export const Matrix = lazy(() => import('./Matrix'));
export const Contributors = lazy(() => import('./Contributors'));

// 404 page - keep eager loaded for better error handling
export { default as NotFoundPage } from './NotFoundPage'; 