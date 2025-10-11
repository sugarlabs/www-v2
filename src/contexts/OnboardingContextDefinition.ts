import { createContext, ReactNode } from 'react';

export interface OnboardingStep {
  target: string;
  content: ReactNode;
  placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'center';
  disableBeacon?: boolean;
  spotlightClicks?: boolean;
  hideCloseButton?: boolean;
  hideBackButton?: boolean;
  hideSkipButton?: boolean;
  title?: string;
  disableOverlayClose?: boolean;
  hideFooter?: boolean;
}

export interface OnboardingContextType {
  isOnboardingActive: boolean;
  currentStep: number;
  totalSteps: number;
  startOnboarding: () => void;
  stopOnboarding: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
  goToStep: (stepIndex: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  onboardingCompleted: boolean;
  onboardingProgress: number;
  shouldShowTrigger: () => boolean;
  setRun: (run: boolean) => void;
  getRun: () => boolean;
  stepIndex: number;
  lifecycle: string | null;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);
