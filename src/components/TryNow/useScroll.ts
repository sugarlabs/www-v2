import { useRef } from 'react';

export function useScroll() {
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const scrollToSteps = () => {
    if (stepsRef.current) {
      stepsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return { stepsRef, scrollToSteps };
}

export default useScroll;
