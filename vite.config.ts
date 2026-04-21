import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function blogStatic(blogDist: string): Plugin {
  const serve = express.static(blogDist, { extensions: ['html'] });
  return {
    name: 'blog-static',
    configureServer(server) {
      server.middlewares.use('/blog', serve);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/blog', serve);
    },
  };
}

export default defineConfig(() => {
  const blogDist = path.resolve(__dirname, 'astro-paper', 'dist');
  return {
    plugins: [react(), tailwindcss(), blogStatic(blogDist)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
