
import { z } from "zod";

export const UnitCreateSchema = z.object({
  languageId: z.string().min(1),
  levelId: z.string().min(1),
  number: z.number().int().positive(),
  slug: z.string().min(2),
  title: z.string().min(2),
  subtitle: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT")
});

export const UnitUpdateSchema = UnitCreateSchema.partial();
