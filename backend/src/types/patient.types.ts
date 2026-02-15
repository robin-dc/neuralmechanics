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

export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  age: number | null;
  gender?: "Male" | "Female" | "Other";
  status?: "Active" | "Inactive";
  phone?: string;
  lastDateVisit?: string;
  visits: Visit[];
}