// src/data/faqs.ts
// Comprehensive FAQ data repository for 10zebra.
// Aligned with the production app functionality in ../10z.
// Optimized for traditional SEO (Schema.org FAQPage) and AEO (Answer Engine Optimization).

export interface FaqItem {
  id: string;
  category: 'features' | 'mcp' | 'teams' | 'payments' | 'terms';
  question: string;
  answer: string;
  shortAnswer?: string; // Direct snippet for AEO summary
  keywords: string[];
}

export interface FaqCategory {
  id: 'features' | 'mcp' | 'teams' | 'payments' | 'terms';
  label: string;
  badge: string;
  icon: string;
  description: string;
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'features',
    label: 'Studio & AI Models',
    badge: 'Core Features',
    icon: 'film',
    description: '68+ models, multi-engine comparison, character swap consistency, in-browser trimming, and YouTube export.',
  },
  {
    id: 'mcp',
    label: 'MCP & Agent API',
    badge: 'Developer Integration',
    icon: 'terminal',
    description: 'Model Context Protocol, Claude Desktop / Cursor IDE integration, FastMCP tools, and Director tier access.',
  },
  {
    id: 'teams',
    label: 'Teams & Budgets',
    badge: 'Collaboration',
    icon: 'users',
    description: 'Isolated project credit ledgers, multi-seat roles, spend caps, and shared reference libraries.',
  },
  {
    id: 'payments',
    label: 'Billing & Credits',
    badge: 'Plans & Payments',
    icon: 'credit-card',
    description: 'Subscriptions, non-expiring credit packs, 100% refund guarantee on failed jobs, and Stripe checkout.',
  },
  {
    id: 'terms',
    label: 'Commercial & Privacy',
    badge: 'Rights & Security',
    icon: 'shield',
    description: 'Commercial ownership, copyright provenance, zero training on user assets, and content safety.',
  },
];

