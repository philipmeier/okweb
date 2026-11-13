# Implementation Plan: Update Credit Packs (Influencer, Director, Producer)

**Date:** 2026-11-12  
**Goal:** Update all credit pack definitions, UI grids, interactive calculator thresholds, FAQs, JSON-LD structured data, and documentation across `10z-web` to reflect the three official credit packs:
- **Influencer:** `800` credits / `$14` (`$0.0175 / credit`)
- **Director:** `2,400` credits / `$42` (`$0.0175 / credit`)
- **Producer:** `8,000` credits / `$140` (`$0.0175 / credit`)

---

## 1. Files to Be Modified

| File | Summary of Changes |
| :--- | :--- |
| [`src/data/pricing.ts`](file:///d:/10z-web/src/data/pricing.ts) | Replace the 4 legacy `creditPacks` (`Starter Pack`, `Pro Pack`, `Studio Pack`, `Volume Pack`) with the 3 new packs (`Influencer`, `Director`, `Producer`) and update `pricingFaqs` references (`starting at $14`). |
| [`src/components/Pricing.astro`](file:///d:/10z-web/src/components/Pricing.astro) | Update the Pay-As-You-Go right-hand credit packs showcase from a 2×2 grid (`sm:grid-cols-2`) to a balanced 3-pack layout (`sm:grid-cols-3`) and change the badge label on the featured pack to `Most Popular`. |
| [`src/components/pricing/CreditPacks.astro`](file:///d:/10z-web/src/components/pricing/CreditPacks.astro) | Change the packs grid from `lg:grid-cols-4` to `md:grid-cols-3` so the 3 packs (`Influencer`, `Director`, `Producer`) span evenly across the row. |
| [`src/components/pricing/CreditCalculator.astro`](file:///d:/10z-web/src/components/pricing/CreditCalculator.astro) | Update default static copy and `recalculate()` tiers to recommend **Influencer (`800` credits / `$14`)**, **Director (`2,400` credits / `$42`)**, and **Producer (`8,000` credits / `$140`)** based on estimated credit need. |
| [`src/data/faqs.ts`](file:///d:/10z-web/src/data/faqs.ts) | Update `subscription-vs-payg` and `subscriber-top-up-discounts` FAQ answers to reference the new pack names and prices (`$14` Influencer Pack / `800` credits up to `$140` Producer Pack / `8,000` credits). |
| [`src/pages/pricing.astro`](file:///d:/10z-web/src/pages/pricing.astro) | Add the 3 credit pack offers (`Influencer`, `Director`, `Producer`) to the Schema.org `Product` `offers` JSON-LD array when `subscriptions` is `false`. |
| [`public/llms.txt`](file:///d:/10z-web/public/llms.txt) | Document the 3 non-expiring credit packs (`Influencer: 800 credits / $14`, `Director: 2,400 credits / $42`, `Producer: 8,000 credits / $140`). |
| [`.agents/FILE_MAP.md`](file:///d:/10z-web/.agents/FILE_MAP.md) | Update the `src/data/pricing.ts` and `src/components/pricing/CreditPacks.astro` descriptions to list `Influencer`, `Director`, and `Producer`. |

---

## 2. Data Model Updates ([`src/data/pricing.ts`](file:///d:/10z-web/src/data/pricing.ts))

```ts
export const creditPacks: CreditPack[] = [
  {
    name: 'Influencer',
    credits: '800',
    basePrice: '$14',
    unitPrice: '$0.0175 / credit',
    makerPrice: '$11.90',
    directorPrice: '$9.80',
    approx: 'Approx. 20 Kling shots or 40 Veo 3 Fast clips',
    idealFor: 'Social shorts, quick scenes & solo creators',
    popular: false,
  },
  {
    name: 'Director',
    credits: '2,400',
    basePrice: '$42',
    unitPrice: '$0.0175 / credit',
    makerPrice: '$35.70',
    directorPrice: '$29.40',
    approx: 'Approx. 60 Kling shots or 120 Veo 3 Fast clips',
    idealFor: 'Multi-scene storyboards & commercial spots',
    popular: true,
  },
  {
    name: 'Producer',
    credits: '8,000',
    basePrice: '$140',
    unitPrice: '$0.0175 / credit',
    makerPrice: '$119.00',
    directorPrice: '$98.00',
    approx: 'Approx. 200 Kling shots or 400 Veo 3 Fast clips',
    idealFor: 'Full agency productions & team project pools',
    popular: false,
  },
];
```

---

## 3. UI, Calculator & SEO/AEO Updates

1. **Pay-As-You-Go Showcase ([`src/components/Pricing.astro`](file:///d:/10z-web/src/components/Pricing.astro)) & Top-Up Section ([`src/components/pricing/CreditPacks.astro`](file:///d:/10z-web/src/components/pricing/CreditPacks.astro)):**
   - Switch from 4-card grids to 3-card grids so **Influencer (`800` / `$14`)**, **Director (`2,400` / `$42`)**, and **Producer (`8,000` / `$140`)** align cleanly on desktop and tablet breakpoints.
2. **Production Credit Estimator ([`src/components/pricing/CreditCalculator.astro`](file:///d:/10z-web/src/components/pricing/CreditCalculator.astro)):**
   - When `featureGates.subscriptions === false`:
     - `<= 1,000` credits (`200` free + `800` Influencer): recommends **Influencer Pack (`$14`)** — `800 non-expiring credits + 200 free signup credits`.
     - `<= 2,600` credits (`200` free + `2,400` Director): recommends **Director Pack (`$42`)** — `2,400 non-expiring credits`.
     - `<= 8,200` credits (`200` free + `8,000` Producer): recommends **Producer Pack (`$140`)** — `8,000 non-expiring credits`.
     - `> 8,200` credits: recommends **Multiple Producer Packs / Custom Volume**.
3. **FAQs, JSON-LD & `llms.txt`:**
   - Update all references to old pack names/prices (`$10 Starter Pack`, `$25 Pro Pack`, `$50 Studio Pack`, `$100 Volume Pack`) in [`src/data/pricing.ts`](file:///d:/10z-web/src/data/pricing.ts), [`src/data/faqs.ts`](file:///d:/10z-web/src/data/faqs.ts), [`src/pages/pricing.astro`](file:///d:/10z-web/src/pages/pricing.astro), and [`public/llms.txt`](file:///d:/10z-web/public/llms.txt).

---

## 4. Verification Steps
1. Grep across `src/` and `public/` to verify zero remaining references to the old pack names (`Starter Pack`, `Pro Pack`, `Studio Pack`, `Volume Pack`) or old pack prices (`$10`, `$25`, `$50`, `$100` for credit packs).
2. Verify all 3 credit packs render cleanly across [`Pricing.astro`](file:///d:/10z-web/src/components/Pricing.astro), [`CreditPacks.astro`](file:///d:/10z-web/src/components/pricing/CreditPacks.astro), and [`CreditCalculator.astro`](file:///d:/10z-web/src/components/pricing/CreditCalculator.astro).

