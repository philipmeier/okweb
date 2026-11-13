# Implementation Plan: Fix `hybrid-stylized-take` Video Slot & Regenerate `hybrid-stylized-take-1970s.jpg`

**Date:** 2026-11-12  
**Goal:**
1. Wire `featHybridStylizedTake` ("AI Restyled Take" on `/features/hybrid-production`) to its own dedicated video asset [`src/assets/media/features/hybrid-stylized-take.mp4`](file:///d:/10z-web/src/assets/media/features/hybrid-stylized-take.mp4) in [`src/data/media.ts`](file:///d:/10z-web/src/data/media.ts) so "AI Restyled Take" and "Character Swap" no longer share `character-swap.mp4`.
2. Regenerate [`src/assets/media/features/hybrid-stylized-take-1970s.jpg`](file:///d:/10z-web/src/assets/media/features/hybrid-stylized-take-1970s.jpg) with accurate, full-scale 1970s endurance prototype car proportions (inspired by a 1971 Porsche 917K / Ferrari 512S Le Mans prototype with proper wide stance, low-slung aerodynamics, wraparound cockpit windshield, and authentic scale relative to the driver) in the **1970s Dichromatic Split-Tone (Burnt Amber `#f97316` & Prussian Cyan `#0e4f63`)** treatment, and update the 10zebra video generation prompt in [`.agents/plans/1970S_VIDEO_SHOT_LIST.md`](file:///d:/10z-web/.agents/plans/1970S_VIDEO_SHOT_LIST.md).

---

## 1. Files to Be Created or Modified

| File | Action | Summary of Changes |
| :--- | :--- | :--- |
| [`src/assets/media/features/hybrid-stylized-take-1970s.jpg`](file:///d:/10z-web/src/assets/media/features/hybrid-stylized-take-1970s.jpg) | Modify (Regenerate) | Regenerate the 16:9 Dichromatic Split-Tone frame with realistic, full-scale 1970s Le Mans prototype proportions, matching the camera angle of the live-action plate while transforming the studio buck into a full-scale #10 endurance race car on a rain-slicked night track. |
| [`src/assets/media/features/hybrid-stylized-take.mp4`](file:///d:/10z-web/src/assets/media/features/hybrid-stylized-take.mp4) | Create | Create the dedicated `hybrid-stylized-take.mp4` file in `src/assets/media/features/` so Vite/Astro resolves it cleanly until you replace it with your newly generated 10zebra video. |
| [`src/data/media.ts`](file:///d:/10z-web/src/data/media.ts) | Modify | Import `featHybridStylizedTakeVideo` from `/src/assets/media/features/hybrid-stylized-take.mp4` and assign it to `media.featHybridStylizedTake.video` (replacing `featCharacterSwapVideo`). |
| [`.agents/plans/1970S_VIDEO_SHOT_LIST.md`](file:///d:/10z-web/.agents/plans/1970S_VIDEO_SHOT_LIST.md) | Modify | Add the dedicated `features/hybrid-stylized-take.mp4` video slot entry and updated `im2vid` / `vid2vid` prompt referencing the new `hybrid-stylized-take-1970s.jpg`. |
| [`.agents/FILE_MAP.md`](file:///d:/10z-web/.agents/FILE_MAP.md) | Modify | Note `hybrid-stylized-take.mp4` in the Feature media assets table. |

---

## 2. Visual Direction for Regenerating `hybrid-stylized-take-1970s.jpg`

- **Why the previous image failed:** The open-cockpit car body was scaled like a miniature go-kart around an unhelmeted driver whose torso towered above the bodywork.
- **Corrected Composition & Proportions:**
  - **Full-Scale 1970s Endurance Prototype:** A full-size, wide-bodied 1970s Group 5 endurance racing prototype (inspired by the 1970–1971 Porsche 917K / Lola T70 / Ferrari 512M) with wide muscular front wheel arches, full-size 15-inch deep-dish magnesium racing wheels with rain tires, low-slung aerodynamic nose with twin covered endurance headlamps and `#10` roundel, and a proper wraparound Lexan windshield and roofline/roll-cage proportioned accurately around the cockpit.
  - **Driver Scale & Continuity:** Lead Driver Elena Vance sits low inside the full-scale cockpit at realistic human-to-car scale, wearing her cream Nomex suit and vintage 1970s open-face Bell racing helmet with visored goggles, hands gripping the suede steering wheel at the same 3/4 front-left camera angle as the studio buck in `hybrid-live-plate-1970s.jpg`.
  - **1970s Dichromatic Split-Tone Grade:** Deep Prussian-cyan (`#0e4f63`) night rain and wet track shadows contrasted with punchy burnt-amber (`#f97316`) trackside sodium floodlights, golden halation, and warm spray reflections off the wet tarmac.

---

## 3. Verification Steps
1. Visually inspect the regenerated `hybrid-stylized-take-1970s.jpg` via `read_file` to verify realistic full-size 1970s race car proportions, driver scale, and Dichromatic Split-Tone grading before copying to `src/assets/media/features/hybrid-stylized-take-1970s.jpg`.
2. Confirm `media.featHybridStylizedTake.video` in `src/data/media.ts` imports `/src/assets/media/features/hybrid-stylized-take.mp4`.
3. Provide the updated image and copy-paste 10zebra video prompt for `hybrid-stylized-take.mp4`.

