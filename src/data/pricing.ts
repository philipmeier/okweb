/**
 * PRICING DATA CATALOG — Single source of truth for 10zebra pricing.
 * Drives:
 * - Shared Pricing component (homepage & /pricing top section)
 * - Credit Packs section
 * - Model & Tool Rate Cards
 * - Plan Comparison Matrix
 * - Pricing FAQs
 */

export interface PricingPlan {
  id: 'payg' | 'maker' | 'director';
  name: string;
  kicker: string;
  desc: string;
  price: string;
  annualPrice: string;
  annualBilled: string;
  annualSavings: string;
  period: string;
  credit: string;
  approx: string;
  features: string[];
  cta: string;
  ctaHref: string;
  btnClass: string;
  featured: boolean;
  badge?: string;
}

export const plans: PricingPlan[] = [
  {
    id: 'payg',
    name: 'Pay-As-You-Go',
    kicker: 'Free Trial & Flexible Top-Ups',
    desc: 'Zero commitment. Test all models, export previs takes, and top up as you direct.',
    price: '$0',
    annualPrice: '$0',
    annualBilled: 'Free forever',
    annualSavings: '',
    period: '/ month',
    credit: '200 free trial credits on signup',
    approx: 'Approx. 5 Kling shots or 20 Grok clips',
    features: [
      '200 Free Trial Credits on signup',
      'All 8+ AI models (Kling, Veo, Sora, Runway, etc.)',
      'Purchased top-up credits never expire',
      'Full prompt, seed & generation history',
      'Model Context Protocol (MCP) server access',
      'Standard generation queue',
    ],
    cta: 'Start Free — 200 Credits',
    ctaHref: '/signup',
    btnClass: 'btn-ghost',
    featured: false,
  },
  {
    id: 'maker',
    name: 'Maker',
    kicker: 'Active Creators & Editors',
    desc: 'For YouTubers, digital directors, and solo creators producing regular video content.',
    price: '$29',
    annualPrice: '$23',
    annualBilled: 'Billed annually ($276/yr)',
    annualSavings: 'Save $72/yr',
    period: '/ month',
    credit: '1,200 monthly credits included',
    approx: 'Approx. 30 Kling shots or 60 Veo 3 Fast clips',
    features: [
      '1,200 Monthly Credits (refreshes each cycle)',
      '15% Discount on all extra top-up packs',
      'Purchased top-up credits never expire',
      'Priority generation queue (faster render times)',
      '10z Agent Character Swap & reference locks',
      '1080p & 4K upscaled video export',
      'Claude, Cursor & ChatGPT MCP integration',
    ],
    cta: 'Start Maker Plan',
    ctaHref: '/signup?plan=maker',
    btnClass: 'btn-primary',
    featured: true,
    badge: 'Most Popular',
  },
  {
    id: 'director',
    name: 'Director',
    kicker: 'Agencies & Production Teams',
    desc: 'For commercial agencies, previs supervisors, and studios running client projects.',
    price: '$79',
    annualPrice: '$63',
    annualBilled: 'Billed annually ($756/yr)',
    annualSavings: 'Save $192/yr',
    period: '/ month',
    credit: '3,500 monthly credits included',
    approx: 'Approx. 87 Kling shots or 175 Veo 3 Fast clips',
    features: [
      '3,500 Monthly Credits (refreshes each cycle)',
      '30% Discount on all extra top-up packs',
      'Project-level budget controls & spend caps',
      'Multi-seat collaboration with role-based permissions',
      'Shared team reference library & credit pools',
      'Fast-track generation queue across all models',
      '1-click sequence mixdown & direct YouTube publishing',
    ],
    cta: 'Start Director Plan',
    ctaHref: '/signup?plan=director',
    btnClass: 'btn-ghost',
    featured: false,
  },
];

export interface CreditPack {
  name: string;
  credits: string;
  basePrice: string;
  unitPrice: string;
  makerPrice: string;
  directorPrice: string;
  approx: string;
  idealFor: string;
  popular: boolean;
}

