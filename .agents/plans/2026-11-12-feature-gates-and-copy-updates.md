# Implementation Plan: Feature Config Gates, Hybrid Production, Quick Start Scene Extension, MCP Partner Access & Copy Updates

**Date:** 2026-11-12  
**Status:** Awaiting User Approval

---

## 1. Goal & Summary of Requested Changes

This plan implements 5 coordinated updates across `10z-web`:

1. **De-emphasize 90% Refund / Free Regen Copy (& Gate Behind `failedGenerationProtection`):**
   - Permanently remove `90% refund || free regen` / retry highlights from hero stats strips, pricing callout banners, top-up pack highlight cards, plan card bullets, about page stats, and feature shift-lists.
   - Keep Failed Generation Protection **only** in the main FAQs (`/faq`, homepage `FAQ.astro`, `PricingFAQ.astro`) and comparison tables (`CompareTable.astro`, `PlanComparison.astro`), and wrap those FAQ/comparison entries behind the `featureGates.failedGenerationProtection` flag (currently `false` — "coming soon, hide for now").
2. **MCP Partner Program Restriction (Gated by `featureGates.subscriptions`):**
   - When `featureGates.subscriptions === false` (current default): highlight on `/mcp`, `MCPSection.astro`, and FAQs that MCP is currently restricted to the **10zebra Partner Program**, with a `mailto:` CTA (`mailto:hello@10zebra.com?subject=10zebra%20MCP%20Partner%20Program%20Access%20Request`) to request access.
   - When `featureGates.subscriptions === true`: automatically switch to **Director Plan Only ($79/mo)** across `/mcp`, `MCPSection.astro`, and FAQs.
3. **Highlight "Hybrid Production" as a Core Feature (+ 1970s Dichromatic Split-Tone Imagery & 10zebra Prompts):**
   - Add **Hybrid Production** (`hybridProduction`, slug: `/features/hybrid-production`) to the `direct` phase of `src/data/features.ts` and create its dedicated feature page `src/pages/features/hybrid-production.astro` (plus interactive mockup `src/components/features/HybridProductionMockup.astro`).
   - Generate consistent **1970s Dichromatic Split-Tone (Burnt Amber `#f97316` & Prussian Cyan `#0e4f63`)** feature imagery in `src/assets/media/features/`:
     - `hybrid-production-1970s.jpg`: Split-screen 1970s Panavision live-action cockpit plate on a soundstage/paddock transitioning across the center line into a cinematic rain-slicked Le Mans night race with Lead Driver Elena Vance.
     - `hybrid-live-plate-1970s.jpg`: Raw live-action source plate for the interactive before/after comparison in `HybridProductionMockup.astro`.
     - `hybrid-stylized-take-1970s.jpg`: AI-transformed & character-swapped output frame for `HybridProductionMockup.astro`.
   - Document copy-paste **10zebra Image & Video Prompts** in `.agents/plans/1970S_VIDEO_SHOT_LIST.md` so the founder can generate/update `features/hybrid-production.mp4` directly in 10zebra.
   - Showcase how teams combine **live-action footage and real actors** with **AI-generated visuals, restyling, and character swaps**—including video import (`story-import-new` automatic shot detection into storyboard panels), video-to-video style transformation, character swap on live-action plates, and cutting real footage alongside AI takes on one unified timeline.
   - Feature Hybrid Production in `/features` (bento mosaic & interactive demo tabs), `ProductTour.astro`, `Footer.astro`, `solutions.ts`, `sitemap.xml.ts`, and `public/llms.txt`.
4. **Quick Start Tools — Start a New Storyboard OR Extend Any Scene Within a Project:**
   - Update copy and interactive UI on `/features/quick-start-tools`, `QuickStartToolsExplorer.astro`, `src/data/features.ts`, `/features`, and `src/data/faqs.ts` to reflect how the tools work in `../10z/src/components/tools` (`composable-start.js`, `dialogs/tool.js`, `recordable-shot-group.js`):
     1. **Launch a New Project (`/new`):** Start a complete multi-shot storyboard from scratch using any of the 6 tools (*From a Script*, *Three Acts*, *Make An Ad*, *Explore Locations*, *Explore Expressions*, *Grok*).
     2. **Extend Any Scene In-Project ("Start Workflow"):** Click **Start Workflow** on any scene inside an active storyboard (`ToolDialog`) to generate and insert a new scene immediately after it—automatically inheriting the project's visual style (`storyStyle`) and aspect ratio (`is_vertical`) and selecting existing character/location takes via the in-project `<RefManager />`.
