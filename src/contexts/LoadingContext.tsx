import React, { useState, useEffect, ReactNode } from 'react';
import { LoadingContext, LoadingContextType } from './LoadingContextDefinition';

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const contextValue: LoadingContextType = {
    isLoading,
    setLoading,
    loadingProgress,
    setLoadingProgress,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};
