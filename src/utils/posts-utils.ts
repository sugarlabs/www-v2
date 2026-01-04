/**
 * Blog post utility functions - Updated with author support
 */

import { parseAuthorReference, AuthorReference } from '@/utils/author-utils';

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

/**
 * Convert frontmatter value to string with fallback
 */
const frontmatterToString = (
  value: string | string[] | undefined,
  fallback = '',
): string =>
  Array.isArray(value) ? value.join(' ').trim() : value?.trim() || fallback;

/**
 * Process image URL with validation and fallback
 */
const processImageUrl = (imageValue: string | string[] | undefined): string => {
  let imageUrl = frontmatterToString(
    imageValue,
    '/assets/Images/SugarNewsLogo.webp',
  );

  if (
    imageUrl !== '/assets/Images/SugarNewsLogo.webp' &&
    !/^https?:\/\//.test(imageUrl)
  ) {
    imageUrl = '/' + imageUrl.replace(/^\/+/, '');
  }

  return imageUrl;
};

/**
 * Fetch and parse metadata only (without content) for all markdown posts
 */
export const fetchMarkdownPostsMetadata = async (
  category?: string,
): Promise<PostMetaData[]> => {
  try {
    const markdownFiles = import.meta.glob(
      '/src/constants/MarkdownFiles/posts/*.md',
      {
        query: '?raw',
        import: 'default',
      },
    );

    const allPosts: PostMetaData[] = [];

    for (const [filePath, importFn] of Object.entries(markdownFiles)) {
      try {
        const fileContent = await importFn();
        const { frontmatter } = parseFrontmatter(fileContent as string);
        const fileName = filePath.split('/').pop()?.replace('.md', '') || '';

        // Parse author reference
        const author = await parseAuthorReference(
          frontmatterToString(frontmatter.author),
          frontmatterToString(frontmatter.description),
        );

        const post: PostMetaData = {
          id: fileName,
          title: frontmatterToString(frontmatter.title, 'Untitled'),
          excerpt: frontmatterToString(frontmatter.excerpt),
          category: frontmatterToString(frontmatter.category, 'UNCATEGORIZED'),
          date: frontmatterToString(frontmatter.date, 'No date'),
          slug: frontmatterToString(frontmatter.slug, fileName),
          author,
          tags: Array.isArray(frontmatter.tags)
            ? frontmatter.tags
            : frontmatter.tags
              ? [frontmatter.tags]
              : [],
          image: processImageUrl(frontmatter.image),
        };

        allPosts.push(post);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }

    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

    return category
      ? sortedPosts.filter((post) => post.category === category)
      : sortedPosts;
  } catch (error) {
    console.error('Error fetching markdown posts metadata:', error);
    return [];
  }
};

/**
 * Fetch a single post by slug with full content
 */
export const fetchMarkdownPostBySlug = async (
  slug: string,
): Promise<Post | null> => {
  try {
    const allPostsMetadata = await fetchMarkdownPostsMetadata();
    const targetPost = allPostsMetadata.find((post) => post.slug === slug);

    if (!targetPost) {
      return null;
    }

    const markdownFiles = import.meta.glob(
      '/src/constants/MarkdownFiles/posts/*.md',
      {
        query: '?raw',
        import: 'default',
      },
    );

    for (const [filePath, importFn] of Object.entries(markdownFiles)) {
      const fileName = filePath.split('/').pop()?.replace('.md', '') || '';

      if (fileName === targetPost.id) {
        const fileContent = await importFn();
        const { content } = parseFrontmatter(fileContent as string);

        return {
          ...targetPost,
          content,
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
    return null;
  }
};

/**
 * Get posts by author slug (metadata only)
 */
export const getPostsByAuthor = async (
  authorSlug: string,
): Promise<PostMetaData[]> => {
  const allPosts = await fetchMarkdownPostsMetadata();
  return allPosts.filter((post) => post.author?.slug === authorSlug);
};

/**
 * Get posts by tag (metadata only)
 */
export const getPostsByTag = async (tag: string): Promise<PostMetaData[]> => {
  const allPosts = await fetchMarkdownPostsMetadata();
  return allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
};

/**
 * Get all unique tags from posts (metadata only)
 */
export const getAllTags = async (): Promise<string[]> => {
  const allPosts = await fetchMarkdownPostsMetadata();
  const tagSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
};

/**
 * Get a single post by slug WITH content
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  return await fetchMarkdownPostBySlug(slug);
};

/**
 * Get all posts metadata (without content)
 */
export const getAllPosts = async (): Promise<PostMetaData[]> =>
  await fetchMarkdownPostsMetadata();

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
