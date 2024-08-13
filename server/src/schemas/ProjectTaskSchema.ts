import { z } from "zod";

const dateStringToDate = z.string().transform((str) => new Date(str));

export const createProjectTaskSchema = {
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    status: z.string(),
    members: z
      .array(
        z.object({
          id: z.number().int().positive(),
          // name: z.string().min(1, "Name cannot be empty"),
        })
      )
      .min(1, "At least one member is required"),
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
