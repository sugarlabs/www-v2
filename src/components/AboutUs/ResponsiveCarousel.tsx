// components/shared/ResponsiveCarousel.tsx
import React, {
  useState,
  useEffect,
  useRef,
  Children,
  useCallback,
} from 'react';
import { motion } from 'framer-motion';

interface ResponsiveCarouselProps {
  children: React.ReactNode;
  autoScrollInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
}

const ResponsiveCarousel: React.FC<ResponsiveCarouselProps> = ({
  children,
  autoScrollInterval = 4000,
  showIndicators = true,
  showNavigation = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const childrenArray = Children.toArray(children);
  const totalSlides = childrenArray.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1,
    );
  }, [totalSlides]);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // Auto scroll functionality
  useEffect(() => {
    if (autoScrollInterval === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoScrollInterval, nextSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }

    if (isRightSwipe) {
      prevSlide();
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className="w-full shrink-0 px-2"
              style={{ minWidth: '100%' }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation buttons */}
      {showNavigation && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-4 w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-emerald-500 text-white shadow-lg flex items-center justify-center z-10 hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 active:scale-95"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-4 w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-emerald-500 text-white shadow-lg flex items-center justify-center z-10 hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 active:scale-95"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-linear-to-r from-blue-600 to-emerald-500'
                  : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default ResponsiveCarousel;
