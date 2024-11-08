import { z } from "zod";

export const createProjectMemberSchema = {
  body: z.object({
    userId: z.number().min(1),
    role: z.string(),
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
  }),
  //   query: z.object({
  //     includeDetails: z.enum(["true", "false"]).optional(),
  //   }),
};

export const addMultipleProjectMembersSchema = {
  body: z.object({
    // userIds: z.array(z.number().min(1)),
    // role: z.string(),
    members: z
      .object({
        userId: z.number().min(1),
        role: z.string(),
      })
      .array(),
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
  }),
};

export const updateProjectMemberSchema = {
  body: z.object({
    // userId: z.number().min(1),
    role: z.string(),
  }),
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
    memberId: z.string().regex(/^\d+$/).transform(Number),
  }),
};
