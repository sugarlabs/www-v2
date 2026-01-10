import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building, BookOpen, Search } from 'lucide-react';

import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { fetchAllAuthors, Author } from '@/utils/author-utils';
import { getPostsByAuthor } from '@/utils/posts-utils';
import AuthorCardSkeleton from '@/components/skeletons/AuthorCardSkeleton';

type AuthorWithPostCount = Author & {
  postCount: number | null;
};

const AuthorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<AuthorWithPostCount[]>([]);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  /*Debounce search input*/
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const loadPostCounts = useCallback(async (authorsList: Author[]) => {
    const batchSize = 3; /*Load 3 post counts at a time*/

    for (let i = 0; i < authorsList.length; i += batchSize) {
      const batch = authorsList.slice(i, i + batchSize);

      const batchResults = await Promise.all(
        batch.map(async (author) => {
          try {
            const posts = await getPostsByAuthor(author.slug);
            return { slug: author.slug, postCount: posts.length };
          } catch (error) {
            console.error(`Failed to get post count for ${author.name}`, error);
            return { slug: author.slug, postCount: 0 };
          }
        }),
      );

      /*Update state with these post counts (progressive UI update)*/
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) => {
          const result = batchResults.find((r) => r.slug === author.slug);
          return result ? { ...author, postCount: result.postCount } : author;
        }),
      );

      if (i + batchSize < authorsList.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }, []);

  useEffect(() => {
    const loadAllAuthors = async () => {
      setIsLoadingAuthors(true);
      document.title = 'Our Authors - SugarLabs';

      try {
        /*STAGE 1: Load basic author info*/
        const allAuthors = await fetchAllAuthors();

        if (!allAuthors || allAuthors.length === 0) {
          setAuthors([]);
          setIsLoadingAuthors(false);
          return;
        }

        /*STAGE 2: Show authors immediately with null post counts*/
        const authorsWithNullCounts = allAuthors.map((author) => ({
          ...author,
          postCount: null,
        }));

        setAuthors(authorsWithNullCounts);
        setIsLoadingAuthors(false);

        /*STAGE 3: Load post counts in background (non-blocking)*/
        loadPostCounts(allAuthors);
      } catch (err) {
        console.error('Error loading authors:', err);
        setError('Failed to load author information');
        setIsLoadingAuthors(false);
      }
    };

    loadAllAuthors();
  }, [loadPostCounts]);

  const handleAuthorClick = (slug: string) => {
    navigate(`/authors/${slug}`);
  };

  /*Filter authors based on search*/
  const filteredAuthors = useMemo(() => {
    if (!debouncedSearch) return authors;
    return authors.filter((author) =>
      author.name.toLowerCase().includes(debouncedSearch),
    );
  }, [authors, debouncedSearch]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
            Something went wrong
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full transition-colors"
            aria-label="Retry loading authors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!isLoadingAuthors && authors.length === 0) {
      return (
        <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            No Authors
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            There are no authors to display at this time.
          </p>
        </div>
      );
    }

    /*Main content area*/
    return (
      <div>
        {/* Search Bar - Always visible and interactive */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search authors by name..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search authors by name"
            />
          </div>
        </div>

        {/* Loading state - Show skeletons */}
        {isLoadingAuthors ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="status"
            aria-live="polite"
            aria-label="Loading authors"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <AuthorCardSkeleton key={`skeleton-${index}`} index={index} />
            ))}
          </div>
        ) : (
          /*Loaded state - Show actual authors*/
          <>
            {filteredAuthors.length === 0 ? (
              <div className="text-center py-16 text-gray-600 dark:text-gray-300">
                No authors found matching "
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {searchTerm}
                </span>
                "
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAuthors.map((author, index) => (
                  <motion.div
                    key={author.slug}
                    onClick={() => handleAuthorClick(author.slug)}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 
                               hover:shadow-blue-200 dark:hover:shadow-blue-500/30
                               transition-shadow duration-300 cursor-pointer group flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    whileHover={{ scale: 1.05 }}
                    role="article"
                    aria-label={`${author.name}, ${author.title}`}
                  >
                    <div className="flex flex-col items-center p-6 text-center flex-1">
                      {/* Avatar - Lazy loaded for performance */}
                      <div className="flex-shrink-0 mb-4">
                        {author.avatar ? (
                          <img
                            src={author.avatar}
                            alt={`${author.name}'s avatar`}
                            loading="lazy"
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-blue-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center">
                            <User
                              className="w-12 h-12 text-blue-600 dark:text-blue-400"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>

                      {/* Author Info */}
                      <div className="flex flex-col flex-1">
                        {/* Name */}
                        <h1
                          className="text-xl font-bold text-gray-900 dark:text-white mb-1 
                                       group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        >
                          {author.name}
                        </h1>

                        {/* Title and Organization */}
                        <div className="flex flex-col items-center gap-1 mb-3">
                          <span className="text-md text-blue-600 dark:text-blue-400 font-medium">
                            {author.title}
                          </span>
                          {author.organization && (
                            <div className="flex items-center justify-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                              <Building
                                className="w-4 h-4"
                                aria-hidden="true"
                              />
                              <span className="font-medium">
                                {author.organization}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 max-w-xl line-clamp-3">
                          {author.description}
                        </p>

                        {/* Quick Stats Badges */}
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600 dark:text-gray-300 mt-auto">
                          {/* Article count badge with loading state */}
                          {author.postCount !== null ? (
                            // Loaded state - show actual count
                            <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                              <BookOpen
                                className="w-4 h-4"
                                aria-hidden="true"
                              />
                              <span>
                                {author.postCount}{' '}
                                {author.postCount === 1
                                  ? 'Article'
                                  : 'Articles'}
                              </span>
                            </div>
                          ) : (
                            // Loading state - entire badge shimmers
                            <div
                              className="flex items-center gap-1 bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded-full animate-pulse"
                              role="status"
                              aria-label="Loading article count"
                            >
                              <div className="w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded" />
                              <div className="w-16 h-3 bg-gray-400 dark:bg-gray-600 rounded" />
                            </div>
                          )}

                          {/* Organization badge */}
                          {author.organization && (
                            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                              <Building
                                className="w-4 h-4"
                                aria-hidden="true"
                              />
                              <span>{author.organization}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-red-500 font-Pacifico"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Meet{' '}
              </motion.span>
              Our Authors
            </motion.h2>

            <div className="flex justify-center">
              <motion.div
                className="h-1 bg-red-500 mb-8 w-24"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
            </div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Meet the talented authors, mentors, and contributors who share
              their insights and drive the Sugar Labs mission forward. Explore
              their work and connect with the community.
            </motion.p>
          </div>

          {renderContent()}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AuthorsPage;
