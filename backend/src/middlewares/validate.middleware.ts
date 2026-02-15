
import { Request, Response, NextFunction } from "express";
import { patientSchema } from "../validators/patient.validator";

export const validatePatient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = patientSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
