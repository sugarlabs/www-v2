import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building, BookOpen } from 'lucide-react';

import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { fetchAllAuthors, Author } from '@/utils/author-utils';
import { getPostsByAuthor } from '@/utils/posts-utils';

type AuthorWithPostCount = Author & {
  postCount: number;
};

const AuthorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<AuthorWithPostCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllAuthors = async () => {
      setIsLoading(true);
      document.title = 'Our Authors - SugarLabs';
      try {
        
        const allAuthors = await fetchAllAuthors();

        if (!allAuthors || allAuthors.length === 0) {
          setAuthors([]);
          return;
        }
        console.log(allAuthors);
        const authorsWithData = await Promise.all(
          allAuthors.map(async (author) => {
            try {
              const posts = await getPostsByAuthor(author.slug);
              return { ...author, postCount: posts.length };
            } catch (postError) {
              console.error(
                `Failed to get post count for ${author.name}`,
                postError,
              );
              return { ...author, postCount: 0 };
            }
          }),
        );

        setAuthors(authorsWithData);
      } catch (err) {
        console.error('Error loading authors:', err);
        setError('Failed to load author information');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllAuthors();
  }, []);

  const handleAuthorClick = (slug: string) => {
    navigate(`/authors/${slug}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading authors...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            Something went wrong
          </h1>
          <p className="mb-8 text-gray-600">{error}</p>
        </div>
      );
    }

    if (authors.length === 0) {
      return (
        <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">No Authors</h1>
          <p className="mb-8 text-gray-600">
            There are no authors to display at this time.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {authors.map((author, index) => (
          <motion.div
            key={author.slug}
            onClick={() => handleAuthorClick(author.slug)}
            className="cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-4 sm:p-6 lg:p-8 transition-all duration-300 group-hover:shadow-blue-200 dark:group-hover:shadow-blue-500/30">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {author.avatar ? (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-blue-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {author.name}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <span className="text-lg lg:text-xl text-blue-600 dark:text-blue-400 font-medium">
                      {author.title}
                    </span>
                    {author.organization && (
                      <>
                        <span className="hidden sm:inline text-gray-400 dark:text-gray-500">
                          at
                        </span>
                        <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-700 dark:text-gray-300">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">
                            {author.organization}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg mb-4 max-w-2xl line-clamp-2">
                    {author.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {author.postCount}{' '}
                        {author.postCount === 1 ? 'Article' : 'Articles'}
                      </span>
                    </div>
                    {author.organization && (
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                        <Building className="w-4 h-4" />
                        <span>{author.organization}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-center mb-10 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Meet Our Authors
          </motion.h1>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthorsPage;