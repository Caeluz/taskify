import { z } from "zod";

const dateStringToDate = z.string().transform((str) => new Date(str));

export const createProjectTaskSchema = {
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    status: z.string(),
    startDate: dateStringToDate,
    dueDate: dateStringToDate,
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
  }),
};

export const updateProjectTaskSchema = {
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    status: z.string(),
    startDate: dateStringToDate,
    dueDate: dateStringToDate,
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
  }),
};
