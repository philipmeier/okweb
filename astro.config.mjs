// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://10zebra.com',
  vite: {
    plugins: [tailwindcss()],
    // Dev server runs in WSL against /mnt/d — inotify misses edits made from
    // Windows, so Vite serves stale modules. Polling fixes HMR across the mount.
    server: {
      watch: { usePolling: true, interval: 300 }
    }
  }
});