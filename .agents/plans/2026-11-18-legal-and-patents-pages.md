# Implementation Plan: Privacy Policy, Terms and Conditions, and Patents Pages

**Date:** 2026-11-18  
**Status:** Completed

---

## 1. Goal & Summary of Requested Changes

Create three new pages—**Privacy Policy** (`/privacy-policy`), **Terms and Conditions** (`/terms-and-conditions`), and **Patents** (`/patents`)—using the exact copy from the live 10zebra pages (`https://www.10zebra.com/privacy-policy`, `https://www.10zebra.com/terms-and-conditions`, and `https://www.10zebra.com/patents`), and add links to all three in the site footer (`src/components/layout/Footer.astro`), XML sitemap (`src/pages/sitemap.xml.ts`), and AEO index (`public/llms.txt`).

---

## 2. Files to Be Created or Modified

| File | Action | Details |
| :--- | :--- | :--- |
| `src/pages/privacy-policy.astro` | **Create** | Full 10z, LLC **Privacy Policy** (Sections 1–12, Last updated: February, 2023) plus the full **CCPA Privacy Notice** (`#ccpa`, Sections 1–6 including Categories A–K personal information disclosures, Last updated: February 3, 2023), formatted with clean semantic headings, anchor navigation, and Schema.org `WebPage` + `BreadcrumbList` JSON-LD. |
| `src/pages/terms-and-conditions.astro` | **Create** | Full 10z, LLC **Terms & Conditions** (introductory binding notice + Sections 1–22 covering 10z Services, eligibility, account security, User Contributions, Use Policy, monitoring/termination, feedback, third-party services, warranties, liability, indemnification, IP rights, confidentiality, export laws, California governing law, and contact details, Last modified: February, 2023). Internal Privacy Policy links resolve to `/privacy-policy/index.html`. |
| `src/pages/patents.astro` | **Create** | Full 10z, LLC **Patents** page with the official meta description, the italicized artist-advocacy welcome notice (online generation patent coverage, MCP builder inquiry, CAISI genAI Interoperability Standards and Artist Advocacy, film & television licensing via `hello@10zebra.com`), and the **Patents & Intellectual Property** 35 U.S.C. § 287(a) notice. |
| `src/components/layout/Footer.astro` | **Modify** | Add links to `Patents` (`/patents/index.html`), `Privacy Policy` (`/privacy-policy/index.html`), and `Terms and Conditions` (`/terms-and-conditions/index.html`) in the footer navigation and the bottom copyright/legal bar. |
| `src/pages/sitemap.xml.ts` | **Modify** | Add `/patents`, `/privacy-policy`, and `/terms-and-conditions` to `staticPages`. |
| `public/llms.txt` | **Modify** | Add links to `/patents`, `/privacy-policy`, and `/terms-and-conditions` under Primary Documentation & Pages. |
| `.agents/FILE_MAP.md` | **Modify** | Document the 3 new pages under Section 4 (`Pages & Routes`). |

---

## 3. UI, Layout & SEO/AEO Details

- **Design & Readability:**
  - Each page uses `Layout.astro`, `Header.astro`, and `Footer.astro` with a consistent legal/IP header bar, top tab switcher (`Privacy Policy` · `Terms & Conditions` · `Patents`), glassmorphic reading container (`max-w-4xl mx-auto`), structured section headings, and clean list/paragraph typography while preserving 100% of the source legal and patent copy.
  - On `/privacy-policy`, the internal link to the CCPA Privacy Notice (`https://10zebra.com/ccpa`) is anchored to `#ccpa` so clicking it scrolls smoothly to the embedded CCPA Privacy Notice section on the same page.
- **SEO & Structured Data:**
  - Each page includes canonical URL (`https://10zebra.com/privacy-policy`, `https://10zebra.com/terms-and-conditions`, `https://10zebra.com/patents`), descriptive `<title>` and `<meta name="description">`, and `WebPage` + `BreadcrumbList` JSON-LD.

---

## 4. Verification Steps

1. Verify that all 3 new routes (`src/pages/privacy-policy.astro`, `src/pages/terms-and-conditions.astro`, `src/pages/patents.astro`) contain the complete, unabridged copy from the live URLs.
2. Verify that `src/components/layout/Footer.astro` links cleanly to `/privacy-policy/index.html`, `/terms-and-conditions/index.html`, and `/patents/index.html`.
3. Verify that `src/pages/sitemap.xml.ts`, `public/llms.txt`, and `.agents/FILE_MAP.md` include all three new routes.

