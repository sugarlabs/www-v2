import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface OnboardingTriggerProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'floating' | 'inline' | 'minimal';
}

export const OnboardingTrigger: React.FC<OnboardingTriggerProps> = ({
  className = '',
  children = 'Take Tour',
  variant = 'floating',
}) => {
  const {
    startOnboarding,
    onboardingCompleted,
    shouldShowTrigger,
    isOnboardingActive,
  } = useOnboarding();
  const [isVisible, setIsVisible] = useState(true);

  // Call all hooks before any conditional returns
  const handleClick = () => {
    startOnboarding();
    setIsVisible(false);
  };

  // Show trigger when tour is dismissed (not completed)
  React.useEffect(() => {
    if (onboardingCompleted) {
      setIsVisible(false); // Hide if completed
    } else if (shouldShowTrigger()) {
      setIsVisible(true); // Show if dismissed or first time
    }
  }, [onboardingCompleted, shouldShowTrigger]);

  // Don't show trigger if onboarding is completed, currently running, or hidden
  if (!shouldShowTrigger() || isOnboardingActive || !isVisible) {
    return null;
  }

  const baseClasses = {
    floating: `
      fixed bottom-6 right-6 z-[60] 
      bg-gradient-to-r from-blue-600 to-blue-700 
      text-white text-sm font-semibold 
      rounded-full px-6 py-3 
      shadow-2xl hover:shadow-3xl 
      transform hover:scale-105 active:scale-95 
      transition-all duration-300 ease-out
      flex items-center space-x-2
      border border-blue-500/20 backdrop-blur-sm
      ${className}
    `,
    inline: `
      inline-flex items-center px-4 py-2 
      bg-blue-600 text-white text-sm font-medium 
      rounded-md hover:bg-blue-700 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
      transition-colors duration-200 
      ${className}
    `,
    minimal: `
      inline-flex items-center px-2 py-1 
      text-blue-600 hover:text-blue-700 
      text-sm font-medium underline 
      transition-colors duration-200 
      ${className}
    `,
  };

  return (
    <button
      onClick={handleClick}
      className={baseClasses[variant]}
      title="Take a guided tour to learn about Sugar Labs features"
      aria-label="Start onboarding tour"
    >
      <span className="text-lg">🎯</span>
      <span>{children}</span>
    </button>
  );
};

// Floating Help Button for additional assistance
export const FloatingHelpButton: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed bottom-6 left-6 z-40 ${className}`}>
      <div className="relative">
        {/* Expandable content */}
        <div
          className={`absolute bottom-full mb-4 left-0 w-80 bg-white rounded-lg shadow-xl border p-4 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
        >
          <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">
            New to Sugar Labs? Take our quick tour to discover all the amazing
            features!
          </p>
          <div className="flex space-x-2">
            <OnboardingTrigger variant="inline" className="text-xs px-3 py-1">
              Start Tour
            </OnboardingTrigger>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Main help button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          title="Get help and support"
          aria-label="Help and support"
        >
          <span className="text-xl">❓</span>
        </button>
      </div>
    </div>
  );
};

// Progress indicator component
export const OnboardingProgress: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const { isOnboardingActive, currentStep, totalSteps, onboardingProgress } =
    useOnboarding();

  if (!isOnboardingActive) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-3 min-w-[200px] ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Tour Progress</span>
        <span className="text-xs text-gray-500">
          {currentStep + 1}/{totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${onboardingProgress}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1 text-center">
        {Math.round(onboardingProgress)}% complete
      </div>
    </div>
  );
};

export default OnboardingTrigger;
