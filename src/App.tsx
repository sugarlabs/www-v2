import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';

import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
const App = () => {
  useEffect(() => {
    const unsubscribe = router.subscribe(() => {
      window.scrollTo(0, 0);
    });
    const handleRedirect = () => {
      const redirectPath = sessionStorage.getItem('gh_redirect');
      if (redirectPath) {
        sessionStorage.removeItem('gh_redirect');
        setTimeout(() => {
          router.navigate(redirectPath);
        }, 10);
      }
    };
    handleRedirect();

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Toaster position="top-right" />
      <ScrollToTop />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
