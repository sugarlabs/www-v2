import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/styles/globals.css';
import '@/utils/copy-code';

const browserType = window.navigator.userAgent;

if (browserType.includes("Chromium/23.0.1271.95")) {
  window.location.href = "https://sugarlabs.github.io/www/";
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
