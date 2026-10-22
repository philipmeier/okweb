/**
 * MEDIA MANIFEST — single source of truth for homepage imagery & video.
 *
 * Every visual slot on the homepage reads from here. To swap placeholder media:
 *   1. Images: replace the file in `src/assets/media/` (keep the filename), or
 *      point the import below at a new file. Astro optimizes it to WebP automatically.
 *   2. Video: drop an .mp4 (H.264, muted, 5–8s loop, ≤2 MB) into `public/media/`
 *      and set `video: '/media/<file>.mp4'`. The image becomes the poster/fallback.
 *
 * `brief` describes what the founder should generate for that slot. In `astro dev`,
 * each slot shows a small "MEDIA" tag; hover it to read the brief. Never shown in production.
 */
import type { ImageMetadata } from 'astro';

import personaCreativeDirectors from '../assets/media/persona-creative-directors.jpg';
import personaFilmProduction from '../assets/media/persona-film-production.jpg';
import personaAgencies from '../assets/media/persona-agencies.jpg';
import personaContentCreators from '../assets/media/persona-content-creators.jpg';
import characterReference from '../assets/media/character-reference.jpg';
import shotWide from '../assets/media/shot-wide-forest.jpg';
import shotMedium from '../assets/media/shot-medium-train.jpg';
import shotCloseup from '../assets/media/shot-closeup-campfire.jpg';
import takeA from '../assets/media/take-a.jpg';
import takeB from '../assets/media/take-b.jpg';
import takeC from '../assets/media/take-c.jpg';
import takeD from '../assets/media/take-d.jpg';

// Solutions pages — 3 workflow frames per persona
import cdExplore from '../assets/media/solutions/cd-explore.jpg';
import cdTalent from '../assets/media/solutions/cd-talent.jpg';
import cdPresent from '../assets/media/solutions/cd-present.jpg';
import filmBreakdown from '../assets/media/solutions/film-breakdown.jpg';
import filmCast from '../assets/media/solutions/film-cast.jpg';
import filmPlates from '../assets/media/solutions/film-plates.jpg';
import agencyBeverage from '../assets/media/solutions/agency-beverage.jpg';
import agencyTech from '../assets/media/solutions/agency-tech.jpg';
import agencyFashion from '../assets/media/solutions/agency-fashion.jpg';
import creatorHost from '../assets/media/solutions/creator-host.jpg';
import creatorCave from '../assets/media/solutions/creator-cave.jpg';
import creatorSummit from '../assets/media/solutions/creator-summit.jpg';

export interface MediaSlot {
  /** Stable ID — shown in the dev tag so the founder can find the slot here. */
  id: string;
  image: ImageMetadata;
  /** Optional looping video (path under /public). Image is used as poster. */
  video?: string;
  alt: string;
  /** What to generate for this slot. */
  brief: string;
}

const slot = (s: MediaSlot) => s;

