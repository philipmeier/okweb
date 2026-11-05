/**
 * MEDIA MANIFEST — single source of truth for homepage, solutions, and feature imagery & video.
 *
 * Every visual slot across the site reads from here. Both images (.jpg) and videos (.mp4)
 * are imported via Vite/Astro from `src/assets/media/` so Astro automatically hashes and
 * resolves their URLs consistently across dev, root domain, and bucket deployments.
 */
import type { ImageMetadata } from 'astro';

// Homepage & Persona Still Frames
import personaCreativeDirectors from '/src/assets/media/persona-creative-directors-1970s.jpg';
import personaFilmProduction from '/src/assets/media/persona-film-production-1970s.jpg';
import personaAgencies from '/src/assets/media/persona-agencies-1970s.jpg';
import personaContentCreators from '/src/assets/media/persona-content-creators-1970s.jpg';
import characterReference from '/src/assets/media/character-reference-1970s.jpg';
import shotWide from '/src/assets/media/shot-wide-forest-1970s.jpg';
import shotMedium from '/src/assets/media/shot-medium-train-1970s.jpg';
import shotCloseup from '/src/assets/media/shot-closeup-campfire-1970s.jpg';
import takeA from '/src/assets/media/take-a-1970s.jpg';
import takeB from '/src/assets/media/take-b-1970s.jpg';
import takeC from '/src/assets/media/take-c-1970s.jpg';
import takeD from '/src/assets/media/take-d-1970s.jpg';

// Homepage & Persona Video Loops (Vite-managed imports from src/assets/media/)
import personaCdVideo from '/src/assets/media/persona-cd-loop.mp4';
import personaFilmVideo from '/src/assets/media/persona-film-loop.mp4';
import personaAgenciesVideo from '/src/assets/media/persona-agencies-loop.mp4';
import personaCreatorsVideo from '/src/assets/media/persona-creators-loop.mp4';
import shotWideVideo from '/src/assets/media/shot-wide-forest.mp4';
import shotMediumVideo from '/src/assets/media/shot-medium-train.mp4';
import shotCloseupVideo from '/src/assets/media/shot-closeup-campfire.mp4';
import takeKlingVideo from '/src/assets/media/take-kling.mp4';
import takeVeoVideo from '/src/assets/media/take-veo.mp4';
import takeSoraVideo from '/src/assets/media/take-sora.mp4';
import takeRunwayVideo from '/src/assets/media/take-runway.mp4';

// Solutions pages — 3 workflow frames & videos per persona (Warm Golden Sepia & Kodachrome Portraiture)
import cdExplore from '/src/assets/media/solutions/cd-explore-1970s.jpg';
import cdTalent from '/src/assets/media/solutions/cd-talent-1970s.jpg';
import cdPresent from '/src/assets/media/solutions/cd-present-1970s.jpg';
import filmBreakdown from '/src/assets/media/solutions/film-breakdown-1970s.jpg';
import filmCast from '/src/assets/media/solutions/film-cast-1970s.jpg';
import filmPlates from '/src/assets/media/solutions/film-plates-1970s.jpg';
import agencyBeverage from '/src/assets/media/solutions/agency-beverage-1970s.jpg';
import agencyTech from '/src/assets/media/solutions/agency-tech-1970s.jpg';
import agencyFashion from '/src/assets/media/solutions/agency-fashion-1970s.jpg';
import creatorHost from '/src/assets/media/solutions/creator-host-1970s.jpg';
import creatorCave from '/src/assets/media/solutions/creator-cave-1970s.jpg';
import creatorSummit from '/src/assets/media/solutions/creator-summit-1970s.jpg';

import cdExploreVideo from '/src/assets/media/solutions/cd-explore.mp4';
import cdTalentVideo from '/src/assets/media/solutions/cd-talent.mp4';
import cdPresentVideo from '/src/assets/media/solutions/cd-present.mp4';
import filmBreakdownVideo from '/src/assets/media/solutions/film-breakdown.mp4';
import filmCastVideo from '/src/assets/media/solutions/film-cast.mp4';
import filmPlatesVideo from '/src/assets/media/solutions/film-plates.mp4';
import agencyBeverageVideo from '/src/assets/media/solutions/agency-beverage.mp4';
import agencyTechVideo from '/src/assets/media/solutions/agency-tech.mp4';
import agencyFashionVideo from '/src/assets/media/solutions/agency-fashion.mp4';
import creatorHostVideo from '/src/assets/media/solutions/creator-host.mp4';
import creatorCaveVideo from '/src/assets/media/solutions/creator-cave.mp4';
import creatorSummitVideo from '/src/assets/media/solutions/creator-summit.mp4';

// Feature pages — 1970s Dichromatic Split-Tone (Burnt Amber & Prussian Cyan)
import featCharacterSwap from '/src/assets/media/features/character-swap-1970s.jpg';
import featMultiReference from '/src/assets/media/features/multi-reference-1970s.jpg';
import featQuickStart from '/src/assets/media/features/quick-start-1970s.jpg';
import featStoryboard from '/src/assets/media/features/storyboard-1970s.jpg';
import featBudgets from '/src/assets/media/features/project-budgets-1970s.jpg';
import featTeam from '/src/assets/media/features/team-1970s.jpg';
import featProduce from '/src/assets/media/features/produce-export-1970s.jpg';
import featAgentic from '/src/assets/media/features/agentic-workflows-1970s.jpg';
import featReferral from '/src/assets/media/features/referral-program-1970s.jpg';

import featCharacterSwapVideo from '/src/assets/media/features/character-swap.mp4';
import featMultiReferenceVideo from '/src/assets/media/features/multi-reference.mp4';
import featQuickStartVideo from '/src/assets/media/features/quick-start.mp4';
import featStoryboardVideo from '/src/assets/media/features/storyboard.mp4';
import featBudgetsVideo from '/src/assets/media/features/project-budgets.mp4';
import featTeamVideo from '/src/assets/media/features/team.mp4';
import featProduceVideo from '/src/assets/media/features/produce-export.mp4';
import featAgenticVideo from '/src/assets/media/features/agentic-workflows.mp4';
import featReferralVideo from '/src/assets/media/features/referral-program.mp4';

// Section-specific 1970s photochemical banners
import sectionModelsTeal from '/src/assets/media/section-models-teal-1970s.jpg';
import sectionMcpPhosphor from '/src/assets/media/section-mcp-phosphor-1970s.jpg';
import sectionResourcesPress from '/src/assets/media/section-resources-press-1970s.jpg';

export interface MediaSlot {
  /** Stable ID — shown in the dev tag so the founder can find the slot here. */
  id: string;
  image: ImageMetadata;
  /** Optional looping video (Vite-resolved asset URL). Image is used as poster. */
  video?: string;
  alt: string;
  /** What to generate for this slot. */
  brief: string;
}

const slot = (s: MediaSlot) => s;

