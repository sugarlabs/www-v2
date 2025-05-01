import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const Contributors: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [repoLoading, setRepoLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllRepos = useCallback(async () => {
    setRepoLoading(true);
    setError(null);

    try {
      let allRepos: Repository[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(
          `https://api.github.com/orgs/sugarlabs/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
        );

        if (response.data.length === 0) {
          hasMore = false;
        } else {
          allRepos = [...allRepos, ...response.data];
          page++;
        }
      }

      setRepos(allRepos);
      setFilteredRepos(allRepos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to load repositories. Please try again later.');
    } finally {
      setRepoLoading(false);
    }
  }, []);

  const fetchAllContributors = useCallback(async (repoName: string) => {
    setLoading(true);
    setError(null);

    try {
      let allContributors: Contributor[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(
          `https://api.github.com/repos/sugarlabs/${repoName}/contributors?per_page=100&page=${page}`,
        );

        if (response.data.length === 0) {
          hasMore = false;
        } else {
          allContributors = [...allContributors, ...response.data];
          page++;
        }
      }

      setContributors(allContributors);
    } catch (error) {
      console.error('Error fetching contributors:', error);
      setError('Failed to load contributors. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

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

  const handleRepoClick = useCallback((repoName: string) => {
    setSelectedRepo(repoName);
  }, []);

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
      return <div className="text-red-500 text-center py-10">{error}</div>;
    }

    if (repos.length === 0) {
      return (
        <p className="text-gray-500 text-center py-10">No repositories found</p>
      );
    }

    if (filteredRepos.length === 0) {
      return (
        <p className="text-gray-500 text-center py-10">
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
                  ? 'bg-[#D4B062]/10 border-[#D4B062]'
                  : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
              }`}
            >
              <h3 className="font-medium text-lg text-gray-800 break-words">
                {repo.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {repo.description || 'No description'}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
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
          <Users className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 max-w-xs">
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
      return <div className="text-red-500 text-center py-10">{error}</div>;
    }

    if (contributors.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Users className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500">
            No contributors found for this repository
          </p>
        </div>
      );
    }

    return (
      <>
        <p className="text-sm text-gray-500 mb-4">
          Showing all {contributors.length} contributors
        </p>
        <div className="max-h-[65vh] overflow-y-auto pr-1">
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {contributors.map((contributor) => (
              <motion.a
                key={contributor.id}
                whileHover="hover"
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-5 bg-gray-50 rounded-lg transition duration-300 hover:bg-[#D4B062]/5 hover:shadow-md border border-gray-100"
              >
                <div className="relative mb-3">
                  <img
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-4 bg-[#D4B062] text-xs text-white font-bold rounded-full w-9 h-6 flex items-center justify-center">
                    {contributor.contributions > 500
                      ? '500+'
                      : contributor.contributions}
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 text-center break-words w-full">
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
  }, [selectedRepo, loading, error, contributors]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFFEF9]">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-b from-black via-gray-800 to-gray-600"
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
              Explore Sugar Labs repositories and their contributors. Browse our
              open source projects and discover the developers behind them.
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
              className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4B062] shadow-sm bg-white text-gray-700"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Showing {filteredRepos.length} repositories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Repositories List */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 bg-white rounded-xl shadow-md p-6 overflow-hidden border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#D4B062] p-3 rounded-full text-white">
                <Code className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Repositories</h2>
            </div>

            {repositoryList}
          </motion.div>

          {/* Contributors List */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-7 bg-white rounded-xl shadow-md p-6 overflow-hidden border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#D4B062] p-3 rounded-full text-white">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedRepo
                  ? `Contributors for ${selectedRepo}`
                  : 'Select a repository'}
              </h2>
            </div>

            {contributorsList}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contributors;
