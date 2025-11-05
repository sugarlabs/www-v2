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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author, index) => (
          <motion.div
            key={author.slug}
            onClick={() => handleAuthorClick(author.slug)}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 
                       transition-shadow duration-300 group-hover:shadow-blue-200 dark:group-hover:shadow-blue-500/30
                       cursor-pointer group flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              scale: {
                type: 'spring',
                stiffness: 300,
                damping: 15,
              },
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center p-6 text-center flex-1">
              {/* Avatar */}
              <div className="flex-shrink-0 mb-4">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>

              {/* Author Info*/}
              <div className="flex flex-col flex-1">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {author.name}
                </h1>

                {/* Title and Org */}
                <div className="flex flex-col items-center gap-1 mb-3">
                  <span className="text-md text-blue-600 dark:text-blue-400 font-medium">
                    {author.title}
                  </span>
                  {author.organization && (
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{author.organization}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 max-w-xl line-clamp-3">
                  {author.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600 dark:text-gray-300 mt-auto">
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
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <Header />
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
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
