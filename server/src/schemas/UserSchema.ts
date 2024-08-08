import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  username: z.string().min(4).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});
