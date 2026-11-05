# Implementation Plan: 1970s Cinematic Imagery & Video Overhaul

**Date:** 2026-11-04  
**Status:** Approved — Executing with Option A (1970s Endurance Motorsport Crew)  

---

## 1. Objective & Scope

Regenerate and unify all imagery and video assets across the `10z-web` site around:
1. **A 1970s Cinematic Aesthetic:** Authentic 35mm anamorphic film characteristics (Kodak 5254 / Ektachrome halation, organic film grain, vintage spherical/anamorphic lens flare, tactile analog equipment, and warm practical lighting).
2. **A Unifying Human Team Theme ("Working Together to Win"):** A cohesive narrative world across all pages where a specialized human crew collaborates under pressure to win—mapping naturally to 10zebra's multi-model comparisons, character continuity, Agent Z batch workflows, and isolated project budgets (strictly grounded and human-focused; no rocketships/sci-fi).
3. **Section-Specific 1970s Photochemical Treatments:** Subtle, intentional color/optical grading variations across **Homepage**, **Solution Pages**, **Feature Pages**, **AI Model Pages**, **Developer (MCP) Pages**, and **Resource Pages** so users intuitively feel which part of the site they are in while staying anchored in the same 1970s cinematic world.
4. **Permanent Agent Rules Documentation:** Codify the chosen theme, prompt formula, and section treatment matrix inside `.agents/AGENTS.md`, `.agents/CLAUDE.md`, and `.agents/FILE_MAP.md` so all future asset generations follow the exact same visual language.

---

## 2. Proposed Unifying Theme Concepts ("A Team Working Together to Win")

Below are 5 candidate themes for user selection before asset generation begins:

### Option A (Recommended): 1970s Endurance Motorsport Crew (*"Grand Prix / Le Mans Pit & Paddock, 1973"*)
- **Why it fits 10zebra:** An endurance race isn't won by a single driver—it is won by the **Team Principal**, **Drivers**, **Chief Mechanic**, **Engine Tuners**, and **Pit Crew** working in split-second coordination.
- **How it maps to the product:**
  - *Multi-Model Comparison:* Tuning and benchmarking 4 roaring V8/flat-12 engines side-by-side on the test track to pick the fastest take.
  - *Character Swap / Continuity:* Swapping the lead driver into the cockpit across day, rain, and night stints while keeping the exact same racing line and camera motion.
  - *Agent Z Batch Workflows & Dry Run:* The Pit Crew Chief mapping out a multi-car pit strategy on a chalkboard with stopwatch/fuel cost calculations before signaling the crew to execute in unison.
  - *Project Budgets & Roles:* The Team Principal on the pit wall with stopwatches, lap ledgers, and headset channels keeping each race car's fuel and tire budget strictly on target.

### Option B: 1970s Ocean Racing Yacht Crew (*"The Transatlantic Regatta, 1974"*)
- **Visual World:** Weathered teak decks, brass sextants, heavy canvas spinnakers, yellow oilskin jackets, chart tables, and golden-hour ocean swells.
- **Team Roles:** Skipper/Tactician calling the wind, Helmsman at the wheel, Navigator plotting routes with dividers (Dry Run planning), and Deck Crew grinding winches in synchronized rhythm.

### Option C: 1970s Championship Rowing Eight & Boathouse (*"The Dawn Regatta Crew, 1972"*)
- **Visual World:** Misty river mornings, hand-crafted cedar racing shells, wool varsity sweaters, megaphones, timber boathouses, and eight oars moving in frame-accurate lockstep.
- **Team Roles:** Coxswain calling the cadence (Director), Stroke seat & crew (synchronized multi-model execution), Boat Rigger/Craftsman (fine-tuning engines), and Launch Coach with split-timer.

### Option D: 1970s New Hollywood Location Film Unit (*"On Location & Mobile Broadcast Crew, 1975"*)
- **Visual World:** Arriflex 35BL film cameras on doorway dollies, Nagra reel-to-reel audio decks, clapperboards, Steenbeck flatbed editors, tungsten Fresnel lights at magic hour, and a vintage broadcast van.
- **Team Roles:** Director by the lens, Cinematographer with light meter, Script Supervisor locking continuity, Flatbed Editor trimming film strips, and Unit Production Manager guarding the budget ledger.

### Option E: 1970s Alpine Mountaineering Expedition (*"The Summit Ridge Team, 1971"*)
- **Visual World:** Canvas rucksacks, braided ropes, brass carabiners, basecamp radio tents, grease-pencil topo maps, and climbers belaying one another across sunlit granite peaks.
- **Team Roles:** Expedition Leader at basecamp radio, Lead Climber on the pitch, Belay Partner, and Quartermaster managing gear weight and route plans.

---

## 3. Section-by-Section 1970s Visual Treatment Matrix

Every asset will share the **1970s 35mm anamorphic film aesthetic + the chosen unifying team theme**, differentiated by these section-specific photochemical treatments:

