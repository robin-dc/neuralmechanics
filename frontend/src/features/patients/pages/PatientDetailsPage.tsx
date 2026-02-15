import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VitalsList from "../components/VitalsList";
import HealthSummaryCard from "../components/HealthSummaryCard";
import PatientService from "@/services/patientService";
import { useQuery } from "@tanstack/react-query";
import PatientDetailsCard from "../components/PatientDetailsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Loader from "@/components/Loader";
import { HealthProgress } from "../components/charts/HealthProgressChart";

export default function PatientDetailsPage() {
  const { id } = useParams();

  const { data: patient, isLoading } = useQuery({
      queryKey: ["patient", id],
      queryFn: () => PatientService.getPatientById(id!)
  });

  useEffect(() => {
    console.log("Fetched patient:", patient);
  }, [patient]);


  if (isLoading) return <div className="w-screen h-screen m-auto"><Loader/></div>;

  if (!patient) return <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
    <p className="text-2xl font-bold">Patient not found</p>
    <Button variant='outline' onClick={() => window.location.href = "/"}>Go to Dashboard</Button>
  </div>;

  return (
    <div className="p-6 min-h-screen w-[99vw] max-w-screen overflow-hidden!">
        <div className='max-w-6xl space-y-6 mx-auto overflow-x-hidden'>
          <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Patient Record</h1>
                <p className="text-gray-500 mt-1">Manage {patient.firstName} {patient.lastName}'s patient records.</p>
              </div>
              <div className="space-x-2 flex align-center">
                <Button variant="outline" onClick={() => window.history.back()}><ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Button>
              </div>
          </div>
          
          <PatientDetailsCard patient={patient} />
          <VitalsList visits={patient.visits} />
          <HealthSummaryCard patient={patient} />
          <HealthProgress patient={patient}/>
        </div>
        
    </div>
  );
}
