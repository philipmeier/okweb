// scripts/sync-app.mjs
// Generic application sync script: pulls the latest info from the sibling app codebase at ../10z
// Updates:
//  - Models: ../10z/src/utils/config.js -> src/data/models.json (powers /models & /models/[slug])
//  - MCP: ../10z/mcp/server.py, README.md, functions/mcp.js -> src/data/mcp.json (powers /mcp)
// Usage:
//  node scripts/sync-app.mjs          # Syncs both models and MCP
//  node scripts/sync-app.mjs --models # Syncs models only
//  node scripts/sync-app.mjs --mcp    # Syncs MCP only

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const appDir = path.resolve(rootDir, '../10z');
const configPath = path.resolve(appDir, 'src/utils/config.js');
const mcpServerPyPath = path.resolve(appDir, 'mcp/server.py');
const mcpReadmePath = path.resolve(appDir, 'mcp/README.md');
const mcpJsPath = path.resolve(appDir, 'functions/mcp.js');

const outputModelsJsonPath = path.resolve(rootDir, 'src/data/models.json');
const outputMcpJsonPath = path.resolve(rootDir, 'src/data/mcp.json');

const args = process.argv.slice(2);
const doModels = args.length === 0 || args.includes('--models') || args.includes('-m');
const doMcp = args.length === 0 || args.includes('--mcp');

console.log('🚀 10zebra Unified App Sync');
console.log(`📂 Target app directory: ${appDir}`);

