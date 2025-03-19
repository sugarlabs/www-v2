import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import { heroContent, images, ImageConfig, mission } from '@/constants/Info.ts';
import {
  fadeIn,
  simpleFadeIn,
  subtleRise,
  simpleGridContainer,
} from '@/styles/Animations';

const Info: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Set initial width
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderImageCard = (key: string, image: ImageConfig) => (
    <motion.div
      key={key}
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                 transition-all duration-500 bg-white"
      variants={subtleRise}
      whileHover="hover"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover transform group-hover:scale-105 
                   transition-all duration-700 ease-out"
        loading="lazy"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                   to-transparent p-3 sm:p-4 md:p-6 lg:p-8"
        >
          <p className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl">
            {image.caption}
          </p>
        </div>
      )}
    </motion.div>
  );

  const renderCarouselItem = (key: string, image: ImageConfig) => (
    <div key={key} className="relative">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-48 sm:h-64 object-cover"
        loading="lazy"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                   to-transparent p-3 sm:p-4"
        >
          <p className="text-white font-normal text-sm sm:text-base">
            {image.caption}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-Inter">
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12 space-y-12 sm:space-y-16 md:space-y-20">
          {/* Hero Section */}
          <section className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 max-w-7xl">
            <motion.div
              className="relative mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl 
                       transform hover:scale-[1.01] transition-all duration-500 
                       ease-out bg-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={simpleFadeIn}
            >
              <img
                src={images.main.src}
                alt={images.main.alt}
                className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/70 
                         via-black/50 to-transparent"
              />
              <motion.div
                className="absolute top-1/2 left-2 sm:left-6 md:left-12 transform -translate-y-1/2 
                         text-white max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl p-2 sm:p-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleRise}
              >
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 md:mb-6 lg:mb-8 
                           leading-tight tracking-tight animate-fade-in font-display"
                >
                  {heroContent.title}
                </h1>
                <p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 
                           animate-fade-in-delayed font-light"
                >
                  {heroContent.description}
                </p>
              </motion.div>
            </motion.div>

            {/* Desktop Image Grid */}
            <motion.div
              className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
              variants={simpleGridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {Object.entries(images)
                .filter(([key]) => key.startsWith('bottom'))
                .map(([key, image]) => renderImageCard(key, image))}
            </motion.div>

            {/* Mobile Carousel */}
            <motion.div
              className="md:hidden"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={5000}
                transitionTime={500}
                className="rounded-xl sm:rounded-2xl overflow-hidden"
                stopOnHover
                swipeable
                emulateTouch
              >
                {Object.entries(images)
                  .filter(([key]) => key.startsWith('bottom'))
                  .map(([key, image]) => renderCarouselItem(key, image))}
              </Carousel>
            </motion.div>
          </section>

          {/* Mission Section */}
          <motion.section
            className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 items-center px-2 sm:px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={simpleFadeIn}
          >
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <div
                className="inline-block px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r 
                         from-red-500/10 to-orange-500/10 rounded-full"
              >
                <span
                  className="text-xs sm:text-sm font-bold text-red-600 tracking-wider 
                           uppercase"
                >
                  Empowering Young Learners
                </span>
              </div>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black space-y-1 sm:space-y-2 
                         font-display tracking-tight"
                variants={subtleRise}
              >
                <span className="font-bold tracking-wider font-Caveat text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                  Our Mission?
                </span>
                <div>
                  <div
                    className="text-transparent bg-clip-text bg-gradient-to-r 
                              from-red-500 to-orange-500 font-Caveat text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  >
                    Authentic
                  </div>
                  <span className="font-semibold">Problem</span>
                  <br />
                  <span className="font-semibold">Solving</span>
                </div>
              </motion.h2>

              <motion.h4
                className="text-base sm:text-lg md:text-xl font-bold text-gray-800"
                variants={subtleRise}
              >
                Igniting Curiosity through Project Based Learning
              </motion.h4>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg font-Roboto">
                Empowering Young Minds with Hands-on Learning, Transforming
                Curiosity into Discovery and Innovation.
              </p>
            </div>

            <motion.div className="relative" variants={subtleRise}>
              <div className="bg-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
                {/* Background Image */}
                <motion.img
                  src={mission.learnImage}
                  alt="Students learning"
                  className="w-full rounded-xl sm:rounded-2xl transform hover:scale-105 
                 transition-all duration-500 ease-out"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                />

                {/* Card on Top Left */}
                {windowWidth >= 270 && (
                  <motion.div
                    className="absolute top-2 left-2 bg-black/60
                    backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-6 shadow-lg 
                    max-w-[180px] sm:max-w-[220px] md:max-w-xs transform hover:scale-105 
                    transition-all duration-300 ease-out z-10 border border-white/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    {windowWidth >= 355 && (
                      <>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-100 font-AnonymousPro">
                          Project Based Learning
                        </h3>
                        <p className="text-white text-xs sm:text-sm leading-tight sm:leading-snug">
                          Empowering learners and educators with hands-on
                          project-based tools that enable creation and
                          real-world problem-solving.
                        </p>
                      </>
                    )}
                    {windowWidth < 355 && windowWidth >= 250 && (
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 font-AnonymousPro">
                        Project Based Learning
                      </h3>
                    )}
                  </motion.div>
                )}

                {/* Card on Bottom Right */}
                {windowWidth >= 270 && (
                  <motion.div
                    className="absolute bottom-2 right-2 bg-black/60
                    backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-6 shadow-lg 
                    max-w-[180px] sm:max-w-[220px] md:max-w-xs transform hover:scale-105 
                    transition-all duration-300 ease-out z-10 border border-white/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    {windowWidth >= 355 && (
                      <>
                        <h3 className="text-base sm:text-lg font-bold mb-1 text-amber-100 font-AnonymousPro">
                          Challenge and Fun: It's hard fun.
                        </h3>
                        <p className="text-white text-xs sm:text-sm leading-tight sm:leading-snug">
                          Bringing interactive, meaningful experiences that make
                          education exciting and impactful.
                        </p>
                      </>
                    )}
                    {windowWidth < 355 && windowWidth >= 270 && (
                      <h3 className="text-base sm:text-lg font-bold text-amber-100 font-AnonymousPro">
                        Challenge and Fun: It's hard fun.
                      </h3>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default Info;
