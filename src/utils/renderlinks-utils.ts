/**
 * Link rendering utility - Optimized version
 * Handles text replacement with clickable links
 */

interface Link {
  text: string;
  url: string;
}

/**
 * Replace link text with clickable links
 * Optimized with better regex handling and null checks
 */
export const renderContentWithLinks = (
  text: string,
  links: Link[] | null | undefined,
): string => {
  if (!links?.length || !text) return text;

  // Sort links by text length (descending) to handle nested links correctly
  const sortedLinks = [...links].sort((a, b) => b.text.length - a.text.length);

  // Replace each link text with clickable link
  return sortedLinks.reduce((processedText, { text: linkText, url }) => {
    // Escape special regex characters in link text
    const escapedLinkText = linkText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const linkRegex = new RegExp(escapedLinkText, 'g');

    return processedText.replace(
      linkRegex,
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${linkText}</a>`,
    );
  }, text);
};
