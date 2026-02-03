import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Star,
  GitFork,
  Calendar,
  Code,
  Users,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { fadeIn, staggerContainer } from '@/styles/Animations';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const handleApiError = (
  error: any,
  context: 'repositories' | 'contributors',
) => {
  if (axios.isAxiosError(error)) {
    // Check for rate limit (GitHub returns 403 with specific headers)
    if (error.response?.status === 403) {
      const remaining = error.response.headers['x-ratelimit-remaining'];

      if (remaining === '0') {
        const resetTime = error.response.headers['x-ratelimit-reset'];
        const resetDate = resetTime
          ? new Date(parseInt(resetTime) * 1000).toLocaleTimeString()
          : 'approximately 1 hour';

        return {
          type: 'rate_limit' as const,
          message: `Too many requests. Please try again after ${resetDate}.`,
        };
      }
    }

    // Server errors (5xx)
    if (error.response?.status && error.response.status >= 500) {
      return {
        type: 'server' as const,
        message:
          'The service is temporarily unavailable. Please try again in a few minutes.',
      };
    }

    // Network errors (no response)
    if (!error.response) {
      return {
        type: 'network' as const,
        message:
          'Unable to connect. Please check your internet connection and try again.',
      };
    }
  }

  // Generic error fallback
  return {
    type: 'generic' as const,
    message: `Unable to load ${context}. Please try again later.`,
  };
};

// Skeleton Loader Components.
const RepositorySkeleton: React.FC = () => (
  <div className="p-4 rounded-lg border-l-4 border-transparent animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 dark:bg-gray-700 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full dark:bg-gray-700 mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 dark:bg-gray-700 mb-3"></div>
    <div className="flex gap-3">
      <div className="h-4 bg-gray-200 rounded w-12 dark:bg-gray-700"></div>
      <div className="h-4 bg-gray-200 rounded w-12 dark:bg-gray-700"></div>
      <div className="h-4 bg-gray-200 rounded w-16 dark:bg-gray-700"></div>
    </div>
  </div>
);

const ContributorSkeleton: React.FC = () => (
  <div className="flex flex-col items-center p-5 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 animate-pulse">
    <div className="relative mb-3">
      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="absolute -bottom-1 -right-4 bg-gray-200 rounded-full w-9 h-6 dark:bg-gray-700"></div>
    </div>
    <div className="h-5 bg-gray-200 rounded w-24 dark:bg-gray-700 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-16 dark:bg-gray-700"></div>
  </div>
);

