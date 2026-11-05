# 10zebra Web (`10z-web`) — File & Function Map

This document provides a complete architectural breakdown of all files, data catalogs, exported functions, layouts, components, routes, and scripts in the `10z-web` Astro marketing and documentation site.

---

## 1. Root & Configuration Files

| File | Purpose |
| :--- | :--- |
| `astro.config.mjs` | Astro configuration (integrations, Vite/Tailwind setup, build output settings). |
| `package.json` | Project dependencies (`astro`, `@tailwindcss/vite`, etc.) and npm scripts (`dev`, `build`, `preview`, `sync:models`, `sync:app`). |
| `tsconfig.json` | TypeScript compiler configuration for Astro. |
| `src/content.config.ts` | Astro Content Collections schema definition. Defines the `blog` collection (`glob` loader over `./src/content/blog/**/*.md`) with Zod validation (`title`, `description`, `pubDate`, `updatedDate`, `author`, `authorRole`, `authorAvatar`, `image`, `imageAlt`, `category`, `tags`, `featured`, `draft`). |
| `src/styles/global.css` | Global CSS variables (`--accent`, `--bg-page`, `--bg-card`, `--text-primary`, etc.), typography, utility classes (`.glass`, `.grad-text`, `.btn`, `.wrap`, `.section`), and reveal animations. |
| `public/llms.txt` | Answer Engine Optimization (AEO) summary file for LLMs/crawlers detailing 10zebra's core capabilities, pages, solutions, refund policy (`90% refund || free regen`), Agent Z, and Tolt referral program. |
| `public/robots.txt` | Search crawler directives and sitemap pointer. |

---

## 2. Data Layer & Exported Functions (`src/data/` & `src/utils/`)

The site uses a single-source-of-truth data layer in `src/data/` so changes propagate automatically to hubs, landing pages, comparison tables, and JSON-LD schemas.

### `src/data/features.ts`
Single source of truth for the 4-phase production pipeline, feature cards, hero backdrops, and cross-links.
- **Types & Interfaces:**
  - `PhaseKey`: `'generate' | 'direct' | 'finish' | 'manage'`
  - `FeatureRef`: `{ title, short, blurb, href, icon, phase, badge, media, gallery? }`
  - `FeatureKey`: Union of keys in `features` (`modelComparison`, `textToSequence`, `quickStart`, `characterSwap`, `agenticWorkflows`, `multiReference`, `produceExport`, `publishYouTube`, `projectBudgets`, `teamManagement`, `collaborativeStoryboard`, `referralProgram`)
- **Exports & Functions:**
  - `phases`: Metadata (`num`, `label`, `line`) for each of the 4 production phases.
  - `features`: Keyed catalog of all `FeatureRef` definitions.
  - `featureEntries`: Typed array of `[FeatureKey, FeatureRef]` tuples.
  - `getFeatureByHref(href: string): [FeatureKey, FeatureRef] | undefined` — Normalizes trailing slashes and resolves a feature entry by its route path (including `/referral-program` and `/referrals` aliases).

### `src/data/models.ts` & `src/data/models.json`
Single source of truth for AI video/image model families and individual engines (synced from the production app via `scripts/sync-models.mjs`).
- **Types & Interfaces:**
  - `ModelVariant`: Engine specification (`key`, `name`, `family`, `method`, `methodLabel`, `methodBadge`, `engine`, `desc`, `cost`, `maxRefs`, `resolution`, `duration`, `speed`, `hasAudio`, `isCharacterSwap`, `isSequence`).
  - `ModelFamily`: Family specification (`slug`, `name`, `developer`, `tagline`, `accentColor`, `badge`, `overview`, `strengths`, `tips`, `modelCount`, `minCost`, `maxCost`, `methods`, `models`).
  - `ModelsCatalog`: Root catalog object (`lastSynced`, `source`, `totalModels`, `totalFamilies`, `families`, `models`).
- **Exports & Functions:**
  - `catalog`, `totalFamilies`, `totalModels`
  - `getModelFamilies(): ModelFamily[]` — Returns all active model families.
  - `getModelFamily(slug: string): ModelFamily | undefined` — Finds a model family by URL slug (case-insensitive).
  - `getAllModels(): ModelVariant[]` — Returns flat array of all model engines across families.
  - `getModelsByFamily(slug: string): ModelVariant[]` — Filters individual engines by family slug.
  - `getMethodStats(): { method: string; label: string; count: number }[]` — Aggregates model counts by generation method (`text2vid`, `im2vid`, `vid2vid`, `text2seq`, etc.).

