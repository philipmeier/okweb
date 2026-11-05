// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

/**
 * Rewrites internal directory links (e.g. href="/solutions" -> href="/solutions/index.html")
 * in built HTML files so static GCS bucket endpoints (*.storage.googleapis.com) can navigate
 * between pages directly without requiring a Load Balancer.
 */
function gcsBucketIndexLinks() {
  return {
    name: 'gcs-bucket-index-links',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir);

        /** @param {string} currentDir */
        function walkAndRewrite(currentDir) {
          for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
              walkAndRewrite(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
              const html = fs.readFileSync(fullPath, 'utf-8');
              const updated = html.replace(/href="(\/[^"]*)"/g, (match, rawUrl) => {
                if (rawUrl.startsWith('//') || rawUrl.startsWith('/_astro/')) {
                  return match;
                }
                const qIdx = rawUrl.search(/[?#]/);
                const pathname = qIdx === -1 ? rawUrl : rawUrl.slice(0, qIdx);
                const suffix = qIdx === -1 ? '' : rawUrl.slice(qIdx);
                const lastSegment = pathname.split('/').pop() || '';
                if (lastSegment.includes('.')) {
                  return match;
                }
                const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
                return `href="${normalizedPath}index.html${suffix}"`;
              });
              if (updated !== html) {
                fs.writeFileSync(fullPath, updated, 'utf-8');
              }
            }
          }
        }

        walkAndRewrite(distDir);
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://mid-10z-dev-1.storage.googleapis.com',
  integrations: [gcsBucketIndexLinks()],
  vite: {
    plugins: [tailwindcss()],
    // Dev server runs in WSL against /mnt/d — inotify misses edits made from
    // Windows, so Vite serves stale modules. Polling fixes HMR across the mount.
    server: {
      watch: { usePolling: true, interval: 300 }
    }
  }
});
