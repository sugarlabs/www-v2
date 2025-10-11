import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import LoadingScreen from '@/components/LoadingScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = router.subscribe(() => {
      window.scrollTo(0, 0);
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

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
