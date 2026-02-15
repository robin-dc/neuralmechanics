import { api } from "../api";

class PatientService {
    static async getAllPatients() {
        try {
            const response = await api.get(`/patients`);
            return response.data;
        } catch (error) { 
            console.error("Error fetching patients:", error);
            throw error;
        }
    }

    static async getPatientById(id: string) {
        try {
            const response = await api.get(`/patients/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching patient:", error);
            throw error;
        }
    }

    static async createPatient(data: {
        firstName: string;
        lastName: string;
        age: number | null;
        gender?: "Male" | "Female" | "Other";
        status?: "Active" | "Inactive";
        phone?: string;
        lastDateVisit?: string;
    }) {
        try {
            const response = await api.post(`/patients`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating patient:", error);
            throw error;
        }
    }

    static async addVisit(patientId: string, visitData: { systolic: number; diastolic: number; heartRate: number, temperature: number; weight: number; height: number, notes?: string; }) {
        try {
            const response = await api.post(`/patients/${patientId}/visits`, visitData);
            return response.data;
        } catch (error) {
            console.error("Error adding visit:", error);
            throw error;
        }   
    }   

    static async getRiskAssessment(age: number, systolic: number) {
        try {
            const response = await api.post(`/risk-assessment`, { age, systolic });
            return response.data;
        } catch (error) {
            console.error("Error fetching risk assessment:", error);
            throw error;
        }
    }
}

export default PatientService;
