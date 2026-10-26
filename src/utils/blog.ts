import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Filter published posts (includes drafts in DEV mode, excludes in PROD)
 */
export function getPublishedPosts(posts: BlogPost[], isDev = import.meta.env.DEV): BlogPost[] {
  return posts.filter((p) => isDev || !p.data.draft);
}

/**
 * Sort posts by publication date descending
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Calculate estimated reading time from raw markdown content
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  if (!content) return 3;
  // Strip markdown formatting & html tags for word count
  const clean = content.replace(/<[^>]+>/g, ' ').replace(/[#*_`~\[\]()!]/g, ' ');
  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Format publication date for editorial presentation
 */
export function formatBlogDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

/**
 * Format publication date short (e.g. Aug 15, 2026)
 */
export function formatBlogDateShort(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

/**
 * Smart related posts recommendation engine:
 * 1. Shared tags (weight: 3 per matching tag)
 * 2. Same category (weight: 2)
 * 3. Proximity in publication date (weight: 1)
 */
export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  return allPosts
    .filter((p) => p.slug !== currentPost.slug && (!p.data.draft || import.meta.env.DEV))
    .map((post) => {
      let score = 0;
      // Tag match
      const currentTags = currentPost.data.tags || [];
      const postTags = post.data.tags || [];
      const sharedTags = postTags.filter((t) => currentTags.includes(t));
      score += sharedTags.length * 3;

      // Category match
      if (post.data.category && currentPost.data.category && post.data.category === currentPost.data.category) {
        score += 2;
      }

      // Proximity in publication date (within 60 days)
      const daysDiff = Math.abs(currentPost.data.pubDate.getTime() - post.data.pubDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < 60) score += 1;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime())
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * Extract all unique categories with post counts
 */
export function getCategoriesWithCounts(posts: BlogPost[]): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const cat = post.data.category || 'General';
    counts.set(cat, (counts.get(cat) || 0) + 1);
  }
  return Array.from(counts.entries()).map(([category, count]) => ({ category, count }));
}

/**
 * Extract all unique tags
 */
export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
