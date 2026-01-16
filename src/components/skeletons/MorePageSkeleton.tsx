import React from 'react';
import { motion } from 'framer-motion';

export const MorePageSkeleton: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <motion.div
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-32 mb-6 animate-pulse"
          variants={itemVariants}
        />

        <motion.div
          className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 max-w-xs animate-pulse"
          variants={itemVariants}
        />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          className="md:w-1/4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent" />

            <div className="mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Pages heading */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse" />

            <ul className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <li key={i}>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="md:w-3/4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent" />

            <div className="space-y-6">
              <div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
              </div>

              {[...Array(3)].map((_, blockIdx) => (
                <div key={blockIdx} className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
                </div>
              ))}

              <div className="my-8">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>

              {[...Array(2)].map((_, blockIdx) => (
                <div key={blockIdx + 3} className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-9/12 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MorePageSkeleton;
