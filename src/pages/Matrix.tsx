import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Code,
  Terminal,
  Building,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { matrixLinks } from '@/constants/matrixLinks';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import {
  fadeIn,
  subtleRise,
  staggerContainer,
  statCard,
  headerReveal,
  simpleFadeIn,
  lineAnimation,
} from '@/styles/Animations';

interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLeft: boolean;
  link?: {
    url: string;
    text: string;
  };
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  title,
  description,
  icon,
  isLeft,
  link,
}) => (
  <motion.div variants={subtleRise} className="relative">
    <div className="md:hidden relative pl-12 pb-10">
      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#D4B062] flex items-center justify-center z-10">
        <span className="text-white font-bold">{step}</span>
      </div>
      <div className="absolute left-4 top-8 h-full w-[1px] bg-[#D4B062]/30"></div>
      <div className="bg-[#D4B062] p-2 rounded-full border-2 border-[#D4B062] text-white mb-3 inline-flex">
        {icon}
      </div>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-magazine-navy dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
          {link && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4B062] hover:underline hover:text-[#e0c17d] dark:text-[#e0c17d] dark:hover:text-[#f0d18d] ml-1 inline-flex items-center"
            >
              {link.text} <ChevronRight className="h-3 w-3 ml-1" />
            </a>
          )}
        </p>
      </div>
    </div>

    <div className="hidden md:flex flex-row items-center">
      {isLeft ? (
        <>
          <div className="w-1/2 pr-8 mb-0 text-right">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-magazine-navy dark:text-gray-100 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
                {link && (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4B062] hover:text-[#e0c17d] dark:text-[#e0c17d] dark:hover:text-[#f0d18d] hover:underline ml-1 inline-flex items-center"
                  >
                    {link.text} <ChevronRight className="h-3 w-3 ml-1" />
                  </a>
                )}
              </p>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4B062] flex items-center justify-center z-10">
            <span className="text-white font-bold">{step}</span>
          </div>
          <div className="w-1/2 pl-8 text-left">
            <motion.div className="flex items-center" whileHover={{ x: 5 }}>
              <div className="bg-[#D4B062] p-2 rounded-full border-2 border-[#D4B062] text-white mr-3">
                {icon}
              </div>
              <span className="text-magazine-navy dark:text-gray-100 font-bold text-lg">
                {title.split(' ')[0]}
              </span>
            </motion.div>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/2 pr-8 mb-0 text-right">
            <motion.div
              className="flex items-center justify-end"
              whileHover={{ x: -5 }}
            >
              <span className="text-magazine-navy dark:text-gray-100 font-bold text-lg mr-3">
                {title.split(' ')[0]}
              </span>
              <div className="bg-[#D4B062] p-2 rounded-full border-2 border-[#D4B062] text-white">
                {icon}
              </div>
            </motion.div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4B062] flex items-center justify-center z-10">
            <span className="text-white font-bold">{step}</span>
          </div>
          <div className="w-1/2 pl-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-magazine-navy dark:text-gray-100 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
                {link && (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4B062] hover:text-[#e0c17d] dark:text-[#e0c17d] dark:hover:text-[#f0d18d] hover:underline ml-1 inline-flex items-center"
                  >
                    {link.text} <ChevronRight className="h-3 w-3 ml-1" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  </motion.div>
);

interface RoomCardProps {
  link: {
    id: string;
    title: string;
    description: string;
    url: string;
    icon?: string;
  };
  getIcon: (iconName?: string) => React.ReactNode;
}

const RoomCard: React.FC<RoomCardProps> = ({ link, getIcon }) => (
  <motion.div
    key={link.id}
    variants={statCard}
    whileHover="hover"
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full"
  >
    <div className="p-4 sm:p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#D4B062] p-2 sm:p-3 rounded-full text-white flex-shrink-0">
          {getIcon(link.icon)}
        </div>
        <h3 className="font-bold text-lg sm:text-xl text-magazine-navy dark:text-gray-100">
          {link.title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base flex-grow">
        {link.description}
      </p>
      <motion.a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-[#D4B062] hover:text-[#e0c17d] dark:text-[#e0c17d] dark:hover:text-[#f0d18d] transition-colors font-medium mt-auto"
        whileHover={{ x: 5 }}
      >
        Join Room <ExternalLink className="ml-2 h-4 w-4" />
      </motion.a>
    </div>
  </motion.div>
);

const Matrix: React.FC = () => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 'terminal':
        return <Terminal className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 'building':
        return <Building className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />;
      default:
        return <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />;
    }
  };

  const timelineSteps = [
    {
      step: 1,
      title: 'Choose a Matrix client',
      description:
        'Element is the most popular Matrix client, available on web, desktop, iOS, and Android.',
      icon: <Terminal className="h-5 w-5" />,
      isLeft: true,
      link: {
        url: 'https://element.io/get-started',
        text: 'element.io',
      },
    },
    {
      step: 2,
      title: 'Create an account',
      description:
        "You can create an account on the Matrix.org homeserver or any other public homeserver. You'll need to provide a username and password.",
      icon: <Building className="h-5 w-5" />,
      isLeft: false,
    },
    {
      step: 3,
      title: 'Join our rooms',
      description:
        'Use the links in the section above to join our community rooms. You can also search for rooms within your Matrix client using the room addresses.',
      icon: <MessageCircle className="h-5 w-5" />,
      isLeft: true,
    },
    {
      step: 4,
      title: 'Engage with the community',
      description:
        'Introduce yourself, ask questions, share your expertise, and become an active part of our growing Matrix community.',
      icon: <Code className="h-5 w-5" />,
      isLeft: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFFEF9] dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        {/* Hero Section*/}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={subtleRise}
          className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black via-gray-800 to-white"
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
              <motion.h1
                className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-white"
                variants={headerReveal}
              >
                Matrix <span className="text-[#D4B062]">Chat</span>
              </motion.h1>
              <motion.div
                className="w-16 sm:w-24 h-1 bg-[#D4B062] mb-4 sm:mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
              <motion.p
                className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300 max-w-2xl leading-relaxed px-4"
                variants={simpleFadeIn}
              >
                Connect with our vibrant community through Matrix — an open
                network for secure, decentralized communication that puts you in
                control.
              </motion.p>
              <motion.a
                href="#get-started"
                className="bg-[#D4B062] hover:bg-white hover:text-black text-black font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Matrix Info */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          className="py-12 sm:py-16 bg-[#FFFEF9] dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                className="text-2xl sm:text-3xl font-bold mb-6 text-magazine-navy dark:text-gray-100 border-b-2 border-[#D4B062] pb-2 inline-block"
                variants={fadeIn}
              >
                What is Matrix?
              </motion.h2>
              <motion.div
                className="space-y-4 text-base sm:text-lg leading-relaxed"
                variants={fadeIn}
              >
                <p>
                  Matrix is an open source project that publishes the Matrix
                  open standard for secure, decentralized, real-time
                  communication, and its Apache licensed reference
                  implementations.
                </p>
                <p>
                  It defines a set of open APIs for decentralized communication,
                  suitable for securely publishing, persisting and subscribing
                  to data over a global open federation of servers with no
                  single point of control.
                </p>
                <p>
                  Matrix can be used for instant messaging, VoIP/WebRTC
                  signaling, IoT communication, and anywhere you need a standard
                  HTTP API for publishing and subscribing to data while tracking
                  the history and the current state.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Matrix Rooms */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="py-12 sm:py-16 md:py-24 bg-[#FFFEF9] dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-8 sm:mb-12" variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-magazine-navy dark:text-gray-100">
                Join Our Matrix Rooms
              </h2>
              <div className="w-16 h-1 bg-[#D4B062] mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {matrixLinks.map((link) => (
                <RoomCard key={link.id} link={link} getIcon={getIcon} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* How to Get Started */}
        <motion.section
          id="get-started"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="py-12 sm:py-16 bg-[#FFFEF9] dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-8 sm:mb-12" variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-magazine-navy dark:text-gray-100">
                How to Get Started with Matrix
              </h2>
              <div className="w-16 h-1 bg-[#D4B062] mx-auto rounded-full"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Timeline container */}
              <div className="relative">
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-500/70 hidden md:block"
                  variants={lineAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(212,176,98,0.1), rgba(212,176,98,0.7), rgba(212,176,98,0.1))',
                  }}
                ></motion.div>

                {/* Timeline items */}
                <div className="space-y-8 md:space-y-16">
                  {timelineSteps.map((step, index) => (
                    <TimelineStep
                      key={index}
                      step={step.step}
                      title={step.title}
                      description={step.description}
                      icon={step.icon}
                      isLeft={step.isLeft}
                      link={step.link}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Matrix;
