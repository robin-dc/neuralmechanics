import { RiskAssessmentResult } from "../types/risk.types";

export const calculateRisk = (age: number, systolic: number): RiskAssessmentResult => {
  if (age < 0 || age > 120) {
    throw new Error("Age must be between 0 and 120");
  }
  
  if (systolic < 70 || systolic > 250) {
    throw new Error("Systolic blood pressure must be between 70 and 250 mmHg");
  }

  const score = (age * 0.3) + (systolic * 0.5) + 10;
  
  // Round to 1 decimal place for cleaner output
  const riskScore = Math.round(score * 10) / 10;

  let riskLevel: string;
  
  if (riskScore < 50) {
    riskLevel = "Low Risk";
  } else if (riskScore < 70) {
    riskLevel = "Moderate Risk";
  } else {
    riskLevel = "High Risk";
  }

  return { riskScore, riskLevel };
};