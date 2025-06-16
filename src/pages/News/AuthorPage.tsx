import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ArrowLeft,
  BookOpen,
  User,
  Building,
  Grid,
  List,
  Search,
  ChevronDown,
} from 'lucide-react';

import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import MarkdownRenderer from '@/utils/MarkdownRenderer';
import { getAuthorBySlug, Author } from '@/utils/author-utils';
import { getPostsByAuthor, Post } from '@/utils/posts-utils';

const AuthorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [displayCount, setDisplayCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  useEffect(() => {
    const loadAuthorData = async () => {
      if (!slug) return;

      setIsLoading(true);
      try {
        const [authorData, authorPosts] = await Promise.all([
          getAuthorBySlug(slug),
          getPostsByAuthor(slug),
        ]);

        if (!authorData) {
          setError('Author not found');
          return;
        }

        setAuthor(authorData);
        setPosts(authorPosts);
        setFilteredPosts(authorPosts);
        document.title = `${authorData.name} - SugarLabs`;
      } catch (err) {
        console.error('Error loading author:', err);
        setError('Failed to load author information');
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthorData();
  }, [slug]);

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...posts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort posts
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    setFilteredPosts(filtered);
    setDisplayCount(6); // Reset display count when filters change
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const handlePostClick = (post: Post) => {
    const categoryPath = post.category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/news/${categoryPath}/${post.slug}`);
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, filteredPosts.length));
  };

  const getUniqueCategories = () => {
    const categories = Array.from(new Set(posts.map((post) => post.category)));
    return ['All', ...categories.sort()];
  };

  const visiblePosts = filteredPosts.slice(0, displayCount);
  const hasMore = filteredPosts.length > displayCount;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading author profile...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !author) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">
            Author Not Found
          </h1>
          <p className="mb-8 text-gray-600">
            The author profile you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/news')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mx-auto"
          >
            Back to News
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 flex items-center text-blue-600 hover:text-blue-700 transition-colors rounded-md hover:bg-blue-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </motion.button>

          {/* Author Header */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-blue-100"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-600" />
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {author.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <span className="text-lg lg:text-xl text-blue-600 font-medium">
                    {author.title}
                  </span>
                  {author.organization && (
                    <>
                      <span className="hidden sm:inline text-gray-400">at</span>
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-700">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">
                          {author.organization}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-gray-600 text-base lg:text-lg mb-4 max-w-2xl">
                  {author.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {posts.length}{' '}
                      {posts.length === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>
                  {author.organization && (
                    <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                      <Building className="w-4 h-4" />
                      <span>{author.organization}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Author Content */}
            <motion.div
              className="xl:col-span-3 order-2 xl:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
                <MarkdownRenderer content={author.content} />
              </div>

              {/* Articles Section */}
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                      Articles ({filteredPosts.length})
                    </h3>
                  </div>

                  {/* Controls */}
                  {posts.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search articles..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-auto"
                        />
                      </div>

                      {/* Category Filter */}
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        {getUniqueCategories().map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>

                      {/* Sort */}
                      <select
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value as 'date' | 'title')
                        }
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="date">Sort by Date</option>
                        <option value="title">Sort by Title</option>
                      </select>

                      {/* View Toggle */}
                      <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 rounded-md transition-colors ${
                            viewMode === 'grid'
                              ? 'bg-white text-blue-600 shadow-sm'
                              : 'text-gray-600'
                          }`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 rounded-md transition-colors ${
                            viewMode === 'list'
                              ? 'bg-white text-blue-600 shadow-sm'
                              : 'text-gray-600'
                          }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Articles Display */}
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">
                      {searchTerm || selectedCategory !== 'All' ? '🔍' : '📝'}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                      {searchTerm || selectedCategory !== 'All'
                        ? 'No matching articles'
                        : 'No articles published yet'}
                    </h4>
                    <p className="text-gray-600">
                      {searchTerm || selectedCategory !== 'All'
                        ? 'Try adjusting your search or filter criteria'
                        : 'Articles will appear here when published'}
                    </p>
                    {(searchTerm || selectedCategory !== 'All') && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('All');
                        }}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <motion.div
                      className={
                        viewMode === 'grid'
                          ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                          : 'space-y-4'
                      }
                      initial="hidden"
                      animate="visible"
                    >
                      <AnimatePresence>
                        {visiblePosts.map((post, index) => (
                          <motion.article
                            key={post.slug}
                            className={`
                              border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md 
                              transition-all duration-300 cursor-pointer group bg-white
                              ${viewMode === 'list' ? 'flex gap-4 p-4' : 'p-4'}
                            `}
                            onClick={() => handlePostClick(post)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            {viewMode === 'list' && post.image && (
                              <div className="w-24 h-24 flex-shrink-0">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                            )}

                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {post.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {post.excerpt}
                              </p>

                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                  </div>
                                  {post.tags.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <span>
                                        {post.tags.slice(0, 2).join(', ')}
                                      </span>
                                      {post.tags.length > 2 && (
                                        <span>+{post.tags.length - 2}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                                  {post.category}
                                </span>
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {/* Load More Button */}
                    {hasMore && (
                      <div className="text-center mt-8">
                        <motion.button
                          onClick={handleShowMore}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Load More Articles
                          <ChevronDown className="w-4 h-4" />
                          <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
                            +{Math.min(6, filteredPosts.length - displayCount)}
                          </span>
                        </motion.button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="order-1 xl:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Author Stats Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Profile Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Articles</span>
                    <span className="font-semibold text-blue-600">
                      {posts.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-semibold text-gray-900">
                      {getUniqueCategories().length - 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Categories Card */}
              {getUniqueCategories().length > 2 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {getUniqueCategories()
                      .slice(1)
                      .map((category) => {
                        const count = posts.filter(
                          (post) => post.category === category,
                        ).length;
                        return (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full flex justify-between items-center p-2 rounded-lg transition-colors text-left ${
                              selectedCategory === category
                                ? 'bg-blue-50 text-blue-700'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {category}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              {count}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthorPage;