### `src/data/mcp.ts` & `src/data/mcp.json`
Single source of truth for the 10zebra FastMCP Server specification (tools, resources, prompts, and environment variables).
- **Types & Interfaces:**
  - `McpParameter`, `McpTool`, `McpResource`, `McpPrompt`, `McpEnvVar`, `McpCatalog`
- **Exports & Functions:**
  - `mcpCatalog`: Full parsed MCP specification.
  - `getMcpTools(): McpTool[]` — Returns the callable MCP tools (`generate`, `add_story_shot`, `trim_take`, `save_cut`, etc.).
  - `getMcpResources(): McpResource[]` — Returns live MCP query resources (`10z://models`, `10z://credits`, etc.).
  - `getMcpPrompts(): McpPrompt[]` — Returns director system prompts exposed by the MCP server.
  - `getMcpStats()` — Returns `{ totalTools, totalResources, totalPrompts }`.
  - `getMcpEnvVars(): McpEnvVar[]` — Returns configurable environment variables for local/remote MCP deployment.

### `src/data/pricing.ts`
Single source of truth for subscription plans, top-up credit packs, model/tool credit rate cards, full plan comparison matrix, and pricing FAQs.
- **Types & Interfaces:**
  - `PricingPlan`, `CreditPack`, `ModelRate`, `ToolRate`, `ComparisonFeature`, `ComparisonSection`, `PricingFaq`
- **Exports:**
  - `plans`: Subscription tiers (`payg`, `maker`, `director`).
  - `creditPacks`: Non-expiring credit top-up packs (`Starter Pack`, `Pro Pack`, `Studio Pack`, `Volume Pack`) with subscriber discount breakdowns.
  - `modelRates`: Representative per-take credit costs across flagship models.
  - `toolRates`: Credit costs for studio tools (Character Swap, Text-to-Sequence, 4K Upscale, YouTube Export).
  - `comparisonSections`: Multi-category feature comparison table rows across Pay-As-You-Go, Maker, Director, and Studio.
  - `pricingFaqs`: Billing, credit expiration, failed generation (`90% refund || free regen`), and Tolt referral program FAQs.

### `src/data/faqs.ts`
Comprehensive SEO/AEO FAQ repository driving `/faq` and Schema.org `FAQPage` structured data.
- **Types & Interfaces:**
  - `FaqItem`: `{ id, category, question, answer, shortAnswer?, keywords }`
  - `FaqCategory`: `{ id, label, badge, icon, description }` (`'features' | 'mcp' | 'teams' | 'payments' | 'terms'`)
- **Exports & Functions:**
  - `faqCategories`: Metadata for the 5 FAQ categories.
  - `allFaqs`: Master list of FAQ items with HTML answers and AEO `shortAnswer` summaries.
  - `getFaqsByCategory(categoryId: FaqCategory['id']): FaqItem[]` — Filters FAQs by category ID.
  - `getFaqStats(): { total: number; counts: Record<string, number> }` — Computes total and per-category question counts for filter pills.

### `src/data/solutions.ts`
Persona / ICP data driving the homepage use-case rotator, `/solutions` hub, and `/solutions/[slug]` landing pages.
- **Types & Interfaces:**
  - `Solution`: `{ slug, label, pageTitle, need, headline, summary, heroSub, chips, cta, accent, media, pains, workflow, features, stats, testimonial, faqs, seo }`
- **Exports & Functions:**
  - `solutions`: Array of persona definitions (`creative-directors`, `film-producers`, `agencies`, `content-creators`).
  - `getSolution(slug: string): Solution | undefined` — Looks up a solution definition by slug.

### `src/data/media.ts`
Centralized image and video asset manifest for homepage, solutions, and feature pages.
- **Types & Interfaces:**
  - `MediaSlot`: `{ id, image, video?, alt, brief }`
  - `MediaKey`: Union of keys in `media`
- **Internal Helper & Exports:**
  - `slot(s: MediaSlot)` — Identity helper for type-checked media slot definitions.
  - `media`: Dictionary of all image/video slots (`persona*`, `shot*`, `take*`, `cd*`, `film*`, `agency*`, `creator*`, `feat*`).

