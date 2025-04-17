import React, { useState, useRef, TouchEvent } from 'react';
import { TryCard, ActivityCard } from '@/components/TryCard';
import { TryCardData, Activities } from '@/constants/TryCardData';
import { motion } from 'framer-motion';
import {
  fadeIn,
  slideInLeft,
  slideInRight,
  slideInBottom,
  staggerContainer,
  subtleRise,
  headerReveal,
} from '@/styles/Animations';

const Try: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activityCarouselRef = useRef<HTMLDivElement>(null);

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
    <motion.div
      className="min-h-screen flex flex-col"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.main className="flex-grow bg-[#F6DEC9] px-3 sm:px-4 md:px-8 lg:px-16 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <motion.header
            className="space-y-3 sm:space-y-4 md:space-y-6"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold flex flex-col sm:flex-row items-start sm:items-center"
              variants={headerReveal}
            >
              <motion.span
                className="text-white bg-[#975555] px-2 py-1 rounded-lg inline-block"
                variants={slideInLeft}
              >
                EXPERIENCE
              </motion.span>
              <motion.span
                className="text-black sm:ml-2 mt-1 sm:mt-0"
                variants={slideInRight}
              >
                SUGAR
              </motion.span>
            </motion.h1>
            <motion.div
              className="space-y-2 sm:space-y-3 md:space-y-4"
              variants={subtleRise}
            >
              <motion.p
                className="text-[#975555] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                variants={fadeIn}
              >
                "Our educational tools can be experienced in a number of ways.
                Try the ones that are best for you!"
              </motion.p>
              <motion.i
                className="text-xs md:text-sm text-gray-700 block"
                variants={fadeIn}
              >
                Whether you enjoy hands-on activities, visual learning, or
                interactive coding, there's something for everyone. Explore
                creative tools, enhance your problem-solving skills, and make
                learning more engaging.
              </motion.i>
            </motion.div>
          </motion.header>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {TryCardData.map((card, index) => (
              <TryCard key={index} {...card} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden -mx-3 sm:-mx-2">
            <div className="relative px-3 sm:px-4">
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
              <div className="absolute top-1/2 -translate-y-1/2 left-1 right-1 flex justify-between pointer-events-none">
                <button
                  onClick={() =>
                    handleSwipe('prev', setCurrentCard, TryCardData.length)
                  }
                  className="pointer-events-auto p-2 sm:p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Previous"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
                  className="pointer-events-auto p-2 sm:p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Next"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
            <div className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6">
              {TryCardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    currentCard === index
                      ? 'bg-[#975555] w-4 sm:w-6'
                      : 'bg-[#975555]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto space-y-6 sm:space-y-8 mt-12 sm:mt-14 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInBottom}
        >
          <motion.header
            className="space-y-3 sm:space-y-4 md:space-y-6"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold flex flex-col sm:flex-row items-start sm:items-center"
              variants={headerReveal}
            >
              <motion.span
                className="text-white bg-[#975555] px-2 py-1 rounded-lg inline-block"
                variants={slideInLeft}
              >
                ALREADY USING
              </motion.span>
              <motion.span
                className="text-black sm:ml-2 mt-1 sm:mt-0"
                variants={slideInRight}
              >
                SUGAR?
              </motion.span>
            </motion.h1>
            <motion.div
              className="space-y-2 sm:space-y-3 md:space-y-4"
              variants={subtleRise}
            >
              <motion.p
                className="text-[#975555] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                variants={fadeIn}
              >
                "We have many activities for you!"
              </motion.p>
              <motion.i
                className="text-xs md:text-sm text-gray-700 block"
                variants={fadeIn}
              >
                The Sugar Learning platform is a complete environment for
                teaching and learning, which includes individual activities. If
                you're already using the Sugar Desktop Environment, then you can
                install from the activities below, which has links to some of
                our most popular activities.
              </motion.i>
            </motion.div>
          </motion.header>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {Activities.map((activity, index) => (
              <ActivityCard
                key={index}
                title={activity.title}
                description={activity.description}
                icon={activity.icon}
                buttonText={activity.buttonText}
                href={activity.href}
                version={activity.version}
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden -mx-3 sm:-mx-2">
            <div className="relative px-3 sm:px-4">
              <div
                ref={activityCarouselRef}
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
                        <ActivityCard
                          title={activity.title}
                          description={activity.description}
                          icon={activity.icon}
                          buttonText={activity.buttonText}
                          href={activity.href}
                          version={activity.version}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1 right-1 flex justify-between pointer-events-none">
                <button
                  onClick={() =>
                    handleSwipe('prev', setCurrentActivity, Activities.length)
                  }
                  className="pointer-events-auto p-2 sm:p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Previous"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
                  className="pointer-events-auto p-2 sm:p-3 bg-white/80 text-[#975555] rounded-full shadow-lg hover:bg-white transition-all"
                  aria-label="Next"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
            <div className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6">
              {Activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentActivity(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    currentActivity === index
                      ? 'bg-[#975555] w-4 sm:w-6'
                      : 'bg-[#975555]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default Try;
