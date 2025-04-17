import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { donationData } from '@/constants/Donation';
import { volunteerImages } from '@/constants/Volunteer';
import {
  fadeIn,
  slideInLeft,
  slideInRight,
  slideInBottom,
  bounce,
  staggerContainer,
  buttonAnimation,
} from '@/styles/Animations';

const Donation: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleDonateClick = () => {
    window.open(donationData.url, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-white text-black py-16 px-4">
      <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-12">
        {/* Left Side - Text Content */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="italic text-gray-600 text-lg md:text-xl">
            Donate to Sugar Labs to make a{' '}
            <span className="font-bold">Positive</span> Impact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
            <span className="text-red-500">Support</span> and Empower <br />{' '}
            Learners Everywhere
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Support Sugar Labs and make a difference in children's education.
            Sugar Labs has brought educational software and authentic problem
            solving to millions in the US and across the globe.
          </p>

          {/* Donate Now Button */}
          <motion.button
            onClick={handleDonateClick}
            className="mt-6 px-6 py-3 bg-[#fbd04d] text-black text-2xl font-bold rounded-full shadow-md hover:bg-yellow-500 transition duration-300 uppercase"
            variants={bounce}
            whileHover="hover"
            whileTap="tap"
          >
            Donate Now
          </motion.button>
        </motion.div>

        {/* Right Side - Image */}
        <motion.img
          src="assets/Images/DonateToSugarLabs.png"
          alt="Children with laptops and Donate to Sugarlabs"
          className="w-[400px] lg:w-[500px] transition-none hover:transform-none object-contain"
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ scale: 1.01 }}
        />
      </div>

      {/* Newsletter and Volunteer Section*/}
      <div className="relative z-10 w-full mt-12 text-center">
        <Link to="/volunteer">
          <motion.div
            className="flex justify-center items-center"
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
                  transition: { repeat: Infinity, duration: 1.5 },
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

        {/* Newsletter Subscription Section */}
        <motion.div
          className="mt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="text-lg" variants={fadeIn}>
            Join us to empower young learners across the globe. The simplest way
            to get involved is to join our newsletter.
          </motion.p>

          <motion.div
            className="mt-4 flex justify-center items-center"
            variants={slideInRight}
          >
            <motion.form
              action="https://buttondown.com/api/emails/embed-subscribe/sugarlabs"
              method="post"
              onSubmit={() => setTimeout(() => setEmail(''), 500)}
              className="flex"
            >
              <input
                className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={email}
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
