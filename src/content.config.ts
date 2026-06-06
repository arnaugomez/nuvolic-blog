import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      picture_attribution: z
        .object({
          name: z.string(),
          link: z.string().url(),
        })
        .optional(),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  posts: postsCollection,
};
