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
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
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
            className="
    relative flex items-center justify-between px-6 py-5 rounded-xl
    border-2 border-gray-200 dark:border-gray-700
    bg-white dark:bg-[#303848]
    hover:!border-red-600 dark:hover:!border-orange-500
    shadow-sm hover:shadow-lg
    overflow-hidden transition-all duration-300 group h-full
  "
            variants={item}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient Hover Effect */}
            <span
              className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-red-50 to-red-100
                  dark:from-orange-900/10 dark:to-orange-800/40
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
            />

            {/* Link Content */}
            <div className="relative flex items-center gap-4 z-10 flex-1">
              <div
                className="
                    flex-shrink-0 w-10 h-10 rounded-full
                    bg-red-100 dark:bg-gray-600
                    flex items-center justify-center
                    group-hover:bg-red-200 dark:group-hover:bg-orange-200 transition-colors
                  "
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                />
              </div>

              <span
                className="
                    text-base md:text-lg font-medium
                    text-gray-800 dark:text-gray-100
                    group-hover:text-red-700 dark:group-hover:text-orange-400
                    transition-colors
                  "
              >
                {link.name}
              </span>
            </div>

            {/* Arrow */}
            <div
              className="
                  relative z-10 flex items-center justify-center w-8 h-8 rounded-full
                  bg-red-100 dark:bg-gray-600
                  group-hover:bg-red-200 dark:group-hover:bg-orange-200 transition-colors
                  ml-4 flex-shrink-0
                "
            >
              <span
                className="
                    -mt-1
                    text-gray-800 dark:text-gray-800
                    group-hover:text-red-700 dark:group-hover:text-orange-600
                    transform group-hover:translate-x-1
                    transition-all
                  "
              >
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
