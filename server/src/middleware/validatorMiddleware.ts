import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

type ValidationTarget = "body" | "params" | "query";

interface ValidationSchema {
  body?: z.ZodType<any>;
  params?: z.ZodType<any>;
  query?: z.ZodType<any>;
}

export function validateData(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: { [key in ValidationTarget]?: z.ZodError } = {};

    // Helper function to validate a part of the request
    const validatePart = (part: ValidationTarget) => {
      if (schema[part]) {
        const result = schema[part]!.safeParse(req[part]);
        if (!result.success) {
          errors[part] = result.error;
        }
      }
    };

    // Validate each part
    validatePart("body");
    validatePart("params");
    validatePart("query");

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.entries(errors).flatMap(([target, error]) =>
        error!.errors.map((issue) => ({
          target,
          path: issue.path.join("."),
          message: issue.message,
        }))
      );

      res.status(400).json({ error: "Invalid data", details: errorMessages });
    } else {
      next();
    }
  };
}
