import { z } from "zod";

export const createUserProjectSchema = {
  body: z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
  }),
  params: z.object({
    userId: z.string().regex(/^\d+$/).transform(Number),
  }),
};

export const updateUserProjectSchema = {
  body: z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
  }),
  // params: z.object({
  //   projectId: z.string().regex(/^\d+$/).transform(Number),
  // }),
};
