import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  RefreshCw,
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

interface CacheData<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // in milliseconds
}

const CACHE_CONFIG = {
  REPOSITORIES: {
    KEY: 'sugarlabs_repositories_cache',
    EXPIRY: 30 * 60 * 1000, // 30min
  },
  CONTRIBUTORS: {
    KEY_PREFIX: 'sugarlabs_contributors_cache_',
    EXPIRY: 60 * 60 * 1000, // 60min
  },
  SESSION: {
    SELECTED_REPO: 'selected_repo',
  },
};

const CacheService = {
  get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp, expiresIn }: CacheData<T> = JSON.parse(cached);

      if (Date.now() - timestamp > expiresIn) {
        localStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  },

  set<T>(key: string, data: T, expiresIn: number): void {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
        expiresIn,
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  },

  clear(key: string): void {
    localStorage.removeItem(key);
  },

  clearAll(): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('sugarlabs_')) {
        localStorage.removeItem(key);
      }
    });
  },

  isValid(key: string): boolean {
    const cached = localStorage.getItem(key);
    if (!cached) return false;

    try {
      const { timestamp, expiresIn }: CacheData<unknown> = JSON.parse(cached);
      return Date.now() - timestamp <= expiresIn;
    } catch {
      return false;
    }
  },

  getAge(key: string): number {
    const cached = localStorage.getItem(key);
    if (!cached) return Infinity;

    try {
      const { timestamp }: CacheData<unknown> = JSON.parse(cached);
      return Math.floor((Date.now() - timestamp) / 60000);
    } catch {
      return Infinity;
    }
  },
};

