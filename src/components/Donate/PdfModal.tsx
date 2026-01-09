import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface FinancialFiling {
  year: string;
  link: string;
}

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  filings: FinancialFiling[];
  initialIndex: number;
  ref?: React.Ref<HTMLDivElement>;
}

const PdfModal: React.FC<PdfModalProps> = React.forwardRef(
  ({ isOpen, onClose, filings, initialIndex }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const handlePrevious = useCallback(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filings.length - 1));
    }, [filings.length]);

    const handleNext = useCallback(() => {
      setCurrentIndex((prev) => (prev < filings.length - 1 ? prev + 1 : 0));
    }, [filings.length]);

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowLeft') {
          handlePrevious();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, handlePrevious, handleNext]);

    useEffect(() => {
      setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const currentFiling = filings[currentIndex];

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                ref={ref}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg dark:bg-black bg-emerald-300/70 p-2 rounded-4xl font-extrabold text-gray-800 dark:text-white">
                      Tax Filing - {currentFiling.year}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={currentFiling.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      title="Open in new tab"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <button
                      onClick={onClose}
                      className="p-2 cursor-pointer text-gray-600 dark:text-gray-400 group"
                    >
                      <X className="h-10 w-10 p-2 rounded-full bg-black text-white group-hover:bg-red-600 group-hover:text-white transition-colors md:dark:bg-gray-600 md:dark:text-gray-400 md:dark:group-hover:bg-red-600 md:dark:group-hover:text-white sm:dark:bg-red-600 sm:dark:text-white" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                  <button
                    onClick={handlePrevious}
                    className="flex items-center font-bold space-x-2 px-3 py-2 text-lg cursor-pointer text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={filings.length <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>
                      {currentIndex > 0
                        ? filings[currentIndex - 1].year
                        : filings[filings.length - 1].year}
                    </span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {filings.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex
                            ? 'bg-blue-600 dark:bg-blue-400'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                        aria-label={`Go to ${filings[index].year} filing`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 cursor-pointer px-3 py-2 text-lg font-bold text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={filings.length <= 1}
                  >
                    <span>
                      {currentIndex < filings.length - 1
                        ? filings[currentIndex + 1].year
                        : filings[0].year}
                    </span>
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  <iframe
                    src={`${currentFiling.link}#view=FitH`}
                    title={`${currentFiling.year} Tax Filing`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>

                {/* Modal Footer */}
                <div className="p-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Viewing:</span>{' '}
                      {currentIndex + 1} of {filings.length}
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handlePrevious}
                        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={filings.length <= 1}
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={filings.length <= 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  },
);

PdfModal.displayName = 'PdfModal';

export default PdfModal;
