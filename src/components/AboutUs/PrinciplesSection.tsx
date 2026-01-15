import { motion } from 'framer-motion';
import { principles, principlesContent } from '@/constants/aboutUs/principles';
import ResponsiveCarousel from './ResponsiveCarousel';

const PrinciplesSection = () => {
  return (
    <section
      id={principlesContent.sectionId}
      className="w-full py-12 md:py-24 bg-white dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-16">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 sm:text-3xl md:sm:text-4xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-900 dark:text-blue-400 font-medium">
              {principlesContent.title.prefix}
            </span>{' '}
            <span className="text-red-600 dark:text-red-400 font-medium">
              {principlesContent.title.highlight}
            </span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-16 md:w-24 bg-gradient-to-r from-indigo-700 to-rose-700 mx-auto mb-6 md:mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-16 mb-12 md:mb-20">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-slate-50 dark:bg-slate-800 p-6 md:p-8 rounded-lg shadow-md border-l-2 border-indigo-700 dark:border-indigo-500">
              <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {principlesContent.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="rounded-lg overflow-hidden shadow-lg relative">
              <img
                src={principlesContent.featuredImage}
                alt="Our Principles"
                className="w-full h-[250px] md:h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h3 className="text-lg md:text-xl font-semibold">
                  Our Guiding Principles
                </h3>
                <div className="w-16 md:w-20 h-0.5 bg-rose-600 mt-2 mb-3"></div>
                <p className="text-xs md:text-sm text-slate-100">
                  Values that drive our organization forward
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Principles grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={principle.image}
                    alt={principle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50 dark:from-gray-800 dark:to-gray-800/50">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 pb-2 border-b border-slate-200 dark:border-gray-700">
                    {principle.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-base">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <ResponsiveCarousel autoScrollInterval={3500}>
            {principles.map((principle) => (
              <div key={principle.id} className="px-2 py-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col border border-slate-200 dark:border-gray-700">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={principle.image}
                      alt={principle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs py-1 px-3 font-medium rounded-full">
                      Principle
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50 dark:from-gray-800 dark:to-gray-800/50">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 pb-2 border-b border-slate-200 dark:border-gray-700">
                      {principle.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-base">
                      {principle.description}
                    </p>

                    {/* Decorative element */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 mr-2"></div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Core Value
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ResponsiveCarousel>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