const Contributors: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<string | null>(() => {
    return sessionStorage.getItem(CACHE_CONFIG.SESSION.SELECTED_REPO);
  });
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [repoLoading, setRepoLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheAge, setCacheAge] = useState<number>(0);

  const fetchAllReposBackground = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://api.github.com/orgs/sugarlabs/repos?per_page=100&sort=updated&direction=desc',
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );

      if (response.data && response.data.length > 0) {
        CacheService.set(
          CACHE_CONFIG.REPOSITORIES.KEY,
          response.data,
          CACHE_CONFIG.REPOSITORIES.EXPIRY,
        );
      }
    } catch (error) {
      console.error('Background refresh failed:', error);
    }
  }, []);

  // Fetching all repositories with caching
  const fetchAllRepos = useCallback(
    async (force = false) => {
      setRepoLoading(true);
      setError(null);

      try {
        if (!force) {
          const cachedRepos = CacheService.get<Repository[]>(
            CACHE_CONFIG.REPOSITORIES.KEY,
          );

          if (cachedRepos) {
            const age = CacheService.getAge(CACHE_CONFIG.REPOSITORIES.KEY);
            setCacheAge(age);
            setRepos(cachedRepos);
            setFilteredRepos(cachedRepos);
            setRepoLoading(false);
            setTimeout(() => fetchAllReposBackground(), 100);
            return;
          }
        }

        let allRepos: Repository[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await axios.get(
            `https://api.github.com/orgs/sugarlabs/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
            {
              headers: {
                Accept: 'application/vnd.github.v3+json',
              },
            },
          );

          if (response.data.length === 0) {
            hasMore = false;
          } else {
            allRepos = [...allRepos, ...response.data];
            page++;

            if (page % 5 === 0) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }
          }
        }

        setRepos(allRepos);
        setFilteredRepos(allRepos);
        setCacheAge(0);

        CacheService.set(
          CACHE_CONFIG.REPOSITORIES.KEY,
          allRepos,
          CACHE_CONFIG.REPOSITORIES.EXPIRY,
        );
      } catch (error) {
        console.error('Error fetching repositories:', error);

        const cachedRepos = CacheService.get<Repository[]>(
          CACHE_CONFIG.REPOSITORIES.KEY,
        );

        if (cachedRepos) {
          const age = CacheService.getAge(CACHE_CONFIG.REPOSITORIES.KEY);
          setCacheAge(age);
          setRepos(cachedRepos);
          setFilteredRepos(cachedRepos);
          setError('Using cached data. Failed to fetch fresh repositories.');
        } else {
          setError('Failed to load repositories. Please try again later.');
        }
      } finally {
        setRepoLoading(false);
      }
    },
    [fetchAllReposBackground],
  );

  const fetchContributorsBackground = useCallback(
    async (repoName: string, cacheKey: string) => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/sugarlabs/${repoName}/contributors?per_page=100`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          },
        );

        if (response.data && response.data.length > 0) {
          CacheService.set(
            cacheKey,
            response.data,
            CACHE_CONFIG.CONTRIBUTORS.EXPIRY,
          );
        }
      } catch (error) {
        console.error('Background contributors refresh failed:', error);
      }
    },
    [],
  );

  const fetchAllContributors = useCallback(
    async (repoName: string, force = false) => {
      setLoading(true);
      setError(null);

      try {
        const cacheKey = `${CACHE_CONFIG.CONTRIBUTORS.KEY_PREFIX}${repoName}`;

        if (!force) {
          const cachedContributors = CacheService.get<Contributor[]>(cacheKey);

          if (cachedContributors) {
            setContributors(cachedContributors);
            setLoading(false);

            setTimeout(
              () => fetchContributorsBackground(repoName, cacheKey),
              100,
            );
            return;
          }
        }

        let allContributors: Contributor[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await axios.get(
            `https://api.github.com/repos/sugarlabs/${repoName}/contributors?per_page=100&page=${page}`,
            {
              headers: {
                Accept: 'application/vnd.github.v3+json',
              },
            },
          );

          if (response.data.length === 0) {
            hasMore = false;
          } else {
            allContributors = [...allContributors, ...response.data];
            page++;

            if (page % 3 === 0) {
              await new Promise((resolve) => setTimeout(resolve, 150));
            }
          }
        }

        setContributors(allContributors);
        CacheService.set(
          cacheKey,
          allContributors,
          CACHE_CONFIG.CONTRIBUTORS.EXPIRY,
        );
      } catch (error) {
        console.error('Error fetching contributors:', error);

        const cacheKey = `${CACHE_CONFIG.CONTRIBUTORS.KEY_PREFIX}${repoName}`;
        const cachedContributors = CacheService.get<Contributor[]>(cacheKey);

        if (cachedContributors) {
          setContributors(cachedContributors);
          setError('Using cached data. Failed to fetch fresh contributors.');
        } else {
          setError('Failed to load contributors. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchContributorsBackground],
  );

  const handleRepoClick = useCallback((repoName: string) => {
    setSelectedRepo(repoName);
    sessionStorage.setItem(CACHE_CONFIG.SESSION.SELECTED_REPO, repoName);
  }, []);

  const handleForceRefresh = useCallback(() => {
    if (selectedRepo) {
      CacheService.clear(CACHE_CONFIG.REPOSITORIES.KEY);
      CacheService.clear(
        `${CACHE_CONFIG.CONTRIBUTORS.KEY_PREFIX}${selectedRepo}`,
      );
      fetchAllRepos(true);
      fetchAllContributors(selectedRepo, true);
    } else {
      CacheService.clear(CACHE_CONFIG.REPOSITORIES.KEY);
      fetchAllRepos(true);
    }
  }, [selectedRepo, fetchAllRepos, fetchAllContributors]);

  const handleClearCache = useCallback(() => {
    CacheService.clearAll();
    setRepos([]);
    setFilteredRepos([]);
    setContributors([]);
    setSelectedRepo(null);
    sessionStorage.removeItem(CACHE_CONFIG.SESSION.SELECTED_REPO);
    setCacheAge(0);
    fetchAllRepos(true);
  }, [fetchAllRepos]);

  useEffect(() => {
    fetchAllRepos();
  }, [fetchAllRepos]);

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
    if (!selectedRepo) {
      setContributors([]);
      return;
    }

    fetchAllContributors(selectedRepo);
  }, [selectedRepo, fetchAllContributors]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }, []);

  const repositoryList = useMemo(() => {
    if (repoLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4B062]"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-center py-10 dark:text-red-400">
          {error}
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
      <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1 -mx-2 px-2">
        <AnimatePresence>
          {filteredRepos.map((repo) => (
            <motion.div
              key={repo.id}
              whileHover="hover"
              onClick={() => handleRepoClick(repo.name)}
              className={`p-4 rounded-lg cursor-pointer transition duration-300 border-l-4 ${
                selectedRepo === repo.name
                  ? 'bg-[#FFF4E6] border-[#D4B062] dark:bg-[#D4B062]/20'
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
      </div>
    );
  }, [
    repoLoading,
    error,
    repos,
    filteredRepos,
    selectedRepo,
    handleRepoClick,
    formatDate,
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

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4B062]"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-center py-10 dark:text-red-400">
          {error}
        </div>
      );
    }

    if (contributors.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Users className="h-16 w-16 text-gray-300 mb-4 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">
            No contributors found for this repository
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing all {contributors.length} contributors
          </p>
          <button
            onClick={() => fetchAllContributors(selectedRepo, true)}
            className="text-xs flex items-center gap-1 text-[#D4B062] hover:text-[#c19d4b] transition-colors"
            title="Refresh contributors"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto pr-1">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributors.map((contributor) => (
              <motion.a
                key={contributor.id}
                whileHover="hover"
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-5 bg-gray-100 rounded-lg transition duration-300 hover:bg-[#FFF4E6] border border-gray-100 dark:bg-gray-800 dark:hover:bg-[#D4B062]/10 dark:border-gray-700"
              >
                <div className="relative mb-3">
                  <img
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm dark:border-gray-700"
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
      </>
    );
  }, [selectedRepo, loading, error, contributors, fetchAllContributors]);

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
          {/* Cache Info and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center mb-6 px-2"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {cacheAge > 0 ? (
                <span>Using cached data ({cacheAge} minutes old)</span>
              ) : (
                <span>Fresh data loaded</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleForceRefresh}
                className="text-xs flex items-center gap-1 px-3 py-1.5 bg-[#D4B062] text-white rounded-full hover:bg-[#c19d4b] transition-colors"
                title="Force refresh all data"
              >
                <RefreshCw className="h-3 w-3" />
                Refresh All
              </button>
              <button
                onClick={handleClearCache}
                className="text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                title="Clear all cached data"
              >
                Clear Cache
              </button>
            </div>
          </motion.div>

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
              Showing {filteredRepos.length} repositories.
              {cacheAge > 0 && ' (Cached)'}
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#D4B062] p-3 rounded-full text-white">
                    <Code className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Repositories
                  </h2>
                </div>
                <button
                  onClick={() => fetchAllRepos(true)}
                  className="p-2 text-gray-500 hover:text-[#D4B062] transition-colors"
                  title="Refresh repositories"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#D4B062] p-3 rounded-full text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {selectedRepo
                      ? `Contributors for ${selectedRepo}`
                      : 'Select a repository'}
                  </h2>
                </div>
              </div>

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
