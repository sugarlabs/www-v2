/**
 * Markdown rendering utility functions
 * Used for converting markdown to styled HTML across the application
 */

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Renders markdown text into styled HTML
 */
export const renderMarkdown = (markdown: string): string => {
  let html = markdown;
  const codeBlockPlaceholders: { [key: string]: string } = {};
  let codeBlockCounter = 0;

  // Create IDs for headers to enable anchor links
  const headerToId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Process code blocks first and replace them with placeholders
  html = html.replace(
    /```([\w-]*)\s*([\s\S]*?)```/gm,
    function (_match, _language, codeContent) {
      // Prepare the code content for display
      const escapedCode = escapeHtml(codeContent.trim());

      // Store the original code content for copying (without HTML)
      const originalCode = codeContent.trim();

      // Replace line breaks with <br> tags
      const formattedCode = escapedCode.replace(/\n/g, '<br>');

      // Create the code block HTML with copy button
      const codeBlockHtml = `<div class="relative rounded-lg overflow-hidden shadow-lg bg-gray-900 my-1 group">
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button class="copy-code-btn bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-sm flex items-center" 
                  data-code="${escapeHtml(originalCode).replace(/"/g, '&quot;')}"
                  onclick="event.stopPropagation(); return false;"
                  aria-label="Copy code">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <span class="copy-success-message hidden absolute right-10 top-[1px]  bg-gray-600 text-white text-xs px-2 py-1 rounded shadow-sm">
            Copied!
          </span>
        </div>
        <div class="px-2 overflow-x-auto">
          <pre class="px-3 py-7"><code class="font-mono text-sm text-gray-200 block whitespace-pre overflow-visible" style="line-height: 0.8;">${formattedCode}</code></pre>
        </div>
      </div>`;

      // Create a unique placeholder token
      const placeholder = `CODE_BLOCK_PLACEHOLDER_${codeBlockCounter++}`;

      // Store the code block HTML with its placeholder
      codeBlockPlaceholders[placeholder] = codeBlockHtml;

      // Return the placeholder token
      return placeholder;
    },
  );

  // Process blockquotes
  html = html.replace(/(^>.*(\n>.*)*)/gm, function (match) {
    const lines = match.split('\n');
    let content = '';

    lines.forEach((line) => {
      const match = line.match(/^>(>*)\s?(.*)$/);
      if (match) {
        const nestedChars = match[1];
        const lineContent = match[2];
        const nestLevel = nestedChars.length + 1;

        const borderColorClasses = [
          'border-blue-300 bg-blue-50',
          'border-purple-300 bg-purple-50',
          'border-green-300 bg-green-50',
          'border-orange-300 bg-orange-50',
        ];

        const borderClass =
          borderColorClasses[(nestLevel - 1) % borderColorClasses.length];
        const marginClass = nestLevel > 1 ? 'ml-4' : '';
        const contentToAdd = lineContent.trim() === '' ? '<br>' : lineContent;
        if (content === '') {
          content = `<blockquote class="border-l-4 ${borderClass} ${marginClass} pl-4 py-2 my-4 italic text-gray-700 rounded-r-md">${contentToAdd}`;
        } else {
          content += `<br>${contentToAdd}`;
        }
      }
    });
    if (content !== '') {
      content += '</blockquote>';
    }

    return content;
  });

  html = html.replace(
    /!\[(.*?)\]\((.*?)(?:\s"(.*?)")?\)/gim,
    function (_, alt, src, title) {
      const caption = title
        ? `<figcaption class="text-center text-sm text-gray-600 mt-2">${title}</figcaption>`
        : '';

      return `<figure class="flex flex-col items-center my-6">
        <div class="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img src="${src}" alt="${alt}" class="max-w-full sm:max-w-md md:max-w-lg rounded-lg object-contain max-h-80 hover:scale-105 transition-transform duration-300" loading="lazy" data-zoomable="true" />
        </div>
        ${caption}
      </figure>`;
    },
  );

  // Convert headers with anchor links
  html = html.replace(/^### (.*$)/gim, (_, title) => {
    const id = headerToId(title);
    return `<h3 id="${id}" class="text-xl font-bold my-4 text-gray-800 group flex items-center">
                ${title}
                <a aria-hidden="true" tabindex="-1" href="#${id}" class="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                  </svg>
                </a>
              </h3>`;
  });

  html = html.replace(/^## (.*$)/gim, (_, title) => {
    const id = headerToId(title);
    return `<h2 id="${id}" class="text-2xl font-bold my-5 text-gray-800 group flex items-center">
                ${title}
                <a aria-hidden="true" tabindex="-1" href="#${id}" class="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                  </svg>
                </a>
              </h2>`;
  });

  html = html.replace(/^# (.*$)/gim, (_, title) => {
    const id = headerToId(title);
    return `<h1 id="${id}" class="text-3xl font-bold my-6 text-gray-800 group flex items-center">
                ${title}
                <a aria-hidden="true" tabindex="-1" href="#${id}" class="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                  </svg>
                </a>
              </h1>`;
  });

  // Convert bold
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    '<strong class="font-bold">$1</strong>',
  );

  // Convert italic
  html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');

  // Convert strikethrough
  html = html.replace(
    /~~(.*?)~~/gim,
    '<span class="line-through text-gray-500">$1</span>',
  );

  // Convert highlighted text
  html = html.replace(
    /==(.*?)==/gim,
    '<mark class="bg-yellow-200 px-1 rounded">$1</mark>',
  );

  // Convert subscripts
  html = html.replace(/(?<!\\)~([^~\n]+?)(?<!\\)~/g, function (_, content) {
    return '<sub class="text-xs">' + escapeHtml(content) + '</sub>';
  });

  // Convert superscript
  html = html.replace(/(?<!\\)\^([^\\^\n]+?)(?<!\\)\^/g, function (_, content) {
    return '<sup class="text-xs">' + escapeHtml(content) + '</sup>';
  });

  // Convert links
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    '<a href="$2" class="text-blue-600 hover:underline transition-colors duration-200">$1</a>',
  );

  // Convert inline code - Make sure this comes after code blocks
  html = html.replace(
    /`([^`]+)`/gim,
    '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>',
  );

  // Improved table handling
  const tableRegex = /^\|(.+)\|(\r?\n\|[-|\s]+\|)(\r?\n\|.+\|)+/gm;
  html = html.replace(tableRegex, function (match) {
    const rows = match.split('\n').filter((row) => row.trim() !== '');

    // Start building the table
    let tableHtml =
      '<div class="overflow-x-auto my-6 rounded-lg shadow"><table class="min-w-full border border-gray-200 divide-y divide-gray-200">';

    // Process each row
    rows.forEach((row, index) => {
      if (row.match(/^\|[-|\s]+\|$/)) {
        return;
      }
      const cells = row
        .split('|')
        .filter((cell) => cell.trim() !== '')
        .map((cell) => cell.trim());

      if (index === 0) {
        tableHtml += '<thead class="bg-gray-50"><tr>';
        cells.forEach((cell) => {
          tableHtml += `<th class="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-r last:border-r-0 border-gray-200">${cell}</th>`;
        });
        tableHtml +=
          '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';
      } else if (index > 1) {
        tableHtml += `<tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-150">`;
        cells.forEach((cell) => {
          tableHtml += `<td class="px-4 py-3 whitespace-normal text-sm text-gray-700 border-r last:border-r-0 border-gray-200">${cell}</td>`;
        });
        tableHtml += '</tr>';
      }
    });

    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });
  html = html.replace(
    /^\s*- \[([ xX])\] (.+)$/gim,
    function (_, checked, content) {
      const isChecked = checked.toLowerCase() === 'x';
      return `<div class="flex items-start my-2 group">
                <div class="flex-shrink-0 mt-0.5">
                  <input type="checkbox" ${isChecked ? 'checked' : ''} disabled class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                </div>
                <span class="ml-2 text-gray-700 ${isChecked ? 'line-through text-gray-500' : ''}">${escapeHtml(content)}</span>
              </div>`;
    },
  );

  // Process lists as blocks
  html = html.replace(
    /((?:^(?:\s*[-*]|\s*\d+\.) .+\n?)+)/gm,
    function (listBlock) {
      // Process unordered lists
      let processedBlock = listBlock.replace(
        /^(\s*)[-*] (.+)$/gim,
        function (_, spaces, content) {
          const indent = spaces.length;
          const paddingClass = indent > 0 ? `pl-${4 + indent}` : 'pl-6';
          return `<ul class="list-disc ${paddingClass} my-1"><li class="mb-1 text-gray-700">${content}</li></ul>`;
        },
      );

      // Process ordered lists
      processedBlock = processedBlock.replace(
        /^(\s*)(\d+)\. (.+)$/gim,
        function (_, spaces, _number, content) {
          const indent = spaces.length;
          const paddingClass = indent > 0 ? `pl-${4 + indent}` : 'pl-6';
          return `<ol class="list-decimal ${paddingClass} my-1"><li class="mb-1 text-gray-700">${content}</li></ol>`;
        },
      );

      // Join adjacent list items
      processedBlock = processedBlock.replace(
        /<\/ul>\s*<ul class="list-disc [^>]+>/gim,
        '',
      );
      processedBlock = processedBlock.replace(
        /<\/ol>\s*<ol class="list-decimal [^>]+>/gim,
        '',
      );

      return processedBlock;
    },
  );

  // Handle horizontal rules
  html = html.replace(
    /^\s*[-*_]{3,}\s*$/gim,
    '<hr class="my-8 border-t border-gray-300">',
  );

  // Collapsible sections (details/summary)
  html = html.replace(
    /:::details\s+(.*?)\n([\s\S]*?):::/gim,
    '<details class="my-4 border border-gray-200 rounded-lg overflow-hidden">' +
      '<summary class="bg-gray-100 px-4 py-2 cursor-pointer font-medium text-gray-800 hover:bg-gray-200 transition-colors">$1</summary>' +
      '<div class="px-4 py-3 text-gray-700">$2</div>' +
      '</details>',
  );

  // YouTube embed
  html = html.replace(
    /\[youtube:\s*(.*?)\]/gim,
    '<div class="my-8 mx-auto relative" style="max-width: 90%;">' +
      '<div class="rounded-xl shadow-lg overflow-hidden">' +
      '<div style="padding-bottom: 56.25%; position: relative;">' +
      '<iframe src="https://www.youtube.com/embed/$1?autoplay=0&rel=0" ' +
      'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 12px;" ' +
      'allowfullscreen="true" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'loading="eager" ' +
      'title="YouTube video player">' +
      '</iframe>' +
      '</div>' +
      '</div>' +
      '</div>',
  );

  // Handle blank lines between paragraphs properly
  html = html.replace(/\n\s*\n/g, '\n<div class="my-4"></div>\n');

  // Convert paragraphs - do this last to avoid conflicts
  html = html.replace(
    /^(?!<[a-z]|\s*$|CODE_BLOCK_PLACEHOLDER_)(.+)$/gim,
    '<p class="my-4 text-gray-700 leading-relaxed">$1</p>',
  );

  // Style first paragraph's first letter (if it exists)
  html = html.replace(
    /<p class="my-4 text-gray-700 leading-relaxed">(\w)/,
    '<p class="my-4 text-gray-700 leading-relaxed"><span class="text-5xl float-left mr-3 font-serif text-blue-600 mt-1">$1</span>',
  );

  // Convert emojis
  const emojiMap: Record<string, string> = {
    ':smile:': '😊',
    ':heart:': '❤️',
    ':thumbsup:': '👍',
    ':rocket:': '🚀',
    ':star:': '⭐',
    ':fire:': '🔥',
    ':warning:': '⚠️',
    ':info:': 'ℹ️',
    ':check:': '✅',
    ':x:': '❌',
  };

  Object.entries(emojiMap).forEach(([code, emoji]) => {
    html = html.replace(new RegExp(code, 'g'), emoji);
  });

  // Instead of removing all newlines, replace them with spaces only in specific contexts
  html = html.replace(/(<p[^>]*>.*?)(\n)(.*?<\/p>)/g, '$1 $3');
  html = html.replace(/(<li[^>]*>.*?)(\n)(.*?<\/li>)/g, '$1 $3');

  // Remove any remaining newlines that aren't already handled
  html = html.replace(/([^>])\n([^<])/g, '$1 $2');

  // Finally, replace all code block placeholders with their actual HTML
  Object.keys(codeBlockPlaceholders).forEach((placeholder) => {
    html = html.replace(placeholder, codeBlockPlaceholders[placeholder]);
  });

  return html;
};
