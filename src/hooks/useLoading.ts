import { useContext } from 'react';
import { LoadingContext, LoadingContextType } from '@/contexts/LoadingContextDefinition';

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
