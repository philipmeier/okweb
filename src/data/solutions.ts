/**
 * SOLUTIONS — persona / ICP data.
 *
 * Drives: homepage use-case rotator, /solutions hub, /solutions/[slug] pages.
 * Copy rules: headline ≤ 8 words, summary ≤ 20 words, chips ≤ 4 words,
 * pain/after lines ≤ 10 words, workflow body ≤ 22 words.
 *
 * ⚠️ PLACEHOLDER: `stats`, `testimonial`, and some workflow claims are
 * illustrative. Refine before launch (see docs/ROADMAP.md).
 */
import { media, type MediaSlot } from './media';
import type { FeatureKey } from './features';

export interface Solution {
  slug: string;
  /** Tab label on the homepage + nav. */
  label: string;
  /** H1 for the landing page — tuned for search intent. */
  pageTitle: string;
  /** Hub "I need to…" line. */
  need: string;
  headline: string;
  summary: string;
  /** Landing-page hero subhead (≤ 30 words). */
  heroSub: string;
  chips: [string, string, string];
  cta: string;
  /** Subtle per-persona accent (dots, glows). Brand orange stays primary. */
  accent: string;
  media: MediaSlot;
  pains: { before: string; after: string }[];
  workflow: { tag: string; title: string; body: string; media: MediaSlot }[];
  features: FeatureKey[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; name: string; title: string; company: string };
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
}

