import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { useState } from 'react';
import { stats } from '@/constants/Stats';
import faqs from '@/constants/aboutUs/faqs.ts';
import { quickAnswers } from '@/constants/aboutUs/quickanswers';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="container mx-auto p-4">
        {/* Top FAQs Section */}
        <section className="my-8 flex justify-center">
          <div className="max-w-4xl w-4/5 flex flex-col md:flex-row justify-between items-center">
            {/* Left Side - Text */}
            <div className="md:w-1/2 text-left md:pr-8">
              <h1 className="text-4xl font-bold">FAQs</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Have questions? Here you’ll find the answers most valued by our
                partners, along with access to step-by-step instructions and
                support.
              </p>
            </div>

            {/* Right Side - Enlarged Image */}
            <div className="md:w-1/2 flex justify-end">
              <img
                src={stats.faq}
                alt="FAQs Illustration"
                className="w-80 md:w-[400px] lg:w-[500px]"
              />
            </div>
          </div>
        </section>

        {/* FAQ Sections Container */}
        <div className="w-4/5 max-w-5xl mx-auto">
          {/* Quick Answers */}
          <section className="my-10">
            <h2 className="text-3xl font-bold mb-6">Quick Answers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {quickAnswers.map((qa, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-gray-200"
                >
                  <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg mb-4">
                    <img src={qa.image} alt={qa.question} className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-center">{qa.question}</h3>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    {qa.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* General FAQs */}
          <section className="my-10">
            <h2 className="text-3xl font-bold mb-6">General FAQs</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b">
                  <button
                    className="w-full text-left py-4 text-lg font-medium flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <span>{openIndex === index ? '-' : '+'}</span>
                  </button>
                  {openIndex === index && (
                    <p className="p-4 text-gray-700">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
