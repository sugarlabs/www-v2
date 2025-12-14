import { useEffect } from 'react';

/**
 * SEO configuration interface for page metadata
 */
interface SEOProps {
  /** Page title - will be appended with " | Sugar Labs" */
  title: string;
  /** Meta description for search engines (recommended: 150-160 characters) */
  description: string;
  /** Canonical URL path (optional, defaults to current path) */
  canonicalPath?: string;
  /** Page type for Open Graph (default: 'website') */
  type?: 'website' | 'article';
  /** Image URL for social sharing (optional) */
  image?: string;
  /** Article author name (for article type) */
  author?: string;
  /** Article published date (for article type) */
  publishedDate?: string;
  /** Keywords for the page (optional) */
  keywords?: string[];
  /** Disable indexing for this page */
  noIndex?: boolean;
}

/** Default site metadata */
const SITE_CONFIG = {
  siteName: 'Sugar Labs',
  siteUrl: 'https://www.sugarlabs.org',
  defaultImage: '/assets/Icons/logo.svg',
  twitterHandle: '@sugar_labs',
  defaultDescription:
    'Sugar Labs is a nonprofit organization dedicated to providing free, open-source educational software for children around the world.',
};

/**
 * SEO Component for managing page metadata
 *
 * This component handles:
 * - Document title
 * - Meta description
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Canonical URL
 * - Robots meta tag
 *
 * @example
 * ```tsx
 * <SEO
 *   title="About Us"
 *   description="Learn about Sugar Labs' mission to provide free educational software."
 * />
 * ```
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  type = 'website',
  image,
  author,
  publishedDate,
  keywords,
  noIndex = false,
}) => {
  useEffect(() => {
    // Set document title
    const fullTitle = `${title} | ${SITE_CONFIG.siteName}`;
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (
      attribute: 'name' | 'property',
      identifier: string,
      content: string,
    ) => {
      let meta = document.querySelector(
        `meta[${attribute}="${identifier}"]`,
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, identifier);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('name', 'description', description);

    // Keywords (if provided)
    if (keywords && keywords.length > 0) {
      updateMetaTag('name', 'keywords', keywords.join(', '));
    }

    // Robots meta tag
    updateMetaTag(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow',
    );

    // Canonical URL
    const canonicalUrl = canonicalPath
      ? `${SITE_CONFIG.siteUrl}${canonicalPath}`
      : `${SITE_CONFIG.siteUrl}${window.location.pathname}`;
    updateLinkTag('canonical', canonicalUrl);

    // Open Graph tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:site_name', SITE_CONFIG.siteName);
    updateMetaTag(
      'property',
      'og:image',
      image || `${SITE_CONFIG.siteUrl}${SITE_CONFIG.defaultImage}`,
    );

    // Article-specific Open Graph tags
    if (type === 'article') {
      if (author) {
        updateMetaTag('property', 'article:author', author);
      }
      if (publishedDate) {
        updateMetaTag('property', 'article:published_time', publishedDate);
      }
    }

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', SITE_CONFIG.twitterHandle);
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag(
      'name',
      'twitter:image',
      image || `${SITE_CONFIG.siteUrl}${SITE_CONFIG.defaultImage}`,
    );

    // Cleanup function - reset to defaults when component unmounts
    return () => {
      document.title = SITE_CONFIG.siteName;
    };
  }, [
    title,
    description,
    canonicalPath,
    type,
    image,
    author,
    publishedDate,
    keywords,
    noIndex,
  ]);

  // This component doesn't render anything visible
  return null;
};

export default SEO;