### `src/utils/blog.ts`
Helper functions for filtering, sorting, formatting, and recommending blog posts from the `blog` content collection.
- **Exports & Functions:**
  - `getPublishedPosts(posts: BlogPost[], isDev?: boolean): BlogPost[]` — Filters out drafts in production while keeping them visible in development.
  - `sortPostsByDate(posts: BlogPost[]): BlogPost[]` — Sorts posts newest-first by `pubDate`.
  - `calculateReadingTime(content: string, wordsPerMinute?: number): number` — Strips HTML/Markdown syntax and returns estimated reading time in minutes.
  - `formatBlogDate(date: Date): string` — Formats date as `Month Day, Year` (e.g., `November 4, 2026`).
  - `formatBlogDateShort(date: Date): string` — Formats date as `Mon Day, Year` (e.g., `Nov 4, 2026`).
  - `getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit?: number): BlogPost[]` — Scores and returns related posts based on shared tags (+3/tag), matching category (+2), and date proximity within 60 days (+1).
  - `getCategoriesWithCounts(posts: BlogPost[]): { category: string; count: number }[]` — Aggregates unique blog categories and post counts.
  - `getAllTags(posts: BlogPost[]): string[]` — Extracts sorted list of unique tags across posts.

---

## 3. Layouts (`src/layouts/`)

| File | Purpose & Slots/Props |
| :--- | :--- |
| `Layout.astro` | Base HTML document shell (`<html>`, `<head>`, SEO meta tags, OpenGraph/Twitter cards, canonical URL, global styles, intersection observer reveal script). |
| `FeatureLandingLayout.astro` | Shared template for all `/features/*` pages. Automatically resolves feature imagery and phase metadata via `getFeatureByHref(Astro.url.pathname)`, generates `FAQPage` + `BreadcrumbList` JSON-LD, and renders: Hero (with `slot="hero-visual"`), Stats bar, `slot="interactive-demo"`, Phase Banner, Step-by-Step Workflow, Deep-Dive Pillars, default `<slot />`, Old Way vs. 10zebra (`ShiftList`), Who Uses It (`SolutionCard`), FAQ accordion, Related Features (`FeatureCard`), and `FinalCTA`. |
| `PlaceholderPage.astro` | Minimal "Coming Soon" / placeholder layout with title, badge label, description, and CTA buttons. |

---

## 4. Pages & Routes (`src/pages/`)

### Core Pages
| File | Route | Description |
| :--- | :--- | :--- |
| `src/pages/index.astro` | `/` | Homepage: `Hero`, `ModelTicker`, `UseCases`, `ProductTour`, `FeatureTeam`, `SocialProof`, `CompareTable`, `MCPSection`, `Pricing`, `FAQ`, `FinalCTA`, and Organization/SoftwareApplication JSON-LD. |
| `src/pages/features.astro` | `/features` | Feature Hub: Hero mosaic, stats bar, 4-phase production pipeline grid (`byPhase`), interactive tabbed tool demos (`ModelComparisonMockup`, `AgenticWorkflowsMockup`, `CharacterSwapMockup`, `QuickStartToolsExplorer`, `ProjectBudgetMockup`, `YouTubeExportMockup`), solutions by role, and `ShiftList` comparison. |
| `src/pages/models.astro` | `/models` | AI Models Hub: Interactive directory of all model families and engines, filterable by generation method (`text2vid`, `im2vid`, `vid2vid`, `text2seq`), with credit costs and specs. |
| `src/pages/models/[slug].astro` | `/models/[slug]` | Dynamic model family landing page driven by `getModelFamilies()`, detailing family overview, variant table, strengths, prompting tips, and benchmarks. |
| `src/pages/solutions.astro` | `/solutions` | Solutions Hub: Overview of all 4 creative roles (`Creative Directors`, `Film Producers`, `Agencies`, `Content Creators`). |
| `src/pages/solutions/[slug].astro` | `/solutions/[slug]` | Dynamic persona landing page driven by `solutions.ts` with pain points, 3-step visual workflow, linked features, stats, testimonial, and role FAQs. |
| `src/pages/pricing.astro` | `/pricing` | Pricing & Credits page: Sticky sub-nav, `Pricing` tier cards (with Monthly/Annual toggle), `CreditCalculator`, `CreditPacks`, `ModelRateCard`, `PlanComparison`, and `PricingFAQ`. |
| `src/pages/mcp.astro` | `/mcp` | Developer documentation and setup guide for the 10zebra Model Context Protocol (MCP) server (Claude Desktop, Cursor IDE, Windsurf, custom Python agents), interactive tool/resource explorer, and Director tier gate details. |
| `src/pages/faq.astro` | `/faq` | Interactive Help Center & FAQ page driven by `src/data/faqs.ts` with live keyword search, category filter pills, expand/collapse controls, copyable deep-link anchors, and `FAQPage` JSON-LD. |
| `src/pages/about.astro` | `/about` | Company story, founding heritage (Philip Meier, PhD), 10zebra timeline, architecture pillars, and team mission. |
| `src/pages/demo.astro` | `/demo` | Interactive studio demo page embedding a live 10zebra storyboard sandbox and walkthrough. |
| `src/pages/referral-program.astro` | `/referral-program` | Direct top-level alias route that renders `src/pages/features/referral-program.astro`. |
| `src/pages/sitemap.xml.ts` | `/sitemap.xml` | Dynamic XML sitemap generator (`GET` APIRoute) combining static pages, `/features/*` slugs, `/solutions/*` slugs, `/models/*` slugs, and `/blog/*` posts. |

