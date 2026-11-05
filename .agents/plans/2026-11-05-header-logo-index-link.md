# Implementation Plan: Update Header, Footer, and All Source Links Directly to `/.../index.html`

**Date:** 2026-11-05  
**Status:** Approved & Implemented

---

## 1. Goal & Summary

Previously, internal links were only rewritten inside `dist/` by the post-build hook in [`astro.config.mjs`](file:///d:/10z-web/astro.config.mjs), while the source files in `src/` ([`Header.astro`](file:///d:/10z-web/src/components/layout/Header.astro), [`Footer.astro`](file:///d:/10z-web/src/components/layout/Footer.astro), etc.) still had bare directory paths (`href="/"`, `href="/features"`, `href="/solutions"`, `href="/models"`, `href="/pricing"`, `href="/mcp"`, `href="/login"`, `href="/signup"`).

Additionally, because Google Cloud Storage caches `.html` files for 1 hour (`Cache-Control: public, max-age=3600`), any `.html` file opened on `https://mid-10z-dev-1.storage.googleapis.com` before the `dist/` rewrite continues serving the cached version from Google's edge until cache-busted or expired.

This plan updates all internal page links **directly in the source files (`src/`)** so every link in `Header.astro`, `Footer.astro`, data catalogs, layouts, components, and pages explicitly points to `/.../index.html` in source code as well as in `dist/`.

---

## 2. Files to Modify

1. **[`src/components/layout/Header.astro`](file:///d:/10z-web/src/components/layout/Header.astro)**
   - Logo: `href="/"` &rarr; `href="/index.html"`
   - Solutions trigger & "Compare all solutions": `href="/solutions"` &rarr; `href="/solutions/index.html"`
   - Solutions dropdown items: `href={`/solutions/${s.slug}`}` &rarr; `href={`/solutions/${s.slug}/index.html`}`
   - Top-level nav links:
     - `href="/features"` &rarr; `href="/features/index.html"`
     - `href="/models"` &rarr; `href="/models/index.html"`
     - `href="/pricing"` &rarr; `href="/pricing/index.html"`
     - `href="/mcp"` &rarr; `href="/mcp/index.html"`
     - `href="/login"` &rarr; `href="/login/index.html"`
     - `href="/signup"` &rarr; `href="/signup/index.html"`
2. **[`src/components/layout/Footer.astro`](file:///d:/10z-web/src/components/layout/Footer.astro)**
   - Logo (`href="/index.html"`), Solutions (`href="/solutions/index.html"`, `href={`/solutions/${s.slug}/index.html`}`), Features (`href="/features/.../index.html"`), AI Models (`href="/models/index.html"`, `href={`/models/${f.slug}/index.html`}`), Developers (`href="/mcp/index.html"`), and Resources (`href="/about/index.html"`, `href="/pricing/index.html"`, `href="/blog/index.html"`, `href="/faq/index.html"`, `href="/demo/index.html"`).
3. **Data Catalogs & Remaining Components/Pages (`src/data/*.ts`, `src/components/**/*.astro`, `src/layouts/*.astro`, `src/pages/**/*.astro`)**
   - Update all internal route `href` / `ctaHref` strings and template literals across `src/` (`src/data/features.ts`, `src/data/pricing.ts`, `src/data/faqs.ts`, `Hero.astro`, `ProductTour.astro`, `UseCases.astro`, `FeatureTeam.astro`, `FinalCTA.astro`, `MCPSection.astro`, `Pricing.astro`, `FAQ.astro`, `BlogCard.astro`, `RelatedPosts.astro`, `SolutionCard.astro`, `FeatureLandingLayout.astro`, `PlaceholderPage.astro`, and `src/pages/**/*.astro`) to end with `/index.html`.
4. **[`astro.config.mjs`](file:///d:/10z-web/astro.config.mjs)**
   - Keep `gcsBucketIndexLinks()` as a safety net during `astro build`.

---

## 3. Verification Steps

1. Inspect [`Header.astro`](file:///d:/10z-web/src/components/layout/Header.astro) and [`Footer.astro`](file:///d:/10z-web/src/components/layout/Footer.astro) to verify all header/footer links explicitly point to `/.../index.html`.
2. Scan all files in `src/` and `dist/` to ensure zero bare directory `href` links remain.
