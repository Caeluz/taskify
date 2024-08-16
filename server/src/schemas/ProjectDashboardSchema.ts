import { date, z } from "zod";

export const getProjectDashboardCalendarSchema = {
  params: z.object({
    projectId: z.string().regex(/^\d+$/).transform(Number),
  }),
  query: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
};
