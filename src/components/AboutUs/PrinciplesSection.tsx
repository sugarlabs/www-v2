import { motion } from 'framer-motion';
import { principles, principlesContent } from '@/constants/aboutUs/principles';

const PrinciplesSection = () => {
  return (
    <section id={principlesContent.sectionId} className="w-full py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-semibold text-slate-800 sm:text-4xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-900 font-medium">
              {principlesContent.title.prefix}
            </span>{' '}
            <span className="text-red-600 font-medium">
              {principlesContent.title.highlight}
            </span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-24 bg-gradient-to-r from-indigo-700 to-rose-700 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 mb-20">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-slate-50 p-8 rounded-lg shadow-md border-l-2 border-indigo-700">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
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
                <h3 className="text-xl font-semibold">
                  Our Guiding Principles
                </h3>
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-slate-200 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={principle.image}
                    alt={principle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">
                    {principle.title}
                  </h3>
                  <p className="text-slate-700 text-base">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
