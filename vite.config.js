import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Stride-app/' : './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/services/aiEngine.test.js', 'src/**/*.test.{js,jsx}'],
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
