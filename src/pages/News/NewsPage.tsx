import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllPosts, groupPostsByCategory, Post } from '@/utils/posts-utils';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeIn,
  slideInBottom,
  bounce,
  simpleFadeIn,
} from '@/styles/Animations';
import { CalendarRange } from 'lucide-react';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category: categoryParam } = useParams<{ category?: string }>();

  const [postsByCategory, setPostsByCategory] = useState<
    Record<string, Post[]>
  >({});
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [displayCount, setDisplayCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const allPosts = await getAllPosts();
        const grouped = groupPostsByCategory(allPosts);
        setPostsByCategory(grouped);
        setCategories(Object.keys(grouped));
      } catch (err) {
        console.error(err);
        setError('Failed to load news');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      const formatted = categoryParam.toLowerCase().replace(/-/g, ' ').trim();
      const match = categories.find((cat) => cat.toLowerCase() === formatted);
      if (match) {
        setActiveCategory(match);
        return;
      }
    }
    setActiveCategory('All');
  }, [categoryParam, categories]);

  useEffect(() => {
    const pathCat =
      activeCategory === 'All'
        ? 'all'
        : activeCategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/news/${pathCat}`, { replace: true });
    setDisplayCount(4);
  }, [activeCategory, navigate]);

  const sortedCategories = useMemo(() => {
    const others = categories
      .filter((c) => c !== 'All')
      .sort((a, b) => a.localeCompare(b));
    return ['All', ...others];
  }, [categories]);

  const visiblePosts = useMemo(() => {
    return (postsByCategory[activeCategory] || []).slice(0, displayCount);
  }, [postsByCategory, activeCategory, displayCount]);

  const hasMore = (postsByCategory[activeCategory]?.length || 0) > displayCount;

  const handleCategoryClick = (cat: string) => setActiveCategory(cat);

  const handleShowMore = () => {
    const total = postsByCategory[activeCategory]?.length || 0;
    setDisplayCount((prev) => Math.min(prev + 3, total));
  };

  const handlePostClick = (slug: string) => {
    const catPath =
      activeCategory === 'All'
        ? 'all'
        : activeCategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/news/${catPath}/${slug}`);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-7xl font-bold font-Caveat text-center mb-8">
            NEWS
          </h1>
          <motion.div
            className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
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

        {/* Category Tabs */}
        <div className="mb-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 max-w-4xl mx-auto overflow-x-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {sortedCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-5 py-2 rounded-lg transition-all duration-200 font-medium ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
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
          className="text-5xl font-Caveat text-center  py-5 text-green-600"
          variants={slideInBottom}
          initial="hidden"
          animate="visible"
        >
          {activeCategory}
        </motion.h2>

        {/* Featured Post */}
        <AnimatePresence>
          {visiblePosts[0] && (
            <motion.div
              key={visiblePosts[0].slug}
              className="mb-12 rounded-lg overflow-hidden border  shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
              onClick={() => handlePostClick(visiblePosts[0].slug)}
              variants={simpleFadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="relative md:flex">
                <div className="md:w-1/3 overflow-hidden">
                  {visiblePosts[0].image && (
                    <img
                      src={visiblePosts[0].image}
                      alt={visiblePosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    {visiblePosts[0].category && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 mb-4 rounded-full">
                        {visiblePosts[0].category}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-4 text-blue-600">
                      {visiblePosts[0].title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {visiblePosts[0].excerpt}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    {visiblePosts[0].date && (
                      <p className="text-sm font-medium flex gap-2 text-gray-500">
                        <CalendarRange
                          className="relative top-[3px]"
                          size={14}
                        />{' '}
                        {visiblePosts[0].date}
                      </p>
                    )}
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(visiblePosts[0].slug);
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16 "
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {visiblePosts.slice(1).map((post) => (
                <motion.div
                  key={post.slug}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                  onClick={() => handlePostClick(post.slug)}
                  variants={simpleFadeIn}
                  layout
                >
                  <div className="h-60 overflow-hidden relative">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full rounded-t-lg object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                    {post.category && (
                      <span className="inline-block absolute bottom-0 left-3 px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 mb-3 rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>

                  <div className="px-6 py-2 flex flex-col justify-between flex-grow">
                    <h3 className="text-xl font-bold text-blue-600 hover:underline">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="px-6 py-4 flex justify-between items-center mt-auto">
                    {post.date && (
                      <p className="text-sm flex item-end gap-1 font-medium text-gray-500">
                        <CalendarRange
                          className="relative top-[3px]"
                          size={14}
                        />
                        {post.date}
                      </p>
                    )}
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Show More */}
        {hasMore && (
          <div className="flex justify-center my-10">
            <motion.button
              onClick={handleShowMore}
              className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg shadow-md hover:shadow-lg duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              variants={bounce}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              Show More
            </motion.button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
