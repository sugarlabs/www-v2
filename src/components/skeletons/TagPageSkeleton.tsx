import React from 'react';

const TagPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      {/* No back button skeleton - it will only appear when content loads */}
      <div className="mb-6"></div>

      <div className="max-w-7xl mx-auto">
        {/* Tag Header Section - Compact centered card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8 p-8">
          <div className="text-center">
            {/* No icon circle - removed */}

            {/* Tag Title */}
            <div className="flex justify-center mb-4">
              <div className="h-12 w-80 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="flex justify-center mb-6">
              <div className="h-5 w-72 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>

            {/* Stats Pills */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Filters and Articles */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                {/* Showing text */}
                <div className="h-5 w-44 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>

                {/* Search bar */}
                <div className="flex-1 min-w-[180px]">
                  <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>

                {/* Category dropdown */}
                <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>

                {/* Sort dropdown */}
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>

                {/* View toggles */}
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Cards Grid - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Card Image */}
                  <div className="w-full aspect-[16/10] bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            {/* Related Tags Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tag Statistics Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagPageSkeleton;
