import { developerLinks } from '@/constants/VolunteerAndDev/Links';
import { motion } from 'framer-motion';

const DeveloperLinks = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="container mx-auto px-6 py-10">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {developerLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-between px-6 py-5 rounded-xl 
            border-2 border-gray-200 bg-white shadow-sm hover:shadow-lg
            overflow-hidden transition-all duration-300 group h-full"
            variants={item}
            whileHover={{
              scale: 1.02,
              borderColor: '#D32F2F',
              backgroundColor: 'rgba(240, 249, 255, 0.7)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient Hover Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

            {/* Link Content */}
            <div className="relative flex items-center gap-4 z-10 flex-1">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-red-700 transition-colors">
                {link.name}
              </span>
            </div>

            {/* Arrow with enhanced animation */}
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors ml-4 flex-shrink-0">
              <span className="text-gray-600 group-hover:text-red-700 transform group-hover:translate-x-1 transition-all">
                →
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default DeveloperLinks;
