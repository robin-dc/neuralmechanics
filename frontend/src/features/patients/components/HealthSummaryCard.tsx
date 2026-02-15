import Loader from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientService from "@/services/patientService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function HealthSummaryCard({ patient }: any) {
  if (!patient.visits.length) {
    return <div></div>;
  }

  const { data: risk, isLoading } = useQuery({
    queryKey: ["risk", patient.id],
    queryFn: () => PatientService.getRiskAssessment(patient.age, patient.visits[0].systolic)
  });

  useEffect(() => {
    console.log("Fetched risk:", risk);
  }, [risk]);

  if (isLoading) return <div className="w-screen h-screen m-auto"><Loader/></div>;
  
  const color =
    risk === "Low Risk"
      ? "bg-green-100 border-green-500"
      : risk === "High Risk"
      ? "bg-yellow-100 border-yellow-500"
      : "bg-red-100 border-red-500";

  return (
    <Card className={`border-0 gap-2 space-y-0 p-0 shadow-none`}>
      <CardHeader className="p-0">
        <CardTitle>
          Current Health Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 my-0 p-0">
        <Card className={`border-2 ${color} w-full`}>
          <CardHeader>
            <CardTitle className="text-gray-800">
              Risk score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{risk?.riskScore?.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className={`border-2 ${color} w-full`}>
          <CardHeader>
            <CardTitle className="text-gray-800">
              Risk Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{risk?.riskLevel}</p>
          </CardContent>
        </Card>
       
      </CardContent>
    </Card>
  );
}
