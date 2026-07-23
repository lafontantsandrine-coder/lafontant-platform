
import { z } from "zod";

export const LiveClassInput = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  startsAt: z.string().datetime(),
  durationMinutes: z.number().int().min(15).max(240),
  meetingUrl: z.string().url(),
  levelId: z.string().optional()
});

export const HomeworkInput = z.object({
  title: z.string().min(2),
  instructions: z.string().min(10),
  dueAt: z.string().datetime(),
  points: z.number().int().min(1).max(100),
  lessonId: z.string().optional()
});

export const CheckoutInput = z.object({
  plan: z.enum(["trial", "monthly", "annual"])
});
