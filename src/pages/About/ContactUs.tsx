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
  heroAnimations,
  statCard,
} from '@/styles/Animations';

const ContactUs: React.FC = () => {
  const title = 'CONTACT US'.split('');

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-[35vh] flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced background elements with gradient overlays */}
        <motion.div
          className="absolute top-5 left-5 sm:top-10 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 blur-xl sm:blur-2xl opacity-60"
          variants={fadeIn}
          custom={0.2}
          initial="hidden"
          animate="visible"
        />
        <motion.div
          className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-emerald-300 to-teal-400 blur-xl sm:blur-2xl opacity-50"
          variants={fadeIn}
          custom={0.4}
          initial="hidden"
          animate="visible"
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 blur-xl sm:blur-2xl opacity-40"
          variants={fadeIn}
          custom={0.6}
          initial="hidden"
          animate="visible"
        />

        {/* Main content container */}
        <motion.div
          className="relative z-10 max-w-full"
          variants={subtleRise}
          initial="hidden"
          animate="visible"
        >
          {/* Main title with animated letters */}
          <motion.h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight relative inline-block font-Caveat">
            <div className="flex justify-center items-center relative">
              {title.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={heroAnimations.letterAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    index >= title.length - 2
                      ? 'text-blue-800'
                      : 'text-slate-800'
                  }
                  whileHover={{
                    scale: 1.2,
                    rotate: Math.random() * 10 - 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}

              {/* Animated underline with gradient */}
              <motion.div
                className="absolute -z-10 h-3 sm:h-6 bottom-1 sm:bottom-2 left-0 transform -skew-x-6 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-300 opacity-70"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </div>
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            className="w-16 sm:w-24 h-1 sm:h-1.5 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-blue-500 to-slate-500"
            variants={dividerVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Subtitle */}
          <motion.h2
            className="text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-3xl mx-auto leading-relaxed font-Caveat relative text-slate-700"
            variants={slideInBottom}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span
              className="relative inline-block"
              variants={heroAnimations.hoverText}
              whileHover="hover"
            >
              Get in touch with the{' '}
              <span className="text-rose-500 font-semibold">
                Sugar Labs
              </span>
            </motion.span>{' '}
            <motion.span
              className="relative inline-block"
              variants={heroAnimations.hoverText}
              whileHover="hover"
            >
              <span className="text-emerald-500 font-semibold">
                community
              </span>
            </motion.span>{' '}
            <motion.span
              variants={bounce}
              animate="visible"
              className="inline-block"
            >
              today
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Interactive mouse-follow effect */}
        <motion.div
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-full blur-2xl sm:blur-3xl opacity-30"
          variants={heroAnimations.mouseFollow}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          style={{
            mixBlendMode: 'multiply',
          }}
        />
      </motion.section>

      {/* Main Content */}
      <section className="w-full pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Information Card */}
            <motion.div
              className="lg:col-span-7"
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="p-8 lg:p-12">
                  <motion.div
                    className="mb-8"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-Caveat">
                      How to Reach Us
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      We'd love to hear from you. Here's how you can reach our team of
                      educational innovators and community members.
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Mail Address */}
                    <ContactMethod
                      iconSrc="assets/Icons/mail.svg"
                      title="By Mail"
                      description={
                        <address className="mt-3 not-italic text-gray-600 leading-relaxed">
                          Sugar Labs
                          <br />
                          2028 E Ben White Blvd <strong>STE 240 PMB 1271</strong>
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
                          className="mt-3 text-gray-600 hover:text-blue-600 transition duration-300 block text-lg font-medium"
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
                          className="mt-3 text-gray-600 hover:text-blue-600 transition duration-300 block text-lg font-medium"
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
                          className="mt-3 text-gray-600 hover:text-blue-600 transition duration-300 block text-lg font-medium"
                        >
                          Go to Matrix Chat
                        </Link>
                      }
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Social Connect Card */}
            <motion.div
              className="lg:col-span-5"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="p-8 lg:p-12">
                  <motion.div
                    className="mb-8"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-Caveat">
                      Connect With The Community
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mb-6"></div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Join our global community of educators, developers, and
                      learners who are passionate about bringing educational
                      software to children around the world.
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8"
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
                        className="group flex flex-col items-center p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50"
                        variants={statCard}
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 group-hover:from-blue-500/30 group-hover:to-emerald-500/30 rounded-xl backdrop-blur-sm transition-all duration-300 mb-3">
                          <img
                            src={social.icon}
                            alt=""
                            width={24}
                            height={24}
                            className="filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center">
                          {social.name}
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-bold text-white mb-3">
                      Follow Our Progress
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Stay updated with our latest developments and educational
                      initiatives. Join thousands of educators worldwide.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
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
  <motion.div
    className="group"
    variants={statCard}
    whileHover="hover"
  >
    <div className="flex items-start p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
      <motion.div
        className="flex-shrink-0 p-4 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <img src={iconSrc} alt="" className="h-6 w-6" aria-hidden="true" />
      </motion.div>
      <div className="ml-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        {description}
      </div>
    </div>
  </motion.div>
);

export default ContactUs;