import {
  ExternalLink,
  Code,
  Terminal,
  Building,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { matrixLinks } from '@/constants/matrixLinks';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';

const Matrix = () => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-6 w-6" />;
      case 'terminal':
        return <Terminal className="h-6 w-6" />;
      case 'building':
        return <Building className="h-6 w-6" />;
      case 'message':
        return <MessageCircle className="h-6 w-6" />;
      default:
        return <ExternalLink className="h-6 w-6" />;
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3 },
    },
  };

  const lineAnimation = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFFEF9]">
      <Header />
      <main className="flex-grow">
        {/* Hero Section*/}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black via-gray-800 to-white"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/matrix-bg-pattern.svg')] opacity-10"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center z-10 relative">
              <motion.h1
                className="font-black text-5xl md:text-6xl lg:text-7xl mb-6 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Matrix Chat
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Connect with our vibrant community through Matrix — an open
                network for secure, decentralized communication that puts you in
                control.
              </motion.p>
              <motion.a
                href="#get-started"
                className="bg-[#D4B062] hover:bg-white hover:text-black text-black font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
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
          className="py-16 bg-[#FFFEF9]"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                className="text-3xl font-bold mb-6 text-magazine-navy border-b-2 border-[#D4B062] pb-2 inline-block"
                variants={fadeIn}
              >
                What is Matrix?
              </motion.h2>
              <motion.div
                className="space-y-4 text-lg leading-relaxed"
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
          className="py-16 md:py-24 bg-[#FFFEF9]"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2
              variants={fadeIn}
              className="text-3xl font-bold mb-12 text-center text-magazine-navy"
            >
              Join Our Matrix Rooms
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matrixLinks.map((link) => (
                <motion.div
                  key={link.id}
                  variants={cardAnimation}
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                      {/* Icon container now with circular background and white icon */}
                      <div className="bg-[#D4B062] p-3 rounded-full border-2 border-[#D4B062] text-white">
                        {getIcon(link.icon)}
                      </div>
                      <h3 className="font-bold text-xl">{link.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {link.description}
                    </p>
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#D4B062] hover:text-magazine-navy transition-colors font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Join Room <ExternalLink className="ml-2 h-4 w-4" />
                    </motion.a>
                  </div>
                </motion.div>
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
          className="py-16 bg-[#FFFEF9]"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2
              variants={fadeIn}
              className="text-3xl font-bold mb-10 text-center text-magazine-navy"
            >
              How to Get Started with Matrix
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              {/* Timeline container */}
              <div className="relative">
                {/* Center line with animation */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-500/70"
                  variants={lineAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,146,0,0.1), rgba(255,146,0,0.7), rgba(255,146,0,0.1))',
                  }}
                ></motion.div>

                {/* Timeline items */}
                <div className="space-y-16">
                  {/* Step 1 */}
                  <motion.div variants={fadeIn} className="relative">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold text-magazine-navy mb-2">
                            Choose a Matrix client
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Element is the most popular Matrix client, available
                            on web, desktop, iOS, and Android. Visit{' '}
                            <a
                              href="https://element.io/get-started"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#D4B062] hover:underline"
                            >
                              element.io
                            </a>{' '}
                            to download.
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4B062] flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div className="md:w-1/2 md:pl-8 md:text-left">
                        <motion.div
                          className="flex items-center"
                          whileHover={{ x: 5 }}
                        >
                          <div className="bg-[#D4B062] p-2 rounded-full border-2 border-[#D4B062] text-white mr-3">
                            <Terminal className="h-5 w-5" />
                          </div>
                          <span className="text-magazine-navy font-bold text-lg">
                            Select Client
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div variants={fadeIn} className="relative">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                        <motion.div
                          className="flex items-center justify-end"
                          whileHover={{ x: -5 }}
                        >
                          <span className="text-magazine-navy font-bold text-lg mr-3">
                            Create Account
                          </span>
                          <div className="bg-[#D4B062] p-2 rounded-full border-2 border-[#D4B062] text-white">
                            <Building className="h-5 w-5" />
                          </div>
                        </motion.div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4B062] flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div className="md:w-1/2 md:pl-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold text-magazine-navy mb-2">
                            Create an account
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            You can create an account on the Matrix.org
                            homeserver or any other public homeserver. You'll
                            need to provide a username and password.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div variants={fadeIn} className="relative">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold text-magazine-navy mb-2">
                            Join our rooms
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Use the links in the section above to join our
                            community rooms. You can also search for rooms
                            within your Matrix client using the room addresses.
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4B062] flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div className="md:w-1/2 md:pl-8">
                        <motion.div
                          className="flex items-center"
                          whileHover={{ x: 5 }}
                        >
                          <div className="bg-[#D4B062] p-2 rounded-full border-2 border-[#D4B062] text-white mr-3">
                            <MessageCircle className="h-5 w-5" />
                          </div>
                          <span className="text-magazine-navy font-bold text-lg">
                            Connect
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 4 */}
                  <motion.div variants={fadeIn} className="relative">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                        <motion.div
                          className="flex items-center justify-end"
                          whileHover={{ x: -5 }}
                        >
                          <span className="text-magazine-navy font-bold text-lg mr-3">
                            Start Chatting
                          </span>
                          <div className="bg-[#D4B062] p-2 rounded-full border-2 border-[#D4B062] text-white">
                            <Code className="h-5 w-5" />
                          </div>
                        </motion.div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4B062] flex items-center justify-center">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div className="md:w-1/2 md:pl-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold text-magazine-navy mb-2">
                            Engage with the community
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Introduce yourself, ask questions, share your
                            expertise, and become an active part of our growing
                            Matrix community.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
