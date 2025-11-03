import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0', // Escuchar en todas las interfaces de red
    strictPort: false,
    open: true,
    hmr: {
      overlay: true,
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
