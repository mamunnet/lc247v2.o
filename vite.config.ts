import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@libsql/client']
  },
  build: {
    commonjsOptions: {
      include: [/@libsql\/client/, /node_modules/]
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'libsql': ['@libsql/client']
        }
      }
    }
  }
});