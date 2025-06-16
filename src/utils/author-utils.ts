/**
 * Author utility functions
 * Clean and simple version
 */

import { parseFrontmatter } from '@/utils/posts-utils';

export interface Author {
  slug: string;
  name: string;
  title: string;
  organization: string;
  description: string;
  avatar?: string;
  content: string;
}

export interface AuthorReference {
  name: string;
  description: string;
  slug: string;
  avatar?: string;
}

/**
 * Convert frontmatter value to string with fallback
 */
const frontmatterToString = (
  value: string | string[] | undefined,
  fallback = '',
): string =>
  Array.isArray(value) ? value.join(' ').trim() : value?.trim() || fallback;

/**
 * Fetch and parse all author markdown files
 */
export const fetchAllAuthors = async (): Promise<Author[]> => {
  try {
    const authorFiles = import.meta.glob(
      '@/constants/MarkdownFiles/authors/*.md',
      {
        query: '?raw',
        import: 'default',
      },
    );

    const allAuthors: Author[] = [];

    for (const [filePath, importFn] of Object.entries(authorFiles)) {
      try {
        const fileContent = await importFn();
        const { frontmatter, content } = parseFrontmatter(
          fileContent as string,
        );

        const author: Author = {
          slug: frontmatterToString(frontmatter.slug),
          name: frontmatterToString(frontmatter.name),
          title: frontmatterToString(frontmatter.title),
          organization: frontmatterToString(frontmatter.organization),
          description: frontmatterToString(frontmatter.description),
          avatar: frontmatterToString(frontmatter.avatar),
          content,
        };

        allAuthors.push(author);
      } catch (error) {
        console.error(`Error processing author file ${filePath}:`, error);
      }
    }

    return allAuthors.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
};

/**
 * Get author by slug
 */
export const getAuthorBySlug = async (slug: string): Promise<Author | null> => {
  const authors = await fetchAllAuthors();
  return authors.find((author) => author.slug === slug) || null;
};

/**
 * Parse author reference from post frontmatter
 * Supports both old format (string) and new format (file path)
 */
export const parseAuthorReference = async (
  authorField: string | undefined,
  descriptionField: string | undefined,
): Promise<AuthorReference | null> => {
  if (!authorField) return null;

  // Check if it's a file path reference
  if (authorField.includes('.md')) {
    try {
      const authorSlug = authorField.split('/').pop()?.replace('.md', '') || '';
      const author = await getAuthorBySlug(authorSlug);

      if (author) {
        return {
          name: author.name,
          description: author.description,
          slug: author.slug,
          avatar: author.avatar,
        };
      }
    } catch (error) {
      console.error('Error loading author from file:', error);
    }
  }

  // Fallback to old format
  return {
    name: authorField,
    description: descriptionField || 'Author at SugarLabs',
    slug: authorField.toLowerCase().replace(/\s+/g, '-'),
  };
};

/**
 * Get all authors referenced in posts
 */
export const getAuthorsUsedInPosts = async (): Promise<AuthorReference[]> => {
  return [];
};
