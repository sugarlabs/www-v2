import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/constants/Footer';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { Link } from 'react-router-dom';
import {
  simpleFadeIn,
  container,
  item,
  testimonialHeading,
  decorativeElement,
  dividerVariants,
} from '@/styles/Animations';

const ContactUs: React.FC = () => {
  return (
    <div>
      <Header />
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Section header with animations */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={testimonialHeading}
            >
              <motion.span
                className="text-blue-500 font-Pacifico"
                variants={decorativeElement}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Get{' '}
              </motion.span>
              In Touch
            </motion.h2>

            <div className="flex justify-center">
              <motion.div
                className="h-1 bg-blue-500 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={dividerVariants}
              ></motion.div>
            </div>

            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={simpleFadeIn}
            >
              Get in touch with the Sugar Labs community. We're here to help and
              answer any questions you might have.
            </motion.p>
          </div>

          {/* Contact Methods Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Mail Address */}
            <ContactMethod
              iconSrc="assets/Icons/mail.svg"
              title="By Mail"
              description={
                <address className="mt-3 not-italic text-gray-600 leading-relaxed text-sm">
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
                  className="mt-3 text-gray-600 hover:text-blue-500 transition duration-300 block text-sm font-medium"
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
                  className="mt-3 text-gray-600 hover:text-blue-500 transition duration-300 block text-sm font-medium"
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
                  className="mt-3 text-gray-600 hover:text-blue-500 transition duration-300 block text-sm font-medium"
                >
                  Go to Matrix Chat
                </Link>
              }
            />
          </motion.div>

          {/* Social Connect Section */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={simpleFadeIn}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Connect With The Community
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our global community of educators, developers, and learners
              who are passionate about bringing educational software to children
              around the world.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.name} page`}
                className="group flex flex-col items-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
                variants={item}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={social.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="filter brightness-0 invert"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-center">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
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
    className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    variants={item}
    whileHover="hover"
  >
    <div className="flex justify-center pt-8 pb-4 relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <img
          src={iconSrc}
          alt=""
          className="h-8 w-8 filter brightness-0 invert"
          aria-hidden="true"
        />
      </div>
    </div>

    <div className="flex flex-col flex-grow p-5 gap-3">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>

      <div className="w-16 h-0.5 bg-gray-200 mx-auto"></div>
      <div className="flex-grow">
        <div className="text-gray-600 text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  </motion.div>
);

export default ContactUs;
