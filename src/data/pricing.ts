/**
 * PRICING DATA CATALOG — Single source of truth for 10zebra pricing.
 * Drives:
 * - Shared Pricing component (homepage & /pricing top section)
 * - Credit Packs section
 * - Model & Tool Rate Cards
 * - Plan Comparison Matrix
 * - Pricing FAQs
 */

import { totalFamilies, totalModels } from './models';

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
      `All ${totalFamilies} model families (${totalModels}+ engines: Kling, Veo, Sora, Runway, etc.)`,
      'Purchased top-up credits never expire',
      '90% credit refund || free regen on failed takes',
      'Full prompt, seed & generation history',
      '3% lifetime referral payout via Tolt',
      'Standard generation queue',
    ],
    cta: 'Start Free — 200 Credits',
    ctaHref: '/signup/index.html',
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
      'Agent Z batch workflows & Dry Run cost approval',
      'Character Swap & multi-reference locks',
      '90% credit refund || free regen on failed takes',
      '1080p & 4K upscaled video export',
    ],
    cta: 'Start Maker Plan',
    ctaHref: '/signup/index.html?plan=maker',
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
      'Full MCP Server Access (Claude Desktop, Cursor & Agent API)',
      'Agent Z project-wide batch workflows & Dry Run analysis',
      '30% Discount on all extra top-up packs',
      'Project-level budget controls & spend caps',
      'Multi-seat collaboration with role-based permissions',
      'Shared team reference library & credit pools',
      '90% credit refund || free regen on failed takes',
      '1-click sequence mixdown & direct YouTube publishing',
    ],
    cta: 'Start Director Plan',
    ctaHref: '/signup/index.html?plan=director',
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
    tool: 'Agent Z Character Swap & Batch Workflows',
    desc: 'Re-cast talent, batch create, batch convert, batch regen, or batch upscale across a sequence while preserving motion.',
    cost: '15 credits / take',
  },
  {
    tool: 'Agent Z Dry Run Analysis',
    desc: 'Generate a pre-flight batch execution plan with per-take credit costs and budget check before spending a credit.',
    cost: 'Free (0 credits)',
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
        name: `Access to all ${totalFamilies} foundation model families`,
        hint: 'Kling 3.0, Veo 3, Sora, Runway Gen-4, Grok, SeeDance 2.0, Wan, Flux Pro',
        payg: '✓ All families',
        maker: '✓ All families',
        director: '✓ All families',
        studio: '✓ All families + fine-tunes',
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
        name: 'Agent Z Character Swap',
        hint: 'Re-cast a character in a finished video while preserving original motion',
        payg: 'Pay per swap (15 cr)',
        maker: '✓ Priority',
        director: '✓ Priority',
        studio: '✓ Batch pipeline',
      },
      {
        name: 'Agent Z batch workflows (create, convert, replace, regen, upscale)',
        hint: 'Execute batch character replacement, batch create, batch convert, batch regen, and batch 4K upscale across an entire sequence',
        payg: 'Up to 3 takes / batch',
        maker: 'Up to 10 takes / batch',
        director: '✓ Full sequence batching',
        studio: '✓ Unlimited + API batching',
      },
      {
        name: 'Agent Z Dry Run analysis (plan, credit cost & approval)',
        hint: 'Pre-flight execution plan showing itemized credit costs and requesting explicit approval before any credits are spent',
        payg: '✓ Free Dry Run',
        maker: '✓ Free Dry Run',
        director: '✓ Free Dry Run + Vault check',
        studio: '✓ Free Dry Run + Policy gates',
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
    category: 'Team Collaboration & Project Management',
    features: [
      {
        name: 'Project-level seats & collaborator invites',
        hint: 'Invite team members, freelancers, and clients per project with zero cross-project bleed',
        payg: '1 user (personal)',
        maker: '1 user',
        director: '✓ Unlimited project collaborators',
        studio: '✓ Multi-org & enterprise teams',
      },
      {
        name: 'Project-level isolated budget vaults',
        hint: 'Fund each project with its own independent credit pool to prevent overspend',
        payg: '—',
        maker: '—',
        director: '✓ Independent caps',
        studio: '✓ Multi-department pools',
      },
      {
        name: 'Free client & stakeholder review seats',
        hint: 'Invite external brand clients as Viewers to inspect takes and leave notes with zero credit spend',
        payg: '—',
        maker: '—',
        director: '✓ Free unlimited Viewers',
        studio: '✓ Free unlimited Viewers',
      },
      {
        name: 'Role-based permissions per project',
        hint: 'Granular Owner, Editor/Director, and Viewer roles scoped to each production',
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
        payg: '—',
        maker: '— (Director only)',
        director: '✓ Full access (Included)',
        studio: '✓ High-concurrency MCP',
      },
      {
        name: 'Failed generation protection',
        hint: 'Self-serve button on failed generations (after a direct model error or 30m silent timeout) to choose a 90% credit refund or free regen',
        payg: '✓ 90% refund || free regen',
        maker: '✓ 90% refund || free regen',
        director: '✓ 90% refund || free regen',
        studio: '✓ 90% refund || free regen',
      },
      {
        name: 'Referral Program (Tolt integration)',
        hint: 'Unique referral code & link with 3% lifetime cash payout on referred users’ credit purchases and subscriptions',
        payg: '✓ 3% lifetime payout',
        maker: '✓ 3% lifetime payout',
        director: '✓ 3% lifetime payout',
        studio: '✓ 3% lifetime payout',
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
    q: 'What happens if an AI video generation fails, and why is the refund 90%?',
    a: 'We provide a <strong>90% credit refund or free regen on all failed generations</strong>. There is a button directly on failed generations so you can easily choose to refund (90%) or retry (free regen) — the option appears immediately after we receive a direct error from the model, or after 30 minutes if a job fails silently. The refund is 90% because we have system and infrastructure costs that we need to cover, and we are trying to be as fair as possible as most failures are caused from Model terms violations and not any issue with the 10z platform.',
  },
  {
    q: 'How does the 10zebra Referral Program work?',
    a: 'Through our <strong>Tolt integration</strong>, every user gets a special referral code and link. When referred users purchase credits or subscribe, you earn a <strong>lifetime payout of 3%</strong> on all of their qualifying purchases.',
  },
  {
    q: 'Which plan is required for the Model Context Protocol (MCP) server?',
    a: `Access to the 10zebra MCP server requires an active <strong>Director plan</strong> ($79/mo) or higher. On the Director tier, you receive your dedicated MCP API key and streamable-HTTP / stdio credentials to connect Claude Desktop, Cursor IDE, Windsurf, or custom autonomous agents directly to 10zebra's ${totalFamilies} model families (${totalModels}+ engines).`,
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
