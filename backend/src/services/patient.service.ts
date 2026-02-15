import { v4 as uuidv4 } from "uuid";
import { patients } from "../models/patient.model";
import { Patient, Visit } from "../types/patient.types";

export const createPatient = (data: {
  firstName: string;
  lastName: string;
  age: number | null;
  gender?: "Male" | "Female" | "Other";
  status?: "Active" | "Inactive";
  phone?: string;
  lastDateVisit?: string;
}): Patient => {
  const newPatient: Patient = {
    patientId: uuidv4(),
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    gender: data.gender,
    status: data.status || "Active",
    phone: data.phone,
    lastDateVisit: data.lastDateVisit || new Date().toISOString(),
    visits: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export const getAllPatients = (): Patient[] => {
  return patients;
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.patientId === id);
};

export const addVisitToPatient = (
  patient: Patient,
  visitData: Omit<Visit, "timestamp" | "bmi">
): Visit => {
  const bmi = visitData.weight / (visitData.height ** 2);

  const visit: Visit = {
    ...visitData,
    timestamp: Date.now(),
    bmi,
  };

  patient.visits.push(visit);

  return visit;
};