const Contributors: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<string | null>(
    'musicblocks',
  );
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [visibleContributors, setVisibleContributors] = useState<Contributor[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [repoLoading, setRepoLoading] = useState<boolean>(true);
  const [repoError, setRepoError] = useState<{
    type: 'rate_limit' | 'server' | 'network' | 'generic';
    message: string;
  } | null>(null);
  const [contributorError, setContributorError] = useState<{
    type: 'rate_limit' | 'server' | 'network' | 'generic';
    message: string;
  } | null>(null);
  const [contributorSearchTerm, setContributorSearchTerm] =
    useState<string>('');
  const [filteredContributors, setFilteredContributors] = useState<
    Contributor[]
  >([]);
  const [contributorProgress, setContributorProgress] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch repositories with pagination!
  const fetchRepos = useCallback(
    async (pageNum: number = 1, isLoadMore: boolean = false) => {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setRepoLoading(true);
      }
      setRepoError(null);

      try {
        const response = await axios.get(
          `https://api.github.com/orgs/sugarlabs/repos?per_page=30&page=${pageNum}&sort=updated&direction=desc`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          },
        );

        const newRepos = response.data;

        if (pageNum === 1) {
          setRepos(newRepos);
          setFilteredRepos(newRepos);
        } else {
          setRepos((prev) => [...prev, ...newRepos]);
          setFilteredRepos((prev) => [...prev, ...newRepos]);
        }
        setHasMore(newRepos.length === 30);
        setPage(pageNum + 1);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        const errorInfo = handleApiError(error, 'repositories');
        setRepoError(errorInfo);
      } finally {
        if (isLoadMore) {
          setIsLoadingMore(false);
        } else {
          setRepoLoading(false);
        }
      }
    },
    [],
  );

  const getSelectedRepoDetails = useCallback(() => {
    if (!selectedRepo) return null;
    return repos.find((repo) => repo.name === selectedRepo);
  }, [selectedRepo, repos]);

  const fetchAllContributors = useCallback(async (repoName: string) => {
    if (!repoName) return;

    setLoading(true);
    setContributorError(null);
    setVisibleContributors([]);
    setContributorProgress(0);

    try {
      let allContributors: Contributor[] = [];
      let contributorPage = 1;
      let hasMoreContributors = true;

      while (hasMoreContributors) {
        const response = await axios.get(
          `https://api.github.com/repos/sugarlabs/${repoName}/contributors?per_page=100&page=${contributorPage}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          },
        );

        if (response.data.length === 0) {
          hasMoreContributors = false;
        } else {
          allContributors = [...allContributors, ...response.data];
          contributorPage++;

          // Update progress indicator..
          setContributorProgress(
            Math.min(90, Math.round((allContributors.length / 150) * 100)),
          );
        }
      }

      setContributors(allContributors);
      setFilteredContributors(allContributors);
      setContributorProgress(100);

      setVisibleContributors(allContributors.slice(0, 9));

      // OPTIMIZATION: PreLoad first 9 avatar images with smaller size
      const firstNine = allContributors.slice(0, 9);
      firstNine.forEach((contributor) => {
        const img = new Image();
        img.src = `${contributor.avatar_url}&s=80`;
      });

      // Load remaining contributors after a short delay..!
      if (allContributors.length > 9) {
        setTimeout(() => {
          setVisibleContributors(allContributors);
        }, 300);
      }
    } catch (error) {
      console.error('Error fetching contributors:', error);
      const errorInfo = handleApiError(error, 'contributors');
      setContributorError(errorInfo);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos(1);
    if (selectedRepo) {
      fetchAllContributors(selectedRepo);
    }
  }, [fetchRepos, fetchAllContributors, selectedRepo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoadingMore &&
          !repoLoading
        ) {
          fetchRepos(page, true);
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, repoLoading, page, fetchRepos]);

  useEffect(() => {
    const filtered = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase())),
    );
    setFilteredRepos(filtered);
  }, [searchTerm, repos]);

  useEffect(() => {
    setContributorSearchTerm('');

    if (!selectedRepo) {
      setContributors([]);
      setFilteredContributors([]);
      return;
    }

    fetchAllContributors(selectedRepo);
  }, [selectedRepo, fetchAllContributors]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!contributorSearchTerm.trim()) {
        setFilteredContributors(contributors);
        return;
      }

      const filtered = contributors.filter((contributor) =>
        contributor.login
          .toLowerCase()
          .includes(contributorSearchTerm.toLowerCase()),
      );
      setFilteredContributors(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [contributorSearchTerm, contributors]);

  const handleRepoClick = useCallback(
    (repoName: string) => {
      setSelectedRepo(repoName);
      fetchAllContributors(repoName);
    },
    [fetchAllContributors],
  );

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const repositoryList = useMemo(() => {
    if (repoLoading && page === 1) {
      return (
        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1 -mx-2 px-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <RepositorySkeleton key={index} />
          ))}
        </div>
      );
    }

    if (repoError) {
      return (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-6 text-center my-4 dark:bg-rose-950/20 dark:border-rose-900/40">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 dark:bg-rose-900/40">
            <svg
              className="w-6 h-6 text-rose-600 dark:text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-rose-950 font-semibold mb-1 dark:text-rose-100">
            {repoError.type === 'rate_limit'
              ? 'Rate Limit Exceeded'
              : 'Unable to load repositories'}
          </h3>
          <p className="text-rose-800/80 text-sm mb-4 dark:text-rose-200/70">
            {repoError.message}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {repoError.type !== 'rate_limit' && (
              <button
                onClick={() => {
                  setRepoError(null);
                  fetchRepos(1);
                }}
                className="px-4 py-2 bg-white border border-rose-300 rounded-lg text-rose-700 hover:bg-rose-50 hover:scale-105 hover:shadow-md transition-colors text-sm font-medium dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-200 dark:hover:bg-rose-900/50 dark:hover:scale-105 dark:hover:shadow-[0_0_15px_rgba(225,29,72,0.2)]"
              >
                Try Again
              </button>
            )}
            {repoError.type === 'rate_limit' && (
              <button
                onClick={() => (window.location.href = '/')}
                className="px-4 py-2 bg-[#2563eb] border border-[#2563eb] rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-[#1d4ed8] hover:border-[#1d4ed8] dark:bg-[#3b82f6] dark:border-[#3b82f6] dark:hover:bg-[#2563eb] dark:hover:border-[#2563eb] dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                Go to Homepage
              </button>
            )}
          </div>
        </div>
      );
    }

    if (repos.length === 0) {
      return (
        <p className="text-gray-500 text-center py-10 dark:text-gray-400">
          No repositories found
        </p>
      );
    }

    if (filteredRepos.length === 0) {
      return (
        <p className="text-gray-500 text-center py-10 dark:text-gray-400">
          No repositories match your search
        </p>
      );
    }

    return (
      <>
        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1 -mx-2 px-2 custom-scrollbar">
          <AnimatePresence>
            {filteredRepos.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleRepoClick(repo.name)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-l-4 ${
                  selectedRepo === repo.name
                    ? 'bg-[#FFF4E6] border-[#D4B062] dark:bg-[#D4B062]/20 shadow-sm'
                    : 'hover:bg-gray-100 border-transparent hover:border-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-700'
                }`}
              >
                <h3 className="font-medium text-lg text-gray-800 wrap-break-word dark:text-gray-100">
                  {repo.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1 dark:text-gray-400">
                  {repo.description || 'No description'}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-[#D4B062]" />{' '}
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5 text-[#D4B062]" />{' '}
                    {repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#D4B062]" />{' '}
                    {formatDate(repo.updated_at)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoadingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 text-[#D4B062] animate-spin" />
            </div>
          )}

          <div ref={observerTarget} className="h-4" />
        </div>

        {hasMore && !isLoadingMore && filteredRepos.length > 0 && (
          <p className="text-center text-sm text-gray-500 mt-4 dark:text-gray-400">
            Scroll down to load more repositories
          </p>
        )}
      </>
    );
  }, [
    repoLoading,
    repoError,
    repos,
    filteredRepos,
    selectedRepo,
    handleRepoClick,
    formatDate,
    isLoadingMore,
    hasMore,
    page,
    fetchRepos,
  ]);

  const contributorsList = useMemo(() => {
    if (!selectedRepo) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mb-4 dark:text-gray-600" />
          <p className="text-gray-500 max-w-xs dark:text-gray-400">
            Select a repository from the list to view its contributors
          </p>
        </div>
      );
    }

    if (loading && visibleContributors.length === 0) {
      return (
        <>
          <div className="max-h-[65vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <ContributorSkeleton key={index} />
              ))}
            </div>
          </div>
          {contributorProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-4">
              <div
                className="bg-[#D4B062] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${contributorProgress}%` }}
              ></div>
            </div>
          )}
        </>
      );
    }

    if (contributorError) {
      return (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-6 text-center my-4 dark:bg-rose-950/20 dark:border-rose-900/40">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 dark:bg-rose-900/40">
            <svg
              className="w-6 h-6 text-rose-600 dark:text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-rose-950 font-semibold mb-1 dark:text-rose-100">
            {contributorError.type === 'rate_limit'
              ? 'Rate Limit Exceeded'
              : 'Unable to load contributors'}
          </h3>
          <p className="text-rose-800/80 text-sm mb-4 dark:text-rose-200/70">
            {contributorError.message}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {contributorError.type !== 'rate_limit' && (
              <button
                onClick={() => {
                  setContributorError(null);
                  if (selectedRepo) {
                    fetchAllContributors(selectedRepo);
                  }
                }}
                className="px-4 py-2 bg-white border border-rose-300 rounded-lg text-rose-700 hover:bg-rose-50 hover:scale-105 hover:shadow-md transition-colors text-sm font-medium dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-200 dark:hover:bg-rose-900/50 dark:hover:scale-105 dark:hover:shadow-[0_0_15px_rgba(225,29,72,0.2)]"
              >
                Try Again
              </button>
            )}
            {contributorError.type === 'rate_limit' && (
              <button
                onClick={() => (window.location.href = '/')}
                className="px-4 py-2 bg-[#2563eb] border border-[#2563eb] rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-[#1d4ed8] hover:border-[#1d4ed8] dark:bg-[#3b82f6] dark:border-[#3b82f6] dark:hover:bg-[#2563eb] dark:hover:border-[#2563eb] dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                Go to Homepage
              </button>
            )}
          </div>
        </div>
      );
    }

    if (visibleContributors.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Users className="h-16 w-16 text-gray-300 mb-4 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">
            No contributors found for this repository
          </p>
        </div>
      );
    }

    if (filteredContributors.length === 0 && contributorSearchTerm.trim()) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Users className="h-16 w-16 text-gray-300 mb-4 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">
            No contributors match your search
          </p>
        </div>
      );
    }

    const displayContributors =
      visibleContributors.length > 0 ? visibleContributors : contributors;

    return (
      <>
        <div className="max-h-[65vh] overflow-y-auto pr-1 custom-scrollbar">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {(contributorSearchTerm.trim()
              ? filteredContributors
              : displayContributors
            ).map((contributor) => (
              <motion.a
                key={contributor.id}
                variants={fadeIn}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-5 bg-gray-100 rounded-lg transition-all duration-300 hover:bg-[#FFF4E6] border border-gray-100 dark:bg-gray-800 dark:hover:bg-[#D4B062]/10 dark:border-gray-700"
              >
                <div className="relative mb-3">
                  <img
                    src={`${contributor.avatar_url}&s=80`}
                    alt={`${contributor.login}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm dark:border-gray-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.webp';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-4 bg-[#D4B062] text-xs text-white font-bold rounded-full w-9 h-6 flex items-center justify-center">
                    {contributor.contributions > 500
                      ? '500+'
                      : contributor.contributions}
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 text-center wrap-break-word w-full dark:text-gray-100">
                  {contributor.login}
                </h3>
                <div className="mt-2 flex items-center text-xs text-[#D4B062] opacity-0 group-hover:opacity-100 transition-opacity">
                  View Profile <ExternalLink className="ml-1 h-3 w-3" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
        {visibleContributors.length < contributors.length && (
          <p className="text-center text-sm text-gray-500 mt-4 dark:text-gray-400">
            Loading all contributors...
          </p>
        )}
      </>
    );
  }, [
    selectedRepo,
    loading,
    contributorError,
    contributors,
    filteredContributors,
    contributorSearchTerm,
    visibleContributors,
    contributorProgress,
    fetchAllContributors,
  ]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col font-sans bg-[#FFFEF9] dark:bg-[#13141f]">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative py-16 sm:py-20 overflow-hidden bg-linear-to-b from-black via-gray-800 to-gray-600"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10"></div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>
          </div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center z-10 relative">
              <motion.h1
                className="font-black text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Sugar Labs <span className="text-[#D4B062]">Developers</span>
              </motion.h1>
              <motion.div
                className="w-16 sm:w-24 h-1 bg-[#D4B062] mb-4 sm:mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
              <motion.p
                className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300 max-w-2xl leading-relaxed px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Explore Sugar Labs repositories and their contributors. Browse
                our open source projects and discover the developers behind
                them.
              </motion.p>
            </div>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 py-12">
          {/* Search input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mb-8 relative"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4B062] shadow-sm bg-white text-gray-700 dark:border-gray-700 dark:bg-[#1a1b26] dark:text-gray-200 dark:placeholder:text-gray-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 dark:text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center dark:text-gray-400">
              Showing {filteredRepos.length} repositories.{' '}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Repositories List */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-5 bg-white rounded-xl shadow-md p-6 overflow-hidden border border-gray-100 dark:bg-[#1a1b26] dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#D4B062] p-3 rounded-full text-white">
                  <Code className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Repositories
                </h2>
                {repoLoading && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Loading...
                  </span>
                )}
              </div>

              {repositoryList}
            </motion.div>

            {/* Contributors List */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 bg-white rounded-xl shadow-md p-6 overflow-hidden border border-gray-100 dark:bg-[#1a1b26] dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#D4B062] p-3 rounded-full text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {selectedRepo ? (
                      <>
                        Contributors for{' '}
                        <a
                          href={getSelectedRepoDetails()?.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium cursor-pointer text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          title="View repository on GitHub"
                        >
                          {selectedRepo}
                          <ExternalLink className="inline-block ml-1 h-4 w-4" />
                        </a>
                      </>
                    ) : (
                      'Select a repository'
                    )}
                  </h2>
                </div>
              </div>

              {/* Add Contributor Search Bar */}
              {selectedRepo && (
                <div className="max-w-md mx-auto mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search contributors..."
                      value={contributorSearchTerm}
                      onChange={(e) => setContributorSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4B062] shadow-sm bg-white text-gray-700 dark:border-gray-700 dark:bg-[#1a1b26] dark:text-gray-200 dark:placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 dark:text-gray-500" />
                  </div>

                  {/* Status line - always stays here below search bar */}
                  <p className="text-sm text-gray-500 mt-3 text-center dark:text-gray-400">
                    {loading && contributorProgress > 0
                      ? `Loading contributors... ${contributorProgress}%`
                      : contributorSearchTerm.trim()
                        ? `Showing ${filteredContributors.length} of ${contributors.length} contributors`
                        : `Showing all ${contributors.length} contributors`}
                  </p>
                </div>
              )}
              {contributorsList}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contributors;
