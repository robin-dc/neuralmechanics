import { Request, Response } from "express";
import { calculateRisk } from "../services/risk.service";

export const riskAssessment = (req: Request, res: Response) => {
  const { age, systolic } = req.body;

  const result = calculateRisk(age, systolic);

  res.json(result);
};
