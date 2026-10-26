import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Philip Meier'),
      authorRole: z.string().default('Founder, 10zebra & Computational Neuroscientist'),
      authorAvatar: z.string().default('/images/team/philip-meier.jpg'),
      image: image(),
      imageAlt: z.string().optional(),
      category: z.string().default('Workflows & Tutorials'),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
