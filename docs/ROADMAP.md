# 10zebra Web — Roadmap & Working Notes

## ✅ Done — Homepage restructure (Oct 2026)

Homepage cut from 15 → 10 sections. New flow:

1. Hero (one-line subhead; badge → models)
2. Model ticker
3. **Use-case rotator** — `src/components/UseCases.astro` (data: `src/data/solutions.ts`)
4. **Product tour** — `src/components/ProductTour.astro` (Generate → Lock → Assemble → Export)
5. Team / project budgets (`FeatureTeam.astro`)
6. Social proof (moved above pricing)
7. Compare table (MCP row removed)
8. MCP strip (slim)
9. Pricing
10. FAQ (now opens with the AEO "What is 10zebra" blurb) + Final CTA

No longer used on the homepage (safe to delete or reuse on feature pages):
`PainPoints`, `FeatureMultiModel`, `FeatureCharacter`, `FeatureTracking`, `ProduceExport`, `WorkflowSandbox`.

---

## ✅ Done — Solutions hub + landing pages (placeholder framework)

All content lives in **`src/data/solutions.ts`** (copy) + **`src/data/media.ts`** (imagery)
+ **`src/data/features.ts`** (tool catalog linked from solution pages).

- [x] `/solutions` hub — `src/pages/solutions.astro`: hero + persona mosaic, "I need to…" fit rows,
      2×2 persona cards w/ workflow filmstrip (`components/solutions/SolutionCard.astro`), tool matrix
- [x] `/solutions/[slug]` template — `src/pages/solutions/[slug].astro`:
      hero (Ken Burns + 3-step filmstrip) → stats → old way vs. 10zebra way → 3-step workflow
      → 4 tool cards → testimonial → FAQ (FAQPage + Breadcrumb JSON-LD) → other solutions → CTA
- [x] Header: "Solutions" mega-menu with persona thumbnails (`Header.astro`)
- [x] Footer: Solutions column (data-driven)
- [x] SEO: unique title/description per page, canonical, breadcrumb schema
- [ ] Internal links from `/features/*` pages → relevant solutions

### ⚠️ Placeholders to refine (per persona, in `solutions.ts`)
- [ ] `stats` — all 3 numbers are illustrative
- [ ] `testimonial` — quote / name / title / **company** are placeholders
- [ ] `workflow` — confirm each step matches a real tool + flow in the app
- [ ] `features` — which 4 tools each persona sees (also drives the hub matrix dots)
- [ ] `faqs` — verify answers (model names, credit math, limits)
- [ ] Pain → outcome lines and hero copy

> ⚠️ Each landing page needs substantial *unique* copy (workflow, FAQ, examples) to avoid "Crawled – not indexed".

Personas / slugs:
| Slug | Tab label | Page H1 (search intent) |
|---|---|---|
| `creative-directors` | Creative Directors | AI Video for Creative Directors |
| `film-producers` | Film Producers | AI Previs & Storyboarding for Film Producers |
| `agencies` | Agencies | AI Video Production for Agencies |
| `content-creators` | Content Creators | AI Video for YouTubers & Content Creators |

---

## 🔜 LATER — `/features` widgets mirroring the real app

- [ ] Add the app repo (`D:\10z`) to the editor workspace (File → Add Folder to Workspace)
      so the agent can read design tokens, components, and real UI labels.
      (It sits outside `d:\10z-web`, so tools currently can't read it.)
- [ ] Extract app tokens → `--app-*` CSS vars; build shared `AppFrame.astro` shell
- [ ] Rebuild mockups in `src/components/features/*` as scripted demos with real labels
- [ ] Fix `ProjectBudgetMockup` mixed units ("credits used" vs "$ remaining") and invented labels
- [ ] Optional: screenshots from the app at `localhost:3000` for layout reference

---

## 🎬 Founder media shot list

All homepage media is managed in **`src/data/media.ts`**. Each slot has a `brief`.
In `astro dev`, hover the yellow **MEDIA** tag on any image to see its brief.

To replace: overwrite the image in `src/assets/media/` (same filename), and/or add a
video to `public/media/` and set `video: '/media/<file>.mp4'` on the slot.
Video spec: H.264 MP4, muted, 5–8s seamless loop, ≤ 2 MB, 1280–1920px wide.

| Slot ID | Section | What to generate |
|---|---|---|
| `persona-creative-directors` | Use cases | Premium brand spot; ideally cuts between 2–3 model takes |
| `persona-film-production` | Use cases | 3-shot previs (wide → medium → close), same character & set |
| `persona-agencies` | Use cases | Montage of 3 different client campaigns |
| `persona-content-creators` | Use cases | Recurring host across 3 quick YouTube-style scenes |
| `take-kling` / `take-veo` / `take-sora` / `take-runway` | Tour · Generate | SAME prompt across 4 models (labels must match model used) |
| `lock-reference` | Tour · Lock | Clean front-facing character reference portrait |
| `lock-shot-wide` / `-medium` / `-closeup` | Tour · Lock + Assemble | Same character in 3 shots/locations |
| Hero background video | Hero | 10–15s reel of real 10zebra output (currently Mixkit stock in `Hero.astro`) |

**Solutions pages** (persona slots above are reused as each landing-page hero). Keep the
same character/talent across a persona's 3 frames — they tell one story.

| Slot ID | Page · Step | What to generate |
|---|---|---|
| `sol-cd-explore` | Creative Directors · 01 | Product hero shot, "exploring the look" |
| `sol-cd-talent` | Creative Directors · 02 | Locked brand talent with the product |
| `sol-cd-present` | Creative Directors · 03 | Final campaign frame, same talent |
| `sol-film-breakdown` | Film Producers · 01 | Wide establishing shot from a script scene |
| `sol-film-cast` | Film Producers · 02 | Same lead, medium/close, same set |
| `sol-film-plates` | Film Producers · 03 | AI shot that intercuts with real plate footage |
| `sol-agency-beverage` | Agencies · 01 | Client A campaign frame (beverage) |
| `sol-agency-tech` | Agencies · 02 | Client B campaign frame (tech) |
| `sol-agency-fashion` | Agencies · 03 | Client C campaign frame (fashion) |
| `sol-creator-host` | Content Creators · 01 | Recurring host/character intro |
| `sol-creator-cave` | Content Creators · 02 | Same host, episode scene 2 |
| `sol-creator-summit` | Content Creators · 03 | Same host, episode finale / thumbnail moment |

Other placeholders to replace: testimonials + stats in `SocialProof.astro`
(company names currently read "Company Name" / "Agency Name" / "Channel Name").
