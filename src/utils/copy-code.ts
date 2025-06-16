/**
 * Copy code functionality for code blocks
 * Simplified and optimized version
 */

/**
 * Handle click on copy button with unified clipboard handling
 */
function handleCopyClick(event: Event): void {
  event.preventDefault();
  event.stopPropagation();

  const button = event.currentTarget as HTMLElement;
  const codeContent = button.getAttribute('data-code');

  if (!codeContent) {
    console.error('No code content found to copy');
    return;
  }

  copyToClipboard(codeContent, button);
}

/**
 * Unified clipboard copy with fallback
 */
async function copyToClipboard(
  text: string,
  button: HTMLElement,
): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showSuccessMessage(button);
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText =
      'position:fixed;left:-999999px;top:-999999px;opacity:0;';

    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (success) showSuccessMessage(button);
  }
}

/**
 * Show success message
 */
function showSuccessMessage(button: HTMLElement): void {
  const successMessage = button.nextElementSibling as HTMLElement;
  if (successMessage?.classList.contains('copy-success-message')) {
    successMessage.classList.remove('hidden');
    setTimeout(() => successMessage.classList.add('hidden'), 2000);
  }
}

/**
 * Initialize copy code functionality
 */
export function initCodeCopy(): void {
  document.querySelectorAll('.copy-code-btn').forEach((button) => {
    if (button instanceof HTMLElement) {
      button.removeEventListener('click', handleCopyClick);
      button.addEventListener('click', handleCopyClick);
    }
  });
}

// Auto-initialize when available
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
  } else {
    initCodeCopy();
  }

  // Re-initialize for dynamic content
  let timeoutId: number;
  document.addEventListener('click', () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(initCodeCopy, 100);
  });
}
