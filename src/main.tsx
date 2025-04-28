import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/styles/globals.css';
import '@/utils/copy-code';

const browserType = window.navigator.userAgent;

if (browserType === "OLPC") {
  window.location.href = "redirect to old website";
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