export const creditPacks: CreditPack[] = [
  {
    name: 'Starter Pack',
    credits: '400',
    basePrice: '$10',
    unitPrice: '$0.025 / credit',
    makerPrice: '$8.50',
    directorPrice: '$7.00',
    approx: 'Approx. 10 Kling shots or 40 Grok clips',
    idealFor: 'Quick one-off shot iterations',
    popular: false,
  },
  {
    name: 'Pro Pack',
    credits: '1,100',
    basePrice: '$25',
    unitPrice: '$0.022 / credit',
    makerPrice: '$21.25',
    directorPrice: '$17.50',
    approx: 'Approx. 27 Kling shots or 110 Grok clips',
    idealFor: 'Commercial spots & video scenes',
    popular: true,
  },
  {
    name: 'Studio Pack',
    credits: '2,400',
    basePrice: '$50',
    unitPrice: '$0.020 / credit',
    makerPrice: '$42.50',
    directorPrice: '$35.00',
    approx: 'Approx. 60 Kling shots or 240 Grok clips',
    idealFor: 'Complete multi-scene sequence',
    popular: false,
  },
  {
    name: 'Volume Pack',
    credits: '5,200',
    basePrice: '$100',
    unitPrice: '$0.019 / credit',
    makerPrice: '$85.00',
    directorPrice: '$70.00',
    approx: 'Approx. 130 Kling shots or 520 Grok clips',
    idealFor: 'Heavy production & team project pools',
    popular: false,
  },
];

export interface ModelRate {
  name: string;
  badge: string;
  desc: string;
  credits: string;
  type: string;
  speed: string;
  res: string;
}

export const modelRates: ModelRate[] = [
  {
    name: 'Kling 3.0',
    badge: 'Flagship Cinema',
    desc: 'State-of-the-art photoreal motion, complex camera pans, and prompt adherence.',
    credits: '40',
    type: 'per 5s video take',
    speed: 'Fast (~60s)',
    res: '1080p',
  },
  {
    name: 'Google Veo 3 (Fast)',
    badge: 'Rapid Previs',
    desc: 'Lightning-fast visual ideation and natural physics. Ideal for rapid shot exploring.',
    credits: '20',
    type: 'per 5s video take',
    speed: 'Ultra-Fast (~25s)',
    res: '1080p',
  },
  {
    name: 'Google Veo 3 (Ultra)',
    badge: 'High Fidelity',
    desc: 'Maximum cinematic fidelity and deep depth-of-field modeling.',
    credits: '45',
    type: 'per 5s video take',
    speed: 'Standard (~90s)',
    res: '1080p',
  },
  {
    name: 'OpenAI Sora',
    badge: 'Extended Physics',
    desc: 'Extended world simulations with intricate interaction and atmospheric physics.',
    credits: '50',
    type: 'per 5s video take',
    speed: 'Standard (~120s)',
    res: '1080p',
  },
  {
    name: 'Runway Gen-4',
    badge: 'Dynamic Motion',
    desc: 'Industry-standard cinematic motion, fluid camera movement, and lighting control.',
    credits: '35',
    type: 'per 5s video take',
    speed: 'Fast (~50s)',
    res: '1080p',
  },
  {
    name: 'Grok Video',
    badge: 'Rapid Drafting',
    desc: 'Ultra-affordable, rapid ideation clips for quick rough cuts and animatics.',
    credits: '10',
    type: 'per 4s video take',
    speed: 'Ultra-Fast (~20s)',
    res: '720p / 1080p',
  },
  {
    name: 'SeeDance 2.0',
    badge: 'Human Motion',
    desc: 'Specialized for expressive dance choreography, sports, and body dynamics.',
    credits: '25',
    type: 'per 5s video take',
    speed: 'Fast (~45s)',
    res: '1080p',
  },
  {
    name: 'Wan 2.1',
    badge: 'Stylized & Anime',
    desc: 'Excels at stylized aesthetics, vibrant fantasy palettes, and dynamic action.',
    credits: '20',
    type: 'per 5s video take',
    speed: 'Fast (~40s)',
    res: '1080p',
  },
  {
    name: 'Flux Pro',
    badge: 'Character Anchor',
    desc: 'Crystal-clear reference portraits used to lock faces and wardrobe across shots.',
    credits: '5',
    type: 'per reference image',
    speed: 'Instant (~8s)',
    res: 'Up to 2K',
  },
];

export interface ToolRate {
  tool: string;
  desc: string;
  cost: string;
}

export const toolRates: ToolRate[] = [
  {
    tool: '10z Agent Character Swap',
    desc: 'Re-cast talent across a completed shot while preserving exact motion and lighting.',
    cost: '15 credits / take',
  },
  {
    tool: 'Text-to-Sequence Story Engine',
    desc: 'Turn 1 narrative prompt into 3 to 30 cohesive, ordered shot prompts with camera choreography.',
    cost: '10 credits / script run',
  },
  {
    tool: '4K AI Upscale & Detail Enhancer',
    desc: 'Enhance finished sequence frames to crisp 4K resolution with temporal noise cleaning.',
    cost: '15 credits / shot',
  },
  {
    tool: 'Audio Mixdown & Direct YouTube Export',
    desc: 'Mix multi-track audio and publish straight to your connected YouTube channel.',
    cost: 'Free (0 credits)',
  },
];

