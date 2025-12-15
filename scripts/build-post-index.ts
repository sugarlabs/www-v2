import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { PostMetaData } from '../src/utils/posts-utils.ts';
import type { AuthorReference } from '../src/utils/author-utils.ts';

const POSTS_DIR = path.resolve('src/constants/MarkdownFiles/posts');
const AUTHORS_DIR = path.resolve('src/constants/MarkdownFiles/authors');
const OUTPUT_FILE = path.resolve('src/constants/posts.index.json');

/**
 * Simple Node.js compatible version of parseAuthorReference
 */
function parseAuthorReference(
  authorField: string | undefined,
  descriptionField: string | undefined,
): AuthorReference | null {
  if (!authorField) return null;

  if (authorField.includes('.md')) {
    try {
      // Extract slug from file path
      const authorSlug =
        authorField.split('/').pop()?.replace('.md', '')?.trim() || '';

      // Try to load the author file
      const authorPath = path.join(AUTHORS_DIR, `${authorSlug}.md`);

      if (fs.existsSync(authorPath)) {
        const authorContent = fs.readFileSync(authorPath, 'utf-8');
        const { data: authorData } = matter(authorContent);

        return {
          name: authorData.name?.trim() || authorSlug,
          description:
            authorData.description?.trim() ||
            descriptionField ||
            'Author at SugarLabs',
          slug: authorData.slug?.trim() || authorSlug,
          avatar: authorData.avatar?.trim(),
        };
      }
    } catch (error) {
      console.warn(`Error loading author file for ${authorField}:`, error);
    }
  }

  // Fallback to direct name format
  // Try to parse as "Name (slug)" format
  const match = authorField.match(/^([^(]+)\s*\(([^)]+)\)$/);

  if (match) {
    const name = match[1].trim();
    const slug = match[2].trim();

    return {
      name,
      description: descriptionField?.trim() || 'Author at SugarLabs',
      slug,
    };
  }

  // Direct name - generate slug
  const slug = authorField
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

  return {
    name: authorField.trim(),
    description: descriptionField?.trim() || 'Author at SugarLabs',
    slug,
  };
}

// Main execution
(async () => {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const posts: PostMetaData[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(raw);

    const id = file.replace('.md', '');

    // Use the Node.js compatible version
    const author = data.author
      ? parseAuthorReference(data.author, data.description)
      : null;

    posts.push({
      id,
      title: data.title ?? 'Untitled',
      excerpt: data.excerpt ?? '',
      category: data.category ?? 'UNCATEGORIZED',
      date: data.date ?? '1970-01-01',
      slug: data.slug ?? id,
      author,
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      image: data.image
        ? data.image.startsWith('http')
          ? data.image
          : '/' + data.image.replace(/^\/+/, '')
        : '/assets/Images/SugarNewsLogo.webp',
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`✅ Generated posts.index.json (${posts.length} posts)`);
})();
