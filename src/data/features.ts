/**
 * FEATURE CATALOG — single source of truth for feature cards & visuals.
 *
 * Drives: /features hub (pipeline + mosaic), feature detail pages (hero backdrop,
 * output showcase, related cards, "who uses this"), and solution pages (tool cards).
 * Titles/blurbs mirror /features; keep blurbs ≤ 12 words.
 *
 * Visuals: `media` is the hero image. Add `gallery` (3 or 4 slots) to render a
 * strip (3) or 2×2 grid (4) instead, e.g. the same prompt across 4 models.
 */
import { media, type MediaSlot } from './media';
import { featureGates } from './config';

export type PhaseKey = 'generate' | 'direct' | 'finish' | 'manage';

export interface FeatureRef {
  title: string;
  /** Short label for chips / nav (≤ 3 words). */
  short: string;
  blurb: string;
  href: string;
  /** Heroicons-style outline path (24x24). */
  icon: string;
  phase: PhaseKey;
  badge: string;
  media: MediaSlot;
  gallery?: { slot: MediaSlot; label: string }[];
}

export const phases: Record<PhaseKey, { num: string; label: string; line: string }> = {
  generate: { num: '01', label: 'Generate', line: 'Every top model. One prompt. Pick the winner.' },
  direct: { num: '02', label: 'Direct', line: 'Lock faces, wardrobe, and sets across every shot.' },
  finish: { num: '03', label: 'Finish', line: 'Cut, score, and publish without leaving the board.' },
  manage: { num: '04', label: 'Manage', line: 'Budgets, roles, and one shared storyboard per project.' },
};

