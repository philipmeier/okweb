# Implementation Plan: Auto-Append `/index.html` to Internal Links for Direct GCS Bucket Hosting (Option 1)

**Date:** 2026-11-05  
**Status:** Awaiting User Approval

---

## 1. Why `index.html` Still Showed the Broken State While `solutions/index.html` Worked

1. Your local `dist/index.html` is **already built correctly** (`/_astro/index.Bd080U8-.css`, `/_astro/hero-1970s-pitcrew.CvQg3MP7.mp4`).
2. However, **Google Cloud Storage sets `Cache-Control: public, max-age=3600` (1 hour) by default** on public bucket objects.
   - Because you visited `https://mid-10z-dev-1.storage.googleapis.com/index.html` earlier (when `base: 'mid-10z-dev-1'` was still in `astro.config.mjs`), GCS's edge cache and your browser cached that old broken `index.html` response for 1 hour.
   - You had not visited `/solutions/index.html` before, so GCS served the newly uploaded `solutions/index.html` fresh.
   - **Quick test:** Open **`https://mid-10z-dev-1.storage.googleapis.com/index.html?v=2`** — adding `?v=2` bypasses the GCS edge cache and loads the new homepage immediately.

---

## 2. Goal: Option 1 (Direct GCS Bucket Navigation Without a Load Balancer)

Since `https://mid-10z-dev-1.storage.googleapis.com` does not auto-resolve directory URLs (`/solutions`, `/features`, `/`), clicking any link like `<a href="/solutions">` returns a GCS `NoSuchKey` XML error unless the link points to `/solutions/index.html`.

### Proposed Implementation
Add a lightweight `astro:build:done` integration hook directly inside [`astro.config.mjs`](file:///d:/10z-web/astro.config.mjs) that runs automatically at the end of every `astro build`:
- Walks all generated `.html` files in `dist/`.
- Rewrites internal page `href` attributes so directory routes automatically point to their `index.html` file:
  - `href="/"` &rarr; `href="/index.html"`
  - `href="/solutions"` &rarr; `href="/solutions/index.html"`
  - `href="/solutions/creative-directors"` &rarr; `href="/solutions/creative-directors/index.html"`
  - `href="/features#interactive-demos"` &rarr; `href="/features/index.html#interactive-demos"`
  - `href="/signup?plan=director"` &rarr; `href="/signup/index.html?plan=director"`
- Leaves external URLs (`https://...`, `mailto:...`), pure hash anchors (`#...`), and asset/file links (`.css`, `.js`, `.webp`, `.jpg`, `.png`, `.mp4`, `.svg`, `.ico`, `.xml`, `.txt`) completely untouched.

---

## 3. Files to Modify

1. [`astro.config.mjs`](file:///d:/10z-web/astro.config.mjs)
   - Add the `gcsBucketIndexLinks()` Astro integration (`astro:build:done` hook) to rewrite internal route links in `dist/**/*.html` to `/index.html`.

---

## 4. Verification Steps
1. Run the link rewriter against `dist/` (and during `astro build`) and verify that all internal `<a href="...">` links in `dist/index.html` and `dist/solutions/index.html` point to `.../index.html` while `<link>`, `<script>`, `<img>`, and `<source>` asset URLs remain untouched.

