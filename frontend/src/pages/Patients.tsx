import Loader from '@/components/Loader';
import CreatePatientForm from '@/features/patients/components/CreatePatientForm';
import PatientTable from '@/features/patients/components/patients-table/PatientsTable'
import PatientService from '@/services/patientService';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const PatientsVitals = () => {

   const { data, isLoading } = useQuery({
      queryKey: ["all-patients",],
      queryFn: () => PatientService.getAllPatients()
  });

  useEffect(() => {
    console.log("Fetched patients:", data);
  }, [data]);

  if (isLoading) return <div className="w-screen h-screen m-auto"><Loader/></div>;

  return (
    <div className="w-screen p-6 min-h-screen">
       <div className='max-w-6xl space-y-6 mx-auto'>
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Neural Mechanics</h1>
              <p className="text-gray-500 mt-1">Manage all your patient records in one place.</p>
            </div>
            <CreatePatientForm/>
        </div>
        <PatientTable data={data} />
       </div>
       
    </div>
  )
}

export default PatientsVitals