export const features = {
  modelComparison: {
    title: 'Side-by-Side Model Comparison',
    short: 'Model Comparison',
    blurb: 'One prompt across Kling, Veo, Sora, Runway & more. Keep the winner.',
    href: '/features/model-comparison/index.html',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    phase: 'generate',
    badge: 'Flagship',
    media: media.takeA,
    gallery: [
      { slot: media.takeA, label: 'Kling' },
      { slot: media.takeB, label: 'Veo' },
      { slot: media.takeC, label: 'Sora' },
      { slot: media.takeD, label: 'Runway' },
    ],
  },
  textToSequence: {
    title: 'Text-to-Sequence',
    short: 'Text-to-Sequence',
    blurb: 'One prompt becomes a run of cohesive, ordered shots.',
    href: '/features/text-to-sequence/index.html',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
    phase: 'generate',
    badge: 'Story Engine',
    media: media.shotWide,
    gallery: [
      { slot: media.shotWide, label: 'Wide' },
      { slot: media.shotMedium, label: 'Medium' },
      { slot: media.shotCloseup, label: 'Close' },
    ],
  },
  quickStart: {
    title: 'Quick Start Tools',
    short: 'Quick Start',
    blurb: 'Start a new storyboard or extend any scene in-project with 6 guided tools.',
    href: '/features/quick-start-tools/index.html',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    phase: 'generate',
    badge: '6 Tools',
    media: media.featQuickStart,
  },
  hybridProduction: {
    title: 'Hybrid Production',
    short: 'Hybrid Production',
    blurb: 'Combine live-action footage and real actors with AI-generated visuals or styles.',
    href: '/features/hybrid-production/index.html',
    icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
    phase: 'direct',
    badge: 'Live + AI',
    media: media.featHybridProduction,
    gallery: [
      { slot: media.featHybridLivePlate, label: 'Live-Action Plate' },
      { slot: media.featHybridStylizedTake, label: 'AI Restyled Take' },
      { slot: media.featCharacterSwap, label: 'Character Swap' },
    ],
  },
  characterSwap: {
    title: featureGates.agenticWorkflows ? 'Character Swap & Agent Z' : 'Character Swap',
    short: 'Character Swap',
    blurb: featureGates.agenticWorkflows
      ? 'Swap talent in any take, or batch-swap a whole project.'
      : 'Swap talent in AI takes or live-action footage while preserving motion.',
    href: '/features/character-swap/index.html',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    phase: 'direct',
    badge: 'Zero Drift',
    media: media.featCharacterSwap,
  },
  agenticWorkflows: {
    title: 'Agentic Workflows (Agent Z)',
    short: 'Agentic Workflows',
    blurb: 'Batch create, convert, replace, regen & upscale with Dry Run approval.',
    href: '/features/agentic-workflows/index.html',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    phase: 'direct',
    badge: 'Agent Z',
    media: media.featAgentic,
  },
  multiReference: {
    title: 'Multi-Reference Editing',
    short: 'Multi-Reference',
    blurb: 'Blend character, wardrobe, and environment into one frame.',
    href: '/features/multi-reference-edit/index.html',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    phase: 'direct',
    badge: 'Composition Lock',
    media: media.featMultiReference,
  },
  produceExport: {
    title: 'Produce & Export',
    short: 'Produce & Export',
    blurb: 'Arrange, trim, add audio, and export the final cut.',
    href: '/features/produce-and-export/index.html',
    icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
    phase: 'finish',
    badge: 'Timeline',
    media: media.featProduce,
  },
  publishYouTube: {
    title: '1-Click YouTube Publishing',
    short: 'YouTube Publishing',
    blurb: 'Set title, tags, and privacy, then publish from the timeline.',
    href: '/features/publish-to-youtube/index.html',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    phase: 'finish',
    badge: 'Instant Publish',
    media: media.creatorSummit,
  },
  projectBudgets: {
    title: 'Project Teams & Budgets',
    short: 'Teams & Budgets',
    blurb: featureGates.subscriptions
      ? 'Maker gets 2 team seats/project; Director gets unlimited seats & isolated credit vaults.'
      : 'Add team collaborators at no cost with project-level seats and isolated credit budgets.',
    href: '/features/project-management/index.html',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    phase: 'manage',
    badge: featureGates.subscriptions ? 'Teams & Budgets' : 'Free Collaborators',
    media: media.featBudgets,
  },
  teamManagement: {
    title: 'Team Roles & Permissions',
    short: 'Team Roles',
    blurb: featureGates.subscriptions
      ? '2 team seats/project on Maker, unlimited on Director, plus free client review seats.'
      : 'Collaborate at no extra cost—decide who can generate, edit, or review per project.',
    href: '/features/team-management/index.html',
    icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
    phase: 'manage',
    badge: 'Access Control',
    media: media.featTeam,
  },
  collaborativeStoryboard: {
    title: 'Collaborative Storyboard',
    short: 'Shared Storyboard',
    blurb: 'Shared story settings, camera rules, and reference locks.',
    href: '/features/collaborative-storyboard/index.html',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    phase: 'manage',
    badge: 'Live Sync',
    media: media.featStoryboard,
  },
  referralProgram: {
    title: 'Referral Program (3% Lifetime)',
    short: 'Referral Program',
    blurb: 'Share your referral code via Tolt and earn 3% lifetime payouts on credits & plans.',
    href: '/features/referral-program/index.html',
    icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
    phase: 'manage',
    badge: '3% Lifetime Payout',
    media: media.featReferral,
  },
} satisfies Record<string, FeatureRef>;

export type FeatureKey = keyof typeof features;

export const allFeatureEntries = Object.entries(features) as [FeatureKey, FeatureRef][];

export const featureEntries: [FeatureKey, FeatureRef][] = allFeatureEntries.filter(([key]) => {
  if (key === 'agenticWorkflows' && !featureGates.agenticWorkflows) return false;
  if (key === 'referralProgram' && !featureGates.referralProgram) return false;
  return true;
});

/** Look up a feature by its page URL (trailing slash & index.html tolerant). */
export const getFeatureByHref = (href: string): [FeatureKey, FeatureRef] | undefined => {
  const normalize = (u: string) => u.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  const clean = normalize(href);
  if (clean === '/referral-program' || clean === '/referrals') {
    return ['referralProgram', features.referralProgram];
  }
  return allFeatureEntries.find(([, f]) => normalize(f.href) === clean);
};
