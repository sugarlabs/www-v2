import React from 'react';
import { useLocation } from 'react-router-dom';
import { Onboarding } from '@/components/Onboarding';
import {
  OnboardingTrigger,
  OnboardingProgress,
} from '@/components/OnboardingTrigger';

interface OnboardingWrapperProps {
  children: React.ReactNode;
}

export const OnboardingWrapper: React.FC<OnboardingWrapperProps> = ({
  children,
}) => {
  const location = useLocation();

  // Determine page type based on current route
  const getPageType = (): 'homepage' | 'try' | 'about' | 'news' => {
    const path = location.pathname;
    if (path === '/') return 'homepage';
    if (path.startsWith('/try')) return 'try';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/news')) return 'news';
    return 'homepage'; // default
  };

  return (
    <Onboarding pageType={getPageType()} showProgressIndicator={true}>
      {children}
      <OnboardingTrigger variant="floating" />
      <OnboardingProgress />
    </Onboarding>
  );
};

export default OnboardingWrapper;
