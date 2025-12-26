import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Props for the Pagination component.
 */
interface PaginationProps {
  /** The current active page number (1-based index). */
  currentPage: number;
  /** The total number of pages available. */
  totalPages: number;
  /** Callback function invoked when a page number is clicked. */
  onPageChange: (page: number) => void;
}

/**
 * A reusable Pagination component that renders previous/next buttons and page numbers.
 * Supports smart ellipses for large page counts.
 *
 * @param props - The props for the component.
 * @returns A JSX element representing the pagination controls.
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    // Always show first, last, current, and neighbors

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
            : 'bg-gradient-to-br from-blue-500 to-green-500 text-white shadow-lg hover:shadow-xl'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </motion.button>

      <div className="flex bg-white dark:bg-gray-800 rounded-2xl shadow-sm px-4 py-2 gap-2 items-center">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="text-gray-400 px-2">...</span>
            ) : (
              <motion.button
                onClick={() => onPageChange(page as number)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-md transform -translate-y-1'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </motion.button>
            )}
          </React.Fragment>
        ))}
      </div>

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
            : 'bg-gradient-to-br from-blue-500 to-green-500 text-white shadow-lg hover:shadow-xl'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
};

export default Pagination;
