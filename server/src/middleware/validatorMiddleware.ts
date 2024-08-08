import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMessages = result.error.errors.map((issue: any) => ({
        // message: `${issue.path.join(".")} is ${issue.message}`,
        message: `${issue.path.join(".")} - ${issue.message}`,
      }));
      res.status(400).json({ error: "Invalid data", details: errorMessages });
    } else {
      next();
    }
  };
}
