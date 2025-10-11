// Helper functions for onboarding data attributes
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