### Feature Detail Pages (`src/pages/features/`)
All pages use `FeatureLandingLayout.astro`:
| File | Route | Focus |
| :--- | :--- | :--- |
| `agentic-workflows.astro` | `/features/agentic-workflows` | **Agent Z** (the 10zebra agent): batch create, batch convert, batch replace characters, batch regen, batch upscale, and mandatory **Dry Run analysis** (creates execution plan, calculates exact credit costs, and requests user approval). |
| `character-swap.astro` | `/features/character-swap` | Single-take motion-locked Character Swap and project-wide batch replacement with Agent Z. |
| `collaborative-storyboard.astro` | `/features/collaborative-storyboard` | Real-time shared storyboard canvas, persistent story settings, and camera rules. |
| `model-comparison.astro` | `/features/model-comparison` | Side-by-side multi-model generation and synchronized playback scrubbing across Kling, Veo, Sora, Runway, Grok, and Seedance. |
| `multi-reference-edit.astro` | `/features/multi-reference-edit` | Blending character, wardrobe, and environment references into cohesive frames. |
| `produce-and-export.astro` | `/features/produce-and-export` | In-browser timeline take trimming, sequencing, multi-track audio mixdown, and export. |
| `project-management.astro` | `/features/project-management` | Project-level seats, isolated credit vaults, and free client Viewer seats for agencies and studios. |
| `publish-to-youtube.astro` | `/features/publish-to-youtube` | 1-click direct YouTube OAuth publishing with title, tags, description, and privacy settings. |
| `quick-start-tools.astro` | `/features/quick-start-tools` | Six guided creative launchpads (`From a Script`, `Three Acts`, `Make an Ad`, etc.). |
| `referral-program.astro` | `/features/referral-program` | **Tolt integration** referral program: unique user referral code & link, **3% lifetime payout** on all referred credit purchases and subscriptions. |
| `team-management.astro` | `/features/team-management` | Role-based access control (`Owner`, `Editor`, `Viewer`) and per-project spend governance. |
| `text-to-sequence.astro` | `/features/text-to-sequence` | Turning a single narrative prompt or script into 3–30 ordered, continuous storyboard shots. |

### Blog & Placeholder Pages
| File | Route | Description |
| :--- | :--- | :--- |
| `src/pages/blog/index.astro` | `/blog` | Blog hub with featured article hero, category filtering, tag pills, and grid of `BlogCard` items. |
| `src/pages/blog/[slug].astro` | `/blog/[slug]` | Dynamic blog post article reader with `ReadingProgress`, `AuthorBio`, `RelatedPosts`, and `BlogPosting` JSON-LD. |
| `src/pages/login.astro` | `/login` | Studio login gateway / redirect page. |
| `src/pages/signup.astro` | `/signup` | Free trial signup gateway (200 free credits). |
| `src/pages/api.astro` | `/api` | Placeholder page for REST API docs (`PlaceholderPage.astro`). |
| `src/pages/integrations.astro` | `/integrations` | Placeholder page for external integrations (`PlaceholderPage.astro`). |
| `src/pages/resources/*.astro` | `/resources/*` | Placeholder pages for `changelog.astro`, `guides.astro`, and `tutorials.astro`. |

