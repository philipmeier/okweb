# Implementation Plan: Real Video Generations, Hero Videos & Missed Asset Cache Fix

**Date:** 2026-11-04  
**Status:** Awaiting User Approval  

---

## 1. Root-Cause Audit: What Was Missed & Why

### A. Why the Solutions Header Dropdown (and Other `<Image>` Tags) Still Showed Old Assets
1. **Identical Filenames + Astro `/_image` Cache (`node_modules/.astro/assets/`):**
   - In [`src/components/layout/Header.astro`](../../src/components/layout/Header.astro), the Solutions mega-menu renders `<Image src={s.media.image} width={160} height={112} />`.
   - Because we overwrote the files in `src/assets/media/` using the **exact same filenames** (`persona-creative-directors.jpg`, `cd-explore.jpg`, etc.) while `astro dev` was running, Astro's `/_image?href=%2F%40fs%2FD%3A%2F10z-web%2Fsrc%2Fassets%2Fmedia%2Fpersona-creative-directors.jpg&w=160&h=112&f=webp` URL remained **100% identical**.
   - Both `d:\10z-web\node_modules\.astro\assets\` (which still holds cached `.webp` files of the old fragrance/astronaut/runner/creator images) and the browser's HTTP cache continued serving the old cached WebP transforms whenever `<Image>` rendered without a video overlay.

### B. Why the Homepage Hero & Solutions Heroes Looked Like a "Carousel of Images"
- Our previous script (`render_1970s_videos.py`) created `hero-1970s-pitcrew.mp4` and `persona-*-loop.mp4` by stitching **3 different still images** together with hard cuts every 1.8–2.0 seconds (`[img1, img2, img3]`).
- When played in `<video autoplay loop muted playsinline>`, cutting between 3 static images every 2 seconds looks like an **image slideshow/carousel** rather than a continuous motion video take.

### C. 25 Video Placeholder Callouts in `src/data/media.ts` That Were Left as Static Images
In [`src/data/media.ts`](../../src/data/media.ts), **25 slots** whose `brief` explicitly calls for a video loop (`16:9 loop, 4–6s`) did **not** have a `video: '/media/...'` property attached, so `MediaSlot.astro` only rendered a static `<Image>` instead of a `<video>`:
1. **Product Tour — `Generate` (4 Model Takes on `/` and `/features/model-comparison`):**
   - `takeA` (`take-kling` — Kling 3.0)
   - `takeB` (`take-veo` — Veo 3)
   - `takeC` (`take-sora` — Sora)
   - `takeD` (`take-runway` — Runway Gen-4)
2. **Product Tour — `Lock` & `Assemble` (3 Continuity Shots on `/` and `/features/text-to-sequence`):**
   - `shotWide` (`lock-shot-wide`)
   - `shotMedium` (`lock-shot-medium`)
   - `shotCloseup` (`lock-shot-closeup`)
3. **Solutions Pages — All 12 Workflow Callouts (`/solutions/[slug]` & `/solutions` cards):**
   - Creative Directors: `cdExplore`, `cdTalent`, `cdPresent`
   - Film Producers: `filmBreakdown`, `filmCast`, `filmPlates`
   - Agencies: `agencyBeverage`, `agencyTech`, `agencyFashion`
   - Content Creators: `creatorHost`, `creatorCave`, `creatorSummit`
4. **Feature Pages — Hero Backdrops & Feature Hub Interactive Cards (`/features` & `/features/*`):**
   - `featCharacterSwap`, `featAgentic`, `featMultiReference`, `featQuickStart`, `featStoryboard`, `featBudgets`, `featTeam`, `featProduce`, `featReferral`

### D. Other Pages That Missed Section-Specific 1970s Visuals
1. **Individual AI Model Family Pages (`src/pages/models/[slug].astro`):**
   - Currently has no visual media in its hero card. Should showcase the **Anamorphic Teal & Silver-Halide Chrome** 1970s motorsport benchmark visual/video.
2. **Interactive Mockup Components (`src/components/features/*.astro`):**
   - `ModelComparisonMockup.astro`, `CharacterSwapMockup.astro`, and `YouTubeExportMockup.astro` currently use `<img>` tags instead of looping `<video>` elements for their simulated video takes.
3. **Resource Pages (`src/pages/pricing.astro`, `src/pages/faq.astro`, `src/pages/demo.astro`, `src/pages/blog/index.astro`):**
   - Only `/about` received the **Archival 1970s Photojournalism (Warm Matte Press Stock)** visual (`section-resources-press.jpg`); the other resource pages did not include it.

---

## 2. Step-by-Step Implementation Plan

### Step 1: Bust All Astro & Browser Image Caches Permanently
- Rename all 37 generated 1970s motorsport images in `src/assets/media/` with a `-1970s.jpg` suffix (e.g., `persona-creative-directors-1970s.jpg`, `cd-explore-1970s.jpg`, `take-a-1970s.jpg`, `hero-poster-1970s.jpg`, etc.) and remove the old un-suffixed filenames.
- Delete `d:\10z-web\node_modules\.astro\assets\` and `.astro` image cache directories so Astro regenerates every WebP derivative from scratch under brand-new `/_image?href=...` URLs.
- Update all imports in `src/data/media.ts` and components to point to the `-1970s.jpg` files so the Solutions header dropdown (`Header.astro`) and every card across the site immediately display the new 1970s assets without stale browser cache.

### Step 2: Generate True Continuous Video Loops (`.mp4`) for All Hero & Callout Slots
Depending on your preferred video generation source:
- **Option A — Use AI Video Generation API (`d:\10z` backend keys / Fal.ai / Google Gemini Veo API):**
  - Read the API credentials from `d:\10z\.env` (using `BypassSandbox: true`) or a provided API key to run **Image-to-Video (`im2vid`)** using our 1970s Motorsport keyframes (`hero-poster-1970s.jpg`, `persona-*-1970s.jpg`, `take-*-1970s.jpg`, `shot-*-1970s.jpg`, `solutions/*-1970s.jpg`, `features/*-1970s.jpg`) so every `.mp4` is a genuine AI-generated continuous video clip (not a multi-image carousel!).
- **Option B — Single-Shot Continuous Motion Synthesis (if no external video API is used):**
  - Generate each `.mp4` from a **single continuous shot** (never cutting between multiple still images) with layered 1970s cinema motion (moving atmospheric mist/sparks, anamorphic light sweep, depth parallax, and organic 24fps film grain).

### Step 3: Wire `.mp4` Videos Into Every Hero, Callout & Interactive Mockup
1. **Top Homepage Hero (`src/components/layout/Hero.astro`):**
   - Point `<video autoplay loop muted playsinline>` to `/media/hero-1970s-pitcrew.mp4` (single continuous 1970s pit-lane video take, no multi-image slideshow cuts).
2. **All 4 Solutions Page Heroes & Homepage Use-Case Rotator (`src/data/media.ts`, `src/pages/solutions/[slug].astro`, `src/components/UseCases.astro`):**
   - Wire continuous single-scene `.mp4` videos for `personaCreativeDirectors`, `personaFilmProduction`, `personaAgencies`, and `personaContentCreators`.
3. **All 25 Callout Slots in `src/data/media.ts`:**
   - Attach `video: '/media/<slot-id>-1970s.mp4'` to:
     - `takeA`, `takeB`, `takeC`, `takeD` (Product Tour · Generate)
     - `shotWide`, `shotMedium`, `shotCloseup` (Product Tour · Lock & Assemble)
     - `cdExplore`, `cdTalent`, `cdPresent`, `filmBreakdown`, `filmCast`, `filmPlates`, `agencyBeverage`, `agencyTech`, `agencyFashion`, `creatorHost`, `creatorCave`, `creatorSummit` (Solutions 3-step workflow callouts)
     - `featCharacterSwap`, `featAgentic`, `featMultiReference`, `featQuickStart`, `featStoryboard`, `featBudgets`, `featTeam`, `featProduce`, `featReferral` (Feature page heroes & cards)
4. **Interactive Feature Mockups (`ModelComparisonMockup.astro`, `CharacterSwapMockup.astro`, `YouTubeExportMockup.astro`):**
   - Upgrade the simulated video take boxes to play looping `<video autoplay loop muted playsinline>` clips with the `-1970s.jpg` posters.
5. **Remaining Section Pages (`/models/[slug].astro`, `/blog/index.astro`, `/faq.astro`):**
   - Add the section-treated 1970s visual/video showcase to `/models/[slug].astro` (Anamorphic Teal & Silver-Halide Chrome) and subtle Archival Photojournalism accents to the resource hubs.

---

## 3. Verification Steps
1. Verify all `-1970s.jpg` and `/media/*-1970s.mp4` files exist, are non-empty, and are wired in `src/data/media.ts`.
2. Verify `node_modules/.astro/assets` is purged and restart `astro dev` so `Header.astro` Solutions dropdown and all pages serve the new assets immediately.

