import { useEffect, useRef } from 'react';

interface LazyLoadingMetrics {
  componentName: string;
  loadStartTime: number;
  loadEndTime?: number;
  loadDuration?: number;
  success: boolean;
  error?: Error;
}

const lazyLoadingMetrics: LazyLoadingMetrics[] = [];

export const useLazyLoading = (componentName: string) => {
  const loadStartTime = useRef<number>(Date.now());
  const hasReported = useRef<boolean>(false);

  useEffect(() => {
    const startTime = loadStartTime.current;
    
    // Report successful load
    const reportSuccess = () => {
      if (hasReported.current) return;
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      lazyLoadingMetrics.push({
        componentName,
        loadStartTime: startTime,
        loadEndTime: endTime,
        loadDuration: duration,
        success: true,
      });
      
      hasReported.current = true;
      
      // Log to console in development
      if (import.meta.env.DEV) {
        console.log(`✅ ${componentName} loaded in ${duration}ms`);
      }
    };

    // Report success after a short delay to ensure component is fully loaded
    const timeoutId = setTimeout(reportSuccess, 100);

    return () => {
      clearTimeout(timeoutId);
      // If component unmounts before reporting, report as success
      if (!hasReported.current) {
        reportSuccess();
      }
    };
  }, [componentName]);

  // Return metrics for debugging
  return {
    getMetrics: () => lazyLoadingMetrics,
    getComponentMetrics: (name: string) => 
      lazyLoadingMetrics.filter(m => m.componentName === name),
    getAverageLoadTime: () => {
      const successfulLoads = lazyLoadingMetrics.filter(m => m.success && m.loadDuration);
      if (successfulLoads.length === 0) return 0;
      
      const totalTime = successfulLoads.reduce((sum, m) => sum + (m.loadDuration || 0), 0);
      return totalTime / successfulLoads.length;
    },
  };
};

// Export metrics for external access
export const getLazyLoadingMetrics = () => lazyLoadingMetrics; 