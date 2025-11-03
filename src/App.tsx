import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';

const App = () => {
  useEffect(() => {
    let lastPathname = window.location.pathname;
    
    const unsubscribe = router.subscribe((state) => {
      // Only scroll to top on pathname changes, not on query/hash changes
      if (state.location.pathname !== lastPathname) {
        window.scrollTo(0, 0);
        lastPathname = state.location.pathname;
      }
    });
    const handleRedirect = () => {
      const redirectPath = sessionStorage.getItem('gh_redirect');
      if (redirectPath) {
        console.log('Restoring route:', redirectPath);
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
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
