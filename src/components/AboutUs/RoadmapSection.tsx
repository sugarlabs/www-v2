import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { roadmapItems } from '@/constants/aboutUs/roadmap';

const RoadmapSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['0%', '100%'],
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Desktop Timeline */}
      <div className="hidden md:block relative w-full">
        {/* Static background line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 dark:bg-gray-600/50 transform -translate-x-1/2" />

        {/* Animated progress line */}
        <motion.div
          className="absolute top-0 left-1/2 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-red-500 transform -translate-x-1/2 origin-top"
          style={{ height: progressHeight }}
        />

        {/* Roadmap items */}
        <div className="relative pb-10">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              className={`flex mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div
                  className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl dark:shadow-black/20 
                    border-t-2 ${item.borderColor || 'border-blue-600 dark:border-blue-400'} 
                    transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/30`}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description || 'Milestone in our journey'}
                  </p>
                </div>
              </div>

              {/* Center node */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10
                      ${item.stepColor || 'bg-blue-600'}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                >
                  {index + 1}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline - Single Column */}
      <div className="md:hidden relative w-full">
        <div className="flex flex-col items-start space-y-12 pb-10">
          {/* Static background line */}
          <div
            className="absolute top-0 bottom-0 left-4.5 w-0.5 bg-gray-200 dark:bg-gray-700"
            style={{ height: 'calc(100% - 40px)' }}
          />

          {/* Animated progress line */}
          <motion.div
            className="absolute top-0 left-4.5 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-red-500 origin-top"
            style={{ height: progressHeight }}
          />

          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative w-full flex items-start space-x-4 pr-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Step number */}
              <motion.div
                className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white font-bold shadow-sm relative z-10
                    ${item.stepColor || 'bg-blue-600'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {index + 1}
              </motion.div>

              {/* Card */}
              <div
                className={`grow p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl dark:shadow-black/20 
                  border-l-2 ${item.borderColor || 'border-blue-600 dark:border-blue-400'}`}
              >
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description || 'Milestone in our journey'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;
