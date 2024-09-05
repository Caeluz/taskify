import { date, z } from "zod";

export const createProjectColumnSchema = {
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
  }),
  body: z.object({
    // name: z.string(),
    taskStatusId: z.number(),
  }),
};

export const updateProjectColumnStatusSchema = {
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
    projectColumnId: z.string().regex(/^\d+$/).transform(Number),
  }),
  body: z.object({
    taskStatusId: z.number(),
  }),
};

export const updateProjectColumnPositionSchema = {
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
    projectColumnId: z.string().regex(/^\d+$/).transform(Number),
  }),
  body: z.object({
    position: z.number(),
  }),
};
