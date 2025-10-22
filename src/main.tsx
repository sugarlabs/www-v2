import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/styles/globals.css';
import '@/utils/copy-code';

// Suppress React DOM nesting warnings in development
if (import.meta.env.DEV) {
  const originalError = console.error;
  const originalWarn = console.warn;

  const suppressedPatterns = [
    // HTML nesting validation errors
    /In HTML, .* cannot be a descendant of/,
    /cannot contain a nested/,
    /This will cause a hydration error/,

    // General DOM nesting warnings
    /Warning: validateDOMNesting/,
    /cannot appear as a child of/,
    /cannot appear as a descendant of/,

    // Specific element warnings
    /<img> cannot appear as a child of <p>/,
    /<iframe> cannot appear as a child of <p>/,
    /<div> cannot appear as a child of <p>/,
    /<figure> cannot appear as a child of <p>/,
    /<span> cannot appear as a child of <p>/,
    /<details> cannot appear as a child of <p>/,
    /<summary> cannot appear as a child of <p>/,

    // React hydration warnings
    /Warning: Text content did not match/,
    /Warning: Prop .* did not match/,
    /Warning: Expected server HTML to contain/,

    // Any warning containing "validateDOMNesting"
    /validateDOMNesting/,
  ];

  console.error = (...args: any[]) => {
    const message = args.join(' ');
    const shouldSuppress =
      suppressedPatterns.some((pattern) => pattern.test(message)) ||
      message.includes('validateDOMNesting') ||
      message.includes('cannot appear as a child') ||
      message.includes('cannot appear as a descendant') ||
      message.includes('cannot be a descendant of') ||
      message.includes('cannot contain a nested') ||
      message.includes('This will cause a hydration error');

    if (!shouldSuppress) {
      originalError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    const shouldSuppress =
      suppressedPatterns.some((pattern) => pattern.test(message)) ||
      message.includes('validateDOMNesting') ||
      message.includes('cannot appear as a child') ||
      message.includes('cannot appear as a descendant') ||
      message.includes('cannot be a descendant of') ||
      message.includes('cannot contain a nested') ||
      message.includes('This will cause a hydration error');

    if (!shouldSuppress) {
      originalWarn.apply(console, args);
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