export const allFaqs: FaqItem[] = [
  // =========================================================================
  // 1. STUDIO & AI MODELS (features)
  // =========================================================================
  {
    id: 'why-10zebra-vs-standalone',
    category: 'features',
    question: 'What makes 10zebra different from using standalone AI video platforms directly?',
    shortAnswer: '10zebra is a non-linear production studio that unifies 68+ models into one canvas with character consistency, project credit controls, in-browser trimming, and 100% refund protection.',
    answer: `<strong>10zebra eliminates engine lock-in and production fragmentation.</strong> Rather than juggling 5 different subscription tabs with disparate interfaces, 10zebra unifies 68+ foundation engines into one browser workspace with:
<ul>
  <li><strong>Multi-Model Comparison:</strong> Run the same prompt and camera trajectory across Kling, Veo 3, Sora, and Runway simultaneously to select the best take.</li>
  <li><strong>Multi-Reference Character Swap:</strong> Lock actor identity, wardrobe, and facial features across multiple scenes using up to 4 anchor references.</li>
  <li><strong>Production Timeline & Take Trimming:</strong> Set in/out cut points directly in the browser and assemble continuous multi-shot sequences without downloading to an NLE first.</li>
  <li><strong>100% Automatic Refund Guarantee:</strong> If an upstream engine errors or times out, credits are immediately returned to your project balance.</li>
</ul>`,
    keywords: ['comparison', 'runway', 'kling', 'veo', 'sora', 'difference', 'why 10zebra', 'benefits'],
  },
  {
    id: 'supported-models-and-engines',
    category: 'features',
    question: 'Which AI video models and engines are supported on 10zebra?',
    shortAnswer: '10zebra integrates 68+ active models across 10 major global families including Kling AI, Google Veo 3, OpenAI Sora, Runway Gen-3/4, Wan 2.1, ByteDance Seaweed, PixVerse, Luma, Minimax, and Grok.',
    answer: `10zebra currently supports <strong>68+ active production models across 10 global architecture families</strong>:
<ul>
  <li><strong>Kling AI:</strong> Kling 3.0 Standard & Pro, Kling 1.5, Elements, and Motion Brush control for high-fidelity physical realism.</li>
  <li><strong>Google Veo 3:</strong> Veo 3 Fast (rapid previs) and Veo 3 Ultra (cinematic 1080p depth-of-field).</li>
  <li><strong>OpenAI Sora:</strong> Complex multi-character simulations, dynamic fluid mechanics, and atmospheric lighting.</li>
  <li><strong>Runway:</strong> Gen-3 Alpha, Gen-3 Alpha Turbo, and Gen-4 for fluid camera arcs and cinematic camera motion.</li>
  <li><strong>Wan 2.1:</strong> Open-weights high-speed diffusion models optimized for stylized fantasy and anime workflows.</li>
  <li><strong>ByteDance Seaweed & PixVerse:</strong> Specialized for dramatic lighting, fashion plates, and micro-expressions.</li>
  <li><strong>Luma Dream Machine & Minimax Hailuo:</strong> Hyper-smooth natural motion and character performance.</li>
  <li><strong>Grok Video:</strong> Rapid low-cost animatic ideation clips (10 credits per take).</li>
</ul>
New models are integrated continuously within 48 to 72 hours of developer API release via our automated sync engine.`,
    keywords: ['supported models', 'model list', 'kling', 'veo', 'sora', 'runway', 'wan', 'luma', 'minimax'],
  },
  {
    id: 'character-consistency-face-lock',
    category: 'features',
    question: 'How does 10zebra maintain character consistency across different scenes and models?',
    shortAnswer: '10zebra uses a multi-reference Character Swap engine allowing up to 4 high-resolution face and wardrobe anchors to preserve facial identity across diverse camera angles and foundation models.',
    answer: `Character drift has historically been the primary obstacle in generative film. 10zebra solves this through our <strong>Multi-Reference Character Swap engine</strong>:
<ol>
  <li><strong>Anchor Reference Upload:</strong> You upload 1 to 4 clean reference images of your character (front, 45-degree angle, profile, and expression variations) or generate an anchor portrait using Flux Pro.</li>
  <li><strong>Feature Embedding & Face Locking:</strong> Our pipeline calculates high-dimensional facial embeddings and surface geometry anchors.</li>
  <li><strong>Cross-Model Injection:</strong> When generating shots in Kling, Veo, or Runway, the character embedding is injected as a conditioning prior to maintain facial bone structure, eye shape, skin tone, and costume elements.</li>
  <li><strong>Video-to-Video Character Transfer:</strong> You can also take an existing dynamic video sequence and swap the subject with your locked character while preserving the original camera motion, physics, and lighting.</li>
</ol>`,
    keywords: ['character consistency', 'face locking', 'character swap', 'continuity', 'actor lock', 'wardrobe'],
  },
  {
    id: 'generation-modes-available',
    category: 'features',
    question: 'What video generation modes does 10zebra support?',
    shortAnswer: '10zebra supports Text-to-Video, Image-to-Video, Video-to-Video, and Text-to-Sequence multi-shot generation.',
    answer: `10zebra supports <strong>four core generation paradigms</strong>:
<ul>
  <li><strong>Text-to-Video (text2vid):</strong> Generate 4 to 10 second cinematic takes directly from descriptive natural language prompts and director parameters (camera movement, lens focal length, lighting).</li>
  <li><strong>Image-to-Video (im2vid):</strong> Animate keyframe storyboards, concept paintings, or character stills into motion with full control over start/end motion vectors.</li>
  <li><strong>Video-to-Video (vid2vid):</strong> Restyle existing live-action footage, transform cinematography styles, or execute character swaps over existing takes.</li>
  <li><strong>Text-to-Sequence (text2seq):</strong> Input a multi-beat script or scene breakdown, and 10zebra automatically schedules and renders contiguous shots across your preferred model mix.</li>
</ul>`,
    keywords: ['text to video', 'image to video', 'video to video', 'text to sequence', 'generation modes', 'im2vid', 'vid2vid'],
  },
  {
    id: 'in-browser-timeline-trimming',
    category: 'features',
    question: 'Can I edit, trim, and assemble sequences directly in 10zebra without external editing software?',
    shortAnswer: 'Yes. 10zebra includes an in-browser timeline where you can set frame-accurate trim points, reorder takes, mix down sequences, and export finished cuts.',
    answer: `<strong>Yes, absolutely.</strong> 10zebra includes a lightweight, frame-accurate storyboard timeline built right into the cloud studio. You can:
<ul>
  <li>Review all takes generated for a scene side-by-side.</li>
  <li>Set sub-second <strong>In and Out trim points</strong> to remove artifacts, unstable opening frames, or awkward tail ends without re-rendering.</li>
  <li>Reorder shots on a continuous multi-scene timeline.</li>
  <li>Mix down and export high-resolution MP4/ProRes sequences or publish directly to YouTube with a single click.</li>
</ul>
For complex sound design or VFX grading, you can also export EDL / XML timelines to DaVinci Resolve, Premiere Pro, or Final Cut.`,
    keywords: ['timeline', 'trimming', 'video editor', 'browser editor', 'cut takes', 'assembly', 'export'],
  },
  {
    id: 'direct-youtube-publishing',
    category: 'features',
    question: 'How does 1-click direct YouTube publishing work?',
    shortAnswer: 'Connect your YouTube channel via OAuth in studio settings; 10zebra renders your sequence, packages metadata, and uploads the video directly as public, unlisted, or scheduled.',
    answer: `You can connect your verified YouTube channel directly to 10zebra in your account settings using official Google OAuth. Once connected:
<ol>
  <li>Assemble your preferred takes on the timeline.</li>
  <li>Click <strong>Publish to YouTube</strong>.</li>
  <li>Provide your title, description, tags, privacy setting (Public, Unlisted, or Private), and custom thumbnail.</li>
  <li>10zebra renders the high-bitrate sequence in the cloud and pushes it directly to your YouTube channel—saving gigabytes of local downloads and re-uploads.</li>
</ol>`,
    keywords: ['youtube', 'publish to youtube', 'oauth', 'upload', 'direct export', 'youtube integration'],
  },

  // =========================================================================
  // 2. MODEL CONTEXT PROTOCOL (MCP) & DEVELOPER API (mcp)
  // =========================================================================
  {
    id: 'what-is-mcp-server',
    category: 'mcp',
    question: 'What is the 10zebra Model Context Protocol (MCP) server?',
    shortAnswer: 'The 10zebra MCP server connects Claude Desktop, Cursor IDE, and AI agents directly to 10zebra, allowing LLMs to orchestrate 68+ video models, trim takes, and manage storyboards through conversational tools.',
    answer: `The 10zebra Model Context Protocol (MCP) server is an open-standard integration layer built on Anthropic's FastMCP specification. It allows autonomous AI agents and desktop LLMs to directly control your 10zebra production studio.
<br /><br />
Instead of manually typing prompts into web forms, your AI assistant can:
<ul>
  <li>Read a movie script or commercial brief and autonomously generate visual takes across Kling, Veo, and Sora.</li>
  <li>Check real-time project credit balances and model rates before firing jobs.</li>
  <li>Inspect generated video artifacts, apply sub-second trims, and arrange cuts on the timeline.</li>
  <li>Iterate on prompt styles and color palettes programmatically.</li>
</ul>`,
    keywords: ['mcp', 'model context protocol', 'fastmcp', 'claude desktop', 'cursor', 'agent api', 'what is mcp'],
  },
  {
    id: 'mcp-plan-requirement',
    category: 'mcp',
    question: 'Which subscription plan is required for MCP server access?',
    shortAnswer: 'Access to the 10zebra MCP server requires an active Director subscription ($79/mo) or Studio subscription ($199/mo).',
    answer: `Access to the 10zebra MCP server requires an active <strong>Director plan ($79/mo)</strong> or <strong>Studio plan ($199/mo)</strong>.
<br /><br />
The Pay-As-You-Go and Maker ($29/mo) plans do not include MCP credentials. Upgrading to Director unlocks:
<ul>
  <li>Personal MCP Project API Keys (formatted <code>10z_...</code>).</li>
  <li>Dual-transport connectivity (stdio for local Claude Desktop and streamable-HTTP for remote server agents).</li>
  <li>3,500 monthly included generation credits.</li>
  <li>Project-isolated credit budgets with strict spend caps to prevent autonomous agents from overspending.</li>
</ul>`,
    keywords: ['mcp plan', 'director subscription', 'mcp access', 'pricing requirement', '79/mo', 'director tier'],
  },
  {
    id: 'mcp-supported-clients',
    category: 'mcp',
    question: 'Which AI IDEs, desktop clients, and frameworks can connect to 10zebra MCP?',
    shortAnswer: 'Any MCP-compliant client is supported, including Claude Desktop, Cursor IDE, Windsurf, Claude Code, Zed, and custom Python/Node agent frameworks.',
    answer: `The 10zebra MCP server adheres strictly to the official Model Context Protocol standard, making it compatible with any MCP client:
<ul>
  <li><strong>Claude Desktop:</strong> Add 10zebra to your <code>claude_desktop_config.json</code> with 4 lines of configuration to direct film sequences conversationally.</li>
  <li><strong>Cursor IDE & Windsurf:</strong> Connect via Cursor Settings &rarr; Features &rarr; MCP to generate video assets alongside web code or game development pipelines.</li>
  <li><strong>Claude Code & Antigravity IDE:</strong> Automate multi-step video production pipelines directly from terminal agent sessions.</li>
  <li><strong>Autonomous Frameworks:</strong> Seamlessly integrate with LangChain, LlamaIndex, CrewAI, AutoGen, and custom Python agents via stdio or streamable-HTTP.</li>
</ul>`,
    keywords: ['claude desktop', 'cursor ide', 'windsurf', 'claude code', 'supported clients', 'setup mcp'],
  },
  {
    id: 'mcp-tools-and-resources',
    category: 'mcp',
    question: 'What tools and live resources does the 10zebra MCP server provide?',
    shortAnswer: 'The MCP server provides 11 callable tools (including generate, add_story_shot, trim_take, and save_cut), 5 live query resources, and 4 director system prompts.',
    answer: `The 10zebra MCP server implements <strong>11 production-grade tools</strong>:
<ul>
  <li><code>generate</code>: Dispatch an AI video generation task to any of 68+ models with prompt, engine, aspect ratio, and reference anchors.</li>
  <li><code>add_story_shot</code> & <code>add_story_scene</code>: Construct structured storyboards and scenes directly from script breakdowns.</li>
  <li><code>hide_story_shots</code> & <code>hide_story_scene</code>: Curate and toggle alternate takes without deleting generation history.</li>
  <li><code>move_story_shot</code>: Reorder shots dynamically along the sequence timeline.</li>
  <li><code>update_story_shot</code> & <code>update_story_style</code>: Adjust shot descriptions, director notes, visual styles, and color palettes.</li>
  <li><code>trim_take</code> & <code>get_all_trims</code>: Set frame-accurate in/out cut points on any rendered take.</li>
  <li><code>save_cut</code>: Commit a finalized sequence mixdown to the project ledger.</li>
</ul>
It also exposes <strong>5 live resources</strong> (such as <code>10z://models</code>, <code>10z://credits</code>, and <code>10z://storyboard/{id}</code>) so your LLM always has real-time context before calling tools.`,
    keywords: ['mcp tools', 'mcp resources', 'generate tool', 'trim take', 'storyboard tools', 'fastmcp'],
  },
  {
    id: 'mcp-credit-safety-budget-caps',
    category: 'mcp',
    question: 'How does 10zebra prevent autonomous AI agents from burning through my credits via MCP?',
    shortAnswer: 'MCP calls are bound to specific project workspaces with mandatory spend caps; all credit deductions are transacted with atomic Firestore safeguards and instant failure refunds.',
    answer: `We engineered the 10zebra MCP server with <strong>three distinct layers of financial protection</strong> for autonomous agent use:
<ol>
  <li><strong>Project Spend Caps:</strong> You generate an MCP key bound to a specific project with an assigned credit ceiling (e.g., 300 credits). The MCP agent cannot access your account-wide balance or other projects.</li>
  <li><strong>Atomic Credit Pre-Checks:</strong> Every MCP <code>generate</code> call performs an atomic Firestore balance check. If the requested model requires 35 credits and only 20 remain, the server cleanly rejects the tool call before dispatching upstream.</li>
  <li><strong>Automatic Refund Guarantee:</strong> If an autonomous agent generates a take that errors or triggers upstream model moderation, the deducted credits are instantly restored to the project pool in the same transaction.</li>
</ol>`,
    keywords: ['mcp safety', 'spend caps', 'budget limit', 'runaway spending', 'agent safety', 'credit protection'],
  },

  // =========================================================================
  // 3. TEAMS, PROJECTS & COLLABORATION (teams)
  // =========================================================================
  {
    id: 'project-credit-pools-and-budgets',
    category: 'teams',
    question: 'How do project-level credit pools and budget controls work?',
    shortAnswer: 'Project owners assign dedicated credit limits to individual client or campaign folders; team members draw exclusively from that project pool without touching personal or master credits.',
    answer: `<strong>Project credit pools prevent runaway spending across client campaigns.</strong> On the Director and Studio plans:
<ul>
  <li>The studio owner or producer creates isolated project workspaces (e.g., "Nike Fall Commercial" or "Internal Previs").</li>
  <li>You allocate a specific credit balance to that project (e.g., 1,500 credits).</li>
  <li>Assigned editors and creative directors draw exclusively from that project's allocated pool.</li>
  <li>Once the project pool reaches zero, generations pause automatically until the producer explicitly tops it up. Team members never have access to master billing cards or the company-wide balance.</li>
</ul>`,
    keywords: ['project budgets', 'credit pools', 'spend controls', 'client budgets', 'team spending', 'caps'],
  },
  {
    id: 'team-roles-and-permissions',
    category: 'teams',
    question: 'What team roles and permissions are available on 10zebra?',
    shortAnswer: '10zebra provides three granular role tiers: Owner/Admin (billing & credit allocation), Editor/Director (prompting, generating, and timeline trimming), and Viewer/Client (review and playback only).',
    answer: `10zebra includes <strong>three role tiers</strong> to streamline production collaboration:
<ul>
  <li><strong>Owner / Producer:</strong> Full administrative rights. Can create projects, allocate and reclaim project credit pools, manage payment methods, invite/remove members, and access MCP API keys.</li>
  <li><strong>Editor / Director:</strong> Can initiate generations across all 68+ models, apply Character Swap anchors, trim takes, organize timelines, and export cuts within their assigned projects. Cannot alter billing or account credit pools.</li>
  <li><strong>Viewer / Client:</strong> Free review-only seats. Can inspect takes, play back storyboard animatics, leave timestamped feedback notes, and download approved cuts without spending credits.</li>
</ul>`,
    keywords: ['team roles', 'permissions', 'owner', 'editor', 'viewer', 'client review', 'seats'],
  },
  {
    id: 'client-review-free-seats',
    category: 'teams',
    question: 'Can external clients or stakeholders review our video cuts without burning credits?',
    shortAnswer: 'Yes. You can generate private review links or invite clients as Viewers for free; viewing and playback never consume credits.',
    answer: `<strong>Yes.</strong> Viewing, streaming, and previewing generated takes never cost credits. You can:
<ul>
  <li>Invite clients directly to a project with the <strong>Viewer</strong> role at zero additional subscription cost.</li>
  <li>Generate password-protected or unlisted review links to share storyboard animatics and timeline cuts.</li>
  <li>Clients can review alternate takes and approve cuts directly in their browser without registering a paid account or consuming credits.</li>
</ul>`,
    keywords: ['client review', 'free seats', 'share with client', 'review link', 'stakeholder preview'],
  },
  {
    id: 'shared-team-reference-libraries',
    category: 'teams',
    question: 'How do shared reference libraries and asset anchors work across a team?',
    shortAnswer: 'Teams can store locked character anchors, environment plates, style references, and color palettes in a centralized project library accessible by all team members.',
    answer: `To maintain visual continuity across multiple directors or remote animators, 10zebra includes <strong>Shared Project Libraries</strong>:
<ul>
  <li>Upload approved actor reference headshots and wardrobe turnarounds once to the project library.</li>
  <li>Any team member working on that project can select the locked character anchor in 1 click for Character Swap generations.</li>
  <li>Save prompt templates, negative prompt presets, and visual style tags (e.g., "35mm anamorphic, golden hour, Arri Alexa Mini LF") to ensure all shots share the same cinematic look.</li>
</ul>`,
    keywords: ['shared library', 'asset library', 'team references', 'shared character', 'style templates'],
  },
  {
    id: 'seat-limits-by-plan',
    category: 'teams',
    question: 'How many team seats are included in each subscription plan?',
    shortAnswer: 'Maker includes 1 seat; Director includes 5 production seats with unlimited free Viewer seats; Studio includes 15+ seats with custom enterprise options.',
    answer: `Seat allocations across tiers:
<ul>
  <li><strong>Pay-As-You-Go & Maker ($29/mo):</strong> 1 active production seat. Ideal for solo creators and independent directors.</li>
  <li><strong>Director ($79/mo):</strong> <strong>5 included production seats</strong> (Owner + 4 Editors), plus unlimited free Viewer/Client review seats. Additional editor seats can be added for $15/seat/month.</li>
  <li><strong>Studio ($199/mo):</strong> <strong>15 included production seats</strong>, unlimited free Viewer seats, custom SSO/SAML integration, and dedicated production support.</li>
</ul>`,
    keywords: ['seats', 'team members', 'how many seats', 'seat limits', 'additional seats'],
  },

  // =========================================================================
  // 4. BILLING, CREDITS & PLANS (payments)
  // =========================================================================
  {
    id: 'how-credits-work',
    category: 'payments',
    question: 'How do 10zebra credits work across different AI models?',
    shortAnswer: 'Credits are a unified studio currency; different models cost different credit amounts based on compute intensity, ranging from 10 credits (Grok) to 45-50 credits (Veo 3 Ultra / Sora).',
    answer: `10zebra uses a <strong>single unified credit system</strong> so you never need to manage separate tokens or subscriptions across different foundation model companies:
<ul>
  <li><strong>Rapid Ideation & Drafts:</strong> Grok Video (10 credits/take), Kling Elements (15 credits/take), Wan 2.1 (20 credits/take).</li>
  <li><strong>Previs & Commercial Speed:</strong> Google Veo 3 Fast (20 credits/take), SeeDance 2.0 (25 credits/take), Runway Gen-3 Alpha (35 credits/take).</li>
  <li><strong>Ultra-High Fidelity & Physics:</strong> Google Veo 3 Ultra (45 credits/take), Kling 3.0 Pro 1080p (45 credits/take), OpenAI Sora (50 credits/take).</li>
  <li><strong>Image Anchors:</strong> Flux Pro reference portraits (5 credits/image).</li>
</ul>
1 credit costs between $0.015 and $0.025 depending on your plan and pack size.`,
    keywords: ['how credits work', 'credit rates', 'cost per video', 'model pricing', 'credit consumption'],
  },
  {
    id: 'automatic-refund-guarantee',
    category: 'payments',
    question: 'What happens if an AI video generation fails, errors, or times out upstream?',
    shortAnswer: '10zebra provides a 100% automatic credit refund; if an upstream model fails, times out, or blocks a generation, your credits are instantly returned to your balance.',
    answer: `<strong>You never pay for failed takes on 10zebra.</strong>
<br /><br />
Our backend infrastructure actively tracks the lifecycle of every generation job. If an upstream foundation model provider (like Kling, Veo, or Sora) experiences a server timeout, cluster failure, internal API error, or false-positive content moderation block, our system detects it immediately and <strong>automatically restores 100% of the deducted credits</strong> back to your project balance in the same database transaction. No support tickets or manual refund requests are necessary.`,
    keywords: ['failed generation', 'refund guarantee', 'credit refund', 'errors', 'timeouts', '100% refund'],
  },
  {
    id: 'do-credits-expire',
    category: 'payments',
    question: 'Do purchased credits or monthly subscription credits ever expire?',
    shortAnswer: 'Purchased top-up credit packs never expire. Monthly subscription credits refresh on each billing cycle, while top-up credits roll over forever.',
    answer: `<strong>No, purchased top-up credits never expire.</strong>
<ul>
  <li><strong>Top-Up Credit Packs:</strong> Any credits purchased via top-up packs (Starter, Pro, Studio, Volume) remain in your account forever with zero clock anxiety.</li>
  <li><strong>Monthly Subscription Credits:</strong> Your plan's baseline credits (1,200 on Maker, 3,500 on Director) refresh on each monthly billing cycle date. When generating video, 10zebra automatically consumes monthly subscription credits first before dipping into your non-expiring top-up reserve.</li>
</ul>`,
    keywords: ['credits expire', 'credit rollover', 'do credits expire', 'top-up credits', 'validity'],
  },
  {
    id: 'subscription-vs-payg',
    category: 'payments',
    question: 'What is the difference between a monthly subscription and Pay-As-You-Go?',
    shortAnswer: 'Pay-As-You-Go lets you buy credits as needed with no recurring commitment; subscriptions provide steep credit discounts (up to 30%), higher monthly credit allowances, team features, and MCP access.',
    answer: `We offer both flexible options depending on your production schedule:
<ul>
  <li><strong>Pay-As-You-Go:</strong> Zero monthly subscription fees. Simply buy credit packs whenever you have an active project. Ideal for occasional creators or one-off tests.</li>
  <li><strong>Maker ($29/mo):</strong> Includes 1,200 monthly credits ($0.024/credit) + 15% discount on all top-up packs + priority queue.</li>
  <li><strong>Director ($79/mo):</strong> Includes 3,500 monthly credits ($0.022/credit) + 30% top-up discount + full MCP Server access + 5 team seats with project spend controls.</li>
  <li><strong>Studio ($199/mo):</strong> Includes 10,000 monthly credits ($0.019/credit) + 35% top-up discount + high-concurrency MCP + 15 team seats.</li>
</ul>`,
    keywords: ['subscription vs payg', 'maker plan', 'director plan', 'pay as you go', 'which plan', 'compare plans'],
  },
  {
    id: 'subscriber-top-up-discounts',
    category: 'payments',
    question: 'How do subscriber top-up discounts work?',
    shortAnswer: 'Active Maker subscribers receive an automatic 15% discount at checkout on all credit packs; Director subscribers receive a 30% discount, and Studio subscribers receive 35%.',
    answer: `Whenever you need extra credits beyond your monthly allowance, active subscribers receive steep automatic discounts at checkout:
<ul>
  <li><strong>Maker Plan:</strong> 15% discount on all credit packs (e.g., $50 Studio Pack for $42.50).</li>
  <li><strong>Director Plan:</strong> 30% discount on all credit packs (e.g., $50 Studio Pack for $35.00).</li>
  <li><strong>Studio Plan:</strong> 35% discount on all credit packs (e.g., $100 Volume Pack for $65.00).</li>
</ul>
The discount is applied automatically in the billing modal as long as your subscription is active.`,
    keywords: ['top-up discounts', 'credit discounts', 'cheaper credits', 'subscriber discount'],
  },
  {
    id: 'payment-methods-and-cancellation',
    category: 'payments',
    question: 'What payment methods do you accept, and can I cancel anytime?',
    shortAnswer: 'We accept all major cards via Stripe, with ACH and wire transfers for Studio/Enterprise. You can cancel with one click anytime in settings with zero penalties.',
    answer: `<strong>Payment Methods:</strong> We accept Visa, Mastercard, American Express, Discover, Apple Pay, and Google Pay through Stripe's encrypted payment gateway. For Studio and Enterprise accounts, we also support bank ACH transfers, wire transfers, and net-30 purchase order invoicing.
<br /><br />
<strong>Cancellation Policy:</strong> You can cancel your subscription with 1 click at any time from your account settings. When you cancel:
<ul>
  <li>Your subscription remains active until the end of your prepaid billing period.</li>
  <li>You will never be billed again.</li>
  <li>Any unused top-up credits you purchased remain in your account forever on the Pay-As-You-Go tier.</li>
</ul>`,
    keywords: ['payment methods', 'credit cards', 'stripe', 'cancel subscription', 'cancellation policy', 'ach'],
  },

  // =========================================================================
  // 5. COMMERCIAL RIGHTS, PRIVACY & TERMS (terms)
  // =========================================================================
  {
    id: 'commercial-rights-and-copyright',
    category: 'terms',
    question: 'Do I own the commercial rights and copyright to videos generated on 10zebra?',
    shortAnswer: 'Yes. You own 100% of the commercial rights to all video takes and audio generated on 10zebra across all paid plans and Pay-As-You-Go.',
    answer: `<strong>Yes, you retain 100% commercial ownership.</strong>
<br /><br />
All videos, audio, and images generated on 10zebra under paid plans or Pay-As-You-Go credit packs belong to you. You are free to:
<ul>
  <li>Monetize videos on YouTube, TikTok, Instagram, and social platforms.</li>
  <li>Broadcast finished sequences in national commercial campaigns, broadcast television, or theatrical releases.</li>
  <li>License or sell video takes to clients, stock footage libraries, or third parties.</li>
</ul>
Ownership is subject only to the standard acceptable use policies of underlying foundation models (e.g., no unlawful, deceptive, or non-consensual content).`,
    keywords: ['commercial rights', 'copyright', 'ownership', 'monetize', 'commercial use', 'youtube monetization'],
  },
  {
    id: 'data-privacy-and-training',
    category: 'terms',
    question: 'Are my uploaded footage, character photos, and prompts used to train AI models?',
    shortAnswer: 'No. 10zebra does not train foundation AI models on your uploaded images, reference footage, prompts, or generated videos.',
    answer: `<strong>No, never.</strong>
<br /><br />
We respect client confidentiality and production NDAs:
<ul>
  <li>Your uploaded reference photos (actor portraits, wardrobe, concept art) and generated video assets are stored in private, isolated Google Cloud Storage buckets encrypted at rest (AES-256) and in transit (TLS 1.3).</li>
  <li>10zebra <strong>does not train</strong> proprietary AI foundation models on your prompts, character anchors, or generated video outputs.</li>
  <li>We route model inference via enterprise zero-retention developer API agreements where foundation model providers do not train on user payloads.</li>
</ul>`,
    keywords: ['data privacy', 'training on data', 'nda', 'confidentiality', 'privacy', 'security', 'enterprise'],
  },
  {
    id: 'content-moderation-and-safety',
    category: 'terms',
    question: 'How does content moderation work, and what happens if a take is flagged?',
    shortAnswer: 'Prompts and images are checked against standard automated safety filters; if an upstream model rejects a take due to a filter or false positive, your credits are refunded immediately.',
    answer: `10zebra connects to industry-standard foundation models that enforce automated trust and safety filters (preventing CSAM, real-person impersonation without consent, hate speech, and graphic violence).
<br /><br />
If a prompt or input image is flagged by an upstream provider:
<ul>
  <li>The generation terminates safely and displays an explanatory moderation notice.</li>
  <li><strong>All deducted credits are immediately and automatically refunded</strong> back to your project balance.</li>
  <li>If you believe an artistic prompt was flagged in error (false positive), you can adjust phrasing or contact our support team for guidance.</li>
</ul>`,
    keywords: ['moderation', 'content filters', 'nsfw', 'safety', 'flagged prompt', 'false positive'],
  },
  {
    id: 'refund-policy-details',
    category: 'terms',
    question: 'What is your refund policy for subscriptions and top-up packs?',
    shortAnswer: 'Generation failures are 100% automatically refunded to your balance; if you are dissatisfied with a subscription within 7 days and have not used significant compute, contact support for a full review.',
    answer: `Our refund policy is simple, fair, and transparent:
<ul>
  <li><strong>Technical & Model Failures:</strong> Handled 100% automatically. Any job that fails upstream is refunded to your credit balance immediately without needing to file a ticket.</li>
  <li><strong>Monthly Subscriptions:</strong> If you signed up for a subscription by mistake or experienced technical issues, contact <code>support@10zebra.com</code> within 7 days of purchase. If you have not consumed substantial generation compute, we will gladly issue a full refund to your original payment method.</li>
  <li><strong>Credit Packs:</strong> Unused top-up credit packs never expire and remain in your account for future productions.</li>
</ul>`,
    keywords: ['refund policy', 'money back', 'satisfaction guarantee', 'subscription refund', 'dispute'],
  },
  {
    id: 'security-and-infrastructure',
    category: 'terms',
    question: 'Where is 10zebra hosted and how is production data secured?',
    shortAnswer: '10zebra is hosted on Google Cloud Platform and Firebase infrastructure with SOC 2 compliance, encrypted storage, and regional CDNs.',
    answer: `10zebra's studio infrastructure is deployed on enterprise-grade Google Cloud Platform (GCP) and Firebase:
<ul>
  <li><strong>Encryption:</strong> All database entries, credentials, and video files are encrypted in transit via TLS 1.3 and at rest using AES-256 encryption.</li>
  <li><strong>Authentication:</strong> Secure session handling and multi-factor authentication powered by Firebase Auth and OAuth 2.0.</li>
  <li><strong>Payment Security:</strong> Card details are handled entirely by Stripe (PCI Service Provider Level 1 compliance); 10zebra never stores raw credit card numbers.</li>
  <li><strong>Fast Delivery:</strong> Video streaming and previews are accelerated globally via Cloudflare CDN for low-latency playback worldwide.</li>
</ul>`,
    keywords: ['security', 'gcp', 'google cloud', 'soc 2', 'pci compliance', 'encryption', 'data hosting'],
  },
];

/**
 * Returns all FAQ items belonging to a specific category.
 */
export function getFaqsByCategory(categoryId: FaqCategory['id']): FaqItem[] {
  return allFaqs.filter((f) => f.category === categoryId);
}

/**
 * Returns summary counts per category.
 */
export function getFaqStats() {
  const counts: Record<string, number> = { all: allFaqs.length };
  faqCategories.forEach((c) => {
    counts[c.id] = allFaqs.filter((f) => f.category === c.id).length;
  });
  return {
    total: allFaqs.length,
    counts,
  };
}
