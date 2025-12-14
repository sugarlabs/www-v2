import React from 'react';
import { motion } from 'framer-motion';
import { CalendarRange, ArrowRight, Share2 } from 'lucide-react';
import { simpleFadeIn } from '@/styles/Animations';
import { PostMetaData } from '@/utils/posts-utils';

interface PostCardProps {
  post?: PostMetaData;
  viewMode: 'grid' | 'list' | 'magazine';
  index: number;
  isLoading?: boolean;
  onPostClick?: (slug: string) => void;
  onShareClick?: (post: PostMetaData, e: React.MouseEvent) => void;
}

const PostCard: React.FC<PostCardProps> = React.memo(
  ({
    post,
    viewMode,
    index,
    isLoading = false,
    onPostClick = () => {},
    onShareClick = () => {},
  }) => {
    // Skeleton loading state
    if (isLoading || !post) {
      return (
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ${
            viewMode === 'list'
              ? 'flex'
              : viewMode === 'magazine'
                ? 'h-full'
                : ''
          }`}
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        >
          <div
            className={`${viewMode === 'list' ? 'w-1/3' : viewMode === 'magazine' ? 'h-48' : 'h-56'}`}
          >
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div
            className={`${viewMode === 'list' ? 'w-2/3' : ''} px-6 py-12 space-y-4`}
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
          </div>
        </div>
      );
    }

    // Actual post content
    return (
      <motion.article
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group ${
          viewMode === 'list' ? 'flex' : ''
        }`}
        onClick={() => onPostClick(post.slug)}
        variants={simpleFadeIn}
        custom={index}
        layout
        whileHover={{ y: -5 }}
      >
        <div className={`${viewMode === 'list' ? 'w-1/3' : ''} relative`}>
          <div
            className={`${viewMode === 'list' ? 'h-full' : 'h-56'} overflow-hidden`}
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-blue-100 via-purple-50 to-green-100 dark:from-blue-900/50 dark:via-purple-900/50 dark:to-green-900/50 flex items-center justify-center">
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
              onClick={(e) => onShareClick(post, e)}
              className="p-2 rounded-full bg-linear-to-r from-blue-600 to-blue-700 text-white shadow hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 cursor-pointer"
              title="Share"
              type="button"
            >
              <Share2 size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div
          className={`${viewMode === 'list' ? 'w-2/3' : ''} p-6 flex flex-col justify-between`}
        >
          <div>
            <h3
              className={`font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                viewMode === 'list' ? 'text-xl' : 'text-lg'
              }`}
            >
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between">
            {post.date && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CalendarRange size={14} className="mr-2" />
                {post.date}
              </div>
            )}
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
              Read more
              <ArrowRight
                size={14}
                className="ml-1 mt-1 group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </motion.article>
    );
  },
);

export default PostCard;
