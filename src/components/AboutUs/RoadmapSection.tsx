import React from 'react';
import { motion } from 'framer-motion';
import { roadmapItems, roadmapContent } from '@/constants/aboutUs/roadmap';

const RoadmapSection: React.FC = () => {
  return (
    <section
      id={roadmapContent.sectionId}
      className="w-full py-24 bg-white dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-semibold sm:text-5xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {roadmapContent.title.prefix}
            </span>{' '}
            <span className="text-red-600 dark:text-red-400 font-medium">
              {roadmapContent.title.highlight}
            </span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-24 bg-gradient-to-r from-blue-500 to-red-500 dark:from-blue-400 dark:to-red-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {roadmapContent.description}
          </motion.p>
        </div>

        <div className="hidden md:block relative w-full mt-20">
          <motion.div
            className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 dark:bg-gray-600/50 transform -translate-x-1/2"
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />

          {/* Roadmap items */}
          <div className="relative">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                className={`flex mb-10 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } relative`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                {/* Content */}
                <div className={`w-3/7 ${index % 2 === 0 ? 'pr-1' : 'pl-1'}`}>
                  <div
                    className={`p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl dark:shadow-black/20 
                    border-t-2 ${item.borderColor || 'border-blue-600 dark:border-blue-400'} 
                    transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/30`}
                  >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.description || 'Milestone in our journey'}
                    </p>
                  </div>
                </div>

                {/* Center node */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm z-10
                      ${item.stepColor || 'bg-blue-600'}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Single Column */}
        <div className="md:hidden relative w-full mt-16">
          <div className="flex flex-col items-start space-y-12">
            {/* Vertical connecting line */}
            <motion.div
              className="absolute top-0 bottom-0 left-5 w-0.5 bg-slate-200 dark:bg-gray-700 h-full"
              style={{ zIndex: 1 }}
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />

            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative w-full flex items-start space-x-4 pl-4 pr-2"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {/* Step number */}
                <motion.div
                  className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold shadow-sm
                    ${item.stepColor || 'bg-blue-600'}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {index + 1}
                </motion.div>

                {/* Card */}
                <div
                  className={`flex-grow p-5 bg-white dark:bg-gray-800/90 rounded-lg shadow-md dark:shadow-xl dark:shadow-black/20 
                  border-l-2 ${item.borderColor ? item.borderColor.replace('border-', 'border-') + ' dark:' + item.borderColor.replace('blue', 'blue').replace('red', 'red') : 'border-blue-600 dark:border-blue-400'} 
                  backdrop-blur-sm`}
                >
                  <h3 className="text-base font-semibold text-slate-800 mb-2 pb-2 border-b border-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {item.description || 'Milestone in our journey'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
