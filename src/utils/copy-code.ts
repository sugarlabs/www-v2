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
    showErrorFeedback(button, 'No content to copy');
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
  // Check if clipboard API is available and we're in a secure context
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessMessage(button);
      return;
    } catch (error) {
      // Fall through to legacy method
    }
  }

  // Fallback for older browsers or insecure contexts
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText =
      'position:fixed;left:-999999px;top:-999999px;opacity:0;pointer-events:none;';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    // For mobile devices
    textarea.setSelectionRange(0, 99999);

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (success) {
      showSuccessMessage(button);
    } else {
      showErrorFeedback(button, 'Copy failed - please copy manually');
    }
  } catch (error) {
    showErrorFeedback(button, 'Copy not supported in this browser');
  }
}

/**
 * Show success message
 */
function showSuccessMessage(button: HTMLElement): void {
  // Update button text temporarily
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  button.style.backgroundColor = '#10b981';
  button.style.color = 'white';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = '';
    button.style.color = '';
  }, 2000);

  // Also check for success message element
  const successMessage = button.nextElementSibling as HTMLElement;
  if (successMessage?.classList.contains('copy-success-message')) {
    successMessage.classList.remove('hidden');
    setTimeout(() => successMessage.classList.add('hidden'), 2000);
  }
}

/**
 * Show error feedback to user
 */
function showErrorFeedback(button: HTMLElement, message: string): void {
  // Update button text temporarily
  const originalText = button.textContent;
  button.textContent = 'Failed';
  button.style.backgroundColor = '#ef4444';
  button.style.color = 'white';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = '';
    button.style.color = '';
  }, 2000);

  // Show tooltip or alert as fallback
  if ('title' in button) {
    const originalTitle = button.title;
    button.title = message;
    setTimeout(() => {
      button.title = originalTitle;
    }, 3000);
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
