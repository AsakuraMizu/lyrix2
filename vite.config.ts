import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import routify from '@roxi/routify/lib/extra/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), routify()],
  server: {
    hmr: {
      clientPort: process.env.GP ? 443 : undefined,
    },
  },
});
