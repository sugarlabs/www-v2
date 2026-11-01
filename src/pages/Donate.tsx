import React, { useState } from 'react';
import {
  IMPACT_STATS,
  FINANCIAL_FILINGS,
  donationData,
  Img,
} from '@/constants/Donation';
import {
  slideInLeft,
  slideInRight,
  slideInBottom,
  buttonAnimation,
} from '@/styles/Animations';
import Footer from '@/sections/Footer';
import Header from '@/sections/Header';
import { AnimatePresence, motion } from 'framer-motion';

const Donate: React.FC = () => {
  const [showAllFilings, setShowAllFilings] = useState(false);
  const [openMissionPanel, setOpenMissionPanel] = useState<number | null>(null);
  const [openImpactCards, setOpenImpactCards] = useState<number[]>([]);
  const initialFilingsToShow = 5;
  const hasMoreFilings = FINANCIAL_FILINGS.length > initialFilingsToShow;

  const visibleFilings = showAllFilings
    ? FINANCIAL_FILINGS
    : FINANCIAL_FILINGS.slice(0, initialFilingsToShow);

  return (
    <>
      <Header />
      <div className="dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 font-sans mt-10 sm:mt-10 mb-10 sm:mb-16">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-10">
            {/* Left Column with Heading and Buttons */}
            <motion.div
              className="flex-1 order-2 md:order-1"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-[0.8] overflow-visible">
                Make a Lasting{' '}
                <span
                  className="
    relative inline-block
    translate-y-2
    pb-8 pr-6
    text-transparent bg-clip-text
    bg-gradient-to-r from-red-500 to-orange-500
    font-Caveat font-extrabold
    text-6xl sm:text-7xl md:text-8xl
    hover:-translate-y-1 hover:scale-110 hover:rotate-2
    transition-all duration-300
    cursor-pointer
  "
                >
                  Impact
                </span>
                in Education
              </h1>

              <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">
                A financial contribution to Sugar Labs is an investment in
                education. Your tax-deductible donation helps us create
                innovative tools for teaching and learning while mentoring
                budding developers from around the world.
              </p>

              <motion.div
                className="flex flex-wrap gap-4 mb-6 sm:mb-8"
                variants={buttonAnimation}
                whileHover="hover"
                whileTap="tap"
              >
                <a href={donationData.url} target="_blank" rel="noreferrer">
                  <button className="bg-green-600 hover:bg-green-700 cursor-pointer transition-colors text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium shadow-md">
                    Donate Now
                  </button>
                </a>
              </motion.div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500 dark:border-blue-400 shadow-sm text-xs sm:text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Your donation is tax-deductible in the United States as Sugar
                  Labs is a registered 501(c)(3) nonprofit organization.
                </p>
              </div>
            </motion.div>

            {/* Right Column with Image */}
            <motion.div
              className="flex-1 order-1 md:order-2 mb-6 md:mb-0"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <img
                src={Img[0]}
                alt="Children asking for donations"
                className="w-full rounded-2xl shadow-lg object-cover object-center aspect-[4/3]"
              />
            </motion.div>
          </div>

          {/* Impact Statement Section */}
          <motion.div
            className="my-10 sm:my-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 p-5 sm:p-8 rounded-xl shadow-sm"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
              Your Donation Directly Assists Our Mission
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <img
                src="/assets/Images/student.webp"
                alt="Student using a laptop for a visual programming activity"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />

              <img
                src="/assets/Images/student2.webp"
                alt="Students exploring creative educational activities"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="prose prose-base sm:prose-lg max-w-none dark:text-gray-300">
              <div className="border-b border-gray-300 dark:border-gray-600 py-4">
                <button
                  onClick={() =>
                    setOpenMissionPanel(openMissionPanel === 0 ? null : 0)
                  }
                  aria-expanded={openMissionPanel === 0}
                  aria-controls="mission-panel-0"
                  className="w-full text-left font-semibold text-lg"
                >
                  Why Computational Literacy Matters
                </button>
                {openMissionPanel === 0 && (
                  <div id="mission-panel-0" className="mt-4">
                    <p className="mb-4">
                      Despite the fact that computers, and the software on those
                      computers, run the way much of the world works, there
                      still remains very little support in education, especially
                      at the levels of primary and secondary schooling, to
                      cultivate a computationally literate society. Despite
                      initiatives, a mere "day of code," sometimes as little as
                      "an hour of code," is woefully insufficient to instill
                      computational literacy in a generation of young learners.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-300 dark:border-gray-600 py-4">
                <button
                  onClick={() =>
                    setOpenMissionPanel(openMissionPanel === 1 ? null : 1)
                  }
                  aria-expanded={openMissionPanel === 1}
                  aria-controls="mission-panel-1"
                  className="w-full text-left font-semibold text-lg"
                >
                  How Sugar Labs Bridges the Gap
                </button>

                {openMissionPanel === 1 && (
                  <div id="mission-panel-1" className="mt-4">
                    <p className="mb-4">
                      Sugar Labs, as an organization, and the suite of apps,
                      curriculum, rubrics, and mentoring, is well poised to
                      bridge the gap for many learners in the US and around the
                      world - the gap between educational services provided and
                      what youth need developmentally to succeed.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Why Your Support Matters */}
          <motion.div
            className="my-10 sm:my-16"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              How Your Donation Makes a Difference
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {IMPACT_STATS.map((stat, index) => (
                <div
                  key={stat.title}
                  className={`self-start bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
                    openImpactCards.includes(index) ? 'h-auto' : 'h-fit'
                  }`}
                >
                  <button
                    onClick={() => {
                      setOpenImpactCards((prev) =>
                        prev.includes(index)
                          ? prev.filter((i) => i !== index)
                          : [...prev, index],
                      );
                    }}
                    aria-expanded={openImpactCards.includes(index)}
                    className="w-full p-5 sm:p-6 text-left"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-green-500 text-3xl sm:text-4xl font-bold mb-2">
                          {stat.value}
                        </div>

                        <h3 className="text-lg sm:text-xl font-semibold">
                          {stat.title}
                        </h3>
                      </div>

                      <motion.span
                        animate={{
                          rotate: openImpactCards.includes(index) ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-green-600 text-2xl"
                      >
                        {openImpactCards.includes(index) ? '−' : '+'}
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openImpactCards.includes(index) && (
                      <motion.div
                        key="impact-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                            {stat.description}
                          </p>

                          {stat.title === 'Mentorship Hours' && (
                            <img
                              src="/assets/Images/teach1.webp"
                              alt="Student using Sugar Labs educational software"
                              className="w-full h-48 object-cover rounded-lg mt-4"
                            />
                          )}
                          {stat.title === 'Educational Tools' && (
                            <img
                              src="/assets/Images/image.png"
                              alt="Student using Sugar Labs educational software"
                              className="w-full h-48 object-cover rounded-lg mt-4"
                            />
                          )}
                          {stat.title === 'Educational Impact' && (
                            <img
                              src="/assets/Images/volunteer-group.webp"
                              alt="Sugar Labs community educational initiative"
                              className="w-full h-48 object-cover rounded-lg mt-4"
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="my-10 sm:my-16"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">
                Our Mission
              </h2>
              <img
                src="/assets/Images/teach1.webp"
                alt="Students and educators collaborating through technology"
                className="w-full max-h-96 object-cover rounded-xl shadow-md my-6"
              />
              <p className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                Sugar Labs® is a US-based 501(c)(3) nonprofit organization with
                a global mission to create educational opportunities in
                technology to youth around the world. Volunteer mentors and
                contributors work together to develop activity- focused software
                for children. All software is developed with learning as the
                primary goal, necessitating the need for source code to be
                published publicly for study — worked upon openly within a
                community where students are invited to make contributions under
                guidance of experienced mentors.
              </p>

              <div className="mt-4 sm:mt-6">
                <a
                  href={donationData.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium flex items-center text-sm sm:text-base"
                >
                  Help support our mission
                  <img
                    src={Img[1]}
                    alt="Right Arrow"
                    className="h-4 w-4 ml-1"
                  />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Financial Transparency Section */}
          <motion.div
            className="my-10 sm:my-16"
            id="financial-transparency"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              Financial Transparency
            </h2>

            <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-md">
              <p className="mb-5 sm:mb-6 text-sm sm:text-base dark:text-gray-300">
                Sugar Labs is committed to full financial transparency. As a
                501(c)(3) nonprofit organization, we make our tax filings
                available for public review.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 dark:text-white">
                Our 990 Tax Filings
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {visibleFilings.map((filing) => (
                  <a
                    key={filing.year}
                    href={filing.link}
                    className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors p-3 sm:p-4 rounded-lg flex flex-col items-center text-center"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Img[2]} alt="PDF Icon" className="h-8 w-8 mb-2" />
                    <span className="font-medium text-xs sm:text-sm dark:text-gray-300">
                      {filing.year} Filings
                    </span>
                  </a>
                ))}
              </div>

              {/* Show More Button */}
              {hasMoreFilings && !showAllFilings && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setShowAllFilings(true)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    Show More
                  </button>
                </div>
              )}

              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-medium mb-2 text-sm sm:text-base dark:text-white">
                  Note about 2018 and earlier
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400">
                  Sugar Labs Inc. received its 501(c)(3) nonprofit status in
                  2020. Before 2019, Sugar Labs was a member organization under
                  Software Freedom Conservancy. To view our archived financial
                  data from before 2019, please visit:{' '}
                  <a
                    href="https://wiki.sugarlabs.org/go/Finance"
                    className="text-blue-600 hover:underline"
                  >
                    https://wiki.sugarlabs.org/go/Finance
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Donation Section */}
          <motion.div
            className="my-10 sm:my-16 bg-green-50 dark:bg-green-900/20 p-5 sm:p-8 rounded-xl shadow-sm"
            id="donate-section"
            variants={slideInBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
              Support Our Mission Today
            </h2>

            <p className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base dark:text-gray-300">
              Financial contributions to Sugar Labs helps us continue to create
              and maintain innovative tools for learning, as well as mentor
              youth at a critical point in their development. Your support makes
              a meaningful difference in the lives of children around the world.
            </p>

            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              <a href={donationData.url} target="_blank" rel="noreferrer">
                <button className="bg-green-600 hover:bg-green-700 cursor-pointer transition-colors text-white px-5 sm:px-8 py-2 sm:py-3 rounded-full font-medium shadow-md text-sm sm:text-base">
                  Make a One-Time Donation
                </button>
              </a>
              <a href={donationData.urlMonth} target="_blank" rel="noreferrer">
                <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors text-white px-5 sm:px-8 py-2 sm:py-3 rounded-full font-medium shadow-md text-sm sm:text-base">
                  Become a Monthly Supporter
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donate;
