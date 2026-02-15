import Joi from "joi";

export const vitalsSchema = Joi.object({
  heartRate: Joi.number().integer().min(20).max(250).required(),
  systolic: Joi.number().integer().min(50).max(300).required(),
  diastolic: Joi.number().integer().min(30).max(200).required(),
  temperature: Joi.number().min(30).max(45).required(),
  weight: Joi.number().min(1).max(500).required(),
  height: Joi.number().required(),
  notes: Joi.string().max(500).allow('').optional(),
});
