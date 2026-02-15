import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDetailsPage from "@/features/patients/pages/PatientDetailsPage";
import PatientVitals from "@/pages/Patients";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientVitals />} />
        <Route path="/patient/:id" element={<PatientDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
