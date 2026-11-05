# Implementation Plan: Callouts & Comparison Table Updates for Agent Z, Referral Program & 90% Refund Policy

**Date:** 2026-11-04  
**Status:** Approved & Implemented  

---

## 1. Audit of What Was Updated vs. What Was Missed

### Already Updated in Previous Step:
- `src/data/features.ts`: Added `agenticWorkflows` (Agent Z) and `referralProgram` (Tolt 3% lifetime) to the feature catalog.
- `src/pages/features.astro`: Added `AgenticWorkflowsMockup` tab and added `Agentic Batch Workflows` + `Failed Generation Recovery` rows to the `/features` `ShiftList`.
- `src/data/pricing.ts`: Updated the `Failed generation protection` row in `comparisonSections` to `✓ 90% refund || free regen`.

### Missing Callouts & Table Comparison Items Identified:
1. **Homepage Comparison Table (`src/components/CompareTable.astro`):**
   - Missing **Agent Z Batch Workflows** row (`Batch create, convert, replace characters, regen & upscale`).
   - Missing **Agent Z Dry Run Analysis** row (`Creates execution plan, shows credit costs & requests approval`).
   - Missing **Failed Generation Protection** row (`1-click 90% refund || free regen button on failed takes`).
   - Missing **Referral Program** row (`3% lifetime payout via Tolt on credits & subscriptions`).
2. **Pricing Plan Comparison Matrix & Rate Cards (`src/data/pricing.ts` → `PlanComparison.astro` & `Pricing.astro`):**
   - `comparisonSections` is missing rows for:
     - **Agent Z Batch Workflows** (batch create, convert, replace characters, regen, upscale)
     - **Agent Z Dry Run Analysis** (execution plan, credit cost preview & approval gate)
     - **Referral Program (Tolt Integration)** (`3% lifetime payout on referred credits & subscriptions` across all tiers)
   - `plans` feature lists and `toolRates` still reference `10z Agent Character Swap` instead of `Agent Z Character Swap & Batch Workflows`.
3. **Pricing Page Callouts (`src/components/Pricing.astro` & `src/components/pricing/CreditPacks.astro`):**
   - Missing a dedicated **Referral Program Callout Banner** on `/pricing` highlighting the Tolt referral code and 3% lifetime payout on credits and subscriptions.
   - Missing a **90% Refund || Free Regen Guarantee** callout badge/card in `CreditPacks.astro` / `Pricing.astro` explaining the 1-click refund/retry button (after direct error or 30m silent timeout).
4. **Features Hub ShiftList (`src/pages/features.astro`):**
   - Missing a comparison row for **Creator & Studio Referral Program** (`3% lifetime payout on credit packs & subscriptions via Tolt`).
5. **Solutions Feature Matrix (`src/data/solutions.ts`):**
   - `agenticWorkflows` is not yet linked in `solutions.ts` `features` arrays (which drives the tool matrix on `/solutions`, the tool cards on `/solutions/[slug]`, and the "Who Uses It" section on `/features/agentic-workflows`).

---

## 2. Files to Modify

1. [`src/components/CompareTable.astro`](file:///d:/10z-web/src/components/CompareTable.astro)
   - Under **Production Pipeline**, add:
     - `Agent Z batch workflows (create, convert, replace characters, regen, upscale)` → `✓ With Dry Run cost approval`
   - Under **Pricing**, add:
     - `Failed generation protection (1-click refund or retry)` → `✓ 90% refund || free regen`
     - `Referral program (earn on credits & subscriptions)` → `✓ 3% lifetime payout (Tolt)`
2. [`src/data/pricing.ts`](file:///d:/10z-web/src/data/pricing.ts)
   - Update `plans` bullets and `toolRates` to reference **Agent Z** (`Agent Z Character Swap & batch workflows`).
   - In `comparisonSections`:
     - Add `Agent Z batch workflows (create, convert, replace, regen, upscale)`
     - Add `Agent Z Dry Run analysis (plan, credit cost preview & approval)`
     - Add `Tolt Referral Program (3% lifetime payout on credits & plans)`
3. [`src/components/Pricing.astro`](file:///d:/10z-web/src/components/Pricing.astro) & [`src/components/pricing/CreditPacks.astro`](file:///d:/10z-web/src/components/pricing/CreditPacks.astro)
   - Add a **90% Refund || Free Regen** highlight card/callout and a **3% Lifetime Referral Program (Powered by Tolt)** callout banner linking to `/features/referral-program`.
4. [`src/pages/features.astro`](file:///d:/10z-web/src/pages/features.astro)
   - Add `Creator & Studio Referrals` (`3% lifetime payout on credit packs & subscriptions via Tolt`) to `comparisonData`.
5. [`src/data/solutions.ts`](file:///d:/10z-web/src/data/solutions.ts) & [`src/components/ProductTour.astro`](file:///d:/10z-web/src/components/ProductTour.astro)
   - Include `agenticWorkflows` in `solutions.ts` so `/solutions` matrix and `/features/agentic-workflows` ("Who Uses It") cross-link properly, and add an Agent Z chip/callout in `ProductTour.astro`.

---

## 3. Verification Steps

1. Inspect `CompareTable.astro`, `PlanComparison.astro` (`/pricing#comparison`), and `features.astro` (`/features`) to confirm all three updates (Agent Z + Dry Run, Referral Program 3% lifetime via Tolt, and 90% Refund || Free Regen) appear in every comparison table and callout section.

