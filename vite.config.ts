import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './', // 👈 ADD THIS LINE
  build: {
    outDir: 'dist', // 👈 Ensures Vercel finds your build
  },
});
