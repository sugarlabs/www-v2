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
  floatUpAndFade,
} from '@/styles/Animations';
import {
  CalendarRange,
  ArrowRight,
  Grid3X3,
  List,
  Search,
  TrendingUp,
  Share2,
  Sparkles,
  Tag,
  Info,
} from 'lucide-react';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category: categoryParam } = useParams<{ category?: string }>();

  const [postsByCategory, setPostsByCategory] = useState<
    Record<string, Post[]>
  >({});
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [displayCount, setDisplayCount] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'magazine'>(
    'grid',
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

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
    setDisplayCount(6);
  }, [activeCategory, navigate]);

  const sortedCategories = useMemo(() => {
    const others = categories
      .filter((c) => c !== 'All')
      .sort((a, b) => a.localeCompare(b));
    return ['All', ...others];
  }, [categories]);

  const filteredPosts = useMemo(() => {
    let posts = postsByCategory[activeCategory] || [];

    // Filter by search term
    if (searchTerm) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return posts;
  }, [postsByCategory, activeCategory, searchTerm]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, displayCount);
  }, [filteredPosts, displayCount]);

  const hasMore = filteredPosts.length > displayCount;

  const handleCategoryClick = (cat: string) => setActiveCategory(cat);

  const handleShowMore = () => {
    const total = filteredPosts.length;
    setDisplayCount((prev) => Math.min(prev + 6, total));
  };

  const handlePostClick = (slug: string) => {
    const catPath =
      activeCategory === 'All'
        ? 'all'
        : activeCategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/news/${catPath}/${slug}`);
  };

  const sharePost = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href + `/${post.slug}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + `/${post.slug}`);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              variants={floatUpAndFade}
              initial="hidden"
              animate="visible"
            >
              <div className="relative mb-9">
                <h1 className="text-8xl font-bold font-Caveat text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  NEWS
                </h1>
                <div className="absolute -top-4 -right-5">
                  <Sparkles
                    className="text-yellow-400 animate-pulse"
                    size={30}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Loading Latest News
                </h2>
                <p className="text-gray-600">
                  Fetching the most recent stories from Sugar Labs community...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="container mx-auto px-4 py-20 text-center">
            <motion.h1
              className="text-8xl font-bold font-Caveat text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-8"
              variants={floatUpAndFade}
              initial="hidden"
              animate="visible"
            >
              NEWS
            </motion.h1>
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto">
              <div className="text-red-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 opacity-20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-green-200 opacity-15 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 opacity-10 rounded-full"></div>
          </div>

          <div className="relative container mx-auto px-4 py-20">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-center mb-6">
                <Sparkles
                  className="text-blue-500 mr-4 animate-pulse"
                  size={32}
                />
                <h1 className="text-8xl font-bold font-Caveat text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  NEWS
                </h1>
                <TrendingUp
                  className="text-green-500 ml-4 animate-bounce"
                  size={32}
                />
              </div>

              <p className="text-xl mb-8 text-gray-700 leading-relaxed">
                Discover the latest innovations, community updates, and
                educational insights from the Sugar Labs ecosystem
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm"></div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Enhanced Filters and Controls */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    title="Grid View"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    title="List View"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filters - Always Visible */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <Tag className="text-gray-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">
                  Categories
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {sortedCategories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-[#144EEC] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <span className="ml-2 text-xs bg-white text-black bg-opacity-30 rounded-full px-2 py-1">
                        {(postsByCategory[cat] || []).length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Template Category Note */}
          {activeCategory.toLowerCase() === 'template' && (
            <motion.div
              className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <Info className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-amber-800 font-medium">
                    <strong>Note:</strong> These are developer templates for
                    post formatting.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Current Category Display */}
          <motion.div
            className="text-center mb-8"
            variants={slideInBottom}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-5xl font-Caveat text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
              {activeCategory} {searchTerm && `· "${searchTerm}"`}
            </h2>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <span>{filteredPosts.length} articles found</span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 hover:text-blue-700 underline text-sm"
                >
                  Clear search
                </button>
              )}
            </p>
          </motion.div>

          {/* Posts Display */}
          <AnimatePresence mode="wait">
            {visiblePosts.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white rounded-2xl p-12 shadow-xl max-w-md mx-auto">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    No articles found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm
                      ? `No articles match "${searchTerm}" in this category.`
                      : 'There are no articles in this category yet.'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className={`mb-12 ${
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : viewMode === 'list'
                      ? 'space-y-8'
                      : 'grid grid-cols-1 lg:grid-cols-2 gap-8'
                }`}
                initial="hidden"
                animate="visible"
              >
                {visiblePosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                    onClick={() => handlePostClick(post.slug)}
                    variants={simpleFadeIn}
                    custom={index}
                    layout
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className={`${viewMode === 'list' ? 'w-1/3' : ''} relative`}
                    >
                      <div
                        className={`${viewMode === 'list' ? 'h-full' : 'h-56'} overflow-hidden`}
                      >
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 flex items-center justify-center">
                            <div className="text-6xl opacity-50">📰</div>
                          </div>
                        )}
                      </div>

                      {post.category && (
                        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-green-500 text-white rounded-full shadow-lg">
                          {post.category}
                        </span>
                      )}

                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={(e) => sharePost(post, e)}
                          className="p-2 rounded-full bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100 backdrop-blur-sm transition-all duration-300"
                        >
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div
                      className={`${viewMode === 'list' ? 'w-2/3' : ''} p-6 flex flex-col justify-between`}
                    >
                      <div>
                        <h3
                          className={`font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${
                            viewMode === 'list' ? 'text-xl' : 'text-lg'
                          }`}
                        >
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {post.date && (
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarRange size={14} className="mr-2" />
                            {post.date}
                          </div>
                        )}
                        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                          Read more
                          <ArrowRight
                            size={14}
                            className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Load More Button */}
          {hasMore && (
            <div className="flex justify-center">
              <motion.button
                onClick={handleShowMore}
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl font-medium flex items-center gap-3 group overflow-hidden"
                variants={bounce}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">Load More Articles</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">
                    {Math.min(6, filteredPosts.length - displayCount)}
                  </span>
                </div>
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
