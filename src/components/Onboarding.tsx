import React from 'react';
import {
  OnboardingProvider,
  useOnboarding,
} from '@/contexts/OnboardingContext';
import { getOnboardingStepsForPage } from '@/constants/OnboardingSteps';

interface OnboardingProps {
  children: React.ReactNode;
  pageType?: 'homepage' | 'try' | 'about' | 'news';
  showProgressIndicator?: boolean;
  customSteps?: any[];
}

export const Onboarding: React.FC<OnboardingProps> = ({
  children,
  pageType = 'homepage',
  showProgressIndicator = true,
  customSteps,
}) => {
  const steps = customSteps || getOnboardingStepsForPage(pageType);

  return (
    <OnboardingProvider steps={steps}>
      <OnboardingContent showProgressIndicator={showProgressIndicator}>
        {children}
      </OnboardingContent>
    </OnboardingProvider>
  );
};

const OnboardingContent: React.FC<{
  children: React.ReactNode;
  showProgressIndicator: boolean;
}> = ({ children, showProgressIndicator }) => {
  const { isOnboardingActive, onboardingProgress, resetOnboarding } =
    useOnboarding();

  return (
    <div className="relative">
      {children}

      {/* Optional Progress Indicator */}
      {showProgressIndicator && isOnboardingActive && (
        <div className="fixed top-4 right-4 z-[9999] bg-white rounded-lg shadow-lg border p-3 min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Tour Progress
            </span>
            <button
              onClick={resetOnboarding}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
              title="Reset tour progress"
            >
              Reset
            </button>
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
      )}
    </div>
  );
};

// useOnboarding hook is imported above

// Add data attributes to elements for targeting
export const addOnboardingIds = {
  sugarLabsLogo: () => ({
    'data-onboarding-id': 'sugar-labs-logo',
    className: 'sugar-labs-logo',
  }),
  mainNavigation: () => ({
    'data-onboarding-id': 'main-navigation',
    className: 'main-navigation',
  }),
  trySugarButton: () => ({
    'data-onboarding-id': 'try-sugar-button',
    className: 'try-sugar-button',
  }),
  activitiesSection: () => ({
    'data-onboarding-id': 'activities-section',
    className: 'activities-section',
  }),
  statsSection: () => ({
    'data-onboarding-id': 'stats-section',
    className: 'stats-section',
  }),
  donationSection: () => ({
    'data-onboarding-id': 'donation-section',
    className: 'donation-section',
  }),
};

// Component to add onboarding trigger button
export const OnboardingTrigger: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children = 'Start Tour' }) => {
  const { startOnboarding, onboardingCompleted } = useOnboarding();

  if (onboardingCompleted) {
    return null; // Hide trigger if onboarding is completed
  }

  return (
    <button
      onClick={startOnboarding}
      className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${className}`}
      title="Take a tour to learn about Sugar Labs features"
    >
      <div className="mr-2 text-lg">🎯</div>
      {children}
    </button>
  );
};

// Custom tooltip wrapper component for styled onboarding tooltips
export const OnboardingTooltipWrapper: React.FC<{
  title: string;
  content: React.ReactNode;
  icon?: string;
  accentColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}> = ({ title, content, icon = '✨', accentColor = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200',
    red: 'from-red-50 to-red-100 border-red-200',
  };

  const iconClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[accentColor]} border rounded-xl p-6 shadow-lg`}
    >
      <div className="flex items-center mb-4">
        <span className={`text-2xl mr-3 ${iconClasses[accentColor]}`}>
          {icon}
        </span>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-700">{content}</div>
    </div>
  );
};

// Helper component to render onboarding step content
export const OnboardingStep: React.FC<{
  title: string;
  description: string;
  features?: string[];
  note?: string;
  accentColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}> = ({ title, description, features = [], note }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {note && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium text-sm">{note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