export interface ComparisonFeature {
  name: string;
  hint?: string;
  payg: string;
  maker: string;
  director: string;
  studio: string;
}

export interface ComparisonSection {
  category: string;
  features: ComparisonFeature[];
}

export const comparisonSections: ComparisonSection[] = [
  {
    category: 'AI Models & Multi-Model Generation',
    features: [
      {
        name: 'Access to all 8+ foundation AI models',
        hint: 'Kling 3.0, Veo 3, Sora, Runway Gen-4, Grok, SeeDance 2.0, Wan 2.1, Flux Pro',
        payg: '✓ All models',
        maker: '✓ All models',
        director: '✓ All models',
        studio: '✓ All models + fine-tunes',
      },
      {
        name: 'Side-by-side model comparison viewer',
        hint: 'View multiple takes from different engines synchronized in one player',
        payg: '✓ Up to 2 takes',
        maker: '✓ Up to 4 takes',
        director: '✓ Unlimited takes',
        studio: '✓ Unlimited + multi-screen',
      },
      {
        name: 'A/B test models on the same shot prompt',
        hint: 'Dispatch identical camera and scene prompts to 2-4 models simultaneously',
        payg: '✓',
        maker: '✓',
        director: '✓',
        studio: '✓',
      },
      {
        name: 'Text-to-Sequence story engine',
        hint: 'Turn a script or narrative into a multi-shot storyboard automatically',
        payg: 'Up to 5 shots',
        maker: 'Up to 15 shots',
        director: 'Up to 30 shots',
        studio: 'Unlimited sequence length',
      },
      {
        name: 'Generation queue priority',
        hint: 'Queue prioritization when upstream AI model servers experience high load',
        payg: 'Standard',
        maker: 'Priority',
        director: 'Fast-Track',
        studio: 'Dedicated Cloud Instance',
      },
      {
        name: 'Prompt, seed & settings history retention',
        hint: 'Recover exact prompts, seeds, camera settings, and reference images',
        payg: '30 days',
        maker: '90 days',
        director: 'Unlimited',
        studio: 'Unlimited + Audit logs',
      },
    ],
  },
  {
    category: 'Character Consistency & Directing',
    features: [
      {
        name: 'Single reference image anchor lock',
        hint: 'Lock a front-facing character portrait as a visual anchor across shots',
        payg: '✓',
        maker: '✓',
        director: '✓',
        studio: '✓',
      },
      {
        name: 'Multi-reference composition lock',
        hint: 'Combine character, wardrobe, and environment references into one frame',
        payg: '✓',
        maker: '✓',
        director: '✓',
        studio: '✓',
      },
      {
        name: '10z Agent Character Swap',
        hint: 'Re-cast a character in a finished video while preserving original motion',
        payg: 'Pay per swap (15 cr)',
        maker: '✓ Priority',
        director: '✓ Priority',
        studio: '✓ Batch pipeline',
      },
      {
        name: 'Batch character swap across whole project',
        hint: 'Swap a character across every take in an entire project in one click',
        payg: '—',
        maker: '—',
        director: '✓',
        studio: '✓',
      },
      {
        name: 'Shared team character & wardrobe library',
        hint: 'Save locked character models for reuse across team storyboards',
        payg: '—',
        maker: 'Personal library',
        director: '✓ Team library',
        studio: '✓ Enterprise DAM sync',
      },
    ],
  },
  {
    category: 'Team Collaboration & Project Budgets',
    features: [
      {
        name: 'Included workspace seats',
        hint: 'Number of full team members included in the base subscription',
        payg: '1 user',
        maker: '1 user',
        director: '3 users included',
        studio: 'Custom seats',
      },
      {
        name: 'Project-level isolated budget controls',
        hint: 'Fund each project with its own independent credit pool to prevent overspend',
        payg: '—',
        maker: '—',
        director: '✓ Independent caps',
        studio: '✓ Multi-department pools',
      },
      {
        name: 'Role-based permissions per project',
        hint: 'Control who can generate takes, edit storyboards, or manage billing',
        payg: 'Owner only',
        maker: 'Owner only',
        director: '✓ Owner, Editor, Viewer',
        studio: '✓ Custom RBAC + SSO',
      },
      {
        name: 'Discount on extra top-up credit packs',
        hint: 'Automatic discount applied to all top-up packs purchased',
        payg: '0% (Base price)',
        maker: '15% off all top-ups',
        director: '30% off all top-ups',
        studio: 'Custom volume tier',
      },
      {
        name: 'Credit expiration policy',
        hint: 'Whether purchased top-up credits expire',
        payg: 'Never expire',
        maker: 'Never expire',
        director: 'Never expire',
        studio: 'Never expire',
      },
    ],
  },
  {
    category: 'Editing, Audio & Publishing',
    features: [
      {
        name: 'Multi-take trimming & storyboard sequencer',
        hint: 'Trim heads and tails of takes and assemble them on an interactive timeline',
        payg: '✓',
        maker: '✓',
        director: '✓',
        studio: '✓',
      },
      {
        name: 'Maximum video export resolution',
        hint: 'Export quality for sequence assembly and take downloads',
        payg: '1080p Full HD',
        maker: '1080p + 4K Upscale',
        director: '1080p + 4K Upscale',
        studio: '4K / ProRes master',
      },
      {
        name: 'Multi-track audio mixdown',
        hint: 'Add voiceover, sound effects, and background music tracks directly',
        payg: '✓',
        maker: '✓',
        director: '✓',
        studio: '✓',
      },
      {
        name: '1-Click direct YouTube publishing',
        hint: 'Publish finished video directly to YouTube with automated title/tags',
        payg: '✓',
        maker: '✓',
        director: '✓',
        studio: '✓ Multi-channel sync',
      },
    ],
  },
  {
    category: 'Integrations, Developer & Support',
    features: [
      {
        name: 'Model Context Protocol (MCP) server',
        hint: 'Direct AI video production from Claude, Cursor, ChatGPT, or custom LLMs',
        payg: '✓ Full access',
        maker: '✓ Full access',
        director: '✓ Full access',
        studio: '✓ High-concurrency MCP',
      },
      {
        name: 'Automated credit refund for failed jobs',
        hint: 'Instant 100% credit refund if an upstream AI model errors or times out',
        payg: '✓ Automatic',
        maker: '✓ Automatic',
        director: '✓ Automatic',
        studio: '✓ Automatic',
      },
      {
        name: 'Support channel',
        hint: 'Customer and technical support response level',
        payg: 'Community Discord',
        maker: 'Priority Email',
        director: 'Fast-track Email & Chat',
        studio: 'Dedicated Slack + SLA',
      },
    ],
  },
];

