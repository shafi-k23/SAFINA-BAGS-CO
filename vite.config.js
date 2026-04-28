import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (
            id.includes('node_modules/embla-carousel') ||
            id.includes('node_modules/clsx') ||
            id.includes('node_modules/tailwind-merge')
          ) {
            return 'vendor-carousel';
          }
        },
      },
    },
  },
});
