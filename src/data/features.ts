/**
 * FEATURE CATALOG — short, linkable feature references used by solution pages.
 * Titles/blurbs mirror /features; keep blurbs ≤ 12 words.
 */
export interface FeatureRef {
  title: string;
  blurb: string;
  href: string;
  /** Heroicons-style outline path (24x24). */
  icon: string;
}

export const features = {
  modelComparison: {
    title: 'Side-by-Side Model Comparison',
    blurb: 'One prompt across Kling, Veo, Sora, Runway & more. Keep the winner.',
    href: '/features/model-comparison',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  textToSequence: {
    title: 'Text-to-Sequence',
    blurb: 'One prompt becomes a run of cohesive, ordered shots.',
    href: '/features/text-to-sequence',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
  },
  characterSwap: {
    title: 'Character Swap & 10z Agent',
    blurb: 'Swap talent in any take, or batch-swap a whole project.',
    href: '/features/character-swap',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  multiReference: {
    title: 'Multi-Reference Editing',
    blurb: 'Blend character, wardrobe, and environment into one frame.',
    href: '/features/multi-reference-edit',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  projectBudgets: {
    title: 'Project-Level Budgets',
    blurb: 'A separate credit pool and policy for every project.',
    href: '/features/project-management',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  teamManagement: {
    title: 'Team Roles & Permissions',
    blurb: 'Decide who can generate, edit, or manage, per project.',
    href: '/features/team-management',
    icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
  },
  collaborativeStoryboard: {
    title: 'Collaborative Storyboard',
    blurb: 'Shared story settings, camera rules, and reference locks.',
    href: '/features/collaborative-storyboard',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  quickStart: {
    title: 'Quick Start Tools',
    blurb: 'From a Script, Three Acts, Make an Ad, and more.',
    href: '/features/quick-start-tools',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  produceExport: {
    title: 'Produce & Export',
    blurb: 'Arrange, trim, add audio, and export the final cut.',
    href: '/features/produce-and-export',
    icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
  },
  publishYouTube: {
    title: '1-Click YouTube Publishing',
    blurb: 'Set title, tags, and privacy, then publish from the timeline.',
    href: '/features/publish-to-youtube',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
} satisfies Record<string, FeatureRef>;

export type FeatureKey = keyof typeof features;
