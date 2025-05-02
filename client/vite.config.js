import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/posts': {
        target: 'http://localhost:5000',
        changeOrigin: true
        // No rewrite!
      },
    },
    historyApiFallback: true, // Ensure frontend routes are handled correctly
  },
});
