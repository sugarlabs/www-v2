import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { roadmapItems, roadmapContent } from '@/constants/aboutUs/roadmap';
import { roadmapSectionAnimations } from '@/styles/animations';

const RoadmapSection: React.FC = () => {
  return (
    <SectionContainer id={roadmapContent.sectionId}>
      <div className="flex flex-col w-full">
        <motion.div
          className="text-center mb-12"
          variants={roadmapSectionAnimations.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionTitle>
            <span className="font-Caveat text-3xl md:text-4xl">
              {roadmapContent.title.prefix}
            </span>{' '}
            <span className="text-red-500 font-Caveat text-3xl md:text-4xl">
              {roadmapContent.title.highlight}
            </span>
          </SectionTitle>
        </motion.div>

        <div className="w-full px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="relative w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
              <motion.div
                className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full"
                style={{ zIndex: 1 }}
                variants={roadmapSectionAnimations.connectingLine}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />

              {roadmapItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="w-64 relative"
                  style={{ zIndex: 2 }}
                  custom={index}
                  variants={roadmapSectionAnimations.roadmapCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={roadmapSectionAnimations.cardHover}
                >
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    variants={roadmapSectionAnimations.stepNumber}
                    custom={index}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md
                        ${item.stepColor || 'bg-red-500'}`}
                    >
                      {index + 1}
                    </div>
                  </motion.div>

                  <div
                    className={`p-5 pt-6 bg-white rounded-lg shadow-lg border-l-4 ${item.borderColor || 'border-transparent'} 
                      transition-shadow duration-300`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 text-center mt-2">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 text-center">
                      {item.description || 'Milestone in our journey'}
                    </p>
                  </div>

                  {index < roadmapItems.length - 1 && (
                    <div className="md:hidden absolute left-1/2 bottom-0 h-10 w-0.5 bg-gradient-to-b from-red-500 to-blue-500 transform translate-y-full -translate-x-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            className="mt-10 text-center text-gray-600 max-w-2xl mx-auto"
            variants={roadmapSectionAnimations.description}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {roadmapContent.description}
          </motion.p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default RoadmapSection;
