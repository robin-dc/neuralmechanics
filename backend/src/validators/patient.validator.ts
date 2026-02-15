import Joi from "joi";

export const patientSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  age: Joi.number().integer().min(0).max(120).required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  status: Joi.string().valid("Active", "Inactive").required(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).required(),
  lastDateVisit: Joi.date().iso().optional(),
});
