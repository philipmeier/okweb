const fs = require('fs');
const path = require('path');

const contentDir = path.resolve('d:/10z-web/src/content/blog');
const assetsDir = path.resolve('d:/10z-web/src/assets/blogs');

const files = fs.readdirSync(contentDir);
const missing = [];

for (const f of files) {
  if (!f.endsWith('.md')) continue;
  const content = fs.readFileSync(path.join(contentDir, f), 'utf8');
  const match = content.match(/image:\s*["']([^"']+)["']/);
  if (match) {
    const rel = match[1];
    const abs = path.resolve(contentDir, rel);
    if (!fs.existsSync(abs) || fs.statSync(abs).size === 0) {
      missing.push({ file: f, image: rel, abs });
    }
  }
}

console.log('Missing hero images count:', missing.length);
console.log(JSON.stringify(missing, null, 2));
