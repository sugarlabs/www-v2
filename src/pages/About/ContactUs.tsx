import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/constants/Footer';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
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

const ContactUs: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-r from-blue-900 to-indigo-900"
        >
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute w-full h-full opacity-5"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="grid"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 8 0 L 0 0 0 8"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="max-w-3xl"
              variants={slideInBottom}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                variants={slideInBottom}
                initial="hidden"
                animate="visible"
              >
                Contact <span className="text-blue-200">Sugar Labs</span>
              </motion.h1>
              <motion.div
                className="w-20 h-1 bg-blue-400 mb-6"
                variants={dividerVariants}
                initial="hidden"
                animate="visible"
              ></motion.div>
              <motion.p
                className="text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed"
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Contact Information Card */}
            <motion.div
              className="lg:col-span-7 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-shadow duration-300 hover:shadow-lg"
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 md:p-8 lg:p-10">
                <motion.h2
                  className="text-2xl font-bold text-gray-800 mb-8 flex items-center"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-sm"></span>
                  How to Reach Us
                </motion.h2>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 lg:gap-x-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Mail Address */}
                  <ContactMethod
                    iconSrc="assets/Icons/mail.svg"
                    title="By Mail"
                    description={
                      <address className="mt-2 not-italic text-gray-600 leading-relaxed text-sm">
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
                    iconSrc="assets/Icons/phone.svg"
                    title="By Phone"
                    description={
                      <a
                        href="tel:+16177024088"
                        className="mt-2 text-gray-600 hover:text-blue-600 transition duration-200 block text-sm"
                      >
                        +1 (617) 702-4088
                      </a>
                    }
                  />

                  {/* Email */}
                  <ContactMethod
                    iconSrc="assets/Icons/email.svg"
                    title="By Email"
                    description={
                      <a
                        href="mailto:info@sugarlabs.org"
                        className="mt-2 text-gray-600 hover:text-blue-600 transition duration-200 block text-sm"
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
                      <a
                        href="https://wiki.sugarlabs.org/go/Matrix"
                        className="mt-2 text-gray-600 hover:text-blue-600 transition duration-200 block text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        wiki.sugarlabs.org/go/Matrix
                      </a>
                    }
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Social Connect Card */}
            <motion.div
              className="lg:col-span-5 rounded-xl overflow-hidden shadow-md"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 p-6 md:p-8 lg:p-10">
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 flex items-center"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="w-1.5 h-6 bg-blue-500 mr-3 rounded-sm"></span>
                  Connect With The Community
                </motion.h2>

                <motion.p
                  className="text-gray-300 text-sm leading-relaxed mb-8"
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
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"
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
                      className="group flex flex-col items-center"
                      variants={bounce}
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-white/10 group-hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 ease-in-out mb-2 border border-gray-700/50 shadow-sm group-hover:shadow-blue-500/10 group-hover:shadow-md">
                        <img
                          src={social.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="filter brightness-0 invert opacity-90"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
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
                <h3 className="text-xs uppercase font-bold text-gray-300 tracking-wider mb-2">
                  Follow Our Progress
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
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
      className="flex-shrink-0 p-3 bg-blue-50 rounded-lg text-blue-600 border border-blue-100"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <img src={iconSrc} alt="" className="h-5 w-5" aria-hidden="true" />
    </motion.div>
    <div className="ml-4">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
        {title}
      </h3>
      {description}
    </div>
  </motion.div>
);

export default ContactUs;
