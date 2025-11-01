import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      overlay: true,
      timeout: 10000,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@google/genai'],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
    },
  },
});
