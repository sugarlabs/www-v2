import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { steps } from '@/constants/TryNowData/bootableSoasData';

const StepsToUse = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <section className="w-[90%] mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        Steps to Boot Sugar on a Stick
      </h2>

      {/* Carousel Container */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full shadow-lg transition ${
            activeStep === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-400'
          }`}
          onClick={prevStep}
          disabled={activeStep === 0}
        >
          <ArrowLeft size={30} />
        </button>

        {/* Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] text-center"
        >
          {/* Step Number */}
          <div className="text-lg font-semibold text-gray-600">
            Step {activeStep + 1}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-black mt-1">
            {steps[activeStep].title}
          </h3>

          {/* Description */}
          <p className="text-gray-700 mt-2">{steps[activeStep].description}</p>

          {/* Step Image */}
          <motion.img
            src={steps[activeStep].image}
            alt={steps[activeStep].title}
            className="mx-auto mt-4 rounded-lg shadow-lg w-3/4 sm:w-2/3 md:w-1/2 h-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Right Arrow */}
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full shadow-lg transition ${
            activeStep === steps.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-400'
          }`}
          onClick={nextStep}
          disabled={activeStep === steps.length - 1}
        >
          <ArrowRight size={30} />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeStep ? 'bg-[#FF4F00] w-5' : 'bg-gray-300'
            }`}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default StepsToUse;