export const media = {
  /* ---------- Use-case rotator & Solutions Heroes (16:9, 1970s Technicolor Kodak 5254) ---------- */
  personaCreativeDirectors: slot({
    id: 'persona-creative-directors',
    image: personaCreativeDirectors,
    video: personaCdVideo,
    alt: '1970s endurance motorsport creative director and team principal reviewing 35mm storyboards on the pit wall at golden hour',
    brief: '16:9 loop, 6s, 1970s Technicolor (Kodak 5254). Creative Director and Team Principal Marcus reviewing 35mm contact sheets and Heuer stopwatches on the pit wall.',
  }),
  personaFilmProduction: slot({
    id: 'persona-film-production',
    image: personaFilmProduction,
    video: personaFilmVideo,
    alt: '1970s endurance film crew with Panavision 35mm camera rig tracking Lead Driver Elena Vance in the paddock',
    brief: '16:9 loop, 6s, 1970s Technicolor (Kodak 5254). Narrative previs: Panavision 35mm dolly crew filming Lead Driver Elena Vance in cream Nomex suit in the misty paddock.',
  }),
  personaAgencies: slot({
    id: 'persona-agencies',
    image: personaAgencies,
    video: personaAgenciesVideo,
    alt: '1970s motorsport sponsor producers coordinating three distinct racing livery bays in one garage workspace',
    brief: '16:9 loop, 6s, 1970s Technicolor (Kodak 5254). Three adjacent sponsor garage bays (beverage, chronograph, automotive) managed from one central producer desk.',
  }),
  personaContentCreators: slot({
    id: 'persona-content-creators',
    image: personaContentCreators,
    video: personaCreatorsVideo,
    alt: '1970s trackside motorsport chronicler filming Lead Driver Elena Vance at sunset with a 16mm Beaulieu camera',
    brief: '16:9 loop, 6s, 1970s Technicolor (Kodak 5254). Recurring motorsport host filming trackside at sunset with a vintage 16mm camera and directional mic.',
  }),

  /* ---------- Product tour: Lock (character consistency — Lead Driver Elena Vance) ---------- */
  characterReference: slot({
    id: 'lock-reference',
    image: characterReference,
    alt: 'Character reference portrait of Lead Driver Elena Vance in cream 1970s Nomex racing suit used to lock identity across shots',
    brief: '3:4 still, 1970s Technicolor. Front-facing reference portrait of Lead Driver Elena Vance in cream Nomex racing suit with vintage stripes.',
  }),
  shotWide: slot({
    id: 'lock-shot-wide',
    image: shotWide,
    video: shotWideVideo,
    alt: 'Wide establishing shot of Lead Driver Elena Vance walking past vintage race haulers and pine forest at misty sunrise',
    brief: '16:9 loop, 5s, 1970s Technicolor. Wide shot of the SAME reference character (Elena Vance) walking through the misty morning endurance paddock.',
  }),
  shotMedium: slot({
    id: 'lock-shot-medium',
    image: shotMedium,
    video: shotMediumVideo,
    alt: 'Medium shot of Lead Driver Elena Vance conferring at the window of the 1970s mobile telemetry trailer',
    brief: '16:9 loop, 5s, 1970s Technicolor. Medium tracking shot of Elena Vance leaning into the mobile telemetry trailer under warm tungsten light.',
  }),
  shotCloseup: slot({
    id: 'lock-shot-closeup',
    image: shotCloseup,
    video: shotCloseupVideo,
    alt: 'Close-up of Lead Driver Elena Vance lit by a warm glowing pit-lane brazier during a night endurance stint',
    brief: '16:9 loop, 5s, 1970s Technicolor. Intimate close-up of Elena Vance by a glowing night pit-lane fire drum — proves face lock holds under dramatic light.',
  }),

  /* ---------- Product tour: Generate (one shot, multiple models — 1970s Pit Stop) ---------- */
  takeA: slot({
    id: 'take-kling',
    image: takeA,
    video: takeKlingVideo,
    alt: 'Take from Kling 3.0: high-angle crane view of a 1970s endurance pit crew servicing the #10 car at golden hour',
    brief: '16:9 loop, 5s, 1970s Technicolor. SAME prompt rendered with Kling 3.0 — overhead pit-stop choreography and warm tungsten halation.',
  }),
  takeB: slot({
    id: 'take-veo',
    image: takeB,
    video: takeVeoVideo,
    alt: 'Take from Veo 3: low-angle tracking shot of the 1970s pit crew and Lead Driver Elena Vance during a sunset tire change',
    brief: '16:9 loop, 5s, 1970s Technicolor. SAME prompt rendered with Veo 3 — the selected winning take with dramatic low-angle sunset flare.',
  }),
  takeC: slot({
    id: 'take-sora',
    image: takeC,
    video: takeSoraVideo,
    alt: 'Take from Sora: side profile across the 1970s pit wall as the timekeeper clicks twin Heuer stopwatches at dusk',
    brief: '16:9 loop, 5s, 1970s Technicolor. SAME prompt rendered with Sora — widescreen pit-wall profile at twilight.',
  }),
  takeD: slot({
    id: 'take-runway',
    image: takeD,
    video: takeRunwayVideo,
    alt: 'Take from Runway Gen-4: dramatic rain-slicked dusk pit exit with anamorphic lens flare and wheel spray',
    brief: '16:9 loop, 5s, 1970s Technicolor. SAME prompt rendered with Runway Gen-4 — stormy dusk pit exit.',
  }),

  /* ---------- Solutions: Creative Directors workflow (Warm Golden Sepia & Kodachrome Portraiture) ---------- */
  cdExplore: slot({
    id: 'sol-cd-explore',
    image: cdExplore,
    video: cdExploreVideo,
    alt: 'Warm golden sepia Kodachrome close-up of a 1970s brushed-steel racing chronograph and storyboard sketches on the pit wall',
    brief: '16:9 loop, 5s, Warm Golden Sepia (#d97706 bias). Hero product exploration shot of a vintage racing chronograph and storyboard frames.',
  }),
  cdTalent: slot({
    id: 'sol-cd-talent',
    image: cdTalent,
    video: cdTalentVideo,
    alt: 'Warm golden sepia portrait of Lead Driver Elena Vance holding a vintage racing chronograph in golden rim light',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Campaign talent (Elena Vance) locked to reference portrait + wardrobe + paddock set.',
  }),
  cdPresent: slot({
    id: 'sol-cd-present',
    image: cdPresent,
    video: cdPresentVideo,
    alt: 'Warm golden sepia Kodachrome frame of the creative director presenting the finished animatic reel to sponsors in the paddock lounge',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Client-ready presentation cut in the wood-paneled 1970s paddock club.',
  }),

  /* ---------- Solutions: Film Producers workflow (Warm Golden Sepia & Kodachrome Portraiture) ---------- */
  filmBreakdown: slot({
    id: 'sol-film-breakdown',
    image: filmBreakdown,
    video: filmBreakdownVideo,
    alt: 'Warm golden sepia Kodachrome shot of Team Principal Marcus and film producer breaking down script pages on the garage workbench',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Scene breakdown from script pages with 35mm storyboard strips and miniature track map.',
  }),
  filmCast: slot({
    id: 'sol-film-cast',
    image: filmCast,
    video: filmCastVideo,
    alt: 'Warm golden sepia 85mm close-up of Lead Driver Elena Vance fastening her vintage Bell helmet in the pit box',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Intimate 85mm portrait proving cast and wardrobe continuity across the sequence.',
  }),
  filmPlates: slot({
    id: 'sol-film-plates',
    image: filmPlates,
    video: filmPlatesVideo,
    alt: 'Warm golden sepia Kodachrome shot of a 1970s Panavision camera car filming live track plates beside the pit crew',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Hybrid production: real 35mm camera car location plates blended with AI previs shots.',
  }),

  /* ---------- Solutions: Agencies workflow (Warm Golden Sepia & Kodachrome Portraiture) ---------- */
  agencyBeverage: slot({
    id: 'sol-agency-beverage',
    image: agencyBeverage,
    video: agencyBeverageVideo,
    alt: 'Warm golden sepia commercial frame of a chilled glass bottle of vintage Italian citrus soda on a sunlit pit counter',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Client A isolated campaign frame (vintage motorsport beverage sponsor).',
  }),
  agencyTech: slot({
    id: 'sol-agency-tech',
    image: agencyTech,
    video: agencyTechVideo,
    alt: 'Warm golden sepia commercial frame of 1970s precision analog lap-timing instruments and headsets in the agency review suite',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Client B isolated campaign frame (precision timing & telemetry sponsor).',
  }),
  agencyFashion: slot({
    id: 'sol-agency-fashion',
    image: agencyFashion,
    video: agencyFashionVideo,
    alt: 'Warm golden sepia editorial shot of a model in a tailored camel leather driving coat beside a classic endurance coupe',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Client C delivered campaign frame (1970s heritage driving outerwear).',
  }),

  /* ---------- Solutions: Content Creators workflow (Warm Golden Sepia & Kodachrome Portraiture) ---------- */
  creatorHost: slot({
    id: 'sol-creator-host',
    image: creatorHost,
    video: creatorHostVideo,
    alt: 'Warm golden sepia shot of a charismatic 1970s motorsport host speaking to camera in a wood-paneled garage studio',
    brief: '16:9 loop, 5s, Warm Golden Sepia. Recurring creator host introducing an episode in the vintage garage studio.',
  }),
  creatorCave: slot({
    id: 'sol-creator-cave',
    image: creatorCave,
    video: creatorCaveVideo,
    alt: 'Warm golden sepia shot of the same motorsport host filming inside the echoing stadium tunnel beneath the banked track',
    brief: '16:9 loop, 5s, Warm Golden Sepia. SAME host in the dramatic stadium tunnel — proves reference lock holds across locations.',
  }),
  creatorSummit: slot({
    id: 'sol-creator-summit',
    image: creatorSummit,
    video: creatorSummitVideo,
    alt: 'Warm golden sepia shot of the same motorsport host celebrating on the scenic overlook ridge above the circuit at sunset',
    brief: '16:9 loop, 5s, Warm Golden Sepia. SAME host on the circuit overlook ridge at golden hour — thumbnail-ready finale.',
  }),

  /* ---------- Feature pages (16:9; 1970s Dichromatic Split-Tone: Burnt Amber #f97316 & Prussian Cyan #0e4f63) ---------- */
  featCharacterSwap: slot({
    id: 'feat-character-swap',
    image: featCharacterSwap,
    video: featCharacterSwapVideo,
    alt: '1970s dichromatic split-tone frame showing Lead Driver Elena Vance swapped seamlessly into a pit-lane dolly shot with identical lighting and motion',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Character Swap result preserving exact cockpit/pit camera motion and lighting.',
  }),
  featMultiReference: slot({
    id: 'feat-multi-reference',
    image: featMultiReference,
    video: featMultiReferenceVideo,
    alt: '1970s dichromatic split-tone composition combining Lead Driver Elena Vance, vintage Nomex livery, and rain-slicked cyan pit lane',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Multi-reference lock combining character + racing suit + night pit environment.',
  }),
  featQuickStart: slot({
    id: 'feat-quick-start',
    image: featQuickStart,
    video: featQuickStartVideo,
    alt: '1970s dichromatic split-tone commercial shot of an endurance racer launching out of the pit box in a shower of amber sparks',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). High-impact Quick-Start output shot with dramatic amber/cyan contrast.',
  }),
  featStoryboard: slot({
    id: 'feat-storyboard',
    image: featStoryboard,
    video: featStoryboardVideo,
    alt: '1970s dichromatic split-tone view of an illuminated storyboard wall in the race strategy room with pinned 35mm film strips',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Collaborative race strategy storyboard table with 35mm frames and wax-pencil notes.',
  }),
  featBudgets: slot({
    id: 'feat-project-budgets',
    image: featBudgets,
    video: featBudgetsVideo,
    alt: '1970s dichromatic split-tone shot of Team Principal Marcus managing three isolated mechanical credit counters for separate sponsor campaigns',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Isolated project budget vaults in the pit control booth.',
  }),
  featTeam: slot({
    id: 'feat-team',
    image: featTeam,
    video: featTeamVideo,
    alt: '1970s dichromatic split-tone portrait of the endurance racing team principal, driver, chief mechanic, and strategist reviewing dailies together',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Full motorsport crew collaborating around a glowing viewing table.',
  }),
  featProduce: slot({
    id: 'feat-produce-export',
    image: featProduce,
    video: featProduceVideo,
    alt: '1970s dichromatic split-tone shot of a film editor in a mobile broadcast van threading a finished 35mm master reel into a telecine deck',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Broadcast van telecine master deck exporting the final cut.',
  }),
  featAgentic: slot({
    id: 'feat-agentic-workflows',
    image: featAgentic,
    video: featAgenticVideo,
    alt: '1970s dichromatic split-tone shot of Chief Strategist Agent Z orchestrating synchronized pit-crew batch operations and Dry Run cost gauges',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Agent Z batch command desk with Dry Run cost gauges and approval switch.',
  }),
  featReferral: slot({
    id: 'feat-referral-program',
    image: featReferral,
    video: featReferralVideo,
    alt: '1970s dichromatic split-tone shot of two endurance racing team principals shaking hands across the pit wall and exchanging a brass VIP pass',
    brief: '16:9 loop, 5s, Dichromatic Split-Tone (Burnt Amber & Prussian Cyan). Two team principals exchanging an embossed brass paddock pass across the pit wall.',
  }),

  /* ---------- Section-Specific Photochemical Accent Plates ---------- */
  sectionModelsTeal: slot({
    id: 'section-models-teal',
    image: sectionModelsTeal,
    alt: 'Anamorphic teal and silver-halide chrome close-up of a 1970s master engine tuner calibrating four synchronized mechanical tachometers',
    brief: '16:9 Cool Anamorphic Teal & Silver-Halide Chrome (#0d9488 / #38bdf8). Engine tuner calibrating four synchronized tachometers in the dyno bay.',
  }),
  sectionMcpPhosphor: slot({
    id: 'section-mcp-phosphor',
    image: sectionMcpPhosphor,
    alt: '1970s control-room amber phosphor and charcoal telemetry room with glowing CRT oscilloscopes and analog patch-bay cables',
    brief: '16:9 1970s Control-Room Amber Phosphor & Charcoal. Telemetry engineer operating a modular console with glowing amber/emerald CRT traces.',
  }),
  sectionResourcesPress: slot({
    id: 'section-resources-press',
    image: sectionResourcesPress,
    alt: 'Archival 1970s LIFE/Magnum photojournalism portrait of the endurance racing crew and drivers laughing together around a garage chalkboard',
    brief: '16:9 Archival 1970s Photojournalism (Warm Matte Press Stock). Candid behind-the-scenes camaraderie around the garage chalkboard.',
  }),
};

export type MediaKey = keyof typeof media;