export const solutions: Solution[] = [
  /* ───────────────────────── Creative Directors ───────────────────────── */
  {
    slug: 'creative-directors',
    label: 'Creative Directors',
    pageTitle: 'AI Video for Creative Directors',
    need: 'Pitch concepts clients can actually see',
    headline: 'Pitch to animatic in an afternoon.',
    summary: 'Explore every model on the same shot, lock your talent, and send client-ready previews before the call.',
    heroSub: 'Explore a concept across every major model, lock your talent and look, and walk into the meeting with a cut, not a moodboard.',
    chips: ['A/B every model', 'Locked brand talent', 'Client-ready previews'],
    cta: 'See how creative directors use 10zebra',
    accent: '#fbbf24',
    media: media.personaCreativeDirectors,
    pains: [
      { before: 'Testing one model at a time, tab by tab', after: 'Every model on the same shot, side by side' },
      { before: 'Talent looks different in every frame', after: 'One reference locks face, wardrobe, and styling' },
      { before: 'Static boards clients struggle to picture', after: 'Moving previews ready before the call' },
    ],
    workflow: [
      {
        tag: 'Make an Ad',
        title: 'Explore the look',
        body: 'Start from the Make an Ad tool. Render key shots in Kling, Veo, and Sora, then pick the winning direction.',
        media: media.cdExplore,
      },
      {
        tag: 'Multi-Reference',
        title: 'Lock your talent',
        body: 'Anchor every shot to a talent reference. Blend wardrobe and set with multi-reference editing.',
        media: media.cdTalent,
      },
      {
        tag: 'Produce & Export',
        title: 'Present the cut',
        body: 'Trim takes, add a music bed, and share a preview link, or export the animatic for the deck.',
        media: media.cdPresent,
      },
    ],
    features: ['modelComparison', 'multiReference', 'quickStart', 'produceExport'],
    // PLACEHOLDER stats
    stats: [
      { value: '4×', label: 'more directions per pitch' },
      { value: 'Same day', label: 'concept to animatic' },
      { value: '8+', label: 'models in one workspace' },
    ],
    // PLACEHOLDER testimonial
    testimonial: {
      quote: 'We walked into the pitch with three animated directions instead of one static board. The client picked in ten minutes.',
      name: 'Jamie L.',
      title: 'Creative Director',
      company: 'Company Name',
    },
    faqs: [
      {
        q: 'Can I compare AI video models on the same shot?',
        a: 'Yes. Send one prompt to Kling, Veo, Sora, Runway, and more, then compare the takes side by side and keep the best. Every take logs its prompt, model, and settings.',
      },
      {
        q: 'How do I keep talent consistent across a campaign?',
        a: 'Generate or upload a reference portrait and anchor every shot to it. Multi-reference editing blends up to three references (character, wardrobe, and environment) into one frame.',
      },
      {
        q: 'How do I share work with a client?',
        a: 'Arrange your best takes on the storyboard, trim them, add audio, then share a preview link or export an MP4 for your deck.',
      },
      {
        q: 'Do I need a subscription to try it?',
        a: 'No. Every account starts with 200 free credits and no subscription. Purchased top-ups never expire.',
      },
    ],
    seo: {
      title: 'AI Video for Creative Directors | 10zebra',
      description: 'Concept, compare, and present AI video across Kling, Veo, Sora & Runway in one workspace. Lock talent and ship client-ready previews fast.',
    },
  },

  /* ─────────────────────────── Film Producers ─────────────────────────── */
  {
    slug: 'film-producers',
    label: 'Film Producers',
    pageTitle: 'AI Previs & Storyboarding for Film Producers',
    need: 'Previs a scene before the scout',
    headline: 'Previs that keeps continuity.',
    summary: 'Turn script pages into shot sequences with locked characters and sets, then cut in your real plates.',
    heroSub: 'Turn script pages into previs with a consistent cast and sets, cut in your real plates, and keep every take and prompt on record.',
    chips: ['Script to shot list', 'Character + set lock', 'Mix real footage'],
    cta: 'See how film producers use 10zebra',
    accent: '#f97316',
    media: media.personaFilmProduction,
    pains: [
      { before: 'Previs that eats the art department budget', after: 'Script pages to shot sequences in one pass' },
      { before: 'Your lead changes face between shots', after: 'Cast and sets locked across the sequence' },
      { before: 'AI shots that can’t sit beside real footage', after: 'Real plates and AI takes on one storyboard' },
    ],
    workflow: [
      {
        tag: 'From a Script',
        title: 'Break down the scene',
        body: 'Paste a scene into From a Script. 10zebra splits it into 3–30 shots with matching art direction.',
        media: media.filmBreakdown,
      },
      {
        tag: 'Character Swap',
        title: 'Lock cast & sets',
        body: 'Anchor characters and environments to references. Recast across every take at once with the 10z Agent.',
        media: media.filmCast,
      },
      {
        tag: 'Hybrid Projects',
        title: 'Cut in real plates',
        body: 'Upload location footage, mix it with AI takes, and trim the sequence shot by shot.',
        media: media.filmPlates,
      },
    ],
    features: ['textToSequence', 'characterSwap', 'collaborativeStoryboard', 'modelComparison'],
    // PLACEHOLDER stats (first and last reflect product facts)
    stats: [
      { value: '3–30', label: 'shots from a single scene' },
      { value: '100%', label: 'of prompts and takes on record' },
      { value: '8+', label: 'models per shot' },
    ],
    // PLACEHOLDER testimonial
    testimonial: {
      quote: 'We previs’d the whole sequence before the scout. Same lead, same ship, every shot, and the director could finally see it.',
      name: 'Dana V.',
      title: 'Producer',
      company: 'Production Company Name',
    },
    faqs: [
      {
        q: 'Can 10zebra generate a full scene from a script?',
        a: 'Yes. From a Script turns a scene into 3–30 structured shots with consistent characters and art direction. Three Acts builds a 60-second narrative arc.',
      },
      {
        q: 'Can I mix real footage with AI-generated shots?',
        a: 'Yes. Upload your own footage alongside AI takes in the same storyboard, reimagine uploads with AI, and trim each clip before assembling the sequence.',
      },
      {
        q: 'How do I keep continuity across a sequence?',
        a: 'Story settings, camera guidelines, and reference locks persist across the project, so every collaborator generates with the same cast, sets, and look.',
      },
      {
        q: 'Can my director and VFX lead work in the same project?',
        a: 'Yes. Invite collaborators with role-based permissions. Everyone works from one shared storyboard and one project budget.',
      },
    ],
    seo: {
      title: 'AI Previs & Storyboarding for Film Producers | 10zebra',
      description: 'Generate previs and animatics with consistent characters and environments across every shot. Mix uploaded footage and track every take.',
    },
  },

  /* ────────────────────────────── Agencies ────────────────────────────── */
  {
    slug: 'agencies',
    label: 'Agencies',
    pageTitle: 'AI Video Production for Agencies',
    need: 'Run many clients without budget bleed',
    headline: 'Every client gets its own budget.',
    summary: 'Fund each project separately, give your team the right roles, and see exactly where every credit went.',
    heroSub: 'Run every client in its own project with its own budget, team, and audit trail, and deliver campaign-ready video from every model.',
    chips: ['Per-project credits', 'Role permissions', 'Billable audit trail'],
    cta: 'See how agencies use 10zebra',
    accent: '#38bdf8',
    media: media.personaAgencies,
    pains: [
      { before: 'One shared credit pool for every client', after: 'Separate budgets per project, no bleed' },
      { before: 'No idea who spent what, on which model', after: 'Every generation logged with user, model, and cost' },
      { before: 'Freelancers with access to everything', after: 'Role-based permissions, set per project' },
    ],
    workflow: [
      {
        tag: 'Project Budgets',
        title: 'Spin up a client project',
        body: 'Create a project per client, fund it with its own credits, and choose its credit policy.',
        media: media.agencyBeverage,
      },
      {
        tag: 'Team Roles',
        title: 'Brief the team',
        body: 'Invite creatives and freelancers with the right role. A shared reference library keeps the brand on-model.',
        media: media.agencyTech,
      },
      {
        tag: 'Activity Log',
        title: 'Deliver & reconcile',
        body: 'Export finals or publish to YouTube, then use the activity log to reconcile spend per client.',
        media: media.agencyFashion,
      },
    ],
    features: ['projectBudgets', 'teamManagement', 'collaborativeStoryboard', 'publishYouTube'],
    // PLACEHOLDER stats
    stats: [
      { value: '0', label: 'cross-project budget bleed' },
      { value: 'Per project', label: 'roles and permissions' },
      { value: '100%', label: 'of generations logged with cost' },
    ],
    // PLACEHOLDER testimonial
    testimonial: {
      quote: 'Each client has its own budget and its own team. I finally know what every campaign cost before the invoice goes out.',
      name: 'Marcus R.',
      title: 'Head of Production',
      company: 'Agency Name',
    },
    faqs: [
      {
        q: 'How do project-level budgets work?',
        a: 'Each project has its own credit pool. Owners choose whether members draw from project credits first, personal credits, or project credits only.',
      },
      {
        q: 'Can I limit what freelancers can do?',
        a: 'Yes. Permissions are set per project: who can generate, edit titles, manage members, or start workflows.',
      },
      {
        q: 'Can I see what each client project cost?',
        a: 'Every generation is logged with who ran it, which model they used, and the credit cost, giving you a complete audit trail per project.',
      },
      {
        q: 'Is there a plan built for agencies?',
        a: 'The Director plan ($79/mo) includes 3,500 monthly credits, 30% off top-ups, project-level budget controls, and a shared reference library.',
      },
    ],
    seo: {
      title: 'AI Video Production for Agencies | 10zebra',
      description: 'Project-level budgets, role-based permissions, and a full audit trail per client. The AI video workspace built for agency teams.',
    },
  },

  /* ─────────────────────────── Content Creators ─────────────────────────── */
  {
    // Slug stays broad ("content-creators"); page H1 + SEO title target "YouTubers" search intent too.
    slug: 'content-creators',
    label: 'Content Creators',
    pageTitle: 'AI Video for YouTubers & Content Creators',
    need: 'Publish a consistent series every week',
    headline: 'Ship YouTube-ready videos every week.',
    summary: 'Script to finished cut in one place, with recurring characters, any model, and direct export to YouTube.',
    heroSub: 'Go from script to a finished, consistent episode in one workspace, with recurring characters, any model, and one-click publishing to YouTube.',
    chips: ['Script to sequence', 'Recurring characters', 'Export to YouTube'],
    cta: 'See how creators use 10zebra',
    accent: '#34d399',
    media: media.personaContentCreators,
    pains: [
      { before: 'Five tools and a downloads folder per video', after: 'Script, generate, edit, and publish in one place' },
      { before: 'Your recurring character looks new every episode', after: 'One reference keeps your host on-model' },
      { before: 'Hours lost exporting and re-uploading', after: 'Publish to YouTube straight from the timeline' },
    ],
    workflow: [
      {
        tag: 'Text-to-Sequence',
        title: 'Script to sequence',
        body: 'Drop in your script or use Three Acts for a 60-second arc. Shots generate in story order.',
        media: media.creatorHost,
      },
      {
        tag: 'Reference Lock',
        title: 'Keep your host on-model',
        body: 'Lock your character once. Every episode, location, and angle keeps the same face.',
        media: media.creatorCave,
      },
      {
        tag: '1-Click Publish',
        title: 'Publish every week',
        body: 'Trim, add music, set the title, tags, and privacy, then push straight to YouTube.',
        media: media.creatorSummit,
      },
    ],
    features: ['textToSequence', 'quickStart', 'characterSwap', 'publishYouTube'],
    // Mostly product facts; refine as needed
    stats: [
      { value: '200', label: 'free credits to start' },
      { value: '9:16', label: 'social microdrama tool' },
      { value: '1-click', label: 'publish to YouTube' },
    ],
    // PLACEHOLDER testimonial
    testimonial: {
      quote: 'Script to finished episode in one place. My recurring character actually looks the same every single week.',
      name: 'Sara K.',
      title: 'YouTube Creator',
      company: 'Channel Name',
    },
    faqs: [
      {
        q: 'Can I publish directly to YouTube?',
        a: 'Yes. Set the title, tags, description, and privacy (Public, Unlisted, or Private) and publish straight from 10zebra, with no local download.',
      },
      {
        q: 'Can I make vertical videos for Shorts?',
        a: 'Yes. The Grok quick-start tool generates 9:16 social microdramas built for Shorts, Reels, and TikTok.',
      },
      {
        q: 'How do I keep a recurring character consistent?',
        a: 'Create your character once as a reference image. Every new shot is anchored to it, and Character Swap can update existing takes in bulk.',
      },
      {
        q: 'How much does it cost to start?',
        a: 'Nothing. You get 200 free credits (about 5 Kling shots or 20 Grok clips) with no subscription required.',
      },
    ],
    seo: {
      title: 'AI Video Generator for YouTubers & Content Creators | 10zebra',
      description: 'Turn a script into a finished, consistent video series using Kling, Veo, Sora & more, then publish straight to YouTube. Start free.',
    },
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
