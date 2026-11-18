# Implementation Plan: Update Testimonials with Real Customer Quotes

**Date:** 2026-11-18  
**Status:** Completed

---

## 1. Goal & Summary of Requested Changes

Replace all placeholder customer testimonials (`Jamie L.`, `Dana V.`, `Marcus R.`, `Sara K.`) with the two real testimonials currently available, and hide redundant testimonial blocks on pages where repeating the same two quotes would be redundant until additional testimonials are collected:

1. **Monica Monique** — `Founder @ Chain Reaction`
   - Quote: `"Of course humans need to storyboard. That's how you get a better story"`
2. **Rebecca Scott** — `Blood and Whiskey Films`
   - Quote: `"relatively self-explanatory, excellent character recognition, decent actual dialogue … quite beautiful graphics and visuals overall"`

---

## 2. Files to Be Modified

| File | Action | Details |
| :--- | :--- | :--- |
| `src/components/SocialProof.astro` | **Modify** | Replace the 3 placeholder testimonials with the 2 real testimonials (**Monica Monique — Founder @ Chain Reaction** and **Rebecca Scott — Blood and Whiskey Films**), change the grid layout from `md:grid-cols-3` to a centered 2-column grid (`grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto`), and format attribution cleanly with or without a separate job title. |
| `src/data/solutions.ts` | **Modify** | Make `testimonial` optional (`testimonial?: { quote: string; name: string; title?: string; company: string }`) on `Solution`. Set **Monica Monique** (`Founder @ Chain Reaction`) on `creative-directors` and **Rebecca Scott** (`Blood and Whiskey Films`) on `film-producers`. Omit `testimonial` on `agencies` and `content-creators` so the testimonial block is hidden on those two pages rather than duplicating the same quotes. |
| `src/pages/solutions/[slug].astro` | **Modify** | Conditionally render the `<!-- ================= TESTIMONIAL ================= -->` section only when `s.testimonial` is defined (`{s.testimonial && ( ... )}`), and format the attribution line cleanly (`{s.testimonial.title ? `${s.testimonial.title} @ ${s.testimonial.company}` : s.testimonial.company}`). |
| `.agents/FILE_MAP.md` | **Modify** | Note optional `testimonial?` on `Solution` in `src/data/solutions.ts`. |

---

## 3. UI & SEO/AEO Impact

- **Homepage (`/` via `SocialProof.astro`):** Displays a balanced 2-card testimonial grid featuring Monica Monique and Rebecca Scott.
- **Solution Pages (`/solutions/[slug]`):**
  - `/solutions/creative-directors`: Features Monica Monique (`Founder @ Chain Reaction`).
  - `/solutions/film-producers`: Features Rebecca Scott (`Blood and Whiskey Films`).
  - `/solutions/agencies` & `/solutions/content-creators`: Hides the testimonial block cleanly until additional persona-specific testimonials are added in `src/data/solutions.ts`.
- **No Route Changes:** `sitemap.xml.ts` and `llms.txt` remain valid.

---

## 4. Verification Steps

1. Search the codebase to confirm zero occurrences of placeholder testimonial names (`Jamie L.`, `Marcus R.`, `Sara K.`, `Dana V.`, `Company Name`, `Agency Name`, `Channel Name`, `Production Company Name`) remain.
2. Verify `SocialProof.astro`, `src/data/solutions.ts`, and `src/pages/solutions/[slug].astro` render cleanly with both `title + company` (`Founder @ Chain Reaction`) and `company`-only (`Blood and Whiskey Films`) attributions.

