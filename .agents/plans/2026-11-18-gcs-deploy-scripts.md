# Implementation Plan: Dev & Prod Google Cloud Storage Deploy Scripts

**Date:** 2026-11-18  
**Status:** Completed

---

## 1. Goal & Summary of Requested Changes

Create deployment scripts for **Dev** and **Prod** that run the Astro production build (`astro build`) and transfer all built assets from `dist/` to the corresponding Google Cloud Storage bucket using `gcloud storage rsync`:

- **Dev Environment:**
  - **Bucket:** `gs://mid-10z-dev-2`
  - **Site URL:** `https://mid-10z-dev-2.storage.googleapis.com`
- **Prod Environment:**
  - **Bucket:** `gs://mid-10z-dev-1`
  - **Site URL:** `https://mid-10z-dev-1.storage.googleapis.com`

---

## 2. Files to Be Created or Modified

| File | Action | Details |
| :--- | :--- | :--- |
| `scripts/deploy.mjs` | **Create** | Node.js deployment runner supporting `dev` (`gs://mid-10z-dev-2`) and `prod` (`gs://mid-10z-dev-1`) targets (plus optional flags `--skip-build`, `--build-only`, `--dry-run`, `--no-delete`). Runs `astro build` with the target environment's `SITE_URL`, syncs `dist/` to the target bucket via `gcloud storage rsync dist gs://<bucket> --recursive --delete-unmatched-destination-objects`, and sets `Cache-Control: no-cache, max-age=0` on `.html` files so updated pages are served immediately without GCS's 1-hour edge cache delay. |
| `scripts/deploy-dev.sh` | **Create** | Convenience shell wrapper (`#!/usr/bin/env bash`) that runs `node scripts/deploy.mjs dev "$@"`. |
| `scripts/deploy-prod.sh` | **Create** | Convenience shell wrapper (`#!/usr/bin/env bash`) that runs `node scripts/deploy.mjs prod "$@"`. |
| `package.json` | **Modify** | Add `"deploy:dev": "node scripts/deploy.mjs dev"` and `"deploy:prod": "node scripts/deploy.mjs prod"` (plus `"build:dev"` and `"build:prod"`). |
| `astro.config.mjs` | **Modify** | Allow `site` to read `process.env.SITE_URL \|\| 'https://mid-10z-dev-1.storage.googleapis.com'` so `deploy:dev` and `deploy:prod` automatically bake the matching bucket URL into `Astro.site`. |
| `.agents/FILE_MAP.md` | **Modify** | Document `scripts/deploy.mjs`, `scripts/deploy-dev.sh`, and `scripts/deploy-prod.sh` under Section 6 (`Automation & Migration Scripts`). |

---

## 3. Deployment Pipeline Steps (`scripts/deploy.mjs`)

1. **Validate Target Environment:**
   - `dev` &rarr; Bucket: `mid-10z-dev-2` (`gs://mid-10z-dev-2`), Site URL: `https://mid-10z-dev-2.storage.googleapis.com`
   - `prod` &rarr; Bucket: `mid-10z-dev-1` (`gs://mid-10z-dev-1`), Site URL: `https://mid-10z-dev-1.storage.googleapis.com`
2. **Build (`astro build`):**
   - Runs `npx astro build` with `SITE_URL` set for the target environment (unless `--skip-build` is passed).
   - Verified `dist/index.html` exists after build.
3. **Transfer Assets (`gcloud storage rsync`):**
   - Executes:
     ```bash
     gcloud storage rsync dist gs://<bucket> --recursive --delete-unmatched-destination-objects
     ```
     (or omits `--delete-unmatched-destination-objects` if `--no-delete` is passed; adds `--dry-run` if `--dry-run` is passed).
4. **Refresh HTML Cache Headers:**
   - Executes:
     ```bash
     gcloud storage objects update "gs://<bucket>/**.html" --cache-control="no-cache, max-age=0, must-revalidate"
     ```
     so freshly deployed HTML pages take effect immediately in the browser without waiting for Google Cloud Storage's default 3600s cache TTL.
5. **Print Live Verification URL:**
   - Outputs the direct bucket entry URL (`https://<bucket>.storage.googleapis.com/index.html`).

---

## 4. Verification Steps

1. Inspect `scripts/deploy.mjs`, `scripts/deploy-dev.sh`, `scripts/deploy-prod.sh`, `package.json`, and `astro.config.mjs`.
2. Test `node scripts/deploy.mjs --help` and `--dry-run` argument parsing to verify command generation for both `dev` (`gs://mid-10z-dev-2`) and `prod` (`gs://mid-10z-dev-1`).

