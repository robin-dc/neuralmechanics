import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import VitalsTable from "./vitals-table/VitalsTable";
import AddVitalsForm from "./AddVitalsForm";
import { useParams } from "react-router-dom";

export default function VitalsList({ visits }: any) {
  const { id } = useParams()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visit Vitals</CardTitle>
        <CardDescription>Record of all patient vitals visits</CardDescription>
        <CardAction>
          <AddVitalsForm patientId={id!} />
        </CardAction>
      </CardHeader>
       <CardContent>
        <VitalsTable data={visits} />
       </CardContent>
    </Card>
   
  );
}
