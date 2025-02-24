import React, { useState, useRef, TouchEvent } from 'react';
import ToolCard from './TryCard';
import CardData from '../constants/TryCardData';

const Try: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentCard((prev) => (prev + 1) % CardData.length);
    } else {
      setCurrentCard((prev) => (prev - 1 + CardData.length) % CardData.length);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const swipeThreshold = 50;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        handleSwipe('next');
      } else {
        handleSwipe('prev');
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
            {CardData.map((card, index) => (
              <ToolCard key={index} {...card} />
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
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`flex transition-transform duration-300 ease-out`}
                  style={{
                    transform: `translateX(-${currentCard * 100}%)`,
                    willChange: 'transform',
                  }}
                >
                  {CardData.map((card, index) => (
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
                        <ToolCard {...card} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                <button
                  onClick={() => handleSwipe('prev')}
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
                  onClick={() => handleSwipe('next')}
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
              {CardData.map((_, index) => (
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
      </main>
    </div>
  );
};

export default Try;
