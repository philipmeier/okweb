# Implementation Plan: Fix GCP Bucket Video & Asset Path Mismatch

**Date:** 2026-11-05  
**Status:** Awaiting User Approval

---

## 1. Root Cause Diagnosis

In [`astro.config.mjs`](file:///d:/10z-web/astro.config.mjs), you added:
```js
site: 'https://storage.googleapis.com',
base: 'mid-10z-dev-1',
```

This created a split between **Astro-managed assets** (`/_astro/...`) and **hardcoded `/media/...` video paths**:

1. **Why `https://storage.googleapis.com/mid-10z-dev-1/index.html` loads CSS & images, but NOT videos:**
   - Because `base: 'mid-10z-dev-1'` is set, Astro automatically prefixes CSS, JS, and `<Image>` URLs with `/mid-10z-dev-1/_astro/...` — so they load at `https://storage.googleapis.com/mid-10z-dev-1/_astro/...`.
   - However, Astro does **not** automatically prefix hardcoded `/media/...` string paths in `src/data/media.ts`, `Hero.astro`, `CharacterSwapMockup.astro`, `ModelComparisonMockup.astro`, and `YouTubeExportMockup.astro`. The browser requests `https://storage.googleapis.com/media/hero-1970s-pitcrew.mp4` (missing `/mid-10z-dev-1`), which 404s.

2. **Why `https://mid-10z-dev-1.storage.googleapis.com/index.html` loads the videos, but breaks CSS & images:**
   - On the virtual-hosted bucket domain (`mid-10z-dev-1.storage.googleapis.com`), the bucket is at the root `/`.
   - Hardcoded `/media/...` paths resolve to `https://mid-10z-dev-1.storage.googleapis.com/media/...` (which works!).
   - Meanwhile, the `base: 'mid-10z-dev-1'` setting causes CSS and images to request `https://mid-10z-dev-1.storage.googleapis.com/mid-10z-dev-1/_astro/...` (double bucket name), which 404s.

---

## 2. Proposed Solution (Fixes Both Issues)

1. **Import `.mp4` Videos via Vite/Astro (`/src/assets/media/...`) Instead of Hardcoded `/media/...` Strings:**
   - Since all 33 `.mp4` videos now live in `src/assets/media/` (`src/assets/media/*.mp4`, `src/assets/media/solutions/*.mp4`, `src/assets/media/features/*.mp4`), importing them directly in `src/data/media.ts`, `Hero.astro`, `CharacterSwapMockup.astro`, `ModelComparisonMockup.astro`, and `YouTubeExportMockup.astro` means Vite/Astro bundles them into `_astro/` and **automatically applies `base`** (or root `/`) identically to CSS, JS, and images.
   - As a result, videos, images, and CSS will **never** be out of sync again, regardless of whether `base` is set or not.

2. **Configure `astro.config.mjs` + Navigation Links for Your Chosen Bucket URL:**
   - **Option A (`https://mid-10z-dev-1.storage.googleapis.com/index.html` — Recommended):**
     - Remove `base: 'mid-10z-dev-1'` and set `site: 'https://mid-10z-dev-1.storage.googleapis.com'` in `astro.config.mjs`.
     - Everything (CSS, JS, images, videos, and all root-relative `<a href="/...">` navigation links) works at `/` without needing `/mid-10z-dev-1` prefixes on links.
   - **Option B (`https://storage.googleapis.com/mid-10z-dev-1/index.html`):**
     - Keep `base: '/mid-10z-dev-1'` in `astro.config.mjs` and use Vite imports for all `.mp4` videos so videos also resolve under `/mid-10z-dev-1/_astro/...`.

---

## 3. Files to Modify

1. [`src/data/media.ts`](file:///d:/10z-web/src/data/media.ts) — Import all 32 `.mp4` videos from `/src/assets/media/{,solutions/,features/}*.mp4` so Astro/Vite manages their URLs alongside the `.jpg` images.
2. [`src/components/layout/Hero.astro`](file:///d:/10z-web/src/components/layout/Hero.astro) — Import `heroVideo` from `/src/assets/media/hero-1970s-pitcrew.mp4`.
3. [`src/components/features/CharacterSwapMockup.astro`](file:///d:/10z-web/src/components/features/CharacterSwapMockup.astro) — Import `filmCastVideo` and `charSwapVideo` from `/src/assets/media/...`.
4. [`src/components/features/ModelComparisonMockup.astro`](file:///d:/10z-web/src/components/features/ModelComparisonMockup.astro) — Import `takeKlingVideo`, `takeVeoVideo`, `takeSoraVideo`, `takeRunwayVideo` from `/src/assets/media/...`.
5. [`src/components/features/YouTubeExportMockup.astro`](file:///d:/10z-web/src/components/features/YouTubeExportMockup.astro) — Import the 4 take videos from `/src/assets/media/...`.
6. [`astro.config.mjs`](file:///d:/10z-web/astro.config.mjs) — Set `base` according to your preferred bucket URL (`https://mid-10z-dev-1.storage.googleapis.com` vs `https://storage.googleapis.com/mid-10z-dev-1`).

---

## 4. Verification Steps
1. Verify all video imports resolve cleanly across `src/`.
2. Confirm generated HTML uses consistent URL prefixes for CSS, JS, images, and videos.