// ============================================================================
// 1. SYNC AI MODELS
// ============================================================================
function syncModels() {
  console.log('\n[1/2] 🤖 Syncing AI Models...');

  if (!fs.existsSync(configPath)) {
    if (fs.existsSync(outputModelsJsonPath)) {
      console.log('⚠️ Sibling ../10z/src/utils/config.js not found. Keeping existing models.json.');
      return;
    }
    console.error('❌ Could not locate config.js or models.json!');
    return;
  }

  const configContent = fs.readFileSync(configPath, 'utf8');
  const lines = configContent.split('\n');

  // Extract prod deletions
  const prodDeletes = lines
    .filter((l) => l.includes('aiModels.delete(') && !l.trim().startsWith('//'))
    .map((l) => {
      const m = l.match(/aiModels\.delete\(['"]([^'"]+)['"]\)/);
      return m ? m[1] : null;
    })
    .filter(Boolean);

  // Extract all active aiModels.set calls
  const activeSetLines = lines.filter((l) => l.trim().startsWith('aiModels.set('));
  const rawModels = [];

  for (const line of activeSetLines) {
    try {
      const match = line.match(/aiModels\.set\(\s*['"]([^'"]+)['"]\s*,\s*(\{[\s\S]+\})\s*\);?/);
      if (match) {
        const key = match[1];
        // eslint-disable-next-line no-eval
        const data = eval(`(${match[2]})`);
        if (!prodDeletes.includes(key)) {
          rawModels.push({ key, ...data });
        }
      }
    } catch (err) {
      console.warn(`Failed to parse line: ${line.slice(0, 40)}... (${err.message})`);
    }
  }

  console.log(`  Found ${rawModels.length} active models in config.js (excluding ${prodDeletes.length} deleted).`);

  // Family definitions
  const familyMetadata = {
    kling: {
      slug: 'kling',
      name: 'Kling AI',
      developer: 'Kuaishou Technology',
      tagline: 'High-fidelity cinematic motion, realistic physics, and expressive dialogue generation',
      accentColor: '#3b82f6',
      badge: 'Cinematic Motion',
      overview: 'Kling is one of the premier cinematic video foundation models in production. Known for superb camera movement comprehension, prompt adherence, and complex multi-shot sequences, Kling gives directors the ability to simulate high-budget movie scenes with believable physics.',
      strengths: [
        'Natural camera control (pan, tilt, zoom, dolly, arc)',
        'High-frame-rate physical dynamics (fluid, cloth, collisions)',
        'Kling Omni & Karakter face consistency pipelines',
        'Extended 10-second multi-shot storytelling takes'
      ],
      tips: 'Use dynamic lighting and camera descriptors like "35mm anamorphic, slow tracking shot, volumetric dusk lighting" for best cinematic render quality.'
    },
    veo: {
      slug: 'veo',
      name: 'Google Veo',
      developer: 'Google DeepMind',
      tagline: 'High-definition 1080p generation with natural speech and synchronized sound design',
      accentColor: '#10b981',
      badge: 'Native Audio & Speech',
      overview: 'Google Veo 3 delivers state-of-the-art cinematic video generation with a breakthrough feature: synchronized, in-context dialogue and atmospheric audio. Veo understands film terminology like timelapse, aerial shots, and depth-of-field with precision.',
      strengths: [
        'Synchronized character dialogue with natural cadence and tone',
        'Atmospheric environmental audio and spatial sound effects',
        'Native 1080p high definition output with crisp edge fidelity',
        'Deep understanding of cinematic lighting styles and lenses'
      ],
      tips: 'Wrap dialogue in quotation marks inside your prompt (e.g. A captain on the bridge says "Engage thrusters now") to trigger accurate lip-sync and voice delivery.'
    },
    sora: {
      slug: 'sora',
      name: 'OpenAI Sora',
      developer: 'OpenAI',
      tagline: 'Expansive world modeling, physical continuity, and complex scene dynamics',
      accentColor: '#a855f7',
      badge: 'World Simulation',
      overview: 'OpenAI Sora represents an advanced world-simulator approach to generative video. Capable of generating complex scenes with multiple characters, specific types of motion, and accurate details of the subject and background.',
      strengths: [
        'Persistent 3D spatial consistency across sustained takes',
        'Complex multi-character narrative interactions',
        'Rich environmental lighting and reflection modeling',
        'High temporal consistency from shot beginning to end'
      ],
      tips: 'Describe the causal relationships in the scene—Sora excels when explaining what characters do and how the environment responds.'
    },
    runway: {
      slug: 'runway',
      name: 'Runway',
      developer: 'Runway AI',
      tagline: 'Industry-standard Gen-4 & Gen-4.5 generative tools for stylized, commercial, and hybrid pipelines',
      accentColor: '#f97316',
      badge: 'Industry Standard',
      overview: 'Runway has long set the benchmark for AI video tools in film and advertising studios. Gen-4.5 delivers hyperrealistic camera motion and seamless keyframe interpolation, making it the workhorse for commercials, music videos, and fashion films.',
      strengths: [
        'Gen-4.5 image-to-video with unmatched initial frame fidelity',
        'Funway pipeline fusing Flux Pro photorealism with Runway motion',
        'Aleph keyframe sequence transformation',
        'Clean film grain and premium color grading rendering'
      ],
      tips: 'Anchor your first frame with high-resolution reference portraits or Flux renders to lock in character wardrobe and facial structure.'
    },
    seedance: {
      slug: 'seedance',
      name: 'SeeDance',
      developer: 'ByteDance / Seed Team',
      tagline: 'State-of-the-art human choreography, character swaps, and 30-second sequence directing',
      accentColor: '#ec4899',
      badge: 'Choreography & Consistency',
      overview: 'SeeDance 2.0 & 2.5 lead the industry in complex human body movement, multi-reference character consistency, and long-form sequence generation. From dance numbers and action choreography to swapping characters into live-action footage, SeeDance offers unmatched flexibility.',
      strengths: [
        'Up to 30 reference images for character and wardrobe locking',
        'Extended 30-second multi-shot sequences in 480p, 720p, and 1080p',
        'KarakterSD and Karakter Animate precision face and body re-targeting',
        'Draft tiers for rapid 40-credit prototyping before high-res 1080p rendering'
      ],
      tips: 'Use SeeDance for human-centric action scenes, dances, or when continuity across a long sequence is required.'
    },
    grok: {
      slug: 'grok',
      name: 'xAI Grok',
      developer: 'xAI',
      tagline: 'Ultra-fast visual ideation, bold humor, and cost-effective rough cuts',
      accentColor: '#eab308',
      badge: 'Ultra Fast & Affordable',
      overview: 'Grok video models provide unmatched rendering speed and budget-friendly credits (as low as 10 credits per take). Built on xAI\'s frontier multimodal foundation, Grok offers immediate visual drafts with witty, dynamic character actions.',
      strengths: [
        'Blazing speed: renders rough animatics in under 20 seconds',
        'Uncensored creative exploration and unconventional narrative concepts',
        'High credit efficiency for pre-production exploratory brainstorming',
        'Native text-to-video and image-to-video support'
      ],
      tips: 'Use Grok in early storyboard stages to rapidly iterate 10+ shot concepts without depleting your credit budget.'
    },
    wan: {
      slug: 'wan',
      name: 'Wan 2.1',
      developer: 'Wan Video / Open Weights',
      tagline: 'High-aesthetic open-weights architecture with fluid physics and 14B precision',
      accentColor: '#06b6d4',
      badge: 'Fluid Physics',
      overview: 'Wan 2.1 has made waves across the generative video space with its 14B parameter architecture, demonstrating exceptional fluidity in water simulation, clothing drape, and anime-inspired visual styling.',
      strengths: [
        'Fluid, organic particle and motion physics',
        'Stunning fantasy, anime, and stylized illustration adherence',
        'Excellent camera rotation without tearing or artifacting',
        'Fast generation times on cloud cluster GPUs'
      ],
      tips: 'Wan 2.1 shines with artistic and non-photorealistic aesthetics—specify visual medium (e.g. watercolor, anime cel-shaded, oil painting) in your prompt.'
    },
    flux: {
      slug: 'flux',
      name: 'Flux',
      developer: 'Black Forest Labs',
      tagline: 'Pinnacle image foundation models providing crystal-clear keyframes, character portraits, and stylistic anchors',
      accentColor: '#f43f5e',
      badge: 'Keyframe Perfection',
      overview: 'Black Forest Labs Flux (Pro, Dev, Schnell, and Context) represents the gold standard for generative stills and keyframe reference generation. In 10zebra, Flux serves as the bedrock for character locks and style anchoring.',
      strengths: [
        'Flawless human anatomy, skin textures, hands, and typography',
        'Hyper-accurate prompt following for complex composition staging',
        'Ideal first-frame and character anchor generator for downstream video',
        'Multi-reference character and wardrobe preservation'
      ],
      tips: 'Generate your hero character portraits in Flux Pro first, then feed them as image-to-video references into Kling or Runway for temporal continuity.'
    },
    ltx: {
      slug: 'ltx',
      name: 'Lightricks LTX',
      developer: 'Lightricks',
      tagline: 'Real-time spatial video generation with lightning-fast latency',
      accentColor: '#8b5cf6',
      badge: 'Real-Time Latency',
      overview: 'Lightricks LTX Video is an ultra-lean generative video diffusion transformer built for rapid turnaround. Capable of generating video clips with natural movement and realistic perspective shifts in seconds.',
      strengths: [
        'Sub-15 second generation speeds for instant visual feedback',
        'Consistent object boundaries and perspective during rapid movement',
        'Efficient credit cost profile ideal for high-volume storyboard drafts',
        'Direct text-to-video and image-to-video capabilities'
      ],
      tips: 'Perfect for building quick first-pass animatics to review pacing before committing credits to final high-res renders.'
    },
    nano: {
      slug: 'nano',
      name: 'Nano / Gemini Vision',
      developer: 'Google / 10zebra Labs',
      tagline: 'High-speed image-to-image editing, character face-swaps, and precision inpainting',
      accentColor: '#6366f1',
      badge: 'Multimodal Editing',
      overview: 'Powered by Gemini 3.1 Flash and Pro vision architectures, the Nano family provides the surgical precision required to edit character features, swap props, and prepare reference keyframes for video engines.',
      strengths: [
        'Nano 2 4K high-resolution reference preparation',
        'Nano Aleph & Nano Flash hybrid video transformation pipelines',
        'Support for up to 14 multi-element reference anchors',
        'Natural language reference manipulation ("change the red jacket to leather")'
      ],
      tips: 'Refer specifically to elements of your reference image in your prompt ("keep the face from ref 1, replace the car in the background with a 1970s Mustang").'
    },
    openai: {
      slug: 'openai',
      name: 'OpenAI Stills & Flare',
      developer: 'OpenAI',
      tagline: 'Expressive conceptual imagery and prompt-guided frame manipulation',
      accentColor: '#d946ef',
      badge: 'Conceptual Visuals',
      overview: 'OpenAI Flare and Sunburst models power rapid visual ideation, moodboard frame generation, and precise image-to-image editing for pre-production storyboarding.',
      strengths: [
        'High semantic comprehension of abstract concepts and metaphorical prompts',
        'Two-frame simultaneous generation for shot progression planning',
        'Sunburst and Flare image editing engines',
        'Direct compatibility with 10zebra storyboard pipelines'
      ],
      tips: 'Use Flare for stylized artistic concepts and Sunburst for photorealistic scene compositions.'
    },
    minimax: {
      slug: 'minimax',
      name: 'Minimax',
      developer: 'MiniMax AI',
      tagline: 'High-speed camera motion, explosive action, and fluid human movement',
      accentColor: '#f43f5e',
      badge: 'Dynamic Action',
      overview: 'MiniMax 01 specializes in rapid camera moves, complex physics, and dynamic action shots that challenge traditional AI video models.',
      strengths: [
        'Outstanding handling of fast-moving subjects (vehicles, sports, action)',
        'Smooth interpolation from initial keyframe',
        'Natural physical deformation and motion blur simulation',
        'Fixed cost rate with reliable generation success'
      ],
      tips: 'Ideal for chase sequences, sports highlights, and fast tracking shots where other models introduce warping.'
    }
  };

  // Method categorization helper
  const methodLabels = {
    text2vid: { label: 'Text-to-Video', badge: 'T2V', desc: 'Direct from text prompts' },
    im2vid: { label: 'Image-to-Video', badge: 'I2V', desc: 'Animate from image/first frame' },
    vid2vid: { label: 'Video-to-Video', badge: 'V2V', desc: 'Transform video, style or character' },
    text2seq: { label: 'Multi-Shot Sequence', badge: 'SEQ', desc: 'Continuous multi-shot storytelling' },
    im2im: { label: 'Image Edit', badge: 'EDIT', desc: 'Modify reference frames' },
    text2im: { label: 'Image Generation', badge: 'IMG', desc: 'Generate reference frames' }
  };

  // Process models and categorize
  const processedModels = rawModels.map((m) => {
    let family = m.family;
    const keyLower = m.key.toLowerCase();
    const engineLower = (m.engine || '').toLowerCase();

    if (!family) {
      if (keyLower.includes('kling') || engineLower.includes('kling')) family = 'kling';
      else if (keyLower.includes('runway') || engineLower.includes('runway') || keyLower.includes('aleph')) family = 'runway';
      else if (keyLower.includes('seedance') || engineLower.includes('seedance') || keyLower.includes('karakter')) family = 'seedance';
      else if (keyLower.includes('veo') || engineLower.includes('veo')) family = 'veo';
      else if (keyLower.includes('grok') || engineLower.includes('grok')) family = 'grok';
      else if (keyLower.includes('wan') || engineLower.includes('wan')) family = 'wan';
      else if (keyLower.includes('ltx') || engineLower.includes('ltx')) family = 'ltx';
      else if (keyLower.includes('nanobanana') || keyLower.includes('nb31') || keyLower.includes('nb30') || engineLower.includes('gemini')) family = 'nano';
      else if (keyLower.includes('gpt') || keyLower.includes('openai') || keyLower.includes('sora')) family = 'openai';
      else if (keyLower.includes('seedream') || engineLower.includes('seedream')) family = 'seedream';
      else if (keyLower.includes('minimax') || engineLower.includes('minimax')) family = 'minimax';
      else if (keyLower.includes('flux') || engineLower.includes('flux')) family = 'flux';
      else family = 'other';
    }

    let resolution = '720p';
    if (m.desc?.includes('1080p') || m.name?.includes('1080') || m.key?.includes('1080')) resolution = '1080p';
    else if (m.desc?.includes('4K') || m.name?.includes('4k') || m.key?.includes('4k')) resolution = '4K UHD';
    else if (m.desc?.includes('480p') || m.name?.includes('Draft') || m.key?.includes('draft') || m.desc?.includes('240p')) resolution = '480p Draft';

    let duration = '5s';
    const durationMatch = m.name?.match(/(\d+s)/) || m.key?.match(/(\d+sec|\d+s)/) || m.desc?.match(/(\d+s|\d+ secs)/);
    if (durationMatch) {
      duration = durationMatch[1].replace('sec', 's').replace(' secs', 's');
    }

    let speed = 'Fast (~40s)';
    if (m.cost <= 30) speed = 'Ultra-Fast (~20s)';
    else if (m.cost >= 300) speed = 'Extended (~120s)';
    else if (m.cost >= 150) speed = 'Standard (~75s)';

    const methodInfo = methodLabels[m.method] || { label: m.method, badge: m.method.toUpperCase(), desc: '' };

    return {
      key: m.key,
      name: m.name || m.key,
      family,
      familyKey: family,
      method: m.method,
      methodLabel: methodInfo.label,
      methodBadge: methodInfo.badge,
      engine: m.engine || family,
      desc: m.desc || m.description || '',
      description: m.desc || m.description || '',
      cost: m.cost || m.credits || 10,
      credits: m.credits || m.cost || 10,
      maxRefs: m.maxRefs !== undefined ? m.maxRefs : 0,
      resolution,
      duration,
      speed,
      hasAudio: Boolean(m.name?.toLowerCase().includes('audio') || m.desc?.toLowerCase().includes('audio') || m.desc?.toLowerCase().includes('sound') || family === 'veo'),
      isCharacterSwap: Boolean(m.key?.toLowerCase().includes('karakter')),
      isSequence: m.method === 'text2seq'
    };
  });

  // Build family groupings
  const familyMap = new Map();
  Object.keys(familyMetadata).forEach((slug) => {
    familyMap.set(slug, {
      ...familyMetadata[slug],
      modelCount: 0,
      minCost: 9999,
      maxCost: 0,
      methods: new Set(),
      models: []
    });
  });

  processedModels.forEach((m) => {
    let fam = familyMap.get(m.family);
    if (!fam) {
      fam = {
        slug: m.family,
        name: m.family.toUpperCase(),
        developer: 'Partner Lab',
        tagline: `Specialized models in the ${m.family} suite`,
        accentColor: '#f97316',
        badge: 'Specialized',
        overview: `A collection of specialized generation engines for ${m.family}.`,
        strengths: ['High performance specialized video tasks'],
        tips: 'Refer to model descriptions for optimal prompting style.',
        modelCount: 0,
        minCost: 9999,
        maxCost: 0,
        methods: new Set(),
        models: []
      };
      familyMap.set(m.family, fam);
    }

    fam.models.push(m);
    fam.modelCount++;
    if (m.cost < fam.minCost) fam.minCost = m.cost;
    if (m.cost > fam.maxCost) fam.maxCost = m.cost;
    fam.methods.add(m.methodLabel);
  });

  // Finalize family structures
  const families = Array.from(familyMap.values())
    .filter((f) => f.modelCount > 0)
    .map((f) => ({
      ...f,
      minCost: f.minCost === 9999 ? 0 : f.minCost,
      methods: Array.from(f.methods)
    }))
    .sort((a, b) => b.modelCount - a.modelCount);

  const outputData = {
    lastSynced: new Date().toISOString(),
    source: '../10z/src/utils/config.js',
    totalModels: processedModels.length,
    totalFamilies: families.length,
    families,
    models: processedModels
  };

  fs.writeFileSync(outputModelsJsonPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`  ✅ Synced ${processedModels.length} models across ${families.length} families to src/data/models.json.`);
}

