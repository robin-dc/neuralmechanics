import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface PatientsTableFilterProps {
  searchTerm: string;
  sortOrder: string | null;
  handleSearch: (value: string) => void;
  statusFilter: string;
  handleStatusFilterChange: (value: string) => void;
  genderFilter: string;
  handleGenderFilterChange: (value: string) => void;
  setSearchTerm: (value: any) => void;
  setStatusFilter: (value: any) => void;
  setGenderFilter: (value: any) => void;
  setSortOrder: (value: any | null) => void;
}
const PatientsTableFilter = ({ searchTerm, sortOrder, handleSearch, statusFilter, handleStatusFilterChange, genderFilter, handleGenderFilterChange, setSearchTerm, setStatusFilter, setGenderFilter, setSortOrder }: PatientsTableFilterProps) => {
  return (
     <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px] relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>

            <Select value={genderFilter} onValueChange={handleGenderFilterChange}>
                <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setGenderFilter('all');
                    setSortOrder(null);
                }}
                disabled={!searchTerm && statusFilter === 'all' && genderFilter === 'all' && sortOrder === null}
            >
            Clear Filters
            </Button>
        </div>
    </div>
  )
}

export default PatientsTableFilter