export interface PricingFaq {
  q: string;
  a: string;
}

export const pricingFaqs: PricingFaq[] = [
  {
    q: 'Do purchased credits ever expire?',
    a: '<strong>No, never.</strong> All credit top-up packs you purchase remain in your account forever. There is zero clock anxiety or end-of-month panic. Monthly subscription credits (1,200 on Maker, 3,500 on Director) refresh on each billing cycle date, while top-up credits roll over indefinitely.',
  },
  {
    q: 'How do project-level budget controls protect my team?',
    a: "On the Director tier, project owners can assign an independent credit pool to each specific project (e.g., 500 credits for Client A, 1,200 credits for Campaign B). Team members draw only from their assigned project's pool. Once a project hits its cap, generations pause until the project owner explicitly adds more credits — preventing runaway team spending.",
  },
  {
    q: 'Can I cancel, upgrade, or downgrade anytime?',
    a: 'Yes, you can change your subscription tier or cancel at any time with one click from your billing settings. If you cancel, your plan stays active until the end of your prepaid period. Any top-up credits you purchased remain yours forever and can still be used on the Pay-As-You-Go tier.',
  },
  {
    q: 'What happens if an AI video generation fails or errors out?',
    a: 'Our infrastructure includes <strong>100% automated credit protection</strong>. If an upstream foundation model (like Kling, Veo, or Sora) errors, times out, or fails server-side content filters, our system detects it and instantly returns all deducted credits to your project balance. You never pay for failed takes.',
  },
  {
    q: 'Can I use 10zebra with Claude, Cursor, or ChatGPT via MCP?',
    a: 'Yes! 10zebra features a native Model Context Protocol (MCP) server that works on all plans, including Pay-As-You-Go. You can prompt, compare takes, and manage storyboard scenes directly from Claude, Cursor, or any MCP client without leaving your code editor or chat.',
  },
  {
    q: 'How do subscriber top-up discounts work?',
    a: 'Active Maker plan members automatically receive a <strong>15% discount</strong> on all top-up packs. Director plan members receive a <strong>30% discount</strong>. The discount applies automatically at checkout as long as your subscription is active.',
  },
  {
    q: 'Do I have commercial rights to the videos I produce?',
    a: 'Yes. You retain full commercial rights to download, edit, broadcast, publish to YouTube, and monetize all videos created within 10zebra, subject to standard foundation model acceptable use policies.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) via Stripe. For Studio and Enterprise accounts, we also support bank ACH transfers, wire transfers, and net-30 invoicing.',
  },
];
