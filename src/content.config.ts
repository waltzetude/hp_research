import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const sections = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    presentations: z.array(z.object({
      title: z.string(),
      authors: z.array(z.string()).min(1),
      conference: z.string(),
      date: z.string().regex(/^\d{4}\.(0[1-9]|1[0-2])$/, 'YYYY.MM形式で記載してください'),
      location: z.string(),
      type: z.enum(['口頭発表', 'ポスター発表', '招待講演', 'その他']),
      url: z.url().optional(),
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    })).optional(),
  }),
});
const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(), authors: z.string(), venue: z.string(), year: z.number(),
    sample: z.boolean().default(false),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});
export const collections = { sections, publications };
