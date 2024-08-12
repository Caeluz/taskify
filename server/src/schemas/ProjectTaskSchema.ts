import { z } from "zod";

const dateStringToDate = z.string().transform((str) => new Date(str));

export const createProjectTaskSchema = z.object({
  // projectId
  name: z.string(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.string(),
  startDate: dateStringToDate,
  dueDate: dateStringToDate,
});

export const updateProjectTaskSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.string(),
  startDate: dateStringToDate,
  dueDate: dateStringToDate,
});
