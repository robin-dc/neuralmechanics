import { Request, Response, NextFunction } from "express";
import { vitalsSchema } from "../validators/vitals.validator";

export const validateVitals = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = vitalsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
