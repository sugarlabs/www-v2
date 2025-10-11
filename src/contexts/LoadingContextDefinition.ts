import { createContext } from 'react';

export interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
);
