import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { ArrowLeft, Home, AlertCircle } from 'lucide-react';
import {
  fadeIn,
  slideInBottom,
  slideInRight,
  slideInLeft,
  bounce,
  dividerVariants,
  staggerContainer,
  statCard,
  decorativeElement,
  buttonAnimation,
  subtleRise,
  cardFadeIn,
} from '@/styles/Animations';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFFEF9] dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative py-5 md:py-15 overflow-hidden bg-gradient-to-b from-black via-gray-800 to-white"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10"></div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>
          </div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center z-10 relative">
              <motion.div
                className="flex items-center justify-center mb-6"
                variants={decorativeElement}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-[#D4B062] p-4 rounded-full border-4 border-white/20">
                  <AlertCircle className="h-12 w-12 text-white" />
                </div>
              </motion.div>
              <motion.h1
                className="font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white"
                variants={slideInBottom}
                initial="hidden"
                animate="visible"
              >
                <span className="text-[#D4B062]">Page Not Found</span>
              </motion.h1>
              <motion.div
                className="w-20 h-1 bg-[#D4B062] mb-6"
                variants={dividerVariants}
                initial="hidden"
                animate="visible"
              ></motion.div>
              <motion.p
                className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl leading-relaxed"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                Oops! It looks like the page you were looking for doesn't exist
                or has been moved.
              </motion.p>
              <motion.a
                href="#solutions"
                className="bg-[#D4B062] hover:bg-white hover:text-black text-black font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                variants={bounce}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                Find Solutions
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          className="py-16 bg-[#FFFEF9] dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 p-8">
              <div className="flex flex-col lg:flex-row items-center justify-center">
                <motion.div
                  className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0"
                  variants={slideInLeft}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#D4B062]/30"
                        style={{
                          width: `${(i + 1) * 50}px`,
                          height: `${(i + 1) * 50}px`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.5,
                          repeat: Infinity,
                        }}
                      ></motion.div>
                    ))}

                    <motion.div
                      className="absolute z-10"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    >
                      <div className="relative">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="60" cy="60" r="60" fill="#D4B062" />
                          <text
                            x="60"
                            y="65"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="white"
                            fontSize="32"
                            fontWeight="bold"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            404
                          </text>
                        </svg>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-[#D4B062]"
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.7, 0.3, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right side - Connection Status */}
                <motion.div
                  variants={slideInRight}
                  className="w-full lg:w-1/2 lg:pl-8"
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="font-bold text-2xl text-magazine-navy dark:text-white mb-4 border-b-2 border-[#D4B062] pb-2 inline-block">
                    Connection Status
                  </h3>

                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Resource not found
                      </p>
                    </motion.div>

                    <motion.div
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Server connection: Active
                      </p>
                    </motion.div>

                    <motion.div className="mt-6" variants={bounce}>
                      <Link to="/">
                        <motion.button
                          className="w-full py-2.5 bg-[#D4B062] hover:bg-magazine-navy text-white font-medium rounded-lg transition-all duration-300 shadow hover:shadow-lg flex items-center justify-center"
                          variants={buttonAnimation}
                          whileHover="whileHover"
                          whileTap="whileTap"
                        >
                          <Home className="h-5 w-5 mr-2" />
                          Return to Homepage
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Solutions Section */}
        <motion.section
          id="solutions"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="py-16 bg-[#FFFEF9] dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2
              variants={subtleRise}
              className="text-3xl font-bold mb-12 text-center text-magazine-navy dark:text-white border-b-2 border-[#D4B062] pb-2 inline-block mx-auto"
            >
              What Happened?
            </motion.h2>

            <div className="max-w-4xl mx-auto mb-16">
              <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  The page you're looking for might have been removed, had its
                  name changed, or is temporarily unavailable. This could be due
                  to:
                </p>

                <div className="space-y-4 pl-4">
                  {[
                    'A mistyped URL',
                    'An outdated link from another website',
                    'A page that has been moved during a website redesign',
                    'A deleted or unpublished page',
                  ].map((reason, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      custom={index}
                      variants={cardFadeIn}
                    >
                      <div className="mr-3 mt-1 text-[#D4B062]">•</div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {reason}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.h2
              variants={subtleRise}
              className="text-3xl font-bold mb-12 text-center text-magazine-navy dark:text-white"
            >
              What You Can Do
            </motion.h2>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <ArrowLeft className="h-6 w-6" />,
                    title: 'Go Back',
                    description:
                      'Return to the previous page you were viewing.',
                    action: () => window.history.back(),
                    actionText: 'Previous Page',
                  },
                  {
                    icon: <Home className="h-6 w-6" />,
                    title: 'Homepage',
                    description:
                      'Visit our homepage to start fresh and find what you need.',
                    link: '/',
                    actionText: 'Back to Home',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={statCard}
                    whileHover="hover"
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="bg-[#D4B062] p-3 rounded-full border-2 border-[#D4B062] text-white">
                          {item.icon}
                        </div>
                        <h3 className="font-bold text-xl text-magazine-navy dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      {item.action ? (
                        <motion.button
                          onClick={item.action}
                          className="inline-flex items-center bg-[#D4B062] hover:bg-magazine-navy text-white px-4 py-2 rounded-lg transition-colors font-medium"
                          variants={buttonAnimation}
                          whileHover="whileHover"
                          whileTap="whileTap"
                        >
                          {item.actionText}
                        </motion.button>
                      ) : (
                        <Link to={item.link || '/'}>
                          <motion.button
                            className="inline-flex items-center bg-[#D4B062] hover:bg-magazine-navy text-white px-4 py-2 rounded-lg transition-colors font-medium"
                            variants={buttonAnimation}
                            whileHover="whileHover"
                            whileTap="whileTap"
                          >
                            {item.actionText}
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
