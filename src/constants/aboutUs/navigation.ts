export interface NavigationSection {
  id: string;
  label: string;
}

export const navigationSections: NavigationSection[] = [
  { id: 'mission', label: 'Our Mission' },
  { id: 'principles', label: 'Our Principles' },
  { id: 'goals', label: 'Our Goals' },
  { id: 'projects', label: 'Our Projects' },
  { id: 'roadmap', label: 'Our Roadmap' }, //
];

export const navigationConfig = {
  scrollOffset: 20,
  scrollDuration: 800,
  stickyTopPosition: 70,
  activeDetectionOffset: 100,
  defaultActiveSection: 'mission',
};

export const navigationStyles = {
  container:
    'sticky bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md dark:shadow-gray-700 rounded-lg p-4 mb-8 z-40 mt-16',
  list: 'flex flex-wrap justify-center gap-4 md:gap-8',
  button: {
    base: 'px-4 py-2 rounded-md transition-all duration-300 text-sm md:text-base relative group hover:cursor-pointer',
    active: 'text-red-500 dark:text-red-400 font-medium',
    inactive:
      'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400',
  },
  indicator: {
    base: 'absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform transition-all duration-300',
    active: 'scale-x-100',
    inactive: 'scale-x-0 group-hover:scale-x-100',
  },
};
