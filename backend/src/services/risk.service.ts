import { RiskAssessmentResult } from "../types/risk.types";

export const calculateRisk = (
  age: number,
  systolic: number
): RiskAssessmentResult => {
  if (age < 0 || age > 120) {
    throw new Error("Age must be between 0 and 120");
  }
  
  if (systolic < 70 || systolic > 250) {
    throw new Error("Systolic blood pressure must be between 70 and 250 mmHg");
  }

  const riskScore = (age * 0.3 + systolic * 0.5 + 10);

  const riskLevel = riskScore >= 50 ? "High Risk" : "Low Risk";

  console.log("Calculated risk score:", age, systolic, riskScore);
  return { riskScore, riskLevel };
};
