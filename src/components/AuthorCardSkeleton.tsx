import React from 'react';
import { motion } from 'framer-motion';

interface AuthorCardSkeletonProps {
  index?: number;
}

const AuthorCardSkeleton: React.FC<AuthorCardSkeletonProps> = ({
  index = 0,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 flex flex-col relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />

      <div className="flex flex-col items-center p-6 text-center flex-1">
        {/* Avatar skeleton */}
        <div className="flex-shrink-0 mb-4">
          <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>

        {/* Name skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 mb-2 animate-pulse" />

        {/* Title and Organization skeleton */}
        <div className="flex flex-col items-center gap-1 mb-3 w-full">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md w-2/3 animate-pulse" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 mt-1 animate-pulse" />
        </div>

        {/* Description skeleton - 3 lines */}
        <div className="w-full space-y-2 mb-4 px-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-11/12 mx-auto animate-pulse" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mx-auto animate-pulse" />
        </div>

        {/* Stats badges skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded-full w-28 animate-pulse" />
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded-full w-24 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCardSkeleton;
