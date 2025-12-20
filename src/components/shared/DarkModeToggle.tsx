import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const [themePreference, setThemePreference] = useState(() => {
    const saved = localStorage.getItem('theme');

    return saved || 'system';
  });
  const [isHovered, setIsHovered] = useState(false);

  const getAppliedTheme = useCallback((preference: string) => {
    if (preference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return preference;
  }, []);

  const applyTheme = useCallback(
    (preference: string) => {
      const theme = getAppliedTheme(preference);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    [getAppliedTheme],
  );

  useEffect(() => {
    applyTheme(themePreference);
  }, [themePreference, applyTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (themePreference === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference, applyTheme]);

  const toggleTheme = () => {
    const nextTheme =
      themePreference === 'light'
        ? 'dark'
        : themePreference === 'dark'
          ? 'system'
          : 'light';

    setThemePreference(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };
  const trackWidth = 72;
  const thumbWidth = 28;
  const padding = 3;

  const appliedTheme = getAppliedTheme(themePreference);
  const isDarkMode = appliedTheme === 'dark';
  const translateX = isDarkMode ? trackWidth - thumbWidth - padding : padding;

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex h-9 w-18 items-center rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-1"
      style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#bae6fd',
        boxShadow: isDarkMode
          ? '0 6px 16px rgba(30, 41, 59, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
          : '0 6px 16px rgba(186, 230, 253, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)',

        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDarkMode}
    >
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(148, 163, 184, 0.1) 0%, transparent 50%, rgba(71, 85, 105, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(56, 189, 248, 0.2) 100%)',
          opacity: isHovered ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
        }}
      />

      <span
        className="absolute rounded-full blur-md transition-all duration-500"
        style={{
          width: `${thumbWidth}px`,
          height: `${thumbWidth}px`,
          backgroundColor: isDarkMode ? '#818cf8' : '#fbbf24',
          opacity: isHovered ? 0.5 : 0.3,
          transform: `translateX(${translateX}px)`,
        }}
      />

      <span
        className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white overflow-hidden"
        style={{
          transform: `translateX(${translateX}px) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
          boxShadow: isDarkMode
            ? '0 3px 12px rgba(129, 140, 248, 0.5), 0 1px 4px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.7)'
            : '0 3px 12px rgba(251, 191, 36, 0.5), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(129, 140, 248, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
          }}
        />

        <Sun
          className="absolute transition-all duration-500"
          size={16}
          style={{
            color: '#f59e0b',
            opacity: isDarkMode ? 0 : 1,
            transform: isDarkMode
              ? 'rotate(360deg) scale(0.3)'
              : `rotate(0deg) scale(1) ${isHovered ? 'rotate(30deg)' : ''}`,
            filter: isDarkMode
              ? 'blur(2px)'
              : 'blur(0px) drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />

        <Moon
          className="absolute transition-all duration-500"
          size={16}
          style={{
            color: '#818cf8',
            opacity: isDarkMode ? 1 : 0,
            transform: isDarkMode
              ? 'rotate(0deg) scale(1)'
              : 'rotate(-360deg) scale(0.3)',
            filter: isDarkMode
              ? 'drop-shadow(0 0 6px rgba(129, 140, 248, 0.5))'
              : 'blur(2px)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </span>

      <Sun
        className="absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-500"
        size={12}
        style={{
          color: 'rgba(255, 255, 255, 0.9)',
          opacity: isDarkMode ? 0.2 : 0.7,
        }}
      />
      <Moon
        className="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500"
        size={12}
        style={{
          color: 'rgba(255, 255, 255, 0.9)',
          opacity: isDarkMode ? 0.7 : 0.2,
        }}
      />
    </button>
  );
};

export default DarkModeToggle;
