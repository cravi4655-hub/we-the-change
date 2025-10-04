import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    host: true,
    allowedHosts: ['we-the-change-production.up.railway.app', 'localhost'],
  },
});
