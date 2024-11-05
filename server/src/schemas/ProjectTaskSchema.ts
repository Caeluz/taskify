import { z } from "zod";

const dateStringToDate = z.string().transform((str) => new Date(str));

export const createProjectTaskSchema = {
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    // status: z.string(),
    taskStatusId: z.number().int().positive(),
    members: z.array(
      z.object({
        id: z.number().int().positive(),
        // name: z.string().min(1, "Name cannot be empty"),
      })
    ),
    // .min(1, "At least one member is required"),
    startDate: dateStringToDate,
    dueDate: dateStringToDate.optional(),
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
    // status: z.string(),
    taskStatusId: z.number().int().positive(),
    startDate: dateStringToDate,
    dueDate: dateStringToDate.optional(),
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
  }),
};

export const updateProjectTaskMembersSchema = {
  body: z.object({
    memberIds: z.array(z.number().int().positive()),
  }),
};

export const updateTaskStatusSchema = {
  body: z.object({
    taskStatusId: z.number().int(),
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
    taskId: z.string().regex(/^\d+$/).transform(Number),
  }),
};

export const updateTaskStatusAndPositionSchema = {
  body: z.object({
    taskStatusId: z.number().int(),
    position: z.number().int(),
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
    taskId: z.string().regex(/^\d+$/).transform(Number),
  }),
};
