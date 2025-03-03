/// <reference types="vitest" />
import analog from '@analogjs/platform';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { getBlogPosts } from './vite-prerender.utils';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    publicDir: 'src/assets',
    build: {
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
    },
    plugins: [
      analog({
        static: true,
        prerender: {
          discover: true,
          routes: async () => ['/', '/blog', '/cv', '/test', ...getBlogPosts()],
        },
      }),
      viteStaticCopy({
        structured: true,
        targets: [
          {
            src: ['src/content/**/*.png', 'src/content/**/*.jpg'],
            dest: '',
          },
        ],
      }),
    ],
  };
});
