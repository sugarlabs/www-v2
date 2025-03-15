import React, { useEffect, useRef } from 'react';
import { renderMarkdown } from '../../utils/mdparser-utils';
import { initCodeCopy } from '../../utils/copy-code';

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

/**
 * Component that renders markdown content with copy code functionality
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  className = '',
}) => {
  // Convert markdown to HTML
  const html = renderMarkdown(markdown);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize copy code functionality after component mounts and when content changes
  useEffect(() => {
    // Short delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      initCodeCopy();
    }, 100);

    return () => clearTimeout(timer);
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
