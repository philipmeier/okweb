# Implementation Plan: Update Video Paths to `media/solutions/` and `media/features/` (Remove `sol-` & `feat-` Prefixes)

**Date:** 2026-11-05  
**Status:** Awaiting User Approval

---

## 1. Goal & Summary of Findings

The user removed the `sol-` and `feat-` prefixes from the video files and organized them into `media/solutions/` and `media/features/` subfolders (specifically placing 19 newly generated 10zebra `.mp4` videos into `src/assets/media/`, `src/assets/media/solutions/`, and `src/assets/media/features/`).

Currently:
1. **19 real 10zebra `.mp4` videos** have been added by the user inside `src/assets/media/`:
   - `src/assets/media/`: `hero-1970s-pitcrew.mp4`, `persona-agencies-loop.mp4`, `persona-cd-loop.mp4`, `persona-creators-loop.mp4`, `persona-film-loop.mp4`, `shot-wide-forest.mp4`, `take-kling.mp4`, `take-veo.mp4`
   - `src/assets/media/solutions/`: `agency-fashion.mp4`, `agency-tech.mp4`, `cd-talent.mp4`, `creator-cave.mp4`, `creator-host.mp4`, `creator-summit.mp4`, `film-breakdown.mp4`
   - `src/assets/media/features/`: `agentic-workflows.mp4`, `produce-export.mp4`, `project-budgets.mp4`, `team.mp4`
2. **`public/media/`** still has flat `sol-*.mp4` and `feat-*.mp4` files (the synthetic fallback loops), and `src/data/media.ts` + `CharacterSwapMockup.astro` still reference `/media/sol-*.mp4` and `/media/feat-*.mp4`.

### What We Will Do
1. **Unify Folder Structure Across `src/assets/media/` and `public/media/`:**
   - Move/rename the remaining 14 fallback `.mp4` files (for any slot not yet overwritten by the user's 19 videos) into `src/assets/media/`, `src/assets/media/solutions/`, and `src/assets/media/features/` **without** `sol-` or `feat-` prefixes (`cd-explore.mp4`, `cd-present.mp4`, `film-cast.mp4`, `film-plates.mp4`, `agency-beverage.mp4`, `character-swap.mp4`, `multi-reference.mp4`, `quick-start.mp4`, `storyboard.mp4`, `referral-program.mp4`, `shot-medium-train.mp4`, `shot-closeup-campfire.mp4`, `take-sora.mp4`, `take-runway.mp4`).
   - Mirror the exact same folder structure (`public/media/`, `public/media/solutions/`, `public/media/features/`) in `public/media/`, copying the user's 19 real `.mp4`s into `public/media/{,solutions/,features/}` and deleting all old `public/media/sol-*.mp4` and `public/media/feat-*.mp4` files.
2. **Update Code References to Use the New Subfolder Paths (`media/solutions/*.mp4` & `media/features/*.mp4`):**
   - Update `src/data/media.ts` so every Solutions slot points to `/media/solutions/<name>.mp4` (and/or imports directly from `/src/assets/media/solutions/<name>.mp4`) and every Feature slot points to `/media/features/<name>.mp4` (with zero `sol-` or `feat-` filename prefixes).
   - Update `src/components/features/CharacterSwapMockup.astro` from `/media/sol-film-cast.mp4` and `/media/feat-character-swap.mp4` to `/media/solutions/film-cast.mp4` and `/media/features/character-swap.mp4`.
3. **Update Documentation & File Map:**
   - Update `docs/1970S_VIDEO_SHOT_LIST.md` and `.agents/FILE_MAP.md` so all Solutions and Features video paths reflect `media/solutions/<name>.mp4` and `media/features/<name>.mp4` without `sol-` or `feat-` prefixes.

---

## 2. Every File to be Created, Modified, or Deleted

### Media Files (`src/assets/media/` & `public/media/`)
- **Sync User's 19 Real `.mp4` Videos from `src/assets/media/**` to `public/media/**`:**
  - `public/media/hero-1970s-pitcrew.mp4`
  - `public/media/persona-agencies-loop.mp4`, `persona-cd-loop.mp4`, `persona-creators-loop.mp4`, `persona-film-loop.mp4`
  - `public/media/shot-wide-forest.mp4`, `take-kling.mp4`, `take-veo.mp4`
  - `public/media/solutions/agency-fashion.mp4`, `agency-tech.mp4`, `cd-talent.mp4`, `creator-cave.mp4`, `creator-host.mp4`, `creator-summit.mp4`, `film-breakdown.mp4`
  - `public/media/features/agentic-workflows.mp4`, `produce-export.mp4`, `project-budgets.mp4`, `team.mp4`
- **Move Remaining 14 Fallback `.mp4` Videos into `solutions/` and `features/` Subfolders (Both `public/media/` and `src/assets/media/`):**
  - `media/solutions/cd-explore.mp4`, `cd-present.mp4`, `film-cast.mp4`, `film-plates.mp4`, `agency-beverage.mp4`
  - `media/features/character-swap.mp4`, `multi-reference.mp4`, `quick-start.mp4`, `storyboard.mp4`, `referral-program.mp4`
  - `media/shot-medium-train.mp4`, `shot-closeup-campfire.mp4`, `take-sora.mp4`, `take-runway.mp4`
- **Delete Old Prefixed Files:**
  - Delete `public/media/sol-*.mp4` (12 files) and `public/media/feat-*.mp4` (9 files).

### Code & Documentation Files to Modify
1. [`src/data/media.ts`](file:///d:/10z-web/src/data/media.ts)
   - Update all 12 Solutions `video:` paths from `/media/sol-<name>.mp4` to `/media/solutions/<name>.mp4`.
   - Update all 9 Feature `video:` paths from `/media/feat-<name>.mp4` to `/media/features/<name>.mp4`.
2. [`src/components/features/CharacterSwapMockup.astro`](file:///d:/10z-web/src/components/features/CharacterSwapMockup.astro)
   - Update source video from `/media/sol-film-cast.mp4` to `/media/solutions/film-cast.mp4`.
   - Update swapped video from `/media/feat-character-swap.mp4` to `/media/features/character-swap.mp4`.
3. [`docs/1970S_VIDEO_SHOT_LIST.md`](file:///d:/10z-web/docs/1970S_VIDEO_SHOT_LIST.md)
   - Update target paths in Sections 4 and 5 to `solutions/<name>.mp4` and `features/<name>.mp4` (and mark which 19 videos are already generated).
4. [`.agents/FILE_MAP.md`](file:///d:/10z-web/.agents/FILE_MAP.md)
   - Update Section 7 table to reflect `media/solutions/*.mp4` and `media/features/*.mp4`.

---

## 3. SEO / AEO Impact
- No route or schema changes; all `<video>` sources resolve cleanly with 0 404s.

---

## 4. Verification Steps
1. Run a verification script confirming that all 33 video references across `src/` match the new `media/`, `media/solutions/`, and `media/features/` paths and exist on disk in both `src/assets/media/` and `public/media/`.
2. Confirm zero `sol-` or `feat-` video references remain anywhere in `src/`.

