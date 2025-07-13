import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Allows using "@" as an alias for "src"
    },
  },
  build: {
    rollupOptions: {
      /**
       * Ignore "use client" warning since we are not using SSR
       */
      onwarn(warning, warn) {
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message.includes(`"use client"`)
        ) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: (id: string) => {
          // Vendor chunks
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'vendor';
          }
          
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
          
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/class-variance-authority') || 
              id.includes('node_modules/clsx') || 
              id.includes('node_modules/tailwind-merge')) {
            return 'ui';
          }
          
          // Feature-based chunks for better caching
          if (id.includes('src/pages/News/')) {
            return 'news';
          }
          
          if (id.includes('src/pages/About/')) {
            return 'about';
          }
          
          if (id.includes('src/pages/TryNow/')) {
            return 'tryNow';
          }
          
          // Markdown content chunk
          if (id.includes('src/constants/MarkdownFiles')) {
            return 'markdown';
          }
          
          // Default vendor chunk for other node_modules
          if (id.includes('node_modules')) {
            return 'vendor-other';
          }
          
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the limit as needed
    
    // Enable source maps for better debugging
    sourcemap: true,
    
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
});
