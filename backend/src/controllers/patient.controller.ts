import { Request, Response, NextFunction } from "express";
import * as patientService from "../services/patient.service";

export const createPatient = (req: Request, res: Response) => {
  const { firstName, lastName, age, gender, status, phone, lastDateVisit } = req.body;

  const patient = patientService.createPatient({
    firstName,
    lastName,
    age,
    gender,
    status,
    phone,
    lastDateVisit,
  });

  res.status(201).json(patient);
};

export const getAllPatients = (req: Request, res: Response) => {
  const patients = patientService.getAllPatients();
  res.json(patients);
}

export const getPatient = (
  req: Request<{ id: string }>,
  res: Response
) => {
  const patient = patientService.getPatientById(req.params.id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const sortedVisits = [...patient.visits].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  res.json({ ...patient, visits: sortedVisits });
};

export const addVisit = (
  req: Request<{ id: string }>,
  res: Response
) => {
  const patient = patientService.getPatientById(req.params.id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const visit = patientService.addVisitToPatient(patient, req.body);

  res.status(201).json(visit);
};