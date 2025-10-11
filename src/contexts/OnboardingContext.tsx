import React, { useState, useEffect, ReactNode } from 'react';
import Joyride, { CallBackProps, STATUS, EVENTS } from 'react-joyride';
import {
  OnboardingContext,
  OnboardingStep,
  OnboardingContextType,
} from './OnboardingContextDefinition';

const LOCAL_STORAGE_KEY = 'sugar-labs-onboarding';
const ONBOARDING_STEPS_KEY = 'onboarding-steps';

// Helper functions for localStorage
const saveOnboardingProgress = (
  stepIndex: number,
  completed: boolean = false,
) => {
  const data = {
    stepIndex,
    completed,
    timestamp: Date.now(),
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const loadOnboardingProgress = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        stepIndex: parsed.stepIndex || 0,
        completed: parsed.completed || false,
        timestamp: parsed.timestamp || 0,
      };
    }
  } catch (error) {
    console.warn('Failed to load onboarding progress:', error);
  }
  return { stepIndex: 0, completed: false, timestamp: 0 };
};

// Check if onboarding was completed recently (within 30 days)
const isOnboardingRecentlyCompleted = () => {
  const data = loadOnboardingProgress();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return data.completed && Date.now() - data.timestamp < thirtyDaysMs;
};

interface OnboardingProviderProps {
  children: ReactNode;
  steps: OnboardingStep[];
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  steps,
}) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [lifecycle, setLifecycle] = useState<string | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const totalSteps = steps.length;

  // Load progress on mount and check if first time visitor
  useEffect(() => {
    const progress = loadOnboardingProgress();
    const isFirstTime = !localStorage.getItem(ONBOARDING_STEPS_KEY);

    // If not completed and not first time, resume from last step
    if (
      !isOnboardingRecentlyCompleted() &&
      progress.stepIndex > 0 &&
      !progress.completed
    ) {
      setRun(true);
      setStepIndex(progress.stepIndex);
    } else if (!isOnboardingRecentlyCompleted() && isFirstTime) {
      setRun(true);
      setStepIndex(0);
    }

    setOnboardingCompleted(progress.completed);
    localStorage.setItem(ONBOARDING_STEPS_KEY, 'true');
  }, []);

  const isOnboardingActive = run;
  const currentStep = stepIndex;
  const onboardingProgress = (stepIndex / totalSteps) * 100;

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    console.log('Joyride Callback:', { action, index, status, type }); // Debug log

    // Handle step transitions
    if (type === EVENTS.STEP_BEFORE) {
      setStepIndex(index);
      setLifecycle(type);
    }

    // Handle step after events (when moving to next step)
    if (type === EVENTS.STEP_AFTER) {
      setStepIndex(index);
      saveOnboardingProgress(index, false);
    }

    // Handle tour completion
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      setOnboardingCompleted(true);
      setStepIndex(0);
      saveOnboardingProgress(0, true);
    }

    // Handle tour dismissal (close button)
    if (action === 'close') {
      setRun(false);
      setOnboardingCompleted(false); // Mark as dismissed, not completed
      setStepIndex(index);
      saveOnboardingProgress(index, false);
    }
  };

  const startOnboarding = () => {
    console.log('Starting onboarding tour...'); // Debug log
    setRun(false); // Stop first
    setTimeout(() => {
      setRun(true); // Start fresh
      setStepIndex(0);
      saveOnboardingProgress(0, false);
    }, 100);
  };

  const stopOnboarding = () => {
    setRun(false);
    setOnboardingCompleted(true);
    saveOnboardingProgress(0, true);
  };

  const skipOnboarding = () => {
    setRun(false);
    setOnboardingCompleted(true);
    saveOnboardingProgress(0, true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(ONBOARDING_STEPS_KEY);
    setOnboardingCompleted(false);
    setStepIndex(0);
    setRun(false);
    // Optionally restart tour after reset
    setTimeout(() => {
      setRun(true);
      saveOnboardingProgress(0, false);
    }, 100);
  };

  const shouldShowTrigger = () => {
    const progress = loadOnboardingProgress();
    // Show trigger if not completed (could be dismissed or first-time)
    return !progress.completed;
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setStepIndex(stepIndex);
      saveOnboardingProgress(stepIndex, false);
    }
  };

  const goToNextStep = () => {
    if (stepIndex < totalSteps - 1) {
      goToStep(stepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (stepIndex > 0) {
      goToStep(stepIndex - 1);
    }
  };

  const contextValue: OnboardingContextType = {
    isOnboardingActive,
    currentStep,
    totalSteps,
    startOnboarding,
    stopOnboarding,
    skipOnboarding,
    resetOnboarding,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    onboardingCompleted,
    onboardingProgress,
    shouldShowTrigger,
    setRun,
    getRun: () => run,
    stepIndex,
    lifecycle,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#3B82F6',
            backgroundColor: '#FFFFFF',
          },
          tooltip: {
            padding: '24px',
            fontSize: '16px',
            borderRadius: '12px',
          },
          tooltipTitle: {
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#1F2937',
          },
          tooltipContent: {
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: '1.5',
            marginBottom: '16px',
          },
          tooltipFooter: {
            marginTop: '16px',
          },
          buttonNext: {
            backgroundColor: '#3B82F6',
            fontSize: '14px',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '6px',
            color: 'white',
          },
          buttonBack: {
            backgroundColor: 'transparent',
            fontSize: '14px',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '6px',
            color: '#6B7280',
            marginRight: '8px',
          },
          buttonSkip: {
            backgroundColor: 'transparent',
            fontSize: '14px',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '6px',
            color: '#6B7280',
            marginLeft: 'auto',
          },
          buttonClose: {
            padding: '4px',
            fontSize: '18px',
            color: '#9CA3AF',
          },
          overlay: {
            background: 'rgba(0, 0, 0, 0.4)',
          },
          spotlight: {
            borderRadius: '8px',
            padding: '4px',
          },
          beacon: {
            accentColor: '#3B82F6',
          },
        }}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Complete Tour',
          next: 'Next',
          skip: 'Skip Tour',
        }}
      />
    </OnboardingContext.Provider>
  );
};
