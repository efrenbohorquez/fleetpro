import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0', // Escuchar en todas las interfaces de red
    strictPort: false,
    open: true,
    allowedHosts: [
      'pseudoalveolar-coretta-nonbibulously.ngrok-free.dev',
      '.ngrok-free.dev', // Permitir cualquier subdominio de ngrok
      '.ngrok.io',
      '.ngrok.app',
    ],
    hmr: {
      overlay: true,
      clientPort: 443, // Puerto HTTPS para HMR a través de ngrok
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
