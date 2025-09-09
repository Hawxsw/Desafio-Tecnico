import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required (base64 encoded)"),
});

export type ProductSchema = z.infer<typeof productSchema>;
