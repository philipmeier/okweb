const fs = require('fs');
const path = require('path');
const {
  BLOG_ASSETS_DIR,
  BLOG_CONTENT_DIR,
  fetchUrl,
  downloadBinary,
  unescapeHtml,
  cleanMarkdown,
  categorizePost,
  extractTags
} = require('./migrate-webflow.cjs');

// Read the listing metadata we previously extracted
const listingContent = fs.readFileSync('C:/Users/richr/.gemini/antigravity-ide/brain/2f76fcbe-0f41-47a9-b7dd-d0b020153572/.system_generated/steps/31/content.md', 'utf8');

const cardRegex = /<a href="(\/blog\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
let match;
const postsMap = new Map();

while ((match = cardRegex.exec(listingContent)) !== null) {
  const url = match[1];
  const inner = match[2];
  const slug = url.replace('/blog/', '');

  const imgMatch = inner.match(/src=["'](https:\/\/cdn\.prod\.website-files\.com[^"']+)["']/i);
  const titleMatch = inner.match(/<h3[^>]*class=["']blog-list-title["'][^>]*>([\s\S]*?)<\/h3>/i);
  const dateMatch = inner.match(/<div[^>]*class=["']blog-date["'][^>]*>([\s\S]*?)<\/div>/i);
  const descMatch = inner.match(/<p[^>]*class=["']blog-description[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);

  postsMap.set(slug, {
    slug,
    url: 'https://www.10zebra.com/blog/' + slug,
    listingTitle: titleMatch ? unescapeHtml(titleMatch[1].trim()) : '',
    listingDate: dateMatch ? unescapeHtml(dateMatch[1].trim()) : '',
    listingDesc: descMatch ? unescapeHtml(descMatch[1].trim()) : '',
    listingImage: imgMatch ? imgMatch[1] : ''
  });
}

const posts = Array.from(postsMap.values());
console.log(`Prepared ${posts.length} posts for migration.`);

function getExt(url, defaultExt = 'jpg') {
  try {
    const cleanUrl = url.split('?')[0];
    const ext = path.extname(cleanUrl).toLowerCase().replace('.', '');
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
      return ext === 'jpeg' ? 'jpg' : ext;
    }
  } catch (e) {}
  return defaultExt;
}

async function migrateAll() {
  const downloads = [];
  const results = [];

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    console.log(`[${i + 1}/${posts.length}] Processing: ${p.slug}`);

    try {
      const html = await fetchUrl(p.url);

      // Extract Post Title
      const h1Match = html.match(/<h1[^>]*class=["']fn-heading-1["'][^>]*>([\s\S]*?)<\/h1>/i) ||
                      html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const title = h1Match ? unescapeHtml(h1Match[1].replace(/<[^>]+>/g, '').trim()) : (p.listingTitle || p.slug);

      // Extract Meta Description
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
      let description = descMatch ? unescapeHtml(descMatch[1].trim()) : p.listingDesc;
      if (!description || description.length < 10) {
        description = `Explore "${title}" — insights and techniques from the 10zebra AI video production workspace.`;
      }

      // Extract Hero Image
      // 1. From page background-image
      const bgMatch = html.match(/class=["'][^"']*fn-section[^"']*["'][^>]*style=["'][^"']*url\(["']?([^"')]+)["']?\)/i) ||
                      html.match(/style=["'][^"']*url\(&quot;([^&]+)&quot;\)/i) ||
                      html.match(/style=["'][^"']*url\(["']?([^"')]+)["']?\)[^"']*class=["'][^"']*fn-section/i);
      let heroImageUrl = bgMatch ? bgMatch[1] : p.listingImage;

      // 2. If still none, check first image in page
      if (!heroImageUrl) {
        const firstImg = html.match(/<img[^>]+src=["'](https:\/\/cdn\.prod\.website-files\.com[^"']+)["']/i);
        if (firstImg) heroImageUrl = firstImg[1];
      }

      // Extract Rich Text Content
      const richTextMatch = html.match(/<aside[^>]*class=["'][^"']*rich-text-block[^"']*["'][^>]*>([\s\S]*?)<\/aside>/i) ||
                            html.match(/<div[^>]*class=["'][^"']*w-richtext[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      const richHtml = richTextMatch ? richTextMatch[1] : '';

      // Date parsing
      let pubDate = p.listingDate ? new Date(p.listingDate) : new Date('2024-06-01');
      if (isNaN(pubDate.getTime())) {
        pubDate = new Date('2024-06-01');
      }

      // Category & Tags
      const category = categorizePost(p.slug, title, description, richHtml);
      const tags = extractTags(p.slug, title, description, richHtml);

      // Media Downloader callback
      const imageMap = new Map();
      const imageDownloader = (srcUrl, targetBaseName) => {
        if (!srcUrl || !srcUrl.startsWith('http')) return srcUrl;
        const ext = getExt(srcUrl, 'jpg');
        const fileName = `${targetBaseName}.${ext}`;
        const destPath = path.join(BLOG_ASSETS_DIR, fileName);
        imageMap.set(srcUrl, { destPath, fileName });
        // Return relative path for Astro Markdown
        return `../../assets/blogs/${fileName}`;
      };

      // Download Hero Image
      let heroAssetRelative = '';
      if (heroImageUrl && heroImageUrl.startsWith('http')) {
        const heroExt = getExt(heroImageUrl, 'jpg');
        const heroFileName = `${p.slug}-hero.${heroExt}`;
        const heroDestPath = path.join(BLOG_ASSETS_DIR, heroFileName);
        imageMap.set(heroImageUrl, { destPath: heroDestPath, fileName: heroFileName });
        heroAssetRelative = `../../assets/blogs/${heroFileName}`;
      } else {
        // Fallback: create a solid branded fallback if missing
        const fallbackName = `${p.slug}-hero.jpg`;
        const fallbackPath = path.join(BLOG_ASSETS_DIR, fallbackName);
        if (!fs.existsSync(fallbackPath)) {
          // Copy a fallback or create empty
          fs.writeFileSync(fallbackPath, '');
        }
        heroAssetRelative = `../../assets/blogs/${fallbackName}`;
      }

      // Clean Markdown Content
      const markdownContent = cleanMarkdown(richHtml, p.slug, imageDownloader);

      // Download all registered images
      for (const [srcUrl, { destPath, fileName }] of imageMap.entries()) {
        try {
          await downloadBinary(srcUrl, destPath);
        } catch (err) {
          console.warn(`  Warning: failed to download ${srcUrl}: ${err.message}`);
        }
      }

      // Construct frontmatter
      const cleanTitle = title.replace(/"/g, '\\"');
      const cleanDesc = description.replace(/"/g, '\\"');
      const tagsYaml = tags.map(t => `  - "${t}"`).join('\n');

      const fileContent = `---
title: "${cleanTitle}"
description: "${cleanDesc}"
pubDate: "${pubDate.toISOString().split('T')[0]}"
author: "Philip Meier"
authorRole: "Founder, 10zebra & Computational Neuroscientist"
authorAvatar: "/images/team/philip-meier.jpg"
image: "${heroAssetRelative}"
imageAlt: "${cleanTitle}"
category: "${category}"
tags:
${tagsYaml}
featured: ${i === 0}
draft: false
---

${markdownContent}
`;

      const targetMdPath = path.join(BLOG_CONTENT_DIR, `${p.slug}.md`);
      fs.writeFileSync(targetMdPath, fileContent, 'utf8');
      results.push({ slug: p.slug, status: 'OK', images: imageMap.size });

    } catch (e) {
      console.error(`  Error migrating ${p.slug}:`, e.message);
      results.push({ slug: p.slug, status: 'ERROR', error: e.message });
    }
  }

  console.log('\n=======================================');
  console.log(`Migration Complete: ${results.filter(r => r.status === 'OK').length}/${posts.length} successful.`);
  console.log('=======================================');
}

migrateAll().catch(err => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});
