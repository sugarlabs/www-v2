import React from 'react';
import { motion } from 'framer-motion';

/*Skeleton loading for author profile header*/
const AuthorProfileSkeleton: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-4 sm:p-6 lg:p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-label="Loading author profile"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent rounded-2xl" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
        {/* Avatar skeleton */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse border-4 border-blue-100 dark:border-blue-900" />
        </div>

        {/* Author info skeleton */}
        <div className="flex-1 text-center sm:text-left w-full">
          {/* Name */}
          <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 sm:w-64 mx-auto sm:mx-0 mb-3 animate-pulse" />

          {/* Title + Organization */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 justify-center sm:justify-start">
            <div className="h-6 lg:h-7 bg-gray-200 dark:bg-gray-700 rounded w-40 mx-auto sm:mx-0 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto sm:mx-0 animate-pulse" />
          </div>

          {/* Description */}
          <div className="h-5 lg:h-6 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-2xl mb-4 animate-pulse" />

          {/* Quick stats badges */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse" />
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading author profile...</span>
    </motion.div>
  );
};

export default AuthorProfileSkeleton;
