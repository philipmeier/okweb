const fs = require('fs');
const path = require('path');

const contentDir = path.resolve('d:/10z-web/src/content/blog');
const assetsDir = path.resolve('d:/10z-web/src/assets/blogs');

const fixes = [
  {
    file: 'how-would-a-1980s-steam-ninja-handle-an-ai-pipeline.md',
    fallbackSource: 'how-would-a-1980s-steam-ninja-handle-an-ai-pipeline-inline-1.jpg',
    target: 'how-would-a-1980s-steam-ninja-handle-an-ai-pipeline-hero.jpg'
  },
  {
    file: 'looking-at-contemporary-art-through-the-lens-of-ai.md',
    fallbackSource: 'looking-at-contemporary-art-through-the-lens-of-ai-inline-2.gif',
    target: 'looking-at-contemporary-art-through-the-lens-of-ai-hero.gif'
  },
  {
    file: 'simulation-and-ai-agents-in-hollywood.md',
    fallbackSource: 'simulation-and-ai-agents-in-hollywood-inline-3.gif',
    target: 'simulation-and-ai-agents-in-hollywood-hero.gif'
  }
];

for (const fix of fixes) {
  const src = path.join(assetsDir, fix.fallbackSource);
  const dest = path.join(assetsDir, fix.target);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${fix.fallbackSource} -> ${fix.target}`);
  } else {
    console.error(`Source not found: ${src}`);
  }
}
