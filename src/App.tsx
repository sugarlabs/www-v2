import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import PerformanceDashboard from '@/components/shared/PerformanceDashboard';

const App = () => {
  const [showPerformanceDashboard, setShowPerformanceDashboard] =
    useState(false);

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

    // Add keyboard shortcut for performance dashboard in development
    const handleKeyDown = (e: KeyboardEvent) => {
      if (import.meta.env.DEV && e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowPerformanceDashboard(!showPerformanceDashboard);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPerformanceDashboard]);

  return (
    <div className="min-h-screen flex flex-col">
      <RouterProvider router={router} />

      {/* Performance Dashboard - only in development */}
      {import.meta.env.DEV && (
        <PerformanceDashboard
          isVisible={showPerformanceDashboard}
          onClose={() => setShowPerformanceDashboard(false)}
        />
      )}
    </div>
  );
};

export default App;
