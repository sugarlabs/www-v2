/**
 * Copy code functionality for code blocks
 * This script adds click handlers to copy buttons in code blocks
 */

/**
 * Initialize copy code functionality
 * This should be called after the DOM is loaded
 */
export function initCodeCopy(): void {
  // Remove any existing event listeners to prevent duplicates
  const existingButtons = document.querySelectorAll('.copy-code-btn');
  existingButtons.forEach((button) => {
    if (button instanceof HTMLElement) {
      button.removeEventListener('click', handleCopyClick);
    }
  });

  // Find all copy buttons and add new event listeners
  const copyButtons = document.querySelectorAll('.copy-code-btn');

  // Add click handler to each button
  copyButtons.forEach((button) => {
    if (button instanceof HTMLElement) {
      button.addEventListener('click', handleCopyClick);
    }
  });
}

/**
 * Handle click on copy button
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

  // Copy to clipboard using both modern and fallback methods
  try {
    // Modern method
    navigator.clipboard
      .writeText(codeContent)
      .then(() => showSuccessMessage(button))
      .catch((err) => {
        console.error('Clipboard API failed:', err);
        fallbackCopy(codeContent, button);
      });
  } catch (err) {
    console.error('Clipboard API not supported:', err);
    fallbackCopy(codeContent, button);
  }
}

/**
 * Fallback copy method using textarea
 */
function fallbackCopy(text: string, button: HTMLElement): void {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Make the textarea out of viewport
  textarea.style.position = 'fixed';
  textarea.style.left = '-999999px';
  textarea.style.top = '-999999px';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let success = false;
  try {
    // Execute the copy command
    success = document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }

  // Remove the textarea
  document.body.removeChild(textarea);

  if (success) {
    showSuccessMessage(button);
  }
}

/**
 * Show success message
 */
function showSuccessMessage(button: HTMLElement): void {
  // Show success message
  const successMessage = button.nextElementSibling;
  if (
    successMessage &&
    successMessage.classList.contains('copy-success-message')
  ) {
    // Show success message
    successMessage.classList.remove('hidden');

    // Hide after 2 seconds
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 2000);
  }
}

/**
 * Add event listener to initialize copy functionality when DOM is loaded
 * and also when DOM content changes (for dynamic content)
 */
if (typeof window !== 'undefined') {
  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
  } else {
    initCodeCopy();
  }

  // Re-initialize periodically to catch dynamically added code blocks
  setInterval(initCodeCopy, 2000);

  // Also initialize when user interacts with the page
  document.addEventListener('click', () => {
    setTimeout(initCodeCopy, 100);
  });
}
