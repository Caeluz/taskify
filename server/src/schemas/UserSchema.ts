import { z } from "zod";

export const createUserSchema = {
  body: z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
  }),
};

export const updateUserSchema = {
  body: z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
  }),
};
