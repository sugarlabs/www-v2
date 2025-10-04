import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/constants/Footer';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { Link } from 'react-router-dom';
import {
  fadeIn,
  slideInLeft,
  slideInRight,
  slideInBottom,
  bounce,
  staggerContainer,
  subtleRise,
  dividerVariants,
} from '@/styles/Animations';

const theme = {
  colors: {
    primary: '#1E3A8A',
    secondary: '#3B82F6',
    textDark: '#1F2937',
    textLight: '#E5E7EB',
    bgLight: '#F9FAFB',
    bgDark: '#111827',
    border: '#D1D5DB',
  },
  typography: {
    heading: 'font-extrabold tracking-tight',
    subheading: 'font-semibold tracking-wide',
    body: 'font-normal leading-relaxed',
  },
};

const ContactUs: React.FC = () => {
  return (
    <>
      <Header />
      <div className={`min-h-screen ${theme.colors.bgLight}`}>
        {/* Hero Section */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative w-full bg-gradient-to-br from-blue-900 to-indigo-900 py-24 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 z-0 opacity-10">
            <svg className="w-full h-full" fill="none" viewBox="0 0 960 540">
              <pattern
                id="pattern-zigzag"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 10L10 0L20 10M10 20L0 10"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#pattern-zigzag)"
              />
            </svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              className="max-w-4xl mx-auto"
              variants={slideInBottom}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className={`text-4xl md:text-6xl ${theme.typography.heading} text-white mb-4`}
                variants={slideInBottom}
                initial="hidden"
                animate="visible"
              >
                Contact <span className="text-blue-200">Sugar Labs</span>
              </motion.h1>
              <motion.div
                className="w-24 h-1.5 bg-blue-400 mx-auto mb-6 rounded-full"
                variants={dividerVariants}
                initial="hidden"
                animate="visible"
              ></motion.div>
              <motion.p
                className={`text-lg md:text-xl ${theme.typography.body} text-gray-200 max-w-3xl mx-auto leading-relaxed`}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                We'd love to hear from you. Here's how you can reach our team of
                educational innovators.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
            {/* Contact Information Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl overflow-hidden"
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 md:p-10 lg:p-12">
                <motion.h2
                  className={`text-3xl ${theme.typography.heading} text-gray-800 mb-8 flex items-center`}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="w-2 h-8 bg-blue-600 mr-4 rounded-sm"></span>
                  How to Reach Us
                </motion.h2>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Mail Address */}
                  <ContactMethod
                    iconSrc="assets/Icons/mail.svg"
                    title="By Mail"
                    description={
                      <address
                        className={`mt-2 not-italic ${theme.typography.body} text-gray-600 text-sm`}
                      >
                        Sugar Labs
                        <br />
                        2028 E Ben White Blvd <b>STE 240 PMB 1271</b>
                        <br />
                        AUSTIN, TX 78741
                        <br />
                        USA
                      </address>
                    }
                  />

                  {/* Phone */}
                  <ContactMethod
                    iconSrc="/assets/Icons/phone.svg"
                    title="By Phone"
                    description={
                      <a
                        href="tel:+16177024088"
                        className={`mt-2 ${theme.typography.body} text-blue-600 hover:text-blue-800 transition duration-200 block text-sm`}
                      >
                        +1 (617) 702-4088
                      </a>
                    }
                  />

                  {/* Email */}
                  <ContactMethod
                    iconSrc="/assets/Icons/email.svg"
                    title="By Email"
                    description={
                      <a
                        href="mailto:info@sugarlabs.org"
                        className={`mt-2 ${theme.typography.body} text-blue-600 hover:text-blue-800 transition duration-200 block text-sm`}
                      >
                        info@sugarlabs.org
                      </a>
                    }
                  />

                  {/* Matrix Chat */}
                  <ContactMethod
                    iconSrc="assets/Icons/chat.svg"
                    title="Via Matrix Chat"
                    description={
                      <Link
                        to="matrix"
                        className={`mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-200 text-sm inline-block ${theme.typography.subheading}`}
                      >
                        Go to Matrix Chat
                      </Link>
                    }
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Social Connect Card */}
            <motion.div
              className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 md:p-10 lg:p-12">
                <motion.h2
                  className={`text-3xl ${theme.typography.heading} text-white mb-6 flex items-center`}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="w-1.5 h-6 bg-blue-500 mr-3 rounded-sm"></span>
                  Connect With The Community
                </motion.h2>

                <motion.p
                  className={`${theme.typography.body} text-gray-300 text-base leading-relaxed mb-10`}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Join our global community of educators, developers, and
                  learners who are passionate about bringing educational
                  software to children around the world.
                </motion.p>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.name} page`}
                      className="group flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg"
                      variants={bounce}
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                    >
                      <div className="flex items-center justify-center w-14 h-14 bg-blue-600/20 group-hover:bg-blue-500/30 rounded-full backdrop-blur-sm transition-all duration-300 ease-in-out mb-3 shadow-lg">
                        <img
                          src={social.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        />
                      </div>
                      <span
                        className={`text-sm ${theme.typography.subheading} text-gray-100 group-hover:text-blue-200 transition-colors duration-200 text-center`}
                      >
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="bg-gray-800 p-5 md:p-6 border-t border-gray-700/50"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <h3
                  className={`text-sm uppercase ${theme.typography.subheading} text-gray-300 tracking-wider mb-2`}
                >
                  Follow Our Progress
                </h3>
                <p
                  className={`text-xs ${theme.typography.body} text-gray-400 leading-relaxed`}
                >
                  Stay updated with our latest developments and educational
                  initiatives.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

interface ContactMethodProps {
  iconSrc: string;
  title: string;
  description: React.ReactNode;
}

const ContactMethod: React.FC<ContactMethodProps> = ({
  iconSrc,
  title,
  description,
}) => (
  <motion.div className="flex items-start" variants={subtleRise}>
    <motion.div
      className="flex-shrink-0 p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-sm"
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <img src={iconSrc} alt="" className="h-5 w-5" aria-hidden="true" />
    </motion.div>
    <div className="ml-4">
      <h3
        className={`text-base font-bold text-gray-800 uppercase tracking-wider mb-1 ${theme.typography.subheading}`}
      >
        {title}
      </h3>
      {description}
    </div>
  </motion.div>
);

export default ContactUs;
