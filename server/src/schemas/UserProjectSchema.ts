import { z } from "zod";

export const createUserProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
});

export const updateUserProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
});
