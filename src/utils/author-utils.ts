/**
 * Author utility functions
 * Clean and simple version
 */

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
 * Fetch all authors from JSON cache
 */
export const fetchAllAuthors = async (): Promise<Author[]> => {
  try {
    // Load from the JSON cache (must be built first)
    const response = await fetch('/blog-data/authors.json');

    if (!response.ok) {
      throw new Error(
        'Authors cache not found. ' +
          'Please run `npm run build:blog` to generate the cache before running the application.',
      );
    }

    const allAuthors = await response.json();

    return allAuthors.sort((a: Author, b: Author) =>
      a.name.localeCompare(b.name),
    );
  } catch (error) {
    console.error(
      '❌ Error loading authors cache:\n',
      error instanceof Error ? error.message : error,
      '\n\nTo fix this:\n1. Run: npm run build:blog\n' +
        '2. Then restart your development server',
    );
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