export const media = {
  /* ---------- Use-case rotator (16:9, 5–8s loops) ---------- */
  personaCreativeDirectors: slot({
    id: 'persona-creative-directors',
    image: personaCreativeDirectors,
    alt: 'Luxury fragrance commercial frame generated in 10zebra',
    brief: '16:9 loop, 6s. A premium brand spot (fragrance/auto/fashion). Ideally a quick cut between 2–3 model takes of the same shot to imply A/B exploration.',
  }),
  personaFilmProduction: slot({
    id: 'persona-film-production',
    image: personaFilmProduction,
    alt: 'Cinematic sci-fi previs shot of an astronaut approaching a derelict ship',
    brief: '16:9 loop, 6–8s. Narrative previs: 3 consecutive shots from one scene (wide → medium → close) with the same character and set. Shows continuity.',
  }),
  personaAgencies: slot({
    id: 'persona-agencies',
    image: personaAgencies,
    alt: 'Athletic brand campaign frame of a runner on a neon-lit street',
    brief: '16:9 loop, 6s. Fast montage of 3 different client campaigns (sneaker, beverage, tech) — implies many clients, one workspace.',
  }),
  personaContentCreators: slot({
    id: 'persona-content-creators',
    image: personaContentCreators,
    alt: 'Travel creator filming on a sea cliff at golden hour',
    brief: '16:9 loop, 6s. YouTube-style content: a recurring host/character across 3 quick scenes, energetic pacing, vertical-safe framing.',
  }),

  /* ---------- Product tour: Lock (character consistency) ---------- */
  characterReference: slot({
    id: 'lock-reference',
    image: characterReference,
    alt: 'Character reference portrait used to lock identity across shots',
    brief: '3:4 still. Clean, front-facing character reference portrait on a neutral backdrop — the image every other Lock shot is anchored to.',
  }),
  shotWide: slot({
    id: 'lock-shot-wide',
    image: shotWide,
    alt: 'Wide shot of the referenced character in a misty forest',
    brief: '16:9 still or 4s loop. Wide shot of the SAME reference character in a new environment.',
  }),
  shotMedium: slot({
    id: 'lock-shot-medium',
    image: shotMedium,
    alt: 'Medium shot of the referenced character on a vintage train',
    brief: '16:9 still or 4s loop. Medium shot, same character, different lighting/location.',
  }),
  shotCloseup: slot({
    id: 'lock-shot-closeup',
    image: shotCloseup,
    alt: 'Close-up of the referenced character lit by campfire',
    brief: '16:9 still or 4s loop. Close-up, same character — proves the face holds under dramatic light.',
  }),

  /* ---------- Product tour: Generate (one shot, multiple models) ---------- */
  takeA: slot({
    id: 'take-kling',
    image: takeA,
    alt: 'Take from Kling: aerial view of a red convertible on a coastal road',
    brief: '16:9 loop, 4s. SAME prompt rendered with Kling. Label must match the model actually used.',
  }),
  takeB: slot({
    id: 'take-veo',
    image: takeB,
    alt: 'Take from Veo: low tracking shot of a red convertible at sunset',
    brief: '16:9 loop, 4s. SAME prompt rendered with Veo. This is the "selected" take — make it the strongest.',
  }),
  takeC: slot({
    id: 'take-sora',
    image: takeC,
    alt: 'Take from Sora: side profile of a red convertible at dusk',
    brief: '16:9 loop, 4s. SAME prompt rendered with Sora.',
  }),
  takeD: slot({
    id: 'take-runway',
    image: takeD,
    alt: 'Take from Runway: high-angle hairpin bend with stormy light',
    brief: '16:9 loop, 4s. SAME prompt rendered with Runway.',
  }),

  /* ---------- Solutions: Creative Directors workflow ---------- */
  cdExplore: slot({
    id: 'sol-cd-explore',
    image: cdExplore,
    alt: 'Fragrance bottle bursting through rose petals and water droplets',
    brief: '16:9 loop, 5s. One product shot explored in a bold alternate direction (from "Make an Ad"). Pair with the persona hero to imply A/B exploration.',
  }),
  cdTalent: slot({
    id: 'sol-cd-talent',
    image: cdTalent,
    alt: 'Campaign talent holding a perfume bottle in warm rim light',
    brief: '16:9 loop, 5s. Campaign talent locked to a reference (multi-reference: talent + wardrobe + set).',
  }),
  cdPresent: slot({
    id: 'sol-cd-present',
    image: cdPresent,
    alt: 'Same talent walking through a chandelier-lit marble hall',
    brief: '16:9 loop, 6s. Final animatic beat with the SAME talent — the "client-ready" closing shot.',
  }),

  /* ---------- Solutions: Film Producers workflow ---------- */
  filmBreakdown: slot({
    id: 'sol-film-breakdown',
    image: filmBreakdown,
    alt: 'Astronaut exploring a sand-filled derelict spaceship corridor',
    brief: '16:9 loop, 6s. A shot generated from a script breakdown ("From a Script"). Ideally 2–3 consecutive shots cut together.',
  }),
  filmCast: slot({
    id: 'sol-film-cast',
    image: filmCast,
    alt: 'Close-up of the lead actor inside a weathered spacesuit helmet',
    brief: '16:9 loop, 5s. Close-up proving cast continuity — same lead as the other film shots.',
  }),
  filmPlates: slot({
    id: 'sol-film-plates',
    image: filmPlates,
    alt: 'Real desert film shoot with camera dolly and actor in spacesuit',
    brief: '16:9 loop, 6s. Hybrid: real location footage next to/blended with an AI take (split-screen works well).',
  }),

  /* ---------- Solutions: Agencies workflow ---------- */
  agencyBeverage: slot({
    id: 'sol-agency-beverage',
    image: agencyBeverage,
    alt: 'Beverage can bursting through a citrus splash',
    brief: '16:9 loop, 5s. Client A campaign frame (beverage). Distinct look from the other two clients.',
  }),
  agencyTech: slot({
    id: 'sol-agency-tech',
    image: agencyTech,
    alt: 'Wireless earbuds case floating in neon light trails',
    brief: '16:9 loop, 5s. Client B campaign frame (tech).',
  }),
  agencyFashion: slot({
    id: 'sol-agency-fashion',
    image: agencyFashion,
    alt: 'Fashion model in a terracotta coat on white sand dunes',
    brief: '16:9 loop, 5s. Client C campaign frame (fashion) — the "delivered" final.',
  }),

  /* ---------- Solutions: Content Creators workflow ---------- */
  creatorHost: slot({
    id: 'sol-creator-host',
    image: creatorHost,
    alt: 'Animated fox explorer host in a cozy cabin studio',
    brief: '16:9 loop, 5s. Episode opener with a recurring host character (generated via Text-to-Sequence / Three Acts).',
  }),
  creatorCave: slot({
    id: 'sol-creator-cave',
    image: creatorCave,
    alt: 'The same fox host exploring a glowing crystal cave',
    brief: '16:9 loop, 5s. SAME host in a new location — proves the reference lock.',
  }),
  creatorSummit: slot({
    id: 'sol-creator-summit',
    image: creatorSummit,
    alt: 'The same fox host celebrating on a mountain summit',
    brief: '16:9 loop, 5s. SAME host, thumbnail-worthy finale beat — ready to publish.',
  }),
};

export type MediaKey = keyof typeof media;
