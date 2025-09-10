import z from "zod";

export const ThumbnailSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  url: z.string(),
  size: z.number(),
  originalName: z.string(),
  mimeType: z.string(),
  key: z.string(),
  idModule: z.string(),
});

export const ProductSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.boolean(),
  idThumbnail: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  thumbnail: ThumbnailSchema.optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductCreationSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.any(),
});