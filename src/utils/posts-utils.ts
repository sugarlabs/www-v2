/**
 * Blog post utility functions - Optimized with index file support
 */

import postsIndex from '@/constants/posts.index.json';
import { AuthorReference } from '@/utils/author-utils';

export interface PostMetaData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  author: AuthorReference | null;
  tags: string[];
  image: string;
}

export interface Post extends PostMetaData {
  content: string;
}

/**
 * Parse frontmatter from markdown content
 */
export const parseFrontmatter = (
  content: string,
): {
  frontmatter: Record<string, string | string[]>;
  content: string;
} => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(content);

  if (!match) return { frontmatter: {}, content };

  const [, frontmatterString, mainContent] = match;
  const frontmatter: Record<string, string | string[]> = {};

  frontmatterString.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    frontmatter[key] =
      key === 'tags' && value
        ? value.split(',').map((tag) => tag.trim())
        : value;
  });

  return { frontmatter, content: mainContent };
};

const paginate = <T>(items: T[], offset = 0, limit?: number): T[] => {
  return limit !== undefined
    ? items.slice(offset, offset + limit)
    : items.slice(offset);
};

/**
 * Fetch metadata for all markdown posts
 */
export const fetchPostsMetadata = ({
  category,
  offset = 0,
  limit,
}: {
  category?: string;
  offset?: number;
  limit?: number;
} = {}): PostMetaData[] => {
  let posts = postsIndex as PostMetaData[];

  if (category) {
    posts = posts.filter((p) => p.category === category);
  }

  return paginate(posts, offset, limit);
};

/**
 * Fetch a single post by slug with full content
 */
export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
  const meta = (postsIndex as PostMetaData[]).find((p) => p.slug === slug);

  if (!meta) return null;

  const markdownFiles = import.meta.glob(
    '@/constants/MarkdownFiles/posts/*.md',
    { query: '?raw', import: 'default' },
  );

  for (const [path, loader] of Object.entries(markdownFiles)) {
    if (path.endsWith(`/${meta.id}.md`)) {
      const raw = (await loader()) as string;

      // IMPORTANT: strip frontmatter using gray-matter style split
      const content = raw.replace(/^---[\s\S]*?---\s*/, '');

      return {
        ...meta,
        content,
      };
    }
  }

  return null;
};

/**
 * Get posts by author slug (metadata only)
 */
export const getPostsByAuthor = (authorSlug: string): PostMetaData[] =>
  (postsIndex as PostMetaData[]).filter((p) => p.author?.slug === authorSlug);

/**
 * Get posts by tag (metadata only)
 */
export const getPostsByTag = (tag: string): PostMetaData[] =>
  (postsIndex as PostMetaData[]).filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );

/**
 * Get all unique tags from posts (metadata only)
 */
export const getAllTags = (): string[] => {
  const set = new Set<string>();
  (postsIndex as PostMetaData[]).forEach((p) =>
    p.tags.forEach((t) => set.add(t)),
  );
  return Array.from(set).sort();
};

/**
 * Get a single post by slug WITH content
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  return await fetchPostBySlug(slug);
};

/**
 * Get all posts metadata (without content)
 */
export const getAllPosts = (): PostMetaData[] => fetchPostsMetadata();

/**
 * Group posts by category (metadata only)
 */
export const groupPostsByCategory = (
  posts: PostMetaData[],
): Record<string, PostMetaData[]> => {
  const categoryMap: Record<string, PostMetaData[]> = { All: posts };

  posts.forEach((post) => {
    const category = post.category || 'UNCATEGORIZED';
    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }
    categoryMap[category].push(post);
  });

  return categoryMap;
};
