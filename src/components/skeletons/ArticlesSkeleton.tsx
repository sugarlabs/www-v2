import React from 'react';
import { motion } from 'framer-motion';

const ArticleSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white dark:bg-gray-900 mt-10 rounded-lg">
      {/* No back button skeleton - it will only appear when content loads */}

      {/* Article Header Skeleton */}
      <div className="mb-6"></div>
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
        {/* Category Badge */}
        <div className="mb-4">
          <div className="h-7 w-32 bg-gray-200 dark:bg-gray-800 rounded-full relative overflow-hidden inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-4 space-y-3">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-10 w-4/5 bg-gray-200 dark:bg-gray-800 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Metadata Row (Date & Author) */}
        <div className="flex items-center mb-3 gap-4">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <motion.div
        className="mb-8 rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-80 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
        </div>
      </motion.div>

      {/* Article Content Skeleton */}
      <motion.div
        className="mb-12 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Paragraph 1 */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-9/12 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-10/12 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Subheading */}
        <div className="pt-4">
          <div className="h-7 w-2/3 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-8/12 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Paragraph 4 */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-9/12 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </motion.div>

      {/* Author Bio Skeleton */}
      <motion.div
        className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 my-8 flex items-center space-x-4"
        whileHover={{ scale: 1.02 }}
      >
        {/* Avatar Circle */}
        <div className="w-16 h-16 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </motion.div>

      {/* Tags Section Skeleton */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-700/30 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
