const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const BLOG_ASSETS_DIR = path.resolve('d:/10z-web/src/assets/blogs');
const BLOG_CONTENT_DIR = path.resolve('d:/10z-web/src/content/blog');

if (!fs.existsSync(BLOG_ASSETS_DIR)) fs.mkdirSync(BLOG_ASSETS_DIR, { recursive: true });
if (!fs.existsSync(BLOG_CONTENT_DIR)) fs.mkdirSync(BLOG_CONTENT_DIR, { recursive: true });

function fetchUrl(targetUrl, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) return reject(new Error('Too many redirects: ' + targetUrl));
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, targetUrl).toString();
        }
        return fetchUrl(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${targetUrl} status ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Timeout ' + targetUrl));
    });
  });
}

function downloadBinary(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve(destPath);
    }
    const parsed = new URL(fileUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, fileUrl).toString();
        }
        return downloadBinary(redirectUrl, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${fileUrl}: ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(destPath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => resolve(destPath));
      });
      stream.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Timeout downloading ' + fileUrl));
    });
  });
}

function unescapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\u200D/g, '') // zero-width joiner
    .replace(/\u200B/g, '') // zero-width space
    .trim();
}

function cleanMarkdown(html, slug, imageDownloader) {
  if (!html) return '';

  let md = html;

  // Clean script, style, comments
  md = md.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  md = md.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Strip figure wrappers and convert iframes cleanly
  md = md.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, '$1');
  md = md.replace(/<iframe[^>]+src=["']https:\/\/www\.youtube\.com\/embed\/([^"'\?]+)[^"']*["'][^>]*>[\s\S]*?<\/iframe>/gi, (match, vidId) => {
    return `\n\n<div class="video-embed aspect-video my-8 rounded-xl overflow-hidden border border-[var(--border-subtle)]"><iframe class="w-full h-full" src="https://www.youtube.com/embed/${vidId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>\n\n`;
  });
  md = md.replace(/<iframe[^>]+src=["'](?!https:\/\/www\.youtube\.com\/embed\/)([^"']+)["'][^>]*><\/iframe>/gi, (match, src) => {
    return `\n\n<div class="video-embed aspect-video my-8 rounded-xl overflow-hidden border border-[var(--border-subtle)]"><iframe class="w-full h-full" src="${src}" frameborder="0" allowfullscreen></iframe></div>\n\n`;
  });

  // Headings: normalize H1 inside body to H2, and H2 to H3 if needed
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (match, text) => {
    const cleanText = unescapeHtml(text.replace(/<[^>]+>/g, '')).trim();
    return cleanText ? `\n\n## ${cleanText}\n\n` : '';
  });
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (match, text) => {
    const cleanText = unescapeHtml(text.replace(/<[^>]+>/g, '')).trim();
    return cleanText ? `\n\n### ${cleanText}\n\n` : '';
  });
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (match, text) => {
    const cleanText = unescapeHtml(text.replace(/<[^>]+>/g, '')).trim();
    return cleanText ? `\n\n#### ${cleanText}\n\n` : '';
  });

  // Strong & Emphasis
  md = md.replace(/<strong>([\s\S]*?)<\/strong>/gi, (m, t) => `**${t.trim()}**`);
  md = md.replace(/<b>([\s\S]*?)<\/b>/gi, (m, t) => `**${t.trim()}**`);
  md = md.replace(/<em>([\s\S]*?)<\/em>/gi, (m, t) => `*${t.trim()}*`);
  md = md.replace(/<i>([\s\S]*?)<\/i>/gi, (m, t) => `*${t.trim()}*`);

  // Links
  md = md.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (match, href, text) => {
    const cleanText = unescapeHtml(text.replace(/<[^>]+>/g, '')).trim();
    return cleanText ? `[${cleanText}](${href})` : '';
  });

  // Images in content
  let imgIndex = 1;
  md = md.replace(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, (match, src, alt) => {
    const localRef = imageDownloader(src, `${slug}-inline-${imgIndex++}`);
    return `\n\n![${unescapeHtml(alt)}](${localRef})\n\n`;
  });
  md = md.replace(/<img[^>]+alt=["']([^"']*)["'][^>]+src=["']([^"']+)["'][^>]*>/gi, (match, alt, src) => {
    const localRef = imageDownloader(src, `${slug}-inline-${imgIndex++}`);
    return `\n\n![${unescapeHtml(alt)}](${localRef})\n\n`;
  });
  md = md.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
    const localRef = imageDownloader(src, `${slug}-inline-${imgIndex++}`);
    return `\n\n![](${localRef})\n\n`;
  });

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, text) => {
    const clean = unescapeHtml(text.replace(/<[^>]+>/g, '')).trim();
    return `\n\n> ${clean}\n\n`;
  });

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (match, text) => {
    const clean = unescapeHtml(text.replace(/<br\s*[\/]?>/gi, '\n')).trim();
    if (!clean || clean === '‍' || clean === '&nbsp;') return '';
    return `\n\n${clean}\n\n`;
  });

  // Clean list items
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, t) => `\n- ${unescapeHtml(t.replace(/<[^>]+>/g, '')).trim()}`);
  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');

  // Strip remaining HTML tags except video-embed containers
  md = md.replace(/<(?!div|\/div|iframe|\/iframe)[^>]+>/gi, '');

  // Compress multiple blank lines
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  return md;
}

