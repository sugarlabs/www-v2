/**
 * Blog post utility functions
 * Handles post-specific functionality like loading and parsing blog posts
 */

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  slug: string;
  author: string;
  description: string;
  tags: string[];
  image: string;
}

/**
 * Parse frontmatter from markdown content
 */
export const parseFrontmatter = (
  content: string,
): { frontmatter: { [key: string]: string | string[] }; content: string } => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(content);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterString = match[1];
  const mainContent = match[2];

  // Parse frontmatter
  const frontmatter: Record<string, string | string[]> = {};
  const lines = frontmatterString.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (key === 'tags' && value) {
        const tagsArray = value.split(',').map((tag) => tag.trim());
        frontmatter[key] = tagsArray;
      } else {
        frontmatter[key] = value;
      }
    }
  }

  return { frontmatter, content: mainContent };
};

/**
 * Fetch and parse all markdown blog posts
 */
export const fetchMarkdownPosts = async (
  category?: string,
): Promise<Post[]> => {
  try {
    const markdownFiles = import.meta.glob(
      '@/constants/MarkdownFiles/posts/*.md',
      {
        query: '?raw',
        import: 'default',
      },
    );

    const allPosts: Post[] = [];

    for (const [filePath, importFn] of Object.entries(markdownFiles)) {
      try {
        const fileContent = await importFn();
        const { frontmatter, content } = parseFrontmatter(
          fileContent as string,
        );
        const fileName = filePath.split('/').pop()?.replace('.md', '') || '';

        const post: Post = {
          id: fileName,
          title: Array.isArray(frontmatter.title)
            ? frontmatter.title.join(' ')
            : frontmatter.title || 'Untitled',
          excerpt: Array.isArray(frontmatter.excerpt)
            ? frontmatter.excerpt.join(' ')
            : frontmatter.excerpt || '',
          content,
          category: Array.isArray(frontmatter.category)
            ? frontmatter.category.join(' ')
            : frontmatter.category || 'UNCATEGORIZED',
          date: Array.isArray(frontmatter.date)
            ? frontmatter.date.join(' ')
            : frontmatter.date || 'No date',
          slug: Array.isArray(frontmatter.slug)
            ? frontmatter.slug.join(' ')
            : frontmatter.slug || fileName,
          author: Array.isArray(frontmatter.author)
            ? frontmatter.author.join(' ')
            : frontmatter.author || 'Sugar Labs',
          description: Array.isArray(frontmatter.description)
            ? frontmatter.description.join(' ')
            : frontmatter.description || 'Writer and contributor at Sugar Labs',
          tags: Array.isArray(frontmatter.tags)
            ? frontmatter.tags
            : frontmatter.tags
              ? [frontmatter.tags]
              : [],
          image: Array.isArray(frontmatter.image)
            ? '/' + frontmatter.image.join(' ').replace(/^\/?/, '')
            : frontmatter.image
              ? '/' + frontmatter.image.replace(/^\/?/, '')
              : '/assets/Images/SugarNewsLogo.png',
        };

        allPosts.push(post);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }

    // Sort posts by date (newest first)
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

    // Filter by category if specified
    return category
      ? sortedPosts.filter((post) => post.category === category)
      : sortedPosts;
  } catch (error) {
    console.error('Error fetching markdown posts:', error);
    return [];
  }
};

/**
 * Get a single post by its slug
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const allPosts = await fetchMarkdownPosts();
  return allPosts.find((post) => post.slug === slug) || null;
};
