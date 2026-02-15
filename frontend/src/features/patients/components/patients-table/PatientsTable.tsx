import { useEffect, useState } from 'react';
import { 
  MoreHorizontal, 
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PatientsTableFilter from './PatientsTableFilter';
import type { FilterValue, GenderFilterValue, Patient } from '../../types/patient';

export default function PatientTable({ data }: { data: Patient[] | undefined }) {
  const [patients, setPatients] = useState<Patient[]>(data || []);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<FilterValue>('all');
  const [genderFilter, setGenderFilter] = useState<GenderFilterValue>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>('desc');
  

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

 
  const handleSearch = (value: string): void => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setPatients(data || []);
  }, [data]);


  const toggleSort = (): void => {
    if (sortOrder === null) {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  };

  let filteredPatients = patients?.filter((patient: Patient) => {
    const matchesSearch = searchTerm === '' || 
      Object.values(patient).some((val: string | number) => 
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;

    const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });

  if (sortOrder !== null) {
    filteredPatients = [...filteredPatients]?.sort((a, b) => {
      const dateA = new Date(a.lastDateVisit).getTime();
      const dateB = new Date(b.lastDateVisit).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // const handleItemsPerPageChange = (value: string): void => {
  //   setItemsPerPage(Number(value));
  //   setCurrentPage(1); // Reset to first page
  // };


  const handleStatusFilterChange = (value: string): void => {
    setStatusFilter(value as FilterValue);
    setCurrentPage(1);
  };

  const handleGenderFilterChange = (value: string): void => {
    setGenderFilter(value as GenderFilterValue);
    setCurrentPage(1);
  };

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      <PatientsTableFilter 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        statusFilter={statusFilter}
        handleStatusFilterChange={handleStatusFilterChange}
        genderFilter={genderFilter}
        handleGenderFilterChange={handleGenderFilterChange}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
        setGenderFilter={setGenderFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold pl-4">Id</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Age</TableHead>
                <TableHead className="font-semibold">Gender</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost"
                    onClick={toggleSort}
                    className="flex items-center gap-2 border-0"
                  >
                    Last Visit
                    <div className="flex flex-col">
                      <ChevronDown 
                        className={`w-1.5 h-1.5 text-sm -mb-1 rotate-180 transition-opacity ${
                          sortOrder === 'asc' ? 'opacity-100' : 'opacity-30'
                        }`}
                      />
                      <ChevronDown 
                        className={`w-2 h-2 transition-opacity ${
                          sortOrder === 'desc' ? 'opacity-100' : 'opacity-30'
                        }`}
                      />
                    </div>
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold text-right pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPatients?.map((patient) => (
                  <TableRow key={patient.patientId} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{patient.patientId}</TableCell>
                    <TableCell className="font-medium">{patient.firstName} {patient.lastName}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={patient.status === 'Active' ? 'default' : 'secondary'}
                        className={patient.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(patient.lastDateVisit).toLocaleDateString()}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        {/* <DropdownMenuContent align="end" className="w-[180px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => navigate(`/patient/${patient.patientId}`)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(patient)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4 text-red-600 focus:text-red-600" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent> */}
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, filteredPatients.length)}</span> of{' '}
                <span className="font-medium">{filteredPatients.length}</span> patients
              </p>
              
              {/* <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-[70px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>

            {patients && patients.length > 0 && (
                <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((pageNum, index) => (
                  pageNum === -1 ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
                  ) : (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-8"
                    >
                      {pageNum}
                    </Button>
                  )
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}