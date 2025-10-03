import React, { useState, useEffect, useCallback } from 'react';
import ShareModal from '@/components/ShareModal';
import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPostBySlug, Post } from '@/utils/posts-utils';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import MarkdownRenderer from '@/utils/MarkdownRenderer';

const NewsDetailPage: React.FC = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { slug, category } = useParams<{ slug?: string; category?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [zoomableImages, setZoomableImages] = useState<HTMLImageElement[]>([]);

  // Load post data when slug changes
  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      setIsLoading(true);
      try {
        const fetchedPost = await getPostBySlug(slug);

        if (!fetchedPost) {
          setError('Post not found');
          setPost(null);
        } else {
          setPost(fetchedPost);
          setError(null);
          document.title = fetchedPost.title || 'News Detail';
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load the post. Please try again later.');
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

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

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalImage) {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  });

  const handleGoBack = useCallback(() => {
    const search = location.search || '';
    // Prefer the category in the URL. If absent, derive from the post's category; fallback to 'all'.
    const derivedCategory = category
      ? category
      : post?.category
        ? post.category.toLowerCase().replace(/\s+/g, '-')
        : 'all';
    navigate(`/news/${derivedCategory}${search}`);
  }, [navigate, category, location.search, post?.category]);

  const closeImageModal = useCallback(() => {
    setModalImage(null);
    document.body.classList.remove('overflow-hidden');
  }, []);

  const handleTagClick = useCallback(
    (tag: string) => {
      navigate(`/tags/${tag}`);
    },
    [navigate],
  );

  const handleAuthorClick = useCallback(() => {
    if (post?.author?.slug) {
      navigate(`/authors/${post.author.slug}`);
    }
  }, [navigate, post]);

  const handleShareClick = () => {
    setShareModalOpen(true);
  };

  if (isLoading && !post) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 dark:border-blue-400 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading article...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state or post not found
  if (error || !post) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            {error || 'Post Not Found'}
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors mx-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back to News
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Successful post rendering
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl bg-white dark:bg-gray-900 mt-10 rounded-lg">
        {/* Back button */}
        <motion.button
          onClick={handleGoBack}
          className="mb-6 px-4 py-2 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to news list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to News
        </motion.button>

        {/* Article Header */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          {post.category && (
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4 rounded-full">
              {post.category}
            </span>
          )}
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 cursor-pointer"
              title="Share"
              type="button"
            >
              <Share2 size={16} className="text-white" />
            </button>
          </div>
          <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 mb-3">
            {post.date && (
              <>
                <span className="mr-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <time dateTime={post.date}>{post.date}</time>
                </span>
                {post.author && <span className="mr-4">•</span>}
              </>
            )}
            {post.author && (
              <span
                className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handleAuthorClick}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {post.author.name}
              </span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  onClick={() => handleTagClick(tag)}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            className="mb-8 rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto bg-gray-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto max-h-80 object-contain mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() =>
                setModalImage({
                  src: post.image,
                  alt: post.title,
                })
              }
              data-zoomable="true"
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          className="mb-12 prose dark:prose-invert  prose-slate max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={slug}
        >
          <MarkdownRenderer
            content={post.content}
            setZoomableImages={setZoomableImages}
          />
        </motion.div>

        {/* Author Bio Section */}
        {post.author && (
          <motion.div
            className="bg-blue-50 dark:bg-gray-800 dark:text-white rounded-lg p-6 my-8 flex items-center space-x-4 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
            onClick={handleAuthorClick}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 flex-shrink-0">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About {post.author.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-600 mt-1">
                {post.author.description}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                Click to view profile →
              </p>
            </div>
          </motion.div>
        )}

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Back to top"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.button>
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
              className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close image"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        url={
          post
            ? `${window.location.origin}/news/${category || 'all'}/${post.slug}`
            : ''
        }
        title={post?.title || ''}
        excerpt={post?.excerpt || ''}
      />
      <Footer />
    </>
  );
};

export default NewsDetailPage;
