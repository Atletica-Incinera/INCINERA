import { z } from "zod";

export const galleryImageSchema = z.object({
  src: z.string().min(1),
});

export const stackStyleSchema = z.object({
  top: z.string(),
  left: z.string(),
  zIndex: z.number(),
  rotate: z.string(),
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type StackStyle = z.infer<typeof stackStyleSchema>;