---

## 5. Components (`src/components/`)

### Layout Components (`src/components/layout/`)
- `Header.astro`: Sticky top navigation bar with logo, Solutions hover/keyboard mega-menu, links to Features, AI Models, Pricing, MCP, and Log In / Start Free CTAs.
- `Footer.astro`: 6-column site footer linking Solutions, Features (including Agentic Workflows and Referral Program), AI Models, Developers, and Resources.
- `Hero.astro`: Homepage hero section with headline, primary CTAs, and studio showcase preview.

### Feature Components & Interactive UI Mockups (`src/components/features/`)
- `FeatureCard.astro`: Visual card representing a feature from `src/data/features.ts` with badge, phase tag, and `FeatureVisual`.
- `FeatureVisual.astro`: Renders either a single `MediaSlot` or a multi-slot gallery (3-strip or 2×2 model grid) for a feature.
- `AgenticWorkflowsMockup.astro`: Studio UI mockup for **Agent Z** showing batch modes (`Batch Create`, `Batch Replace Characters`, `Batch Convert`, `Batch Regen`, `Batch Upscale`) and the **Dry Run Analysis** panel with itemized credit costs and approval button.
- `CharacterSwapMockup.astro`: UI mockup demonstrating source take + reference portrait → motion-locked swapped result.
- `ModelComparisonMockup.astro`: UI mockup showing 4 synchronized model takes (Kling, Veo, Sora, Runway) from one prompt.
- `ProjectBudgetMockup.astro`: UI mockup illustrating isolated project credit vaults, spend caps, and project-level roles.
- `QuickStartToolsExplorer.astro`: Interactive tabbed explorer for the 6 Quick Start tools.
- `ReferralProgramMockup.astro`: UI mockup for the **Tolt Referral Portal** displaying the user's referral code/link, `3% Lifetime Payout` metrics, and live conversion ledger across subscriptions and credit packs.
- `YouTubeExportMockup.astro`: UI mockup for in-browser timeline mixdown and 1-click YouTube OAuth publishing.

### Pricing Components (`src/components/pricing/`)
- `CreditCalculator.astro`: Interactive estimator allowing users to select models and shot counts to calculate required credits and best plan/pack.
- `CreditPacks.astro`: Displays the 4 non-expiring credit top-up packs with standard, Maker (-15%), and Director (-30%) pricing.
- `ModelRateCard.astro`: Tabular rate card of credit costs across foundation models and studio tools.
- `PlanComparison.astro`: Expandable/full feature comparison matrix across Pay-As-You-Go, Maker, Director, and Studio.
- `PricingFAQ.astro`: Accordion FAQ section for `/pricing` driven by `pricingFaqs`.

### Homepage & Shared Sections (`src/components/`)
- `Pricing.astro`: Shared 3-tier pricing cards component (supports homepage embed and `/pricing` hero mode with Monthly/Annual switch).
- `ProductTour.astro`: 4-step interactive homepage walkthrough (Generate → Lock → Assemble → Export).
- `UseCases.astro`: Persona tab rotator linking to `/solutions/[slug]`.
- `FeatureTeam.astro`, `FeatureMultiModel.astro`, `FeatureCharacter.astro`, `FeatureTracking.astro`, `ProduceExport.astro`, `WorkflowSandbox.astro`: Modular feature showcase sections.
- `CompareTable.astro`: Homepage comparison table contrasting 10zebra with standalone single-model tools.
- `MCPSection.astro`: Homepage developer callout showcasing the FastMCP integration with Claude and Cursor.
- `SocialProof.astro` & `PainPoints.astro`: Creator testimonials and old-way vs. new-way contrasts.
- `FAQ.astro`: Homepage top questions accordion + AEO definition callout.
- `FinalCTA.astro`: Bottom conversion banner with customizable title, subtitle, and buttons.
- `MediaSlot.astro`: Responsive image/video renderer for `src/data/media.ts` slots (displays dev-only media brief tooltips in `astro dev`).
- `ModelTicker.astro`: Infinite horizontal marquee of supported AI model logos/badges.
- `shared/ShiftList.astro`: Reusable "Before (Competitors) vs. After (10zebra)" comparison row component.
- `solutions/SolutionCard.astro`: Visual persona card (`default` and `compact` variants).
- `blog/AuthorBio.astro`, `blog/BlogCard.astro`, `blog/ReadingProgress.astro`, `blog/RelatedPosts.astro`: Blog editorial UI components.

