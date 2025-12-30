import React from 'react';
import { motion } from 'framer-motion';

/*About section skeleton (Markdown content) for author*/
export const AboutSectionSkeleton: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 relative overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent" />

      {/* Section heading */}
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mb-4 animate-pulse" />

      {/* Paragraph lines */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
      </div>
    </motion.div>
  );
};

/**
 * Articles section skeleton
 */
export const ArticlesSectionSkeleton: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-4 sm:p-6 lg:p-8 relative overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-lg w-40 animate-pulse" />

        {/* Controls skeleton */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full sm:w-48 animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 animate-pulse" />
        </div>
      </div>

      {/* Article cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Individual article card skeleton
 */
export const ArticleCardSkeleton: React.FC<{ index?: number }> = ({
  index = 0,
}) => {
  return (
    <motion.div
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent" />

      {/* Title - 2 lines */}
      <div className="space-y-2 mb-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse" />
      </div>

      {/* Excerpt - 2 lines */}
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
      </div>

      {/* Metadata line */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
        </div>
        <div className="h-6 bg-blue-200 dark:bg-blue-900/30 rounded-full w-24 animate-pulse" />
      </div>
    </motion.div>
  );
};

/**
 * Profile stats sidebar skeleton
 */
export const ProfileStatsSkeleton: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-6 mb-6 relative overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent" />

      {/* Title */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mb-4 animate-pulse" />

      {/* Stats items */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse" />
          <div className="h-5 bg-blue-200 dark:bg-blue-900/30 rounded w-8 animate-pulse" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-6 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Categories sidebar skeleton
 */
export const CategoriesSkeleton: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-6 relative overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200/30 dark:via-white/5 to-transparent" />

      {/* Title */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-28 mb-4 animate-pulse" />

      {/* Category items */}
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700/30 rounded-lg"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full w-8 animate-pulse" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
