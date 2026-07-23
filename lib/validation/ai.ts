
import { z } from "zod";

export const WritingFeedbackInput = z.object({
  text: z.string().min(20).max(5000),
  prompt: z.string().min(3).max(1000),
  level: z.string().default("B1"),
  targetVocabulary: z.array(z.string()).default([]),
  grammarTargets: z.array(z.string()).default([])
});

export const UnitGeneratorInput = z.object({
  language: z.enum(["English", "French"]),
  level: z.string().min(1),
  theme: z.string().min(2).max(120),
  grammarTarget: z.string().min(2).max(200),
  learnerAge: z.enum(["children", "teens", "adults"]).default("adults")
});

export const AdaptivePlanInput = z.object({
  vocabulary: z.number().min(0).max(100),
  grammar: z.number().min(0).max(100),
  listening: z.number().min(0).max(100),
  reading: z.number().min(0).max(100),
  speaking: z.number().min(0).max(100),
  writing: z.number().min(0).max(100)
});
