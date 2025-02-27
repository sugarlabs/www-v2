import React, { useState, useRef, TouchEvent } from 'react';
import { TryCard, ActivityCard } from './TryCard';
import { TryCardData, Activities } from '../constants/TryCardData';

const Try: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (
    direction: 'next' | 'prev',
    setCurrent: React.Dispatch<React.SetStateAction<number>>,
    length: number,
  ) => {
    if (direction === 'next') {
      setCurrent((prev) => (prev + 1) % length);
    } else {
      setCurrent((prev) => (prev - 1 + length) % length);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (
    setCurrent: React.Dispatch<React.SetStateAction<number>>,
    length: number,
  ) => {
    setIsDragging(false);
    const swipeThreshold = 50;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        handleSwipe('next', setCurrent, length);
      } else {
        handleSwipe('prev', setCurrent, length);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-[#F6DEC9] p-4 md:p-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold flex flex-col sm:flex-row items-start sm:items-center">
              <span className="text-white bg-[#975555] px-2 py-1 rounded-lg inline-block">
                EXPERIENCE
              </span>
              <span className="text-black sm:ml-2 mt-2 sm:mt-0">SUGAR.</span>
            </h1>
            <div className="space-y-4">
              <p className="text-[#975555] text-2xl md:text-4xl font-bold leading-tight">
                "Our educational tools can be experienced in a number of ways.
                Try the ones that are best for you!"
              </p>
              <i className="text-xs text-gray-700">
                Whether you enjoy hands-on activities, visual learning, or
                interactive coding, there's something for everyone. Explore
                creative tools, enhance your problem-solving skills, and make
                learning more engaging.
              </i>
            </div>
          </header>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {TryCardData.map((card, index) => (
              <TryCard key={index} {...card} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden ml-[-1rem] mr-[-1rem]">
            <div className="relative px-4">
              <div
                ref={carouselRef}
                className="overflow-hidden touch-pan-x"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() =>
                  handleTouchEnd(setCurrentCard, TryCardData.length)
                }
              >
                <div
                  className={`flex transition-transform duration-300 ease-out`}
                  style={{
                    transform: `translateX(-${currentCard * 100}%)`,
                    willChange: 'transform',
                  }}
                >
                  {TryCardData.map((card, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-2"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <div
                        className={`
                        transform transition-all duration-300
                        ${isDragging ? 'scale-98' : 'hover:scale-102'}
                      `}
                      >
                        <TryCard {...card} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                <button
                  onClick={() =>
                    handleSwipe('prev', setCurrentCard, TryCardData.length)
                  }
                  className="pointer-events-auto p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Previous"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    handleSwipe('next', setCurrentCard, TryCardData.length)
                  }
                  className="pointer-events-auto p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Next"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {TryCardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentCard === index
                      ? 'bg-[#975555] w-6'
                      : 'bg-[#975555]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8 mt-16">
          <header className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold flex flex-col sm:flex-row items-start sm:items-center">
              <span className="text-white bg-[#975555] px-2 py-1 rounded-lg inline-block">
                ALREADY USING
              </span>
              <span className="text-black sm:ml-2 mt-2 sm:mt-0">SUGAR?</span>
            </h1>
            <div className="space-y-4">
              <p className="text-[#975555] text-2xl md:text-4xl font-bold leading-tight">
                "We have many activities for you!"
              </p>
              <i className="text-xs text-gray-700">
                The Sugar Learning platform is a complete environment for
                teaching and learning, which includes individual activities. If
                you're already using the Sugar Desktop Environment, then you can
                install from the activities below, which has links to some of
                our most popular activities.
              </i>
            </div>
          </header>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {Activities.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden ml-[-1rem] mr-[-1rem]">
            <div className="relative px-4">
              <div
                ref={carouselRef}
                className="overflow-hidden touch-pan-x"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() =>
                  handleTouchEnd(setCurrentActivity, Activities.length)
                }
              >
                <div
                  className={`flex transition-transform duration-300 ease-out`}
                  style={{
                    transform: `translateX(-${currentActivity * 100}%)`,
                    willChange: 'transform',
                  }}
                >
                  {Activities.map((activity, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-2"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <div
                        className={`
                        transform transition-all duration-300
                        ${isDragging ? 'scale-98' : 'hover:scale-102'}
                      `}
                      >
                        <ActivityCard {...activity} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                <button
                  onClick={() =>
                    handleSwipe('prev', setCurrentActivity, Activities.length)
                  }
                  className="pointer-events-auto p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Previous"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    handleSwipe('next', setCurrentActivity, Activities.length)
                  }
                  className="pointer-events-auto p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Next"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {Activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentActivity(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentActivity === index
                      ? 'bg-[#975555] w-6'
                      : 'bg-[#975555]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Try;
