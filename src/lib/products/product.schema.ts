import z from "zod";

export const ThumbnailSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  url: z.string().url(),
  size: z.number().positive(),
  originalName: z.string().min(1),
  mimeType: z.string(),
  key: z.string(),
  idModule: z.string(),
});

export const ProductSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.boolean(),
  idThumbnail: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  thumbnail: ThumbnailSchema.optional(),
});

export const ProductCreationSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(255),
  description: z.string().min(1, "Descrição é obrigatória"),
  thumbnail: z.instanceof(File).refine(
    (file) => file.size > 0, 
    "Arquivo de thumbnail é obrigatório"
  ),
});

export const ProductUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.boolean().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  "Pelo menos um campo deve ser fornecido para atualização"
);

export const ProductListItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  status: z.boolean(),
  updatedAt: z.string().datetime(),
  thumbnail: ThumbnailSchema.optional(),
});

export const ProductListResponseSchema = z.object({
  data: z.array(ProductListItemSchema),
  meta: z.object({
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductCreation = z.infer<typeof ProductCreationSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
export type ProductListItem = z.infer<typeof ProductListItemSchema>;
