/**
 * Copy code functionality for code blocks with user-friendly feedback
 */

/**
 * Handle click on copy button with unified clipboard handling
 * @param event - The click event from the copy button
 */
function handleCopyClick(event: Event): void {
  event.preventDefault();
  event.stopPropagation();

  const button = event.currentTarget as HTMLElement;
  const codeContent = button.getAttribute('data-code');

  if (!codeContent || codeContent.trim() === '') {
    showErrorMessage(button);
    return;
  }

  copyToClipboard(codeContent, button);
}

async function copyToClipboard(text: string, button: HTMLElement): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showSuccessMessage(button);
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-999999px;top:-999999px;opacity:0;';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    if (success) {
      showSuccessMessage(button);
    } else {
      showErrorMessage(button);
    }
  }
}

function showSuccessMessage(button: HTMLElement): void {
  const originalContent = button.innerHTML;
  const originalClasses = button.className;
  
  button.className = 'copy-code-btn bg-green-100 text-green-800 text-xs px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-sm border border-green-200';
  button.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span class="font-medium">Copied!</span>
  `;
  button.setAttribute('disabled', 'true');
  
  setTimeout(() => {
    button.className = originalClasses;
    button.innerHTML = originalContent;
    button.removeAttribute('disabled');
  }, 2000);
}

function showErrorMessage(button: HTMLElement): void {
  const originalContent = button.innerHTML;
  const originalClasses = button.className;
  
  button.className = 'copy-code-btn bg-red-100 text-red-800 text-xs px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-sm border border-red-200';
  button.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    <span class="font-medium">Failed!</span>
  `;
  button.setAttribute('disabled', 'true');
  
  setTimeout(() => {
    button.className = originalClasses;
    button.innerHTML = originalContent;
    button.removeAttribute('disabled');
  }, 2500);
}

export function initCodeCopy(): void {
  document.querySelectorAll('.copy-code-btn').forEach((button) => {
    if (button instanceof HTMLElement) {
      button.removeEventListener('click', handleCopyClick);
      button.addEventListener('click', handleCopyClick);
    }
  });
}

// Auto-initialize
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
  } else {
    initCodeCopy();
  }
}
