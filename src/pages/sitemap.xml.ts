// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getModelFamilies } from '/src/data/models';
import { solutions } from '/src/data/solutions';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://10zebra.com';
  const today = new Date().toISOString().split('T')[0];

  // Core Static Pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/models', priority: '0.9', changefreq: 'daily' },
    { url: '/mcp', priority: '0.9', changefreq: 'weekly' },
    { url: '/pricing', priority: '0.9', changefreq: 'weekly' },
    { url: '/faq', priority: '0.8', changefreq: 'weekly' },
    { url: '/demo', priority: '0.8', changefreq: 'monthly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/solutions', priority: '0.8', changefreq: 'weekly' },
    { url: '/features', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
  ];

  // Feature Pages
  const featureSlugs = [
    'model-comparison',
    'character-swap',
    'text-to-sequence',
    'quick-start-tools',
    'project-management',
    'publish-to-youtube',
    'collaborative-storyboard',
    'multi-reference-edit',
    'produce-and-export',
    'team-management',
  ];
  const featurePages = featureSlugs.map((slug) => ({
    url: `/features/${slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  // Solutions Pages
  const solutionPages = solutions.map((s) => ({
    url: `/solutions/${s.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
  }));

  // AI Model Family Pages
  const modelFamilies = getModelFamilies();
  const modelPages = modelFamilies.map((f) => ({
    url: `/models/${f.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
  }));

  // Blog Posts
  const blogPosts = await getCollection('blog');
  const blogPages = blogPosts.map((post) => {
    const postDate = post.data.pubDate
      ? new Date(post.data.pubDate).toISOString().split('T')[0]
      : today;
    return {
      url: `/blog/${post.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: postDate,
    };
  });

  const allUrls = [
    ...staticPages,
    ...solutionPages,
    ...featurePages,
    ...modelPages,
    ...blogPages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${item.lastmod || today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'noindex', // Don't index the sitemap itself in web SERP
    },
  });
};
