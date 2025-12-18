import { motion } from 'framer-motion';
import { principles, principlesContent } from '@/constants/aboutUs/principles';

const PrinciplesSection = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-16 mb-20">
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg shadow-md border-l-2 border-indigo-700 dark:border-indigo-500">
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {principlesContent.description}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="rounded-lg overflow-hidden shadow-lg relative">
            <img
              src={principlesContent.featuredImage}
              alt="Our Principles"
              className="w-full h-[350px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-semibold">Our Guiding Principles</h3>
              <div className="w-20 h-0.5 bg-rose-600 mt-2 mb-3"></div>
              <p className="text-sm text-slate-100">
                Values that drive our organization forward
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Principles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </>
  );
};

export default PrinciplesSection;
