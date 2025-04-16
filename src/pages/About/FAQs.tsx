import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { useState } from 'react';
import { stats } from '@/constants/Stats';
import faqs from '@/constants/aboutUs/faqs.ts';
import { quickAnswers } from '@/constants/aboutUs/quickanswers';
import { motion } from 'framer-motion';
import {
  fadeIn,
  slideInLeft,
  slideInRight,
  subtleRise,
  headerReveal,
  faqPageAnimations,
} from '@/styles/Animations';

const CategoryList = [
  'All',
  'General',
  'Development',
  'Activities',
  'Installation',
  'Contributing',
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="container mx-auto p-4">
        {/* Top FAQs Section */}
        <motion.section
          className="my-8 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={faqPageAnimations.pageSection}
        >
          <div className="max-w-4xl w-4/5 flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="md:w-1/2 text-left md:pr-8"
              variants={slideInLeft}
            >
              <motion.h1
                className="text-4xl font-bold"
                variants={faqPageAnimations.headingText}
              >
                FAQs
              </motion.h1>
              <motion.p
                className="text-gray-600 mt-2 text-lg"
                variants={faqPageAnimations.paragraphText}
              >
                Have questions? Here you'll find the answers most valued by our
                partners, along with access to step-by-step instructions and
                support.
              </motion.p>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-end"
              variants={slideInRight}
            >
              <motion.img
                src={stats.faq}
                alt="FAQs Illustration"
                className="w-80 md:w-[400px] lg:w-[500px]"
                variants={faqPageAnimations.heroImage}
                whileHover="hover"
              />
            </motion.div>
          </div>
        </motion.section>

        <div className="w-4/5 max-w-5xl mx-auto">
          {/* Quick Answers */}
          <motion.section
            className="my-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-3xl font-bold mb-6"
              variants={headerReveal}
            >
              Quick Answers
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              variants={faqPageAnimations.quickAnswersContainer}
            >
              {quickAnswers.map((qa, index) => (
                <motion.div
                  key={index}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-gray-200"
                  variants={faqPageAnimations.quickAnswerCard}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div
                    className="w-12 h-12 bg-white flex items-center justify-center rounded-lg mb-4"
                    variants={faqPageAnimations.quickAnswerIcon}
                    custom={index}
                  >
                    <img src={qa.image} alt={qa.question} className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-semibold text-center">{qa.question}</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    {qa.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* General FAQs with Filter */}
          <motion.section
            className="my-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={faqPageAnimations.faqContainer}
          >
            <motion.h2
              className="text-3xl font-bold mb-6"
              variants={headerReveal}
            >
              Browse FAQs by Category
            </motion.h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {CategoryList.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filtered FAQ List */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              variants={subtleRise}
            >
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="border-b"
                  variants={faqPageAnimations.faqItem}
                  custom={index}
                >
                  <motion.button
                    className="w-full text-left py-4 text-lg font-medium flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                    whileHover="hover"
                    variants={faqPageAnimations.faqQuestionButton}
                  >
                    {faq.question}
                    <motion.span
                      variants={faqPageAnimations.faqToggleIcon(
                        openIndex === index,
                      )}
                      initial="initial"
                      animate="animate"
                    >
                      {openIndex === index ? '-' : '+'}
                    </motion.span>
                  </motion.button>
                  <motion.div
                    variants={faqPageAnimations.faqAnswer(openIndex === index)}
                    initial="initial"
                    animate="animate"
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="p-4 text-gray-700">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
