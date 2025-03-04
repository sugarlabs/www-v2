'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Testimonial = {
  quote: string;
  name: string;
  position: string;
  avatarSrc: string;
  quoteLink: string;
};

// Main testimonial carousel component
export default function QuotesCarousel() {
  // Sample testimonial data array
  const testimonials: Testimonial[] = [
    {
      quote: `I enjoyed playing with Blocks in this project. I created a project in which I tried to recreate the song Twinkle Twinkle Little Star. I also tried to create an art which was basically a circle with some sectors.While playing with MusicBlocks, I learned how the blocks are implemented as a way for the code to run. I also learned how the blocks work together.`,
      name: 'Soham Shubham',
      position: 'Student',
      avatarSrc:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      quoteLink:
        'https://sohamshubhamscience.blogspot.com/2018/04/experience-using-musicblocks.html',
    },
    {
      quote: `I think Music Blocks will inspire many young folks to become programmers, mathematicians, composers, and music theorists. It will also provide important experiences to other young folk who pursue other fields. You are to be congratulated on your efforts.`,
      name: 'Dr. Richard Hermann',
      position:
        'PhD, Prof. of Music Theory and Composition, University of New Mexico',
      avatarSrc:
        'https://music.unm.edu/wp-content/uploads/richard-hermann-1.jpg',
      quoteLink:
        'https://musicblocks.net/2016/07/04/dr-richard-hermann-on-music-blocks/',
    },
  ];

  // State to track which testimonial is currently displayed
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to control automatic carousel sliding
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Function to go to next slide, with memoization to prevent unnecessary re-renders
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  // Function to go to previous slide, with memoization
  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  }, [testimonials.length]);

  // Effect hook to handle automatic sliding
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only set up interval if autoplay is enabled
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    // Clean up interval on component unmount or when dependencies change
    return () => {
      clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide]);

  // Pause autoplay when mouse enters the carousel
  const handleMouseEnter = () => setIsAutoPlaying(false);

  // Resume autoplay when mouse leaves the carousel
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Handle clicking on a testimonial card to open the source link
  const handleCardClick = (quoteLink: string) => {
    if (quoteLink) {
      window.open(quoteLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Framer Motion animation configurations
  // Main container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 100 }, // Initial state: invisible and below viewport
    visible: {
      opacity: 1,
      y: 0, // Final state: fully visible at correct position
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        when: 'beforeChildren', // Animate container before children
        staggerChildren: 0.2, // Stagger children animations by 0.2s
      },
    },
  };

  // Animation for individual items within the container
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Animation for the arrow that appears on hover
  const arrowVariants = {
    hidden: { opacity: 0, y: 10, rotate: 45 },
    visible: { opacity: 1, y: 0, rotate: 45 },
  };

  return (
    // Main section with animation applied
    <motion.section
      className="w-full overflow-x-hidden py-12 md:py-24 lg:py-32 bg-background"
      initial="hidden" // Initial animation state
      whileInView="visible" // Animation state when component comes into view
      viewport={{ once: true, amount: 0.2 }} // Only animate once when 20% visible
      variants={containerVariants}
    >
      {/* Decorative horizontal line */}
      <div className="flex justify-center items-center w-full">
        <div className="w-[80%] border-t border-gray-200"></div>
      </div>

      {/* Main container with heading and content */}
      <div className="container mx-auto mt-16 px-4 md:px-6">
        {/* Section title and description */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-6"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Don't just take our word for it! Hear it straight from our
              users—here's what people are raving about when it comes to our
              platform!
            </p>
          </div>
        </motion.div>

        {/* Carousel container */}
        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={itemVariants}
          onMouseEnter={handleMouseEnter} // Pause autoplay on hover
          onMouseLeave={handleMouseLeave} // Resume autoplay when not hovering
        >
          {/* Carousel slider with overflow hidden for clean appearance */}
          <div className="overflow-hidden rounded-xl">
            {/* Sliding container that moves based on currentIndex */}
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`, // Horizontal sliding effect
                display: 'flex',
              }}
            >
              {/* Map through each testimonial to create cards */}
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 h-[272px]">
                  {/* Individual testimonial card with hover animation */}
                  <motion.div
                    className="bg-gray-50 p-6 shadow-lg rounded-xl h-full flex flex-col relative cursor-pointer group"
                    onClick={() => handleCardClick(testimonial.quoteLink)}
                    whileHover={{ scale: 1.02 }} // Subtle scale animation on hover
                    transition={{ duration: 0.2 }}
                  >
                    {/* Arrow that appears on hover to indicate the card is clickable */}
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
                      initial="hidden"
                      whileHover="visible"
                      variants={arrowVariants}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 bg-indigo-600 transform rotate-45 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white -rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </motion.div>

                    {/* Top section with quote icon and star rating */}
                    <div className="flex items-center justify-between mb-4 shrink-0">
                      {/* Quotation mark icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-indigo-600"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                      {/* 5-star rating display */}
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 fill-current text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial quote with scrollable container if text is long */}
                    <div className="flex-1 overflow-y-auto mb-4">
                      <p className="text-gray-600 italic leading-relaxed group-hover:text-indigo-600 transition-colors duration-200">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* User info section at bottom of card */}
                    <div className="pt-4 border-t border-gray-100 shrink-0">
                      <div className="flex items-center">
                        {/* User avatar */}
                        <div className="relative h-10 w-10 min-h-10 min-w-10 aspect-square flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                          <img
                            src={testimonial.avatarSrc || '/placeholder.svg'}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {/* User name and position */}
                        <div className="ml-4">
                          <p className="text-sm font-medium">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous slide navigation button */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Previous</span>
          </button>

          {/* Next slide navigation button */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Next</span>
          </button>

          {/* Dot indicators showing current slide position */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 w-2.5 rounded-full ${index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'}`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
