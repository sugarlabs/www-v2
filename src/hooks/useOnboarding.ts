import { useContext } from 'react';
import { OnboardingContext, OnboardingContextType } from '@/contexts/OnboardingContextDefinition';

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
