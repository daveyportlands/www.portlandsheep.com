import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    image: z.string().optional(),
  }),
});

const marketplace = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['stock', 'fleece_wool_textile', 'merchandise']),
    date: z.coerce.date(),
    contactName: z.string(),
    contactEmail: z.string(),
    price: z.string().optional(),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

const shows = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    location: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    judge: z.string().optional(),
    status: z.enum(['upcoming', 'results_in', 'cancelled']),
  }),
});

const newsletters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    pdf: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { news, marketplace, pages, shows, newsletters };
