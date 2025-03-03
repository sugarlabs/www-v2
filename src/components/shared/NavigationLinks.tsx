import { useEffect, useState, useRef } from 'react';
import {
  navigationSections,
  navigationConfig,
  navigationStyles,
} from '@/constants/aboutUs/navigation';

const NavigationLinks = () => {
  const [activeSection, setActiveSection] = useState(
    navigationConfig.defaultActiveSection,
  );
  const [lastClickedSection, setLastClickedSection] = useState('');
  const foundSections = useRef<Record<string, boolean>>({});

  useEffect(() => {
    console.log('Checking for all section elements...');

    navigationSections.forEach((section) => {
      const element = document.getElementById(section.id);
      foundSections.current[section.id] = !!element;

      if (!element) {
        console.warn(
          `Section with ID "${section.id}" not found in the document!`,
        );
      } else {
        console.log(`Found section: ${section.id}`);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = navigationSections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find((section) => {
        if (!section.element) return false;

        const rect = section.element.getBoundingClientRect();
        return (
          rect.top <= navigationConfig.activeDetectionOffset &&
          rect.bottom >= 50
        );
      });

      const roadmapSection = sectionElements.find(
        (s) => s.id === 'roadmap' && s.element,
      );
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (isNearBottom && roadmapSection && roadmapSection.element) {
        setActiveSection('roadmap');
      } else if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (lastClickedSection) {
        setActiveSection(lastClickedSection);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [lastClickedSection]);

  const scrollToSection = (sectionId: string) => {
    let element = document.getElementById(sectionId);

    setLastClickedSection(sectionId);
    setActiveSection(sectionId);

    if (!element && sectionId === 'roadmap') {
      const alternativeIds = ['road-map', 'road_map', 'Roadmap', 'ROADMAP'];

      for (const altId of alternativeIds) {
        element = document.getElementById(altId);
        if (element) {
          console.log(`Found roadmap with alternative ID: ${altId}`);
          break;
        }
      }

      if (!element) {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (const heading of headings) {
          if (heading.textContent?.toLowerCase().includes('roadmap')) {
            element =
              heading.closest('section') ||
              heading.closest('div') ||
              heading.parentElement;
            console.log('Found roadmap section via heading text');
            break;
          }
        }
      }

      if (!element) {
        console.log(
          'Roadmap section not found - scrolling to bottom of the page',
        );
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        return;
      }
    }

    if (element) {
      const navBar = document.querySelector('header, nav:first-of-type');
      const offsetTop = navBar ? navBar.getBoundingClientRect().height : 0;

      const targetPosition =
        element.offsetTop - offsetTop - navigationConfig.scrollOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = navigationConfig.scrollDuration;
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease = (t: number) =>
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        window.scrollTo(0, startPosition + distance * ease(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    } else {
      console.error(
        `Section with ID "${sectionId}" not found in the document!`,
      );
    }
  };

  return (
    <nav
      className={navigationStyles.container}
      style={{ top: `${navigationConfig.stickyTopPosition}px` }}
    >
      <ul className={navigationStyles.list}>
        {navigationSections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={`
                ${navigationStyles.button.base}
                ${
                  activeSection === id
                    ? navigationStyles.button.active
                    : navigationStyles.button.inactive
                }
              `}
            >
              {label}
              <span
                className={`
                  ${navigationStyles.indicator.base}
                  ${
                    activeSection === id
                      ? navigationStyles.indicator.active
                      : navigationStyles.indicator.inactive
                  }
                `}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationLinks;