---

## 6. Automation & Migration Scripts (`scripts/`)

| Script | Function |
| :--- | :--- |
| `scripts/sync-models.mjs` | Reads model definitions from the sibling production app (`../10z/src/utils/config.js`), groups variants by model family, and writes `src/data/models.json`. |
| `scripts/sync-app.mjs` | Syncs both AI models (`models.json`) and FastMCP server metadata (`mcp.json`) from the sibling `../10z` repository. |
| `scripts/migrate-webflow.cjs` & `scripts/run-migration.cjs` | Utilities used to migrate legacy Webflow blog exports and assets into `src/content/blog/` and `src/assets/blogs/`. |
| `scripts/check-missing-images.cjs` & `scripts/fix-hero-images.cjs` | Asset integrity verification scripts for blog post hero and inline images. |

---

## 7. 1970s Cinematic Endurance Motorsport Crew Media (`src/assets/media/` & `public/media/`)

| Path | Section Treatment | Description |
| :--- | :--- | :--- |
| `src/assets/media/hero-poster-1970s.jpg` & `public/media/hero-1970s-pitcrew.mp4` | Homepage (Kodak 5254 Technicolor) | Widescreen 1970s endurance racing pit wall & garage hero poster and continuous single-shot H.264 cinema loop. |
| `src/assets/media/persona-*-1970s.jpg` & `public/media/persona-*-loop.mp4` | Homepage & Solutions Heroes (Kodak 5254 Technicolor) | 4 persona hero frames & continuous single-shot H.264 video loops (`creative-directors`, `film-production`, `agencies`, `content-creators`). |
| `src/assets/media/character-reference-1970s.jpg`, `shot-wide-forest-1970s.jpg`, `shot-medium-train-1970s.jpg`, `shot-closeup-campfire-1970s.jpg` & `public/media/shot-*.mp4` | Homepage (Kodak 5254 Technicolor) | Lead Driver Elena Vance character reference portrait and 3 locked continuity shots + video loops across locations and lighting. |
| `src/assets/media/take-a-1970s.jpg` .. `take-d-1970s.jpg` & `public/media/take-*.mp4` | Homepage (Kodak 5254 Technicolor) | 4 multi-model takes & video loops of the same 1970s pit-stop prompt across Kling 3.0, Veo 3, Sora, and Runway Gen-4. |
| `src/assets/media/solutions/*-1970s.jpg` & `public/media/solutions/*.mp4` | Solutions (Warm Golden Sepia & Kodachrome) | 12 workflow frames & video loops across Creative Directors (`cd-*`), Film Producers (`film-*`), Agencies (`agency-*`), and Content Creators (`creator-*`). |
| `src/assets/media/features/*-1970s.jpg` & `public/media/features/*.mp4` | Features (1970s Dichromatic Burnt Amber & Prussian Cyan) | 9 feature hero plates & video loops (`agentic-workflows`, `character-swap`, `multi-reference`, `produce-export`, `project-budgets`, `quick-start`, `referral-program`, `storyboard`, `team`). |
| `src/assets/media/section-models-teal-1970s.jpg` | AI Models (Anamorphic Teal & Silver-Halide Chrome) | Master engine tuner calibrating 4 synchronized tachometers on `/models` and `/models/[slug]`. |
| `src/assets/media/section-mcp-phosphor-1970s.jpg` | Developer / MCP (1970s Control-Room Amber Phosphor & Charcoal) | Race telemetry control room with amber/emerald CRT oscilloscopes and patch bay on `/mcp`. |
| `src/assets/media/section-resources-press-1970s.jpg` | Resources (Archival 1970s Photojournalism) | *LIFE* / *Magnum* style candid crew photograph around the garage chalkboard on `/about`. |
| `docs/1970S_VIDEO_SHOT_LIST.md` | All Sections | Master 33-shot 10zebra AI Video Generation Guide (mapping every `public/media/*.mp4` target filename to its `src/assets/media/*-1970s.jpg` reference frame, recommended 10z model, and copy-paste motion prompt). |