// Category mapping helper
function categorizePost(slug, title, desc, content) {
  const text = (slug + ' ' + title + ' ' + desc + ' ' + content).toLowerCase();
  if (text.includes('comfy') || text.includes('colab') || text.includes('tutorial') || text.includes('workflow') || text.includes('comic') || text.includes('parallax') || text.includes('shadow') || text.includes('how to')) {
    return 'Workflows & Tutorials';
  }
  if (text.includes('xprize') || text.includes('de la torre') || text.includes('falling to pieces') || text.includes('dune') || text.includes('future anthropologists') || text.includes('creative brief') || text.includes('screenland') || text.includes('actor') || text.includes('hollywood')) {
    return 'Case Studies & Previs';
  }
  if (text.includes('collapse') || text.includes('flux') || text.includes('kling') || text.includes('ninja') || text.includes('best ai creators') || text.includes('giants') || text.includes('model')) {
    return 'AI Models & Tech';
  }
  if (text.includes('illusion') || text.includes('contemporary art') || text.includes('soul') || text.includes('bauble') || text.includes('dark') || text.includes('jump in') || text.includes('perception')) {
    return 'Narrative & Perception';
  }
  return 'Community & Events';
}

function extractTags(slug, title, desc, content) {
  const text = (slug + ' ' + title + ' ' + desc + ' ' + content).toLowerCase();
  const candidates = [
    ['Flux', text.includes('flux')],
    ['ComfyUI', text.includes('comfy')],
    ['Kling', text.includes('kling')],
    ['Storyboarding', text.includes('storyboard')],
    ['Previs', text.includes('previs')],
    ['XPRIZE', text.includes('xprize')],
    ['Film Production', text.includes('film') || text.includes('movie')],
    ['Neuroscience', text.includes('neuro') || text.includes('brain') || text.includes('perception')],
    ['Case Study', text.includes('case study') || text.includes('behind the scenes')],
    ['Tutorial', text.includes('tutorial') || text.includes('guide') || text.includes('how to')],
    ['Actors', text.includes('actor')],
    ['Character Consistency', text.includes('character')],
    ['Community', text.includes('jam') || text.includes('competition') || text.includes('discord')],
    ['Art & Technology', text.includes('art') || text.includes('glass') || text.includes('sculpture')]
  ];
  const tags = candidates.filter(c => c[1]).map(c => c[0]);
  if (tags.length === 0) tags.push('AI Video', '10zebra');
  return tags;
}

module.exports = {
  BLOG_ASSETS_DIR,
  BLOG_CONTENT_DIR,
  fetchUrl,
  downloadBinary,
  unescapeHtml,
  cleanMarkdown,
  categorizePost,
  extractTags
};
