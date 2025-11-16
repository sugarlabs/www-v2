import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getMorePageBySlug,
  getMorePagesByCategory,
  getDefaultMorePageSlug,
} from '@/utils/more-utils';
import type { MorePage as MorePageType } from '@/utils/more-utils';
import { motion } from 'framer-motion';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import MarkdownRenderer from '@/utils/MarkdownRenderer';

const MorePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<MorePageType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagesByCategory, setPagesByCategory] = useState<
    Record<string, MorePageType[]>
  >({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [notFoundSlug, setNotFoundSlug] = useState<string | null>(null);
  const [zoomableImages, setZoomableImages] = useState<HTMLImageElement[]>([]);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setIsDarkMode(dark);

    const observer = new MutationObserver(() => {
      const updatedDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(updatedDark);
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true);
      try {
        const pagesData = await getMorePagesByCategory();
        setPagesByCategory(pagesData);
        setCategories([
          'All',
          ...Object.keys(pagesData).filter((cat) => cat !== 'All'),
        ]);

        if (slug) {
          const fetchedPage = await getMorePageBySlug(slug);

          if (fetchedPage) {
            setPage(fetchedPage);
            setNotFoundSlug(null);
            document.title = `${fetchedPage.title} - Sugar Labs`;

            if (fetchedPage.category) {
              setActiveCategory(fetchedPage.category);
            }
          } else {
            setPage(null);
            setNotFoundSlug(slug ?? null);
            document.title = 'Page Not Found - Sugar Labs';
          }
        } else {
          const defaultSlug = await getDefaultMorePageSlug();
          if (defaultSlug) {
            navigate(`/more/${defaultSlug}`, { replace: true });
          }
        }
      } catch (error) {
        console.error('Error loading page:', error);
        setPage(null);
        setNotFoundSlug(slug ?? null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, [slug, navigate]);

  // Handle zoomable images
  useEffect(() => {
    if (!isLoading && zoomableImages.length > 0) {
      const handleClick = (event: Event) => {
        const imgElement = event.target as HTMLImageElement;
        setModalImage({
          src: imgElement.src,
          alt: imgElement.alt || 'Image',
        });
        document.body.classList.add('overflow-hidden');
      };

      zoomableImages.forEach((img) =>
        img.addEventListener('click', handleClick),
      );
      return () => {
        zoomableImages.forEach((img) =>
          img.removeEventListener('click', handleClick),
        );
      };
    }
  }, [isLoading, zoomableImages]);

  // Handle escape key for modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalImage) {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  });

  const closeImageModal = () => {
    setModalImage(null);
    document.body.classList.remove('overflow-hidden');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-10">
        {/* Navigation Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-600 hover:underline mb-2 inline-block"
          >
            <motion.button
              className={
                'mb-6 px-4 py-2 flex items-center text-blue-600 ' +
                'hover:text-blue-700 transition-colors rounded-md ' +
                'hover:bg-blue-50'
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </motion.button>
          </Link>
          <h2 className="text-3xl font-bold border-b-2 border-red-500 pb-2">
            {page ? page.title : 'Page Not Found'}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              {/* Category Navigation */}
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Links */}
              <h3 className="font-bold text-xl mb-4">
                {activeCategory === 'All'
                  ? 'All Pages'
                  : `${activeCategory} Pages`}
              </h3>
              <ul className="space-y-2">
                {pagesByCategory[activeCategory]?.map((linkPage) => (
                  <li key={linkPage.slug}>
                    <Link
                      to={`/more/${linkPage.slug}`}
                      className={`block p-2 rounded hover:bg-gray-100 transition ${
                        linkPage.slug === page?.slug
                          ? 'bg-red-100 text-red-600 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {linkPage.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            className="md:w-3/4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={page?.slug}
          >
            <div
              className={`${
                isDarkMode ? 'bg-amber-950' : 'bg-white'
              } rounded-lg shadow-md p-6`}
            >
              {page ? (
                <div className="prose prose-lg max-w-none">
                  <MarkdownRenderer
                    content={page.content}
                    setZoomableImages={setZoomableImages}
                    frontmatter={{
                      title: page.title,
                      slug: page.slug,
                      category: page.category ?? null,
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-20 h-20 flex items-center justify-center bg-red-100 rounded-full mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    The page you are looking for has been deleted or is not
                    present
                  </h3>

                  {notFoundSlug && (
                    <p className="mb-4 text-gray-600">Page was not found.</p>
                  )}

                  <div className="mb-8">
                    <Link
                      to="/"
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Go Back to Home
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeImageModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-image-title"
        >
          <div className="relative max-w-4xl max-h-full">
            <motion.img
              src={modalImage.src}
              alt={modalImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              id="modal-image-title"
            />
            <p className="text-white text-center mt-2 text-sm">
              {modalImage.alt}
            </p>
            <button
              onClick={closeImageModal}
              className={
                'absolute top-2 right-2 text-white text-2xl ' +
                'hover:text-gray-300 bg-black bg-opacity-50 rounded-full ' +
                'w-8 h-8 flex items-center justify-center ' +
                'focus:outline-none focus:ring-2 focus:ring-white'
              }
              aria-label="Close image"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}

      <Footer />
    </>
  );
};

export default MorePage;
