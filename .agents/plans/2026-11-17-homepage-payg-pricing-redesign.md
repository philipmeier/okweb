# Implementation Plan: Homepage "Pay-As-You-Go" Pricing Section Redesign

**Date:** 2026-11-17  
**Status:** Completed

---

## 1. Goal & Summary of Requested Changes

After gating the subscription tiers behind `featureGates.subscriptions = false`, the Pay-As-You-Go layout in `src/components/Pricing.astro` (rendered on the homepage `/` and at the top of `/pricing`) suffered from several layout and content issues visible in the screenshot:
1. **Huge Empty Vertical Dead Space:** The 3 credit pack cards (`Influencer`, `Director`, `Producer`) were placed in a 3-column grid inside `lg:col-span-7` with `flex-1`, stretching narrow ~210px-wide cards to ~480px tall and leaving ~300px of blank black void in the middle of each card.
2. **Cramped & Overflowing Typography:** Squeezing 3 columns into `lg:col-span-7` caused `$140` on the `Producer` card (`8,000 credits $140`) to overflow outside the right border of the card, `$42` to collide with `2,400 credits`, and `$0.0175 / credit` to wrap awkwardly across lines.
3. **Stale "$10" Copy:** The left "Pay-As-You-Go Studio" card still displayed `"Top-Ups From $10"` hardcoded in `Pricing.astro`, whereas the updated entry pack (`Influencer`) is `$14` (`800 credits`).
4. **Hardcoded PAYG Copy in Component:** The Pay-As-You-Go Studio card copy was hardcoded in `src/components/Pricing.astro` rather than centralized in `src/data/pricing.ts`.

### Solution Overview
- **Centralize PAYG Showcase Data in `src/data/pricing.ts`:** Add a `paygStudioCard` configuration object in `src/data/pricing.ts` (dynamically referencing `creditPacks[0].basePrice` so `"Top-Ups From $14"` stays in sync automatically) alongside `plans`, `creditPacks`, and `modelRates`.
- **Redesign the Right Column (`lg:col-span-7`) in `src/components/Pricing.astro` when `featureGates.subscriptions === false`:**
  - Replace the 3 skinny vertical columns with **3 full-width horizontal Credit Pack tier cards** stacked vertically (`Influencer — 800 credits / $14`, `Director [Most Popular] — 2,400 credits / $42`, `Producer — 8,000 credits / $140`). Each horizontal card gives ample room for the pack name, `Never expires` badge, credit count, estimated Kling/Veo take counts, ideal use case, price (`$14`, `$42`, `$140`), `$0.0175 / credit` unit rate, and a direct CTA pill without any text wrapping or border overflow.
  - Below the 3 horizontal pack cards, add a **"What Your Credits Create — Sample Model Rates"** panel (driven by `modelRates` / `toolRates` from `src/data/pricing.ts`) displaying 6 key generation costs (`Kling 3.0: 40 cr`, `Veo 3 Fast: 20 cr`, `Runway Gen-4: 35 cr`, `OpenAI Sora: 50 cr`, `Grok Video: 10 cr`, `Character Swap: 15 cr`) and a link to the full Rate Card & Credit Estimator (`/pricing/index.html#calculator`). This naturally balances the height of the left and right columns with high-value information and zero empty space.
- **Preserve Instant Subscription Switchability:** Keep the `featureGates.subscriptions` branch in `src/components/Pricing.astro` intact so flipping `featureGates.subscriptions: true` in `src/data/config.ts` immediately restores the 3-tier subscription layout (`Pay-As-You-Go`, `Maker`, `Director`) with Monthly/Annual billing toggles and subscriber discounts.

---

## 2. Files to Be Modified

| File | Action | Details |
| :--- | :--- | :--- |
| `src/data/pricing.ts` | **Modify** | Export `paygStudioCard` (kicker, title, description, starter price, dynamic `topUpsFrom` derived from `creditPacks[0].basePrice`, feature bullets, CTA) and `featuredModelRates` helper/slice for the homepage rate preview. |
| `src/components/Pricing.astro` | **Modify** | Update the `!showSubscriptions` (`featureGates.subscriptions === false`) view to consume `paygStudioCard`, render the 3 `creditPacks` as sleek horizontal cards with no text clipping or dead vertical space, and render the compact "What Your Credits Create" model rate preview box below them. |
| `.agents/FILE_MAP.md` | **Modify** | Document the `paygStudioCard` export in `src/data/pricing.ts`. |

---

## 3. UI, Data & SEO/AEO Impact

- **UI Impact:**
  - Eliminates the ~300px empty black void inside the 3 credit pack cards on the homepage and `/pricing` hero.
  - Fixes the `$140` / `$42` horizontal text overflow and `$0.0175 / credit` line-wrapping issue.
  - Updates `"Top-Ups From $10"` to `"Top-Ups From $14"` (dynamically pulled from `creditPacks[0].basePrice`).
  - Surfaces concrete per-take credit costs (`Kling 3.0`, `Veo 3 Fast`, `Runway Gen-4`, `Sora`, `Grok`, `Character Swap`) right alongside the credit packs so visitors immediately see what 800, 2,400, and 8,000 credits buy.
- **Subscription Readiness:**
  - Flipping `featureGates.subscriptions` to `true` in `src/data/config.ts` requires zero template changes to switch back to the `Pay-As-You-Go` / `Maker` / `Director` 3-column subscription cards.
- **SEO / AEO Impact:**
  - No route changes (`sitemap.xml.ts` and `llms.txt` remain valid). Pricing schema in `src/pages/pricing.astro` already reflects `$14`, `$42`, and `$140`.

---

## 4. Verification Steps

1. Inspect `src/data/pricing.ts` and `src/components/Pricing.astro` to verify all data bindings (`paygStudioCard`, `creditPacks`, `modelRates`) and responsive Tailwind classes.
2. Verify that no hardcoded `"$10"` top-up references remain in the codebase.
3. Verify that both `featureGates.subscriptions = false` and `featureGates.subscriptions = true` branches remain clean and type-safe.