// ============================================================================
// 2. SYNC MCP (MODEL CONTEXT PROTOCOL)
// ============================================================================
function syncMcp() {
  console.log('\n[2/2] 🔌 Syncing MCP Server Definitions...');

  let tools = [];
  let resources = [];
  let prompts = [];

  if (fs.existsSync(mcpServerPyPath)) {
    const code = fs.readFileSync(mcpServerPyPath, 'utf8');

    // Parse Tools
    const toolRegex = /@mcp\.tool\([^)]*\)\s*\ndef\s+([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)(?:\s*->\s*[^:]+)?:(?:\s*"""([\s\S]*?)""")?/g;
    let m;
    while ((m = toolRegex.exec(code)) !== null) {
      const name = m[1];
      const argsRaw = m[2].replace(/\s+/g, ' ').trim();
      const doc = (m[3] || '').trim();
      const firstLine = doc.split('\n')[0].trim();

      // Extract parameter hints
      const params = argsRaw
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => {
          const parts = p.split('=');
          const isRequired = parts.length === 1;
          const nameType = parts[0].trim().split(':');
          const pName = nameType[0].trim();
          const pType = nameType[1] ? nameType[1].trim() : 'any';
          return {
            name: pName,
            type: pType,
            required: isRequired,
            default: parts[1] ? parts[1].trim() : undefined
          };
        });

      tools.push({
        name,
        args: argsRaw,
        doc,
        summary: firstLine || `Executes ${name} on target project.`,
        parameters: params
      });
    }

    // Parse Resources
    const resRegex = /@mcp\.resource\(\s*["']([^"']+)["']\s*\)\s*\ndef\s+([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)(?:\s*->\s*[^:]+)?:(?:\s*"""([\s\S]*?)""")?/g;
    while ((m = resRegex.exec(code)) !== null) {
      const uri = m[1];
      const fn = m[2];
      const doc = (m[4] || '').trim();
      const firstLine = doc.split('\n')[0].trim();

      resources.push({
        uri,
        functionName: fn,
        doc,
        summary: firstLine || `Reads state for ${uri}.`
      });
    }

    // Parse Prompts
    const promptRegex = /@mcp\.prompt\([^)]*\)\s*\ndef\s+([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)(?:\s*->\s*[^:]+)?:(?:\s*"""([\s\S]*?)""")?/g;
    while ((m = promptRegex.exec(code)) !== null) {
      const name = m[1];
      const argsRaw = m[2].replace(/\s+/g, ' ').trim();
      const doc = (m[3] || '').trim();
      const firstLine = doc.split('\n')[0].trim();

      prompts.push({
        name,
        args: argsRaw,
        doc,
        summary: firstLine || `Directs ${name} workflow.`
      });
    }
  } else if (fs.existsSync(outputMcpJsonPath)) {
    console.log('⚠️ Sibling ../10z/mcp/server.py not found. Keeping existing mcp.json.');
    return;
  }

  // Environment variables reference
  const envVars = [
    {
      name: 'MCP_ENDPOINT',
      defaultVal: 'https://10zebra.com/api/v1/mcp',
      meaning: 'Authenticated mcpAction cloud function URL for all state reads and mutations.'
    },
    {
      name: 'MCP_KEY',
      defaultVal: 'YOUR_DIRECTOR_MCP_KEY',
      meaning: 'Shared secret passed as x-mcp-key to authenticate agent calls (Director plan required).'
    },
    {
      name: 'MCP_UID',
      defaultVal: 'YOUR_USER_UID',
      meaning: 'Acting user Firebase UID for attribution (agent:<uid>). Validated cloud-side.'
    },
    {
      name: 'MCP_HOST',
      defaultVal: '127.0.0.1',
      meaning: 'Bind host for the FastMCP streamable-HTTP server.'
    },
    {
      name: 'MCP_PORT',
      defaultVal: '8080',
      meaning: 'Bind port for the FastMCP streamable-HTTP server.'
    },
    {
      name: 'MCP_TRANSPORT',
      defaultVal: 'streamable-http',
      meaning: 'Transport protocol: streamable-http (multi-tenant SSE) or stdio (local desktop).'
    }
  ];

  const mcpCatalog = {
    lastSynced: new Date().toISOString(),
    version: '1.2.0',
    name: '10zebra FastMCP Server',
    subscriptionRequired: 'Director',
    planPriceMonthly: 79,
    transports: ['streamable-http', 'stdio'],
    defaultPort: 8080,
    defaultHost: '127.0.0.1',
    endpoint: {
      prod: 'https://10zebra.com/api/v1/mcp',
      dev: 'https://10zebra.dev/api/v1/mcp',
      local: 'http://localhost:5001/v0zebra-dev/us-central1/mcpAction'
    },
    stats: {
      totalTools: tools.length,
      totalResources: resources.length,
      totalPrompts: prompts.length
    },
    tools,
    resources,
    prompts,
    envVars
  };

  fs.writeFileSync(outputMcpJsonPath, JSON.stringify(mcpCatalog, null, 2), 'utf8');
  console.log(`  ✅ Synced ${tools.length} tools, ${resources.length} resources, and ${prompts.length} prompts to src/data/mcp.json.`);
}

// Execute
if (doModels) syncModels();
if (doMcp) syncMcp();

console.log('\n✨ App synchronization complete!\n');
