import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Tag,
  Calendar,
  User,
  Search,
  Grid,
  List,
  Filter,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import Pagination from '@/components/Pagination';

import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { getPostsByTag, PostMetaData, getAllTags } from '@/utils/posts-utils';
import { Dropdown } from '@/components/shared/Dropdown';
import TagPageSkeleton from '@/components/skeletons/TagPageSkeleton';

const TagPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostMetaData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMetaData[]>([]);
  const [, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'relevance'>('date');

  useEffect(() => {
    const loadTagData = async () => {
      if (!tag) return;

      setIsLoading(true);
      try {
        const [tagPosts, tags] = await Promise.all([
          getPostsByTag(tag),
          getAllTags(),
        ]);

        setPosts(tagPosts);
        setFilteredPosts(tagPosts);
        setAllTags(tags);
        document.title = `#${tag} - SugarLabs`;
      } catch (err) {
        console.error('Error loading tag posts:', err);
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadTagData();
  }, [tag]);

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...posts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'relevance': {
          const aTagCount = a.tags.filter((t) =>
            t.toLowerCase().includes(tag?.toLowerCase() || ''),
          ).length;
          const bTagCount = b.tags.filter((t) =>
            t.toLowerCase().includes(tag?.toLowerCase() || ''),
          ).length;
          return bTagCount - aTagCount;
        }
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [posts, searchTerm, selectedCategory, sortBy, tag]);

  const handlePostClick = (post: PostMetaData) => {
    const categoryPath = post.category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/news/${categoryPath}/${post.slug}`);
  };

  const handleTagClick = (clickedTag: string) => {
    if (clickedTag !== tag) {
      navigate(`/tags/${clickedTag}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getUniqueCategories = () => {
    const categories = Array.from(new Set(posts.map((post) => post.category)));
    return ['All', ...categories.sort()];
  };

  const getRelatedTags = () => {
    const tagFrequency: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags.forEach((postTag) => {
        if (postTag !== tag) {
          tagFrequency[postTag] = (tagFrequency[postTag] || 0) + 1;
        }
      });
    });

    return Object.entries(tagFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([tagName]) => tagName);
  };

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const relatedTags = getRelatedTags();

  if (isLoading) {
    return (
      <>
        <Header />
        <TagPageSkeleton />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            Error Loading Posts
          </h1>
          <p className="mb-8 text-gray-600">{error}</p>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </motion.button>

          {/* Tag Header */}
          <motion.div
            className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Tag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  #{tag}
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'}{' '}
                tagged with #{tag}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium dark:text-gray-200">
                    {posts.length} Articles
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium dark:text-gray-200">
                    {getUniqueCategories().length - 1} Categories
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-full">
                  <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium dark:text-gray-200">
                    {relatedTags.length} Related Tags
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Controls */}
              {posts.length > 0 && (
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Showing {filteredPosts.length} of {posts.length}{' '}
                        articles
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search in results..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-auto"
                        />
                      </div>

                      {/* Category Filter */}
                      <Dropdown
                        options={getUniqueCategories().map((category) => ({
                          value: category,
                          label: category,
                        }))}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        className="w-40"
                      />

                      {/* Sort */}
                      <Dropdown
                        options={[
                          { value: 'date', label: 'Latest First' },
                          { value: 'title', label: 'A-Z' },
                          { value: 'relevance', label: 'Most Relevant' },
                        ]}
                        value={sortBy}
                        onChange={setSortBy}
                        className="w-35"
                      />

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
                  </div>
                </motion.div>
              )}

              {/* Posts Display */}
              {filteredPosts.length === 0 ? (
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-6xl mb-6">
                    {searchTerm || selectedCategory !== 'All' ? '🔍' : '🏷️'}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {searchTerm || selectedCategory !== 'All'
                      ? 'No matching articles'
                      : 'No articles found'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || selectedCategory !== 'All'
                      ? 'Try adjusting your search or filter criteria'
                      : `No articles are tagged with #${tag} yet.`}
                  </p>
                  {(searchTerm || selectedCategory !== 'All') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </motion.div>
              ) : (
                <>
                  <motion.div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'
                        : 'space-y-6 mb-8'
                    }
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {visiblePosts.map((post, index) => (
                        <motion.article
                          key={post.slug}
                          className={`
                            bg-white dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-xl 
                            dark:shadow-blue-500/5 transition-all duration-300 
                            cursor-pointer overflow-hidden group
                            ${viewMode === 'list' ? 'flex' : ''}
                          `}
                          onClick={() => handlePostClick(post)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ y: -5 }}
                        >
                          <div
                            className={
                              viewMode === 'list' ? 'w-1/3 sm:w-1/4' : ''
                            }
                          >
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className={`w-full object-cover ${
                                  viewMode === 'list'
                                    ? 'h-full'
                                    : 'h-48 sm:h-56'
                                }`}
                              />
                            ) : (
                              <div
                                className={`w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center ${
                                  viewMode === 'list'
                                    ? 'h-full'
                                    : 'h-48 sm:h-56'
                                }`}
                              >
                                <div className="text-4xl opacity-50">📰</div>
                              </div>
                            )}
                          </div>

                          <div
                            className={`p-4 sm:p-6 ${viewMode === 'list' ? 'w-2/3 sm:w-3/4' : ''}`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-3 py-1 text-xs font-bold bg-green-500 dark:bg-green-600 text-white rounded-full">
                                {post.category}
                              </span>
                            </div>

                            <h2
                              className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${
                                viewMode === 'list' ? 'text-lg' : 'text-xl'
                              }`}
                            >
                              {post.title}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                {post.date && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                  </div>
                                )}
                                {post.author && (
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{post.author.name}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 3).map((postTag) => (
                                  <button
                                    key={postTag}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleTagClick(postTag);
                                    }}
                                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                      postTag === tag
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400'
                                    }`}
                                  >
                                    #{postTag}
                                  </button>
                                ))}
                                {post.tags.length > 3 && (
                                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                                    +{post.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Related Tags */}
              {relatedTags.length > 0 && (
                <div className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Related Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedTags.map((relatedTag) => (
                      <button
                        key={relatedTag}
                        onClick={() => handleTagClick(relatedTag)}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        #{relatedTag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Tag Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Articles
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {posts.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Categories
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {getUniqueCategories().length - 1}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Related Tags
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {relatedTags.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Popular in Category */}
              {getUniqueCategories().length > 2 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
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
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {category}
                            </span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
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

export default TagPage;
