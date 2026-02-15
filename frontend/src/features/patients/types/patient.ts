export interface Visit {
  timestamp: number;
  heartRate: number;
  systolic: number;
  diastolic: number;
  temperature: number;
  weight: number;
  height: number;
  bmi: number;
}

export type Gender = 'Male' | 'Female';
export type PatientStatus = 'Active' | 'Inactive';

export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  status: PatientStatus;
  age: number;
  gender: Gender;
  phone: string;
  lastDateVisit: string;
  visits: Visit[];
}

export interface VisitInput {
  heartRate: number;
  systolic: number;
  diastolic: number;
  temperature: number;
  weight: number;
  bmi: number;
  height: number;
  notes: string;
  timestamp: number;
}

export type FilterValue = 'all' | PatientStatus;
export type GenderFilterValue = 'all' | Gender;
