// scripts/sync-models.mjs
// Automated sync script: pulls latest AI model definitions from ../10z/src/utils/config.js
// Outputs src/data/models.json and can be re-run at any time via `npm run sync:models`

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const configPath = path.resolve(rootDir, '../10z/src/utils/config.js');
const outputJsonPath = path.resolve(rootDir, 'src/data/models.json');

console.log('🔄 Syncing AI models from:', configPath);

let configContent = '';
if (fs.existsSync(configPath)) {
  configContent = fs.readFileSync(configPath, 'utf8');
} else if (fs.existsSync(outputJsonPath)) {
  console.log('⚠️ Sibling ../10z/src/utils/config.js not found. Using existing models.json as base.');
  process.exit(0);
} else {
  console.error('❌ Could not locate config.js or models.json!');
  process.exit(1);
}

// Extract prod deletions
const lines = configContent.split('\n');
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
      // Safely evaluate data object literal
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

console.log(`✅ Extracted ${rawModels.length} active production models.`);

// Family metadata definitions
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
    tips: 'Upload 2-3 clean reference images of your character from front, three-quarter, and action angles to maximize facial identity preservation.'
  },
  grok: {
    slug: 'grok',
    name: 'xAI Grok',
    developer: 'xAI',
    tagline: 'Ultra-fast, budget-friendly 720p drafting and animatics for rapid ideation',
    accentColor: '#eab308',
    badge: 'Rapid Previs & Economy',
    overview: 'Grok Imagine Video is 10zebra\'s fastest and most cost-effective video model. At just 20 credits per take, it allows producers to brainstorm dozens of narrative beats, visual ideas, and camera angles before committing to high-cost final renders.',
    strengths: [
      'Lowest credit cost per take in the industry (from 20 credits)',
      'Sub-20 second generation turnaround for live directing sessions',
      'Fast 4-frame storyboard ideation and rapid image editing',
      'Ideal for animatics, mood reels, and story pacing tests'
    ],
    tips: 'Use Grok in your initial storyboarding phase to quickly map out 10-15 scene variations, then graduate hero shots to Kling or Veo for final export.'
  },
  wan: {
    slug: 'wan',
    name: 'Wan 2.1 & WanVACE',
    developer: 'Alibaba Cloud / Wan Open Model',
    tagline: 'Open-weights powerhouse excelling in stylized anime, vibrant action, and budget-friendly video-to-video',
    accentColor: '#06b6d4',
    badge: 'Stylized & Open Weights',
    overview: 'Wan 2.1 has revolutionized generative video with its open-weights architecture. It brings extraordinary visual flair to anime, futuristic sci-fi, dynamic fight scenes, and video-to-video editing via WanVACE at exceptional credit economy.',
    strengths: [
      'Vibrant stylized aesthetics, anime, and high-energy action sequences',
      'WanVACE video-to-video conditioning at 420p and 720p',
      '10-second multi-shot sequence generation',
      'Competitive credit rates with 1080p Pro upgrade option'
    ],
    tips: 'Wan is the top recommendation for anime, concept art motion, and cybernetic/fantasy aesthetics. Include vivid lighting color palettes in your prompt.'
  },
  flux: {
    slug: 'flux',
    name: 'Flux Pro',
    developer: 'Black Forest Labs',
    tagline: 'The gold standard for photorealistic character anchors and reference portraits',
    accentColor: '#8b5cf6',
    badge: 'Character Anchor',
    overview: 'Created by the original team behind Stable Diffusion, Flux Pro delivers photorealism, skin textures, and anatomical accuracy that serve as the foundation for character-consistent video takes across 10zebra.',
    strengths: [
      'Unsurpassed skin texture, eye catchlights, and photorealism',
      'Flawless hand and finger generation for foreground interaction',
      'Zero-distortion baseline portraits for video-to-video character swaps',
      'Rapid 8-second generation time at only 5-10 credits'
    ],
    tips: 'Generate your main characters first using Flux Pro, then pass the resulting image into Runway, SeeDance, or Kling as your reference anchor.'
  },
  ltx: {
    slug: 'ltx',
    name: 'LTX Video',
    developer: 'Lightricks',
    tagline: 'Real-time video conditioning with fast temporal coherence and retake capabilities',
    accentColor: '#14b8a6',
    badge: 'Speed & Video Retakes',
    overview: 'LTX Video is engineered specifically for fast video-to-video conditioning and shot retakes. It allows creators to take an existing video take and re-prompt specific elements while preserving camera movement.',
    strengths: [
      'High-speed video-to-video transformation at 1080p',
      'LTX-2 Retake pipeline for repairing awkward motion beats',
      'Prompt-modified first-frame conditioning with Nano integration',
      'Budget-friendly turnaround for iterative revisions'
    ],
    tips: 'Use LTX-2 Retake when you love the camera path of a take but want to modify the character clothing, background season, or lighting atmosphere.'
  },
  nano: {
    slug: 'nano',
    name: 'Google Gemini & Nano',
    developer: 'Google DeepMind',
    tagline: 'Advanced multimodal reference editing, 4K image transformations, and hybrid engines',
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
  // Infer family if not specified
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

  // Resolution detection
  let resolution = '720p';
  if (m.desc?.includes('1080p') || m.name?.includes('1080') || m.key?.includes('1080')) resolution = '1080p';
  else if (m.desc?.includes('4K') || m.name?.includes('4k') || m.key?.includes('4k')) resolution = '4K UHD';
  else if (m.desc?.includes('480p') || m.name?.includes('Draft') || m.key?.includes('draft') || m.desc?.includes('240p')) resolution = '480p Draft';

  // Duration
  let duration = '5s';
  const durationMatch = m.name?.match(/(\d+s)/) || m.key?.match(/(\d+sec|\d+s)/) || m.desc?.match(/(\d+s|\d+ secs)/);
  if (durationMatch) {
    duration = durationMatch[1].replace('sec', 's').replace(' secs', 's');
  }

  // Speed estimation
  let speed = 'Fast (~40s)';
  if (m.cost <= 30) speed = 'Ultra-Fast (~20s)';
  else if (m.cost >= 300) speed = 'Extended (~120s)';
  else if (m.cost >= 150) speed = 'Standard (~75s)';

  const methodInfo = methodLabels[m.method] || { label: m.method, badge: m.method.toUpperCase(), desc: '' };

  return {
    key: m.key,
    name: m.name,
    family,
    method: m.method,
    methodLabel: methodInfo.label,
    methodBadge: methodInfo.badge,
    engine: m.engine,
    desc: m.desc || '',
    cost: m.cost || 0,
    maxRefs: m.maxRefs !== undefined ? m.maxRefs : 0,
    resolution,
    duration,
    speed,
    hasAudio: Boolean(m.name?.toLowerCase().includes('audio') || m.desc?.toLowerCase().includes('audio') || m.desc?.toLowerCase().includes('sound')),
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

fs.writeFileSync(outputJsonPath, JSON.stringify(outputData, null, 2), 'utf8');
console.log(`🎉 Successfully synchronized ${processedModels.length} models across ${families.length} families to:`);
console.log(`   ${outputJsonPath}`);
