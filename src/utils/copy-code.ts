/**
 * Initialize copy functionality for code blocks
 */
export function initializeCodeCopy() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const button = target.closest('.copy-code-button');
    
    if (button) {
      const preElement = button.parentElement?.querySelector('pre');
      if (preElement) {
        const codeContent = preElement.textContent || '';
        navigator.clipboard.writeText(codeContent).then(() => {
          // Change button text temporarily after copying
          button.innerHTML = `
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          `;
          button.classList.add('text-green-400');
          
          // Reset button after 2 seconds
          setTimeout(() => {
            button.innerHTML = 'Copy';
            button.classList.remove('text-green-400');
          }, 2000);
        }).catch(() => {
          // Show error state
          button.innerHTML = `
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Error!
            </span>
          `;
          button.classList.add('text-red-400');
          
          // Reset button after 2 seconds
          setTimeout(() => {
            button.innerHTML = 'Copy';
            button.classList.remove('text-red-400');
          }, 2000);
        });
      }
    }
  });
} 