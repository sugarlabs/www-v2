import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMarkdownPosts, Post } from '@/utils/posts-utils';
import Footer from '@/sections/Footer';
import Header from '@/sections/Header';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeIn,
  slideInBottom,
  bounce,
  simpleFadeIn,
} from '@/styles/Animations';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const validCategories = useMemo(
    () => ['COMMUNITY NEWS', 'EVENTS', 'PRESS RELEASE', 'SUGAR STORIES'],
    [],
  );

  // Determine the initial category from URL or default
  useEffect(() => {
    const determineInitialCategory = () => {
      let initialCategory = 'COMMUNITY NEWS';

      if (category) {
        const formattedCategory = category.toUpperCase().replace(/-/g, ' ');
        if (validCategories.includes(formattedCategory)) {
          initialCategory = formattedCategory;
        }
      }

      setActiveCategory(initialCategory);
    };

    determineInitialCategory();
  }, [category, validCategories]);

  // Load posts based on the active category
  const loadPosts = useCallback(async () => {
    if (!activeCategory) return;

    setIsLoading(true);
    setError(null);

    try {
      const fetchedPosts = await fetchMarkdownPosts(activeCategory);

      if (Array.isArray(fetchedPosts)) {
        setPosts(fetchedPosts);
      } else {
        setPosts([]);
        setError('Failed to load posts');
        console.error('Unexpected posts data format:', fetchedPosts);
      }

      setDisplayCount(4);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  // Update URL when category changes
  useEffect(() => {
    if (!activeCategory) return;

    const categoryPath = activeCategory.toLowerCase().replace(/\s+/g, '-');
    if (category !== categoryPath) {
      navigate(`/news/${categoryPath}`, { replace: true });
    }
  }, [activeCategory, navigate, category]);

  // Load posts when category is determined
  useEffect(() => {
    if (activeCategory) {
      loadPosts();
    }
  }, [activeCategory, loadPosts]);

  const handlePostClick = useCallback(
    (slug: string): void => {
      const categoryPath = activeCategory.toLowerCase().replace(/\s+/g, '-');
      navigate(`/news/${categoryPath}/${slug}`);
    },
    [activeCategory, navigate],
  );

  const handleCategoryClick = useCallback((category: string): void => {
    setActiveCategory(category);
  }, []);

  const handleShowMore = useCallback(() => {
    setDisplayCount((prevCount) => prevCount + 4);
  }, []);

  const visiblePosts = useMemo(
    () => posts.slice(0, displayCount),
    [posts, displayCount],
  );

  const hasMorePosts = posts.length > displayCount;
  const showInitialLoading = isLoading && posts.length === 0;
  const hasNoPostsToShow = posts.length === 0 && !isLoading && !error;
  const showFeaturedPost = posts.length > 0;

  // Show loading state during initial data load
  if (showInitialLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-7xl font-bold font-Caveat text-center mb-8">
            NEWS
          </h1>
          <div className="flex justify-center items-center h-24 my-8">
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <span className="ml-4 text-lg text-gray-600">Loading news...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-10">
        <motion.h1
          className="text-7xl font-bold font-Caveat text-center mb-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          NEWS
        </motion.h1>

        {/* Category selection tabs */}
        <div className="mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {validCategories.map((cat) => (
                <motion.button
                  key={cat}
                  className={`px-5 py-2 rounded-lg transition-all duration-200 font-medium ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleCategoryClick(cat)}
                  variants={bounce}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  aria-current={activeCategory === cat ? 'page' : undefined}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.h2
          className="text-5xl font-Caveat text-center mb-8 border-b pb-2 text-green-600"
          variants={slideInBottom}
          initial="hidden"
          animate="visible"
        >
          {activeCategory
            ? activeCategory.charAt(0).toUpperCase() +
              activeCategory.slice(1).toLowerCase().replace(/_/g, ' ')
            : ''}
        </motion.h2>

        {/* Error message */}
        {error && (
          <div className="text-center my-10 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadPosts}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No posts message */}
        {hasNoPostsToShow && (
          <div className="text-center text-gray-600 mb-10 p-8 bg-gray-50 rounded-lg">
            <p className="text-xl mb-2">No posts found in this category.</p>
            <p>Try selecting a different category or check back later.</p>
          </div>
        )}

        {/* Posts display */}
        {!hasNoPostsToShow && (
          <>
            {/* Featured post (first post) */}
            <AnimatePresence>
              {showFeaturedPost && (
                <motion.div
                  className="mb-12 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
                  onClick={() => handlePostClick(posts[0].slug)}
                  variants={simpleFadeIn}
                  initial="hidden"
                  animate="visible"
                  key={posts[0].id || posts[0].slug}
                >
                  <div className="relative md:flex">
                    <div className="md:w-1/3 overflow-hidden">
                      {posts[0].image && (
                        <img
                          src={posts[0].image}
                          alt={posts[0].title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="md:w-2/3 p-8 flex flex-col justify-between">
                      <div>
                        {posts[0].category && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 mb-4 rounded-full">
                            {posts[0].category}
                          </span>
                        )}
                        <h3 className="text-2xl font-bold mb-4 text-blue-600">
                          {posts[0].title}
                        </h3>
                        <p className="text-gray-600 mb-4">{posts[0].excerpt}</p>
                      </div>
                      <div className="mt-auto">
                        {posts[0].date && (
                          <p className="text-sm mb-4 font-medium text-gray-500">
                            {posts[0].date}
                          </p>
                        )}
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(posts[0].slug);
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid of smaller posts */}
            {visiblePosts.length > 1 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {visiblePosts.slice(1).map((post) => (
                    <motion.div
                      key={post.id || post.slug}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                      onClick={() => handlePostClick(post.slug)}
                      variants={simpleFadeIn}
                      layout
                    >
                      <div className="h-32 overflow-hidden">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-6 flex-grow">
                        {post.category && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 mb-3 rounded-full">
                            {post.category}
                          </span>
                        )}
                        <h3 className="text-xl font-bold mb-3 text-blue-600 hover:underline">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="px-6 pb-6 pt-2 flex justify-between items-center mt-auto">
                        {post.date && (
                          <p className="text-sm font-medium text-gray-500">
                            {post.date}
                          </p>
                        )}
                        <button
                          className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(post.slug);
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Show more button */}
            {hasMorePosts && (
              <div className="flex justify-center my-10">
                <motion.button
                  onClick={handleShowMore}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg shadow-md hover:shadow-lg duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  variants={bounce}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                      }}
                    />
                  ) : (
                    'Show More'
                  )}
                </motion.button>
              </div>
            )}

            {/* Loading indicator for pagination/category changes */}
            {isLoading && posts.length > 0 && (
              <div className="flex justify-center items-center h-24 my-8">
                <motion.div
                  className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
