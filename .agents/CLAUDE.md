# Claude & AI Agent Instructions

## Mandatory Planning & Approval Workflow

**CRITICAL RULE FOR ALL AGENTS:** Before making any changes to the codebase:

1. **Consult the File Map:** Read [`.agents/FILE_MAP.md`](./FILE_MAP.md) to understand the site structure, single-source-of-truth data catalogs, components, layouts, and utility functions.
2. **Create a Comprehensive Plan:** Draft a detailed, step-by-step implementation plan covering:
   - Goal & summary of requested changes
   - Every file to be created, modified, or deleted
   - Data model / catalog updates (`src/data/*.ts`)
   - UI / component / route changes and SEO/AEO impact (`sitemap.xml.ts`, `llms.txt`, JSON-LD)
   - Verification steps
3. **Save the Plan to `.agents/plans/`:** Save your plan as a Markdown file inside `.agents/plans/` (e.g., `.agents/plans/YYYY-MM-DD-feature-name.md`).
4. **Get User Approval Before Making Changes:** Present the saved plan to the user and **wait for explicit approval** before creating, editing, or deleting any project files outside `.agents/plans/`.

---

## Codebase Reference

- **File & Function Breakdown:** See [`.agents/FILE_MAP.md`](./FILE_MAP.md) for a complete map of pages, layouts, components, data modules, exported functions, and scripts.
- **Implementation Plans:** Stored in [`.agents/plans/`](./plans/).

---

## Visual Identity & 1970s Cinematic Asset Guidelines

All imagery and video assets across `10z-web` follow a unified **1970s Cinematic Endurance Motorsport Crew** aesthetic (*Le Mans* 1971 / 1970s Grand Prix Pit & Paddock shot on 35mm Panavision anamorphic lenses, Kodak 5254 / Ektachrome film stock, halation, organic film grain, and tactile mechanical gauges).

### Core Narrative Theme: "A Team Working Together to Win"
- **The World:** A 1970s endurance racing team—Team Principal, Lead & Co-Drivers, Chief Mechanic, Engine Tuners, Pit Crew, and Timekeepers—collaborating in high-stakes harmony.
- **Human Focus:** Always emphasize the human specialists, expressive faces, hands on analog stopwatches/wrenches/storyboards, and eye contact in the paddock, pit lane, and cockpit (never sci-fi or rocketships).
- **Recurring Cast Continuity:** Keep recurring character archetypes consistent across multi-shot sequences (e.g., Lead Driver Elena Vance in cream Nomex suit with vintage racing stripes; Team Principal Marcus on the pit wall with dual Heuer stopwatches and clipboard; Chief Mechanic & Pit Crew in oil-stained team coveralls).

### Section-Specific 1970s Photochemical Treatments

Every asset must stay anchored in the 1970s motorsport world while applying the specific color/optical treatment for its site section so users intuitively feel which section of the site they are browsing:

| Site Section | Routes Covered | 1970s Photochemical Treatment | Color & Optical Signature |
| :--- | :--- | :--- | :--- |
| **1. Homepage** | `/` (`Hero`, `UseCases`, `ProductTour`) | **Full-Spectrum 1970s Technicolor (Kodak 5254)** | Balanced warm tungsten/amber highlights (`#f97316`), deep rich theatrical blacks, natural skin tones, golden halation around track & garage lights, classic 2.39:1 widescreen cinema look. |
| **2. Solution Pages** | `/solutions`, `/solutions/[slug]` | **Warm Golden Sepia & Kodachrome Portraiture** | Sun-baked **warm sepia / amber-ochre grade** (`#d97706` bias), 85mm shallow depth-of-field portrait lenses focusing intimately on the human roles (Team Principal, Race Strategist, Pit Crew Chief, Broadcast Chronicler). |
| **3. Feature Pages** | `/features`, `/features/*` | **1970s Dichromatic Split-Tone (Burnt Amber & Prussian Cyan)** | **Two-strip dichromatic look**: punchy burnt-orange highlights paired with deep slate/Prussian-cyan shadows, emphasizing high-contrast mechanical precision, split-screen comparisons, and pit-lane action. |
| **4. AI Model Pages** | `/models`, `/models/[slug]` | **Anamorphic Teal & Silver-Halide Chrome** | **Cool anamorphic teal & brushed-steel grade** (`#0d9488` / `#38bdf8` shadow tint with silver highlights), highlighting engine bays, optical lenses, tachometer telemetry, and side-by-side performance benchmarks. |
| **5. Developer / MCP Pages** | `/mcp`, `/api`, `/integrations` | **1970s Control-Room Amber Phosphor & Charcoal** | High-contrast darkroom/telemetry aesthetic with **monochromatic amber/emerald CRT oscilloscopes, analog lap-timing consoles, patch bays, and illuminated toggle switches**. |
| **6. Resource Pages** | `/about`, `/blog/*`, `/faq`, `/pricing`, `/demo` | **Archival 1970s Photojournalism (Warm Matte Press Stock)** | *LIFE* / *Magnum* 1970s editorial documentary stock—**lifted matte blacks, warm paper-ivory highlights, soft grain**, capturing candid behind-the-scenes camaraderie, chalkboard briefings, and team heritage. |

---

## Development

When starting the dev server, use background mode:

```bash
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

