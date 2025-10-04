import { motion } from 'framer-motion';
import { goals, sectionContent, animations } from '@/constants/aboutUs/goals';
import { FC } from 'react';

const GoalsSection: FC = () => {
  return (
    <section id="goals" className="w-full py-24 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-semibold text-slate-800 dark:text-slate-200 sm:text-4xl mb-4 tracking-tight"
            initial={animations.flowContainer.initial}
            whileInView={animations.flowContainer.whileInView}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-900 dark:text-blue-400 font-medium">
              {sectionContent.title.main}
            </span>{' '}
            <span className="text-red-600 dark:text-red-400 font-medium">
              {sectionContent.title.highlight}
            </span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-24 bg-gradient-to-r from-blue-600 to-rose-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.p
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            initial={animations.flowContainer.initial}
            whileInView={animations.flowContainer.whileInView}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {sectionContent.introduction}
          </motion.p>
        </div>

        {/* Modular Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-slate-100 dark:border-gray-700 transition-all duration-300 
                hover:shadow-md group relative overflow-hidden"
              initial={animations.goalItem.initial}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i % 6) }}
            >
              {/* Decorative element - colored top border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 
                  ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-rose-400' : 'bg-gradient-to-r from-blue-600 to-rose-400'}`}
              />

              {/* Goal number indicator */}
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-rose-400 flex items-center justify-center text-white font-semibold text-sm">
                  {i + 1}
                </div>
                <div className="h-px flex-grow bg-slate-100 dark:bg-gray-700 ml-3"></div>
              </div>

              {/* Goal content */}
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-3">
                {goal.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {goal.description}
              </p>

              {/* Category tag */}
              {goal.category && (
                <div className="mt-4 inline-block px-3 py-1 bg-slate-50 dark:bg-gray-700 text-xs font-medium text-slate-600 dark:text-slate-300 rounded-full">
                  {goal.category}
                </div>
              )}

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-rose-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={animations.flowContainer.initial}
          whileInView={animations.flowContainer.whileInView}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        ></motion.div>
      </div>
    </section>
  );
};

export default GoalsSection;