| Site Section | Routes Covered | 1970s Photochemical Treatment | Color & Optical Signature |
| :--- | :--- | :--- | :--- |
| **1. Homepage** | `/` (`Hero`, `UseCases`, `ProductTour`) | **Full-Spectrum 1970s Technicolor (Kodak 5254)** | Balanced warm tungsten highlights (`#f97316`), deep rich blacks, natural skin tones, golden halation, classic 2.39:1 cinema feel. |
| **2. Solution Pages** | `/solutions`, `/solutions/[slug]` | **Warm Sepia & Kodachrome Portraiture** | Nostalgic **warm sepia / amber-gold grade** (`#d97706` / warm ochre midtones), 85mm shallow depth-of-field focusing intimately on the human specialists and their craft. |
| **3. Feature Pages** | `/features`, `/features/*` | **1970s Dichromatic Split-Tone (Burnt Amber & Cyan)** | **Two-strip dichromatic look**: punchy burnt-orange highlights paired with cool Prussian-cyan shadows, emphasizing action, tactile tools, and before/after transformations. |
| **4. AI Model Pages** | `/models`, `/models/[slug]` | **Teal & Silver-Halide Chrome** | **Cool anamorphic teal grade** (`#0d9488` / steel-blue shadows with crisp silver highlights), evoking precision engineering, optical lenses, and engine telemetry. |
| **5. Developer / MCP Pages** | `/mcp`, `/api`, `/integrations` | **1970s Analog Control-Room Dichrome (Charcoal & Amber Phosphor)** | High-contrast darkroom/telemetry grade with **monochromatic amber/emerald CRT & analog dial glow**, patch cables, and illuminated switches. |
| **6. Resource Pages** | `/about`, `/blog/*`, `/faq`, `/pricing`, `/demo` | **Archival 1970s Photojournalism (Warm Matte Press Stock)** | *LIFE* / *Magnum* 1970s documentary stock—**lifted matte blacks, warm ivory-sepia paper tones**, candid behind-the-scenes teamwork and studio heritage. |

---

## 4. Complete Inventory of Files & Assets to Create / Update

### A. Core Media Assets (`src/assets/media/` & `public/media/`)
1. **Homepage & Shared Tour Slots (`src/assets/media/`):**
   - `public/media/hero-1970s-team.mp4` + `src/assets/media/hero-poster.jpg` (replaces external Mixkit video & Unsplash poster in `src/components/layout/Hero.astro`)
   - `persona-creative-directors.jpg` (16:9) + optional loop video
   - `persona-film-production.jpg` (16:9) + optional loop video
   - `persona-agencies.jpg` (16:9) + optional loop video
   - `persona-content-creators.jpg` (16:9) + optional loop video
   - `character-reference.jpg` (3:4 front-facing lead team member portrait)
   - `shot-wide-forest.jpg` → Wide establishing shot of the locked character in action
   - `shot-medium-train.jpg` → Medium shot of the same locked character
   - `shot-closeup-campfire.jpg` → Dramatic close-up of the same locked character
   - `take-a.jpg` (Kling), `take-b.jpg` (Veo), `take-c.jpg` (Sora), `take-d.jpg` (Runway) — Same prompt/scene rendered in 4 distinct 1970s camera/lighting interpretations
2. **Solution Pages (`src/assets/media/solutions/` — Warm Sepia/Kodachrome Treatment):**
   - Creative Directors: `cd-explore.jpg`, `cd-talent.jpg`, `cd-present.jpg`
   - Film Producers: `film-breakdown.jpg`, `film-cast.jpg`, `film-plates.jpg`
   - Agencies: `agency-beverage.jpg`, `agency-tech.jpg`, `agency-fashion.jpg`
   - Content Creators: `creator-host.jpg`, `creator-cave.jpg`, `creator-summit.jpg`
3. **Feature Pages (`src/assets/media/features/` — Dichromatic Amber/Cyan Treatment):**
   - `character-swap.jpg` (Split-screen character replacement preserving motion)
   - `agentic-workflows.jpg` (New dedicated asset for Agent Z batch operations)
   - `multi-reference.jpg` (Character + wardrobe + environment composite)
   - `quick-start.jpg` (High-energy launchpad frame)
   - `storyboard.jpg` (Shared production board & team coordination)
   - `project-budgets.jpg` (Multi-project control & ledger view)
   - `team.jpg` (Crew roles & pit/studio collaboration)
   - `produce-export.jpg` (Analog/digital timeline assembly & mixdown)
   - `referral-program.jpg` (New dedicated asset for Tolt Referral Program)
4. **Section Accent Visuals & Interactive Mockup Thumbnails:**
   - Replace hardcoded external Unsplash URLs in:
     - `src/components/layout/Hero.astro`
     - `src/components/features/CharacterSwapMockup.astro`
     - `src/components/features/ModelComparisonMockup.astro`
     - `src/components/features/QuickStartToolsExplorer.astro`
     - `src/components/features/YouTubeExportMockup.astro`
     - Legacy/reusable components (`FeatureCharacter.astro`, `FeatureMultiModel.astro`, `FeatureTracking.astro`, `ProduceExport.astro`, `WorkflowSandbox.astro`)
   - Add section-treated header/accent imagery or visual banners for `/models`, `/mcp`, and `/about` / `/resources`.

### B. Data & Documentation Files to Update
- `src/data/media.ts`: Update `alt` texts, `brief` descriptions (documenting the 1970s style + section treatment), and wire up the new `agentic-workflows.jpg`, `referral-program.jpg`, and video loops.
- `.agents/AGENTS.md` & `.agents/CLAUDE.md`: Add a dedicated **"Visual Identity & Asset Generation Guidelines"** section specifying the 1970s cinematic style, the unifying team theme, and the 6-section color/optical treatment matrix so all future agents adhere to it.
- `.agents/FILE_MAP.md`: Document all new media assets and section visual treatments.

---

## 5. Verification Steps (Post-Approval)

1. Verify every image in `src/assets/media/**` and `public/media/**` exists, loads cleanly through Astro's `<Image />` / `MediaSlot.astro` pipeline, and has zero broken imports.
2. Confirm zero external stock URLs (`unsplash.com`, `mixkit.co`) remain in active components.
3. Verify visual treatment consistency across `/`, `/solutions/*`, `/features/*`, `/models/*`, `/mcp`, and `/about` / `/blog`.
4. Confirm `.agents/AGENTS.md` and `.agents/CLAUDE.md` include the complete 1970s treatment specification for future agents.
