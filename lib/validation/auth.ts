
import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
});
