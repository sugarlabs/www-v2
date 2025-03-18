import React, { useState } from 'react';
import { donationData } from '@/constants/Donation';
import { Link } from 'react-router-dom';
import { volunteerImages } from '@/constants/Volunteer';
import { motion } from 'framer-motion';
import {
  fadeIn,
  slideInLeft,
  slideInRight,
  slideInBottom,
  bounce,
  staggerContainer,
  floatingCircle,
  buttonAnimation,
} from '@/styles/Animations';

const Donation: React.FC = () => {
  const handleClick = () => {
    window.location.href = donationData.url;
  };

  const [Email, setEmail] = useState('');

  return (
    <section className="relative overflow-hidden bg-white text-black py-16 px-4">
      {/* Animated background circles */}
      <motion.div
        className="absolute top-1/8 right-1/6 w-96 h-96 bg-[#8df090] rounded-full -mt-32 -mr-32 z-1"
        variants={floatingCircle}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute top-1/2 right-1/6 w-96 h-96 bg-[#ebee67] rounded-full -mt-32 -mr-64 z-0"
        variants={floatingCircle}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      />

      <div className="relative z-10">
        <motion.div
          className="container mx-auto text-left"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            className="font-Caveat text-2xl uppercase"
            variants={slideInLeft}
          >
            {donationData.subHeading}
          </motion.p>
          <motion.h1 className="text-4xl font-bold mt-2" variants={slideInLeft}>
            {donationData.heading}
          </motion.h1>
          <motion.p className="text-lg mt-4" variants={slideInLeft}>
            {donationData.paragraph}
          </motion.p>
          <motion.button
            onClick={handleClick}
            className="mt-6 px-6 py-3 bg-[#fbd04d] text-black text-2xl font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 outline-4 uppercase"
            variants={bounce}
            whileHover="hover"
            whileTap="tap"
          >
            {donationData.buttonText}
          </motion.button>
        </motion.div>

        <Link to="/volunteer">
          <motion.div
            className="mt-12 flex justify-center items-center"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -top-8 -right-8"
                animate={{
                  x: [0, 10, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                  },
                }}
              >
                <i className="fas fa-arrow-right text-2xl" />
              </motion.div>
              <motion.div
                className="bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {volunteerImages.map((volunteer, index) => (
                  <motion.img
                    key={volunteer.id}
                    alt={volunteer.alt}
                    className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                    src={volunteer.src}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  />
                ))}
                <span className="ml-4 text-sm">Join the volunteer</span>
                <motion.span
                  className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 10,
                      delay: 0.3,
                    },
                  }}
                >
                  +1000
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </Link>

        <motion.div
          className="mt-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="text-lg" variants={fadeIn}>
            Join Us to Empower Young Learners all Across the Globe. The simplest
            way to get involved is to join our newsletter.
          </motion.p>
          <motion.div
            className="mt-4 flex justify-center items-center"
            variants={slideInRight}
          >
            <motion.form
              action="https://buttondown.com/api/emails/embed-subscribe/sugarlabs"
              method="post"
              onSubmit={() => setTimeout(() => setEmail(''), 500)}
            >
              <input
                className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input value="1" type="hidden" name="embed" />
              <motion.button
                className="px-6 py-2 bg-red-500 text-white font-bold rounded-r-full shadow-lg hover:bg-red-600 transition duration-300"
                variants={buttonAnimation}
                whileHover="whileHover"
                whileTap="whileTap"
                type="submit"
              >
                SUBSCRIBE
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Donation;