5. **Centralized Config Gates (`src/data/config.ts`) & Simplified Copy While Gated Off:**
   - **`subscriptions: false` (5a):** Boast a **Simple Pay-As-You-Go model — No Subscription Required**. Users start free with 200 credits and buy non-expiring top-up credit packs anytime with full access to all models. Hide Maker/Director subscription tiers, billing toggles, and subscriber top-up discount rows while preserving all code to flip back on with one switch.
   - **`failedGenerationProtection: false` (5b):** Hide Failed Generation Protection entries in FAQs and comparison tables until ready (and permanently keep them out of site-wide forefront callouts per #1).
   - **`referralProgram: false` (5c):** Hide the 3% Tolt Referral Program across `features.ts`, `/features`, `Footer.astro`, `Pricing.astro`, `CompareTable.astro`, `PlanComparison.astro`, `faqs.ts`, `pricing.ts`, `sitemap.xml.ts`, and `llms.txt`. Gate `/features/referral-program` and `/referral-program` with a clean "Coming Soon" state.
   - **`agenticWorkflows: false` (5d):** Hide Agent Z & Agentic Workflows across `features.ts`, `/features`, `ProductTour.astro`, `CharacterSwapMockup.astro`, `character-swap.astro`, `multi-reference-edit.astro`, `text-to-sequence.astro`, `solutions.ts`, `Footer.astro`, `CompareTable.astro`, `pricing.ts`, `faqs.ts`, `sitemap.xml.ts`, and `llms.txt`. Gate `/features/agentic-workflows` with a clean "Coming Soon" state.
   - **Project Teams & Budgets (`subscriptions` gate interaction — 5e):**
     - When `subscriptions === false`: extend copy across `features.ts`, `FeatureTeam.astro`, `ProjectBudgetMockup.astro`, `project-management.astro`, `team-management.astro`, `CompareTable.astro`, `faqs.ts`, and `solutions.ts` to emphasize that **team collaborators are at no cost** (invite co-directors, editors, freelancers, and client viewers per project for free).
     - When `subscriptions === true`: replace the "free collaborator seats" copy with the tiered seat limits: **Maker gets 2 team seats per project** and **Director gets unlimited seats** (updating `pricing.ts`, `faqs.ts`, `mcp.astro`, and feature pages).

---

## 2. Files to Be Created or Modified

### New Files to Create (3)
| File Path | Purpose |
| :--- | :--- |
| [`src/data/config.ts`](file:///d:/10z-web/src/data/config.ts) | Single-source-of-truth `featureGates` object (`subscriptions`, `failedGenerationProtection`, `referralProgram`, `agenticWorkflows`) + `mcpPartnerConfig` (`mailto:` URL, label, subject). |
| [`src/components/features/HybridProductionMockup.astro`](file:///d:/10z-web/src/components/features/HybridProductionMockup.astro) | Interactive UI mockup for Hybrid Production showing live-action plate import (automatic shot splitting), video-to-video AI restyling, character swap on live actors, and mixed live-action + AI timeline assembly. |
| [`src/pages/features/hybrid-production.astro`](file:///d:/10z-web/src/pages/features/hybrid-production.astro) | Dedicated feature deep-dive page for `/features/hybrid-production` using `FeatureLandingLayout.astro` and 1970s Dichromatic Split-Tone visual identity. |

### Existing Files to Modify (35)

#### Data Catalogs (`src/data/*.ts`)
1. [`src/data/features.ts`](file:///d:/10z-web/src/data/features.ts)
   - Import `featureGates` from `./config`.
   - Add `hybridProduction` feature entry to phase `'direct'` (`/features/hybrid-production`).
   - Update `quickStart` blurb to mention both starting new storyboards and extending scenes inside existing projects.
   - Update `projectManagement` and `teamManagement` blurbs conditionally on `featureGates.subscriptions` (free project collaborators when `false`; Maker 2 seats / Director unlimited seats when `true`).
   - Filter exported `featureEntries` so `agenticWorkflows` and `referralProgram` are excluded when their respective gates are `false` (while exporting `allFeatureEntries` for internal reference if needed).
2. [`src/data/pricing.ts`](file:///d:/10z-web/src/data/pricing.ts)
   - Import `featureGates` from `./config`.
   - Remove `90% credit refund || free regen` from `plans` card feature bullet lists (`free`, `maker`, `director`) per Requirement #1.
   - Update `plans` seat bullets for `subscriptions: true` state per Requirement #5e:
     - **Free:** `1 user seat (no collaborator seats)`
     - **Maker:** `2 team seats per project & per-member budgets` (updated from `1 user seat`)
     - **Director:** `Unlimited team seats per project & budget caps` (updated from `Up to 3 team seats`)
   - Update `director` MCP bullet and `comparisonSections` rows for Team Seats (`1`, `2 per project`, `Unlimited`), Agent Z (`featureGates.agenticWorkflows`), Failed Generation Protection (`featureGates.failedGenerationProtection`), and Referral Program (`featureGates.referralProgram`).
   - Filter/adapt `pricingFaqs` based on `featureGates` (`subscriptions`, `failedGenerationProtection`, `referralProgram`, `agenticWorkflows`).
3. [`src/data/faqs.ts`](file:///d:/10z-web/src/data/faqs.ts)
   - Import `featureGates` and `mcpPartnerConfig` from `./config`.
   - Gate `failed-generation-refund` FAQ item behind `featureGates.failedGenerationProtection` and strip inline `90% credit refund` mentions from unrelated answers (`what-is-10zebra`, `pricing-plans`, `credit-costs`, `model-comparison`).
   - Gate `referral-program` FAQ item behind `featureGates.referralProgram`.
   - Gate `agent-z` FAQ item (and inline Agent Z mentions) behind `featureGates.agenticWorkflows`.
   - Update `quick-start-tools` FAQ item to highlight both starting new storyboards AND extending any scene within an existing project via "Start Workflow" (`RefManager` + style inheritance).
   - Add a `hybrid-production` FAQ item under `'Features & Workflow'` explaining how live-action video import, shot detection, AI restyling, and character swap work together.
   - Conditionally adapt `pricing-plans`, `subscription-vs-payg`, `subscriber-top-up-discounts`, `project-budgets-and-roles`, `seat-limits-by-plan`, and `what-is-mcp` based on `featureGates.subscriptions` (highlighting simple Pay-As-You-Go with no subscription required, free collaborator seats per project, and MCP Partner Program `mailto:` access when `subscriptions === false`; and Maker 2 seats/project + Director unlimited seats + Director MCP access when `subscriptions === true`).
4. [`src/data/solutions.ts`](file:///d:/10z-web/src/data/solutions.ts)
   - Import `featureGates` from `./config`.
   - Replace gated `agentic-workflows` references with `hybrid-production` when `featureGates.agenticWorkflows === false`.
   - Highlight Hybrid Production (live-action plates + AI transformation) and no-cost team collaborator seats (when `subscriptions === false`) in relevant solution personas.
5. [`src/data/media.ts`](file:///d:/10z-web/src/data/media.ts)
   - Add `featureHybridProduction` media slot in Section 3 (1970s Dichromatic Split-Tone) for the Hybrid Production feature card and page hero.

#### Shared Components (`src/components/*.astro` & `src/components/**/*.astro`)
6. [`src/components/Pricing.astro`](file:///d:/10z-web/src/components/Pricing.astro)
   - Remove the forefront `Failed Generation Protection: 90% Credit Refund || Free Regen` callout card (lines 177–187) per Requirement #1.
   - Gate the Referral Program banner behind `featureGates.referralProgram`.
   - When `featureGates.subscriptions === false`:
     - Render a bold **"Simple Pay-As-You-Go — No Subscription Required"** hero showcase card (Start free with 200 credits, full access to all 18+ AI models, free team collaborator seats per project, and non-expiring top-up packs starting at $10) alongside the Top-Up Credit Packs grid (`creditPacks`).
     - Hide the Monthly/Annual billing toggle and Maker/Director subscription tier cards.
   - When `featureGates.subscriptions === true`: render the full 3-tier subscription grid (Free, Maker with 2 team seats/project, Director with unlimited team seats) + billing toggle.
7. [`src/components/pricing/CreditPacks.astro`](file:///d:/10z-web/src/components/pricing/CreditPacks.astro)
   - Remove the 4th highlight card `90% Refund || Free Regen` (lines 51–59) per Requirement #1 and replace it with **Free Team Collaborators** (when `subscriptions === false`) or **Instant Self-Serve Top-Ups** (when `subscriptions === true`).
   - When `featureGates.subscriptions === false`:
     - Hide the `With Maker (-15%)` and `With Director (-30%)` discount rows inside each pack card.
     - Replace the "Stacked Subscriber Savings" highlight card with **"No Subscription Required"** (*"Pay only for the credits you use. Every model, workflow tool, and collaborative project feature is unlocked from day one."*).
8. [`src/components/pricing/CreditCalculator.astro`](file:///d:/10z-web/src/components/pricing/CreditCalculator.astro)
   - Pass `featureGates.subscriptions` into the calculator script/UI:
     - When `subscriptions === false`: recommend the best-value **Pay-As-You-Go Top-Up Pack** (`200 Free Signup Credits`, `Starter Pack ($10)`, `Pro Pack ($25)`, `Studio Pack ($50)`, or `Volume Pack ($100)`) and hide the "Effective cost with Director (-30%)" box.
     - When `subscriptions === true`: recommend Free / Maker / Director plans and show the Director effective cost box as before.
9. [`src/components/pricing/ModelRateCard.astro`](file:///d:/10z-web/src/components/pricing/ModelRateCard.astro)
   - Remove the forefront `System Error Credit Refund Protection` callout banner (lines 18–31) per Requirement #1.
10. [`src/components/pricing/PlanComparison.astro`](file:///d:/10z-web/src/components/pricing/PlanComparison.astro)
    - Automatically reflects the filtered `comparisonSections` from `src/data/pricing.ts` (including Maker = `2 per project`, Director = `Unlimited` seats, and gated rows).
11. [`src/components/CompareTable.astro`](file:///d:/10z-web/src/components/CompareTable.astro)
    - Gate the `Failed Generation Protection` row behind `featureGates.failedGenerationProtection`.
    - Gate the `Agentic Batch Workflows (Agent Z)` row behind `featureGates.agenticWorkflows` and add a **Hybrid Production (Live-Action + AI)** row (`true, 'Partial', false, false`).
    - Gate the `Creator Referral Program` row behind `featureGates.referralProgram`.
    - Update the `Project Teams, Seat Roles & Credit Budgets` row and bottom summary cards to highlight **No-Cost Team Collaborators** and **Simple Pay-As-You-Go (No Subscription Required)** when `featureGates.subscriptions === false` (and Maker 2 seats / Director unlimited when `true`).
12. [`src/components/FAQ.astro`](file:///d:/10z-web/src/components/FAQ.astro)
    - Update `featuredIds` so gated FAQ IDs (`failed-generation-refund`, `referral-program`, `agent-z`) are replaced with active high-value FAQs (`hybrid-production`, `quick-start-tools`, `project-budgets-and-roles`) when their gates are `false`.
13. [`src/components/MCPSection.astro`](file:///d:/10z-web/src/components/MCPSection.astro)
    - When `featureGates.subscriptions === false`:
      - Top badge displays **"Partner Program Access"** instead of `"Requires Director Plan"`.
      - Primary CTA button links to `mcpPartnerConfig.mailtoUrl` (`Request Partner Access`) alongside `"Explore MCP Capabilities"`.
      - Callout note explains that MCP is currently available exclusively through the **10zebra Partner Program**.
    - When `featureGates.subscriptions === true`: displays `"Requires Director Plan"` and links to `/pricing`.
14. [`src/components/FeatureTeam.astro`](file:///d:/10z-web/src/components/FeatureTeam.astro)
    - When `featureGates.subscriptions === false`: highlight that **team collaborators are at no cost**—add co-directors, editors, and client reviewers to your projects without paying per-seat subscription fees, while keeping full per-user credit budget caps.
    - When `featureGates.subscriptions === true`: highlight **2 team seats per project on Maker and Unlimited team seats on Director** (plus free view-only client review links).
15. [`src/components/ProductTour.astro`](file:///d:/10z-web/src/components/ProductTour.astro)
    - In Tab 2 (` Direct & Swap`), replace the Agent Z prompt card with **Hybrid Production (Live-Action + AI)** when `featureGates.agenticWorkflows === false`.
16. [`src/components/Footer.astro`](file:///d:/10z-web/src/components/Footer.astro)
    - Gate `/features/agentic-workflows` behind `featureGates.agenticWorkflows`, gate `/features/referral-program` behind `featureGates.referralProgram`, and add **Hybrid Production** (`/features/hybrid-production`) to the Features column.
17. [`src/components/features/QuickStartToolsExplorer.astro`](file:///d:/10z-web/src/components/features/QuickStartToolsExplorer.astro)
    - Add a prominent **Workflow Mode Switcher / Dual-Context Showcase** at the top of the explorer (`Mode 1: Start New Storyboard (/new)` vs. `Mode 2: Extend Any Scene In-Project ("Start Workflow")`).
    - Show how launching a tool via **"Start Workflow"** on an existing scene (`recordable-shot-group.js` -> `ToolDialog`) automatically locks to the project's active visual style (`storyStyle`) & aspect ratio (`is_vertical`), swaps the file uploader for the in-project **Reference Manager (`<RefManager />`)** to pick existing character/location takes, and inserts the newly generated shots as the very next scene in the timeline.
18. [`src/components/features/CharacterSwapMockup.astro`](file:///d:/10z-web/src/components/features/CharacterSwapMockup.astro)
    - Gate the "Or Ask Agent Z to Batch-Swap" footer strip behind `featureGates.agenticWorkflows` (replacing it with a **Hybrid Production: Swap onto Live-Action Plates** tip when `false`).
19. [`src/components/features/ProjectBudgetMockup.astro`](file:///d:/10z-web/src/components/features/ProjectBudgetMockup.astro)
    - Update the header/footer badge to highlight **Free Collaborator Seats ($0/seat)** when `featureGates.subscriptions === false`, and **Maker: 2 Seats/Project · Director: Unlimited Seats** when `featureGates.subscriptions === true`.

#### Pages (`src/pages/**/*.astro` & SEO endpoints)
20. [`src/pages/features.astro`](file:///d:/10z-web/src/pages/features.astro)
    - In the Bento Feature Mosaic & Interactive Demo Tabs: when `featureGates.agenticWorkflows === false`, replace the `agenticWorkflows` slot with `hybridProduction` (`HybridProductionMockup.astro`).
    - In the 6-Step End-to-End Pipeline: update Step 01 (`Quick Start Tools`) to note launching new projects OR extending any scene in-project; update Step 03 to feature **Hybrid Production & Multi-Model Editing** when `agenticWorkflows === false`.
    - In the `ShiftList` comparison table: remove row #7 (`Failed Generation Recovery: 90% credit refund || free regen`) per Requirement #1, and replace row #4 (`Batch Continuity & Variations` / Agent Z) with **Hybrid Production (Live-Action + AI)** and **Scene Extension Workflows** when `agenticWorkflows === false`.
21. [`src/pages/features/quick-start-tools.astro`](file:///d:/10z-web/src/pages/features/quick-start-tools.astro)
    - Update hero subtitle, narrative overview, 3-step workflow, and deep-dive sections to give equal weight to:
      1. **Starting a New Storyboard** from a blank canvas (`/t/from-script`, `/t/three-acts`, etc.).
      2. **Extending Any Scene Inside a Project** via the in-scene **"Start Workflow"** button (`ToolDialog`)—highlighting automatic style & aspect-ratio inheritance, selecting existing project shots via `RefManager`, and seamless scene insertion right after the active scene.
22. [`src/pages/features/project-management.astro`](file:///d:/10z-web/src/pages/features/project-management.astro)
    - Conditionally update copy for `featureGates.subscriptions`:
      - When `false`: emphasize **Collaborate at No Extra Cost** (invite team collaborators and client reviewers to your projects for free; only pay for the generation credits your project consumes, capped by per-member credit budgets).
      - When `true`: emphasize **Maker (2 team seats per project) & Director (Unlimited team seats per project)** + free view-only client links.
23. [`src/pages/features/team-management.astro`](file:///d:/10z-web/src/pages/features/team-management.astro)
    - Same conditional update as `project-management.astro`: highlight free project collaborator seats when `subscriptions === false`, and Maker (2 team seats per project) / Director (unlimited team seats) when `subscriptions === true`.
24. [`src/pages/features/character-swap.astro`](file:///d:/10z-web/src/pages/features/character-swap.astro)
    - Gate the "Manual Timeline Drop vs. Agent Z Batch Swap" section behind `featureGates.agenticWorkflows`, replacing it when `false` with **"AI Storyboard Takes vs. Live-Action Video Plates (Hybrid Production)"** showing how Character Swap works on both generated shots and uploaded real-actor footage.
25. [`src/pages/features/multi-reference-edit.astro`](file:///d:/10z-web/src/pages/features/multi-reference-edit.astro)
    - Gate `relatedSlugs` reference to `agentic-workflows` (replace with `hybrid-production` when `agenticWorkflows === false`).
26. [`src/pages/features/text-to-sequence.astro`](file:///d:/10z-web/src/pages/features/text-to-sequence.astro)
    - Gate `relatedSlugs` reference to `agentic-workflows` (replace with `hybrid-production` when `agenticWorkflows === false`).
27. [`src/pages/features/agentic-workflows.astro`](file:///d:/10z-web/src/pages/features/agentic-workflows.astro)
    - Wrap page content with `featureGates.agenticWorkflows`: when `false`, render `PlaceholderPage` ("Agentic Workflows — Coming Soon") with `noindex` or redirect notice so direct links don't expose unlaunched features.
28. [`src/pages/features/referral-program.astro`](file:///d:/10z-web/src/pages/features/referral-program.astro) & [`src/pages/referral-program.astro`](file:///d:/10z-web/src/pages/referral-program.astro)
    - Wrap page content with `featureGates.referralProgram`: when `false`, render `PlaceholderPage` ("10zebra Partner & Referral Program — Coming Soon").
29. [`src/pages/pricing.astro`](file:///d:/10z-web/src/pages/pricing.astro)
    - Update SEO title/description & JSON-LD schema conditionally on `featureGates.subscriptions` (boasting simple Pay-As-You-Go pricing with 200 free credits and non-expiring top-up packs when `false`).
    - Hide the `#comparison` (`Compare Plans` / `PlanComparison.astro`) section and sub-nav pill when `featureGates.subscriptions === false`.
30. [`src/pages/mcp.astro`](file:///d:/10z-web/src/pages/mcp.astro)
    - Remove `90% credit refund || free regen` from the plan callout perks list (line 308) per Requirement #1.
    - Conditionally render the Hero badge, Hero CTA, Plan Gate Callout Banner, and Quick Setup Step 1 based on `featureGates.subscriptions`:
      - When `false`: highlight **"Currently Restricted to the 10zebra Partner Program"** with the `mailto:partners@10zebra.com?subject=10zebra%20MCP%20Partner%20Program%20Access%20Request` CTA button (`Request Partner Access`).
      - When `true`: highlight **"Exclusively on the Director Plan ($79/mo)"** (with Unlimited team seats per project, 5,500 monthly credits, and 30% off top-up packs).
31. [`src/pages/models.astro`](file:///d:/10z-web/src/pages/models.astro)
    - In the Quick Stats Strip (lines 76–79), replace `90% / Refund || Free Regen` with `Up to 4K / Native Video & Image Output`.
32. [`src/pages/about.astro`](file:///d:/10z-web/src/pages/about.astro)
    - In the Key Stats Row (lines 151–154), replace `90% / Refund || Free Regen` with `No Lock-In / Simple Pay-As-You-Go` (or `4 Roles / Unified Studio Pipeline`).
    - In the "For Film Producers" card (line 311), remove the `1-click 90% refund or free regen button` sentence and highlight zero-cost collaborator seats & live credit tracking.
33. [`src/pages/sitemap.xml.ts`](file:///d:/10z-web/src/pages/sitemap.xml.ts)
    - Import `featureGates` from `../data/config`.
    - Automatically include `/features/hybrid-production` (via `featureEntries`) and exclude `/referral-program`, `/features/referral-program`, and `/features/agentic-workflows` when their gates are `false`.
34. [`public/llms.txt`](file:///d:/10z-web/public/llms.txt)
    - Update the static LLM guide to reflect the current active state: remove `90% refund` highlights, document **Hybrid Production**, document **Quick Start & Scene Extension Workflows**, reflect **Simple Pay-As-You-Go Pricing (No Subscription Required)** and **Free Project Collaborator Seats**, and note that **MCP Server** access is available via the **10zebra Partner Program** (`mailto:partners@10zebra.com?subject=10zebra%20MCP%20Partner%20Program%20Access%20Request`).
35. [`.agents/FILE_MAP.md`](file:///d:/10z-web/.agents/FILE_MAP.md)
    - Update the file map documentation to register `src/data/config.ts`, `src/pages/features/hybrid-production.astro`, and `src/components/features/HybridProductionMockup.astro`.

---

## 3. Data Model & Config Gate Design (`src/data/config.ts`)

```ts
export interface FeatureGates {
  /**
   * 5a & 5e & 2: Subscription tiers (Maker & Director), annual billing toggle, and subscriber top-up discounts.
   * - When `false`: Site boasts a simple Pay-As-You-Go model (no subscription required), free team collaborator seats per project, and MCP access via the 10zebra Partner Program.
   * - When `true`: Restores Free / Maker ($29) / Director ($79) subscription tiers, Maker (2 team seats/project) & Director (Unlimited team seats), subscriber top-up discounts, and Director-gated MCP access.
   */
  subscriptions: boolean;

  /**
   * 1 & 5b: Failed Generation Protection (90% credit refund || free regen).
   * - Forefront site-wide callouts are permanently removed.
   * - When `false`: Coming soon — hidden from FAQs and comparison tables as well.
   * - When `true`: Shown ONLY in main FAQs and comparison charts.
   */
  failedGenerationProtection: boolean;

  /**
   * 5c: Creator Referral Program (3% lifetime commission via Tolt).
   * - When `false`: Coming soon — hidden from navigation, features catalog, footer, pricing, and FAQs.
   * - When `true`: Restores Referral Program across all surfaces.
   */
  referralProgram: boolean;

  /**
   * 5d: Agentic Workflows (Agent Z conversational batch assistant & Dry Run preview).
   * - When `false`: Hidden from navigation, features catalog, product tour, mockups, and FAQs.
   * - When `true`: Restores Agent Z across all surfaces.
   */
  agenticWorkflows: boolean;
}

export const featureGates: FeatureGates = {
  subscriptions: false,
  failedGenerationProtection: false,
  referralProgram: false,
  agenticWorkflows: false,
};

export const mcpPartnerConfig = {
  email: 'partners@10zebra.com',
  subject: '10zebra MCP Partner Program Access Request',
  mailtoUrl:
    'mailto:partners@10zebra.com?subject=10zebra%20MCP%20Partner%20Program%20Access%20Request',
  badgeLabel: 'Partner Program Access',
  ctaLabel: 'Request Partner Access',
};
```

---

## 4. Verification Steps

1. **Build & Type Check (`astro build`):**
   - Run `npm run build` inside the sandbox to verify zero TypeScript, Astro template, or broken link errors across all static routes.
2. **Gate State Inspection (`false` vs. `true`):**
   - Verify with default gates (`all false`):
     - Zero occurrences of `90%` refund/regen anywhere in the rendered HTML output (`dist/`).
     - Zero occurrences of `Agent Z` or `Referral Program` in active navigation, feature grids, or FAQs.
     - `/pricing` and homepage `Pricing.astro` boast Simple Pay-As-You-Go (no subscription required) with top-up credit packs, calculator, and model rate card.
     - `/mcp` and `MCPSection.astro` highlight the 10zebra Partner Program with the pre-filled `mailto:` link.
     - `/features/hybrid-production` renders cleanly and is linked from `/features`, `Footer.astro`, and `ProductTour.astro`.
     - `/features/quick-start-tools` and `QuickStartToolsExplorer.astro` clearly demonstrate both starting a new storyboard and extending any scene within an existing project (`Start Workflow` + `RefManager`).
     - Project Teams & Budgets pages highlight no-cost team collaborators.
   - Temporarily test flipping `featureGates` booleans to `true` in a build check to verify that Maker (2 seats/project) + Director (unlimited seats), Director-gated MCP, and FAQ-only/table-only 90% protection compile cleanly without regressions, then restore all 4 flags to `false`.

