import { useEffect, useMemo, useCallback } from 'react';
import React, { Children } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSupersub from 'remark-supersub';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { h } from 'hastscript';

// Type definitions
interface MarkdownRendererProps {
  content: string;
  setZoomableImages?: (images: HTMLImageElement[]) => void;
  frontmatter?: Record<string, string | number | boolean | null>;
}

// Constants
const EMOJI_MAP: Record<string, string> = {
  ':smile:': '😊',
  ':heart:': '❤️',
  ':thumbsup:': '👍',
  ':thumbsdown:': '👎',
  ':rocket:': '🚀',
  ':star:': '⭐',
  ':fire:': '🔥',
  ':warning:': '⚠️',
  ':info:': 'ℹ️',
  ':check:': '✅',
  ':x:': '❌',
  ':eyes:': '👀',
  ':tada:': '🎉',
  ':bug:': '🐛',
  ':sparkles:': '✨',
  ':wrench:': '🔧',
  ':gear:': '⚙️',
  ':bulb:': '💡',
  ':package:': '📦',
  ':memo:': '📝',
  ':link:': '🔗',
  ':lock:': '🔒',
  ':unlock:': '🔓',
  ':zap:': '⚡',
  ':boom:': '💥',
  ':computer:': '💻',
  ':phone:': '📱',
  ':email:': '📧',
  ':calendar:': '📅',
  ':clock:': '🕐',
  ':house:': '🏠',
  ':car:': '🚗',
  ':plane:': '✈️',
  ':coffee:': '☕',
  ':pizza:': '🍕',
};

const ALERT_TYPES = {
  note: {
    icon: 'ℹ️',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
  },
  tip: {
    icon: '💡',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
  },
  important: {
    icon: '❗',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-800 dark:text-purple-200',
  },
  warning: {
    icon: '⚠️',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
  },
  caution: {
    icon: '🚨',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
  },
};

const CUSTOM_SANITIZE_SCHEMA = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'mark',
    'iframe',
    'details',
    'summary',
    'kbd',
    'del',
    'ins',
    'figure',
    'figcaption',
  ],
  attributes: {
    ...defaultSchema.attributes,
    mark: ['class', 'data-*'],
    iframe: [
      'src',
      'allow',
      'allowfullscreen',
      'frameborder',
      'title',
      'style',
      'width',
      'height',
      'loading',
      'class',
    ],
    details: ['open', 'class'],
    summary: ['class'],
    kbd: ['class'],
    figure: ['class'],
    figcaption: ['class'],
    div: ['class', 'style'],
    '*': [
      ...(defaultSchema.attributes?.['*'] || []),
      'className',
      'data-*',
      'aria-*',
    ],
  },
  protocols: { ...defaultSchema.protocols, src: ['http', 'https', 'data'] },
};

