import { NextFunction, Request, Response } from "express";
import { AnySchema } from "joi";

const validateRequest = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
