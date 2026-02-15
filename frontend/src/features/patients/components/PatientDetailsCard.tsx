import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Patient } from '../types/patient'
import { Badge } from "@/components/ui/badge"

const PatientDetailsCard = ({ patient }: { patient: Patient }) => {
  return (
    <Card className='px-4'>
        <CardHeader className='mb-0 p-0'>
            <CardTitle>Information Details</CardTitle>
            <CardDescription>Primary details of the patient</CardDescription>
            <CardAction>
                <Badge variant="secondary" className={`font-bold uppercase tracking-wider ${patient.status === "Active" ? "text-green-600 bg-green-600/10 border border-green-600" : "text-red-600 bg-red-600/10 border border-red-600"}`}>{patient.status}</Badge>
            </CardAction>
        </CardHeader>

        <CardContent className='border p-4 rounded-xl'>
            <div>
                <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <div className='h-6 w-1 bg-green-600'></div>
                    Name: <span className="text-lg font-semibold text-black">{patient.firstName} {patient.lastName}
                    </span>
                </p>
                <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <div className='h-6 w-1 bg-green-600'></div>
                    Age: <span className="text-lg font-semibold text-black">{patient.age}
                    </span>
                </p>
                <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <div className='h-6 w-1 bg-green-600'></div>
                    Gender: <span className="text-lg font-semibold text-black">{patient.gender}
                    </span>
                </p>
                <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <div className='h-6 w-1 bg-green-600'></div>
                    Phone: <span className="text-lg font-semibold text-black">{patient.phone}
                    </span>
                </p>
                <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <div className='h-6 w-1 bg-green-600'></div>
                    Last Date Visit: <span className="text-lg font-semibold text-black">{new Date(patient.lastDateVisit).toLocaleDateString()}
                    </span>
                </p>
            </div>
        </CardContent>
    </Card>
  )
}

export default PatientDetailsCard