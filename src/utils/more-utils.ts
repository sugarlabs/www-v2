/**
 * More page utility functions
 * Optimized version using shared utilities
 */

import { parseFrontmatter } from '@/utils/posts-utils';

export interface MorePage {
  id: string;
  title: string;
  content: string;
  slug: string;
  editUrl?: string;
  lastUpdated?: string;
  lastUpdatedBy?: string;
  category?: string;
}

/**
 * Convert frontmatter value to string
 */
const frontmatterToString = (
  value: string | string[] | undefined,
  fallback = '',
): string =>
  Array.isArray(value) ? value.join(' ').trim() : value?.trim() || fallback;

/**
 * Fetch and parse all markdown files for more pages
 */
export const fetchMorePages = async (): Promise<MorePage[]> => {
  try {
    const markdownFiles = import.meta.glob(
      '@/constants/MarkdownFiles/more/*.md',
      {
        query: '?raw',
        import: 'default',
      },
    );

    const allPages: MorePage[] = [];

    for (const [filePath, importFn] of Object.entries(markdownFiles)) {
      try {
        const fileContent = await importFn();
        const { frontmatter, content } = parseFrontmatter(
          fileContent as string,
        );
        const fileName = filePath.split('/').pop()?.replace('.md', '') || '';

        const page: MorePage = {
          id: fileName,
          title: frontmatterToString(frontmatter.title, 'Untitled'),
          content,
          slug: frontmatterToString(frontmatter.slug, fileName),
          category: frontmatterToString(frontmatter.category, 'Uncategorized'),
        };

        allPages.push(page);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }

    return allPages.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error fetching more pages:', error);
    return [];
  }
};

/**
 * Get a single more page by its slug
 */
export const getMorePageBySlug = async (
  slug: string,
): Promise<MorePage | null> => {
  const allPages = await fetchMorePages();
  return allPages.find((page) => page.slug === slug) || null;
};

/**
 * Group more pages by categories
 */
export const getMorePagesByCategory = async (): Promise<
  Record<string, MorePage[]>
> => {
  const allPages = await fetchMorePages();
  const pagesByCategory: Record<string, MorePage[]> = { All: allPages };

  allPages.forEach((page) => {
    const category = page.category || 'Uncategorized';
    if (!pagesByCategory[category]) {
      pagesByCategory[category] = [];
    }
    pagesByCategory[category].push(page);
  });

  return pagesByCategory;
};

/**
 * Get default page slug (first page alphabetically)
 */
export const getDefaultMorePageSlug = async (): Promise<string | null> => {
  const allPages = await fetchMorePages();
  return allPages.length > 0 ? allPages[0].slug : null;
};
