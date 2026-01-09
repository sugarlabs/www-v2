// scripts/build-blog-cache.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '../src/constants/MarkdownFiles/posts');
const AUTHORS_DIR = path.join(__dirname, '../src/constants/MarkdownFiles/authors');
const OUTPUT_DIR = path.join(__dirname, '../public/blog-data');
const METADATA_FILE = path.join(OUTPUT_DIR, 'metadata.json');
const AUTHORS_FILE = path.join(OUTPUT_DIR, 'authors.json');

// Copy of parseFrontmatter from your posts-utils.ts
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = frontmatterRegex.exec(content);

    if (!match) return { frontmatter: {}, content: '' };

    const [, frontmatterString, mainContent] = match;
    const frontmatter = {};

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
}

// Copy of frontmatterToString from your posts-utils.ts
function frontmatterToString(value, fallback = '') {
    if (!value) return fallback;
    return Array.isArray(value) ? value.join(' ').trim() : value.trim();
}

// Copy of processImageUrl from your posts-utils.ts
function processImageUrl(imageValue) {
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
}

/**
 * Load all authors from markdown files
 */
async function loadAuthorsMap() {
    const authorsMap = {};

    if (!fs.existsSync(AUTHORS_DIR)) {
        console.log('⚠️  Authors directory not found:', AUTHORS_DIR);
        return authorsMap;
    }

    const authorFiles = fs.readdirSync(AUTHORS_DIR)
        .filter(file => file.endsWith('.md'));

    console.log(`📚 Found ${authorFiles.length} author files`);

    for (const filename of authorFiles) {
        try {
            const filePath = path.join(AUTHORS_DIR, filename);
            const content = fs.readFileSync(filePath, 'utf-8');
            const { frontmatter, content: authorContent } = parseFrontmatter(content);

            const authorSlug = filename.replace('.md', '');

            authorsMap[authorSlug] = {
                slug: authorSlug,
                name: frontmatterToString(frontmatter.name),
                title: frontmatterToString(frontmatter.title),
                organization: frontmatterToString(frontmatter.organization),
                description: frontmatterToString(frontmatter.description),
                avatar: frontmatterToString(frontmatter.avatar),
                content: authorContent
            };

            console.log(`  👤 Loaded author: ${authorsMap[authorSlug].name}`);
        } catch (error) {
            console.error(`❌ Error processing author ${filename}:`, error);
        }
    }

    return authorsMap;
}

/**
 * Parse author reference from post frontmatter
 */
function parseAuthorReferenceFromMap(authorField, descriptionField, authorsMap) {
    if (!authorField) return null;

    // Check if it's a file path reference
    if (authorField.includes('.md')) {
        try {
            const authorSlug = authorField.split('/').pop()?.replace('.md', '') || '';
            const author = authorsMap[authorSlug];

            if (author) {
                return {
                    name: author.name,
                    description: author.description,
                    slug: author.slug,
                    avatar: author.avatar,
                };
            } else {
                console.log(`⚠️  Author not found: ${authorSlug}`);
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
}

/**
 * Main build function
 */
async function buildBlogCache() {
    console.log('🚀 Starting blog cache build...');

    try {
        // Check if posts directory exists
        if (!fs.existsSync(POSTS_DIR)) {
            throw new Error(`Posts directory not found: ${POSTS_DIR}`);
        }

        // Ensure output directory exists
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
            console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
        }

        // 1. Load authors
        console.log('\n📥 Loading authors...');
        const authorsMap = await loadAuthorsMap();

        // 2. Process posts
        console.log('\n📥 Processing posts...');
        const files = fs.readdirSync(POSTS_DIR)
            .filter(file => file.endsWith('.md'));

        console.log(`📄 Found ${files.length} markdown posts`);

        const allPosts = [];

        for (const filename of files) {
            try {
                const filePath = path.join(POSTS_DIR, filename);
                const content = fs.readFileSync(filePath, 'utf-8');
                const { frontmatter } = parseFrontmatter(content);

                const fileName = filename.replace('.md', '');

                // Parse author reference
                const author = parseAuthorReferenceFromMap(
                    frontmatterToString(frontmatter.author),
                    frontmatterToString(frontmatter.description),
                    authorsMap
                );

                // Create post metadata
                const post = {
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
                console.log(`  ✅ ${filename} (${post.title})`);

            } catch (error) {
                console.error(`❌ Error processing ${filename}:`, error);
            }
        }

        // 3. Sort by date (newest first)
        const sortedPosts = allPosts.sort((a, b) => {
            const dateA = new Date(a.date).getTime() || 0;
            const dateB = new Date(b.date).getTime() || 0;
            return dateB - dateA;
        });

        // 4. Write files
        console.log('\n💾 Writing files...');
        fs.writeFileSync(METADATA_FILE, JSON.stringify(sortedPosts, null, 2));
        fs.writeFileSync(AUTHORS_FILE, JSON.stringify(Object.values(authorsMap), null, 2));

        console.log('\n🎉 Build completed successfully!');
        console.log(`📊 ${sortedPosts.length} posts processed`);
        console.log(`👤 ${Object.keys(authorsMap).length} authors loaded`);
        console.log(`📁 Metadata: ${METADATA_FILE}`);
        console.log(`📁 Authors: ${AUTHORS_FILE}`);

    } catch (error) {
        console.error('\n❌ Build failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    buildBlogCache();
}

export { buildBlogCache };