// Utility functions
const processMarkdownContent = (content: string): string => {
  let processed = content;

  // Replace emoji shortcodes
  Object.entries(EMOJI_MAP).forEach(([code, emoji]) => {
    processed = processed.replace(
      new RegExp(code.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
      emoji,
    );
  });

  // GitHub-style highlighting
  processed = processed.replace(
    /==([\s\S]*?)==/g,
    '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>',
  );

  // Keyboard shortcuts
  processed = processed.replace(
    /\[\[([^\]]+)\]\]/g,
    '<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">$1</kbd>',
  );

  // Strikethrough
  processed = processed.replace(
    /~~([\s\S]*?)~~/g,
    '<del class="line-through text-gray-500 dark:text-gray-400">$1</del>',
  );

  // Collapsible sections
  processed = processed.replace(
    /:::details\s+(.*?)\n([\s\S]*?):::/gim,
    '<details class="my-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">' +
      '<summary class="bg-gray-50 dark:bg-gray-700 px-4 py-3 cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-b border-gray-200 dark:border-gray-600">$1</summary>' +
      '<div class="px-4 py-3 text-gray-700 dark:text-gray-300">$2</div></details>',
  );

  // GitHub-style alerts
  processed = processed.replace(
    /:::(\w+)\s*(.*?)\n([\s\S]*?):::/gim,
    (_, type, title, content) => {
      const alert =
        ALERT_TYPES[type as keyof typeof ALERT_TYPES] || ALERT_TYPES.note;
      return `<div class="my-4 p-4 border-l-4 ${alert.border} ${alert.bg} rounded-r-lg">
      <div class="flex items-center mb-2">
        <span class="mr-2 text-lg">${alert.icon}</span>
        <strong class="${alert.text} font-semibold uppercase text-sm tracking-wide">${type}${title ? `: ${title}` : ''}</strong>
      </div>
      <div class="${alert.text}">${content}</div>
    </div>`;
    },
  );

  // YouTube embeds
  processed = processed.replace(
    /\[youtube:\s*([\w-]+)\]/gim,
    (_, videoId) =>
      `<div class="my-8 mx-auto max-w-4xl"><div class="relative rounded-xl shadow-lg overflow-hidden bg-black" style="aspect-ratio: 16/9;">
    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1" class="absolute inset-0 w-full h-full border-0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" title="YouTube video player"></iframe></div></div>`,
  );

  // Math expressions
  processed = processed.replace(
    /\$\$([\s\S]*?)\$\$/g,
    '<div class="math-display bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-4 text-center font-mono text-lg">$1</div>',
  );
  processed = processed.replace(
    /\$([^$\n]+)\$/g,
    '<span class="math-inline bg-gray-100 dark:bg-gray-700 px-1 rounded font-mono">$1</span>',
  );

  return processed;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  setZoomableImages,
  frontmatter,
}) => {
  const processedContent = useMemo(
    () => processMarkdownContent(content),
    [content],
  );

  const scrollToAnchor = useCallback(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const id = hash.substring(1);
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  }, []);

  const handleCopyClick = useCallback(async (e: MouseEvent) => {
    const button = (e.target as HTMLElement).closest(
      '.copy-code-btn',
    ) as HTMLButtonElement | null;
    if (!button) return;

    const code = button.getAttribute('data-code') || '';

    try {
      await navigator.clipboard.writeText(code);
      const successMessage = button.nextElementSibling as HTMLElement;
      if (successMessage) {
        successMessage.classList.remove('hidden');
        successMessage.classList.add('flex');
        setTimeout(() => {
          successMessage.classList.add('hidden');
          successMessage.classList.remove('flex');
        }, 2000);
      }
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }, []);

  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('.copy-code-btn')) {
      return;
    }

    const anchorLink = target.closest('a[href^="#"]') as HTMLAnchorElement;
    if (anchorLink) {
      e.preventDefault();
      const href = anchorLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.substring(1);
        const targetElement = document.getElementById(id);

        if (targetElement) {
          const currentUrl = window.location.pathname + window.location.search;
          window.history.pushState(null, '', `${currentUrl}${href}`);
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleCopyClick);
    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleCopyClick);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [handleCopyClick, handleAnchorClick]);

  useEffect(() => {
    if (setZoomableImages) {
      const images = document.querySelectorAll('img[data-zoomable="true"]');
      setZoomableImages(Array.from(images) as HTMLImageElement[]);
    }
  }, [processedContent, setZoomableImages]);

  useEffect(() => {
    scrollToAnchor();
    const handlePopState = () => {
      scrollToAnchor();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [processedContent, scrollToAnchor]);

  // Component definitions with shared styles
  const headingClasses = {
    h1: 'text-3xl font-bold my-6 text-gray-900 dark:text-gray-100 group flex items-center border-b border-gray-200 dark:border-gray-700 pb-2',
    h2: 'text-2xl font-semibold my-5 text-gray-900 dark:text-gray-100 group flex items-center border-b border-gray-200 dark:border-gray-700 pb-1',
    h3: 'text-xl font-semibold my-4 text-gray-900 dark:text-gray-100 group flex items-center',
    h4: 'text-lg font-semibold my-3 text-gray-900 dark:text-gray-100',
    h5: 'text-base font-semibold my-3 text-gray-900 dark:text-gray-100',
    h6: 'text-sm font-semibold my-3 text-gray-600 dark:text-gray-400 uppercase tracking-wide',
  };

  const createHeading =
    (level: keyof typeof headingClasses) =>
    ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement> & {
      children?: React.ReactNode;
    }) => {
      const Tag = level;
      return (
        <Tag {...props} className={headingClasses[level]}>
          {children}
        </Tag>
      );
    };

  const components: Components = {
    h1: createHeading('h1'),
    h2: createHeading('h2'),
    h3: createHeading('h3'),
    h4: createHeading('h4'),
    h5: createHeading('h5'),
    h6: createHeading('h6'),

    p: ({ children, ...props }) => (
      <p
        {...props}
        className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed"
      >
        {children}
      </p>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        className="border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300 rounded-r-md"
      >
        {children}
      </blockquote>
    ),

    // FIXED: Proper distinction between inline code and code blocks
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) => {
      // Check if it's truly inline code (single backticks) - no className means inline
      const isInlineCode =
        inline === true || (!className && typeof children === 'string');

      if (isInlineCode) {
        return (
          <code
            {...props}
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200 dark:border-gray-700"
          >
            {children}
          </code>
        );
      }

      // This is a code block (triple backticks) - has className or is explicitly not inline
      const codeText = Children.toArray(children).reduce(
        (acc, child) => (typeof child === 'string' ? acc + child : acc),
        '',
      );
      const language = className?.replace('language-', '') || 'text';

      return (
        <div className="relative rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 my-4 group">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {language}
            </span>
            <div className="flex items-center space-x-2">
              <button
                className="copy-code-btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-md transition-colors flex items-center space-x-1"
                data-code={codeText}
                aria-label="Copy code to clipboard"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Copy</span>
              </button>
              <div className="copy-success-message hidden items-center space-x-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-md">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Copied!</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <pre className="p-4 text-sm leading-relaxed">
              <code
                className={`${className || ''} text-gray-800 dark:text-gray-200 font-mono block whitespace-pre`}
              >
                {children}
              </code>
            </pre>
          </div>
        </div>
      );
    },

    img: ({ src = '', alt = '', title, ...props }) => {
      const imageSrc =
        src === '' && frontmatter?.image ? String(frontmatter.image) : src;
      return (
        <figure className="flex flex-col items-center my-6">
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <img
              {...props}
              src={imageSrc}
              alt={alt}
              title={title || alt || ''}
              className="max-w-full h-auto rounded-lg object-contain hover:scale-105 transition-transform duration-300"
              data-zoomable="true"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/assets/Images/SugarNewsLogo.png';
              }}
            />
          </div>
          {(title || alt) && (
            <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
              {title || alt}
            </figcaption>
          )}
        </figure>
      );
    },

    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table
          {...props}
          className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
        >
          {children}
        </table>
      </div>
    ),

    thead: ({ children, ...props }) => (
      <thead {...props} className="bg-gray-50 dark:bg-gray-800">
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody
        {...props}
        className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
      >
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr
        {...props}
        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        {...props}
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r last:border-r-0 border-gray-200 dark:border-gray-700"
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        {...props}
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-r last:border-r-0 border-gray-200 dark:border-gray-700"
      >
        {children}
      </td>
    ),

    ul: ({ children, ...props }) => (
      <ul {...props} className="list-disc pl-6 my-4 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="list-decimal pl-6 my-4 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li
        {...props}
        className="text-gray-700 dark:text-gray-300 leading-relaxed"
      >
        {children}
      </li>
    ),

    a: ({ href = '#', children, ...props }) => {
      const isExternal = href?.startsWith('http');
      const isAnchor = href?.startsWith('#');

      return (
        <a
          href={href}
          {...props}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors font-medium"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          data-anchor-link={isAnchor ? 'true' : undefined}
        >
          {children}
          {isExternal && (
            <svg
              className="inline w-3 h-3 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </a>
      );
    },

    strong: ({ children, ...props }) => (
      <strong
        {...props}
        className="font-semibold text-gray-900 dark:text-gray-100"
      >
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em {...props} className="italic text-gray-700 dark:text-gray-300">
        {children}
      </em>
    ),
    del: ({ children, ...props }) => (
      <del {...props} className="line-through text-gray-500 dark:text-gray-400">
        {children}
      </del>
    ),
    hr: ({ ...props }) => (
      <hr
        {...props}
        className="my-8 border-t border-gray-300 dark:border-gray-600"
      />
    ),
    input: ({ ...props }) => (
      <input
        {...props}
        disabled
        className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 mr-2"
      />
    ),

    sub: ({ children }) => <sub className="text-xs">{children}</sub>,
    sup: ({ children }) => <sup className="text-xs">{children}</sup>,
    mark: ({ children }) => (
      <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
        {children}
      </mark>
    ),
    kbd: ({ children }) => (
      <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
        {children}
      </kbd>
    ),
    details: ({ children, ...props }) => (
      <details
        className="my-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
        {...props}
      >
        {children}
      </details>
    ),
    summary: ({ children }) => (
      <summary className="bg-gray-50 dark:bg-gray-700 px-4 py-3 cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-b border-gray-200 dark:border-gray-600">
        {children}
      </summary>
    ),
  };

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkFrontmatter, remarkGfm, remarkSupersub]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, CUSTOM_SANITIZE_SCHEMA],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              properties: {
                className: [
                  'ml-2',
                  'text-blue-600',
                  'dark:text-blue-400',
                  'opacity-0',
                  'group-hover:opacity-100',
                  'transition-opacity',
                  'no-underline',
                ],
                ariaLabel: 'Permalink to section',
                title: 'Permalink to section',
              },
              content: h(
                'svg',
                {
                  className: 'w-4 h-4',
                  fill: 'currentColor',
                  viewBox: '0 0 20 20',
                },
                [
                  h('path', {
                    d: 'M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z',
                  }),
                  h('path', {
                    d: 'M7.414 15.414a2 2 0 01-2.828-2.828l3-3a2 2 0 012.828 0 1 1 0 001.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5z',
                  }),
                ],
              ),
            },
          ],
        ]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
