import { useEffect, useState } from 'react';
import { 
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
import { Button } from '@/components/ui/button';
import type { VisitInput } from '../../types/patient';
import VitalsTableFilter from './VitalsTableFilter';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function VitalsTable({ data }: { data: VisitInput[] | undefined }) {
  const [vitals, setVitals] = useState<VisitInput[]>(data || []);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>('desc');
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setVitals(data || []);
  }, [data]);

  const toggleSort = (): void => {
    if (sortOrder === null) {
      setSortOrder('desc'); // Latest first
    } else if (sortOrder === 'desc') {
      setSortOrder('asc'); // Oldest first
    } else {
      setSortOrder('desc'); // Back to latest first
    }
  };

  // Filter and sort vitals
  let filteredVitals = vitals?.filter((vital: VisitInput) => {
    // Global search - search across all numeric and date fields
    const matchesSearch = searchTerm === '' || 
      String(vital.height).includes(searchTerm) ||
      String(vital.weight).includes(searchTerm) ||
      String(vital.systolic).includes(searchTerm) ||
      String(vital.diastolic).includes(searchTerm) ||
      String(vital.temperature).includes(searchTerm) ||
      String(vital.heartRate).includes(searchTerm) ||
      String(vital.bmi.toFixed(2)).includes(searchTerm) ||
      new Date(vital.timestamp).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Apply sorting if active
  if (sortOrder !== null) {
    filteredVitals = [...filteredVitals]?.sort((a, b) => {
      return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
    });
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredVitals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVitals = filteredVitals.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string): void => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
  };

  // Generate page numbers
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
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <VitalsTableFilter 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost"
                    onClick={toggleSort}
                    className="flex items-center gap-2 border-0"
                  >
                    Date Visit
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
                <TableHead className="font-semibold">Heart Rate</TableHead>
                <TableHead className="font-semibold">Height (m)</TableHead>
                <TableHead className="font-semibold">Weight (kg)</TableHead>
                <TableHead className="font-semibold">Systolic</TableHead>
                <TableHead className="font-semibold">Diastolic</TableHead>
                <TableHead className="font-semibold">Temperature (°C)</TableHead>
                <TableHead className="font-semibold">BMI</TableHead>
                <TableHead className="font-semibold max-w-40 w-40">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedVitals?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    No vitals found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVitals?.map((vital) => (
                  <TableRow key={vital.timestamp} className="hover:bg-gray-50">
                    <TableCell className="font-medium pl-6">
                      {new Date(vital.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{vital.heartRate} bpm</TableCell>
                    <TableCell>{vital.height} m</TableCell>
                    <TableCell>{vital.weight} kg</TableCell>
                    <TableCell>{vital.systolic} mmHg</TableCell>
                    <TableCell>{vital.diastolic} mmHg</TableCell>
                    <TableCell>{vital.temperature} °C</TableCell>
                    <TableCell>{vital.bmi.toFixed(2)}</TableCell>
                    {vital.notes && <TableCell className='max-w-40 w-40 overflow-hidden'>
                      <Tooltip>
                        <TooltipTrigger className='font-normal! text-left max-w-40 w-40 overflow-hidden whitespace-nowrap text-nowrap text-ellipsis'>
                          {vital.notes}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{vital.notes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* Results count and items per page */}
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, filteredVitals.length)}</span> of{' '}
                <span className="font-medium">{filteredVitals.length}</span> vitals
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

            {vitals && vitals.length > 0 && (
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