import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VitalsTableFilterProps {
  searchTerm: string;
  sortOrder: string | null;
  handleSearch: (value: string) => void;
  setSearchTerm: (value: string) => void;
  setSortOrder: (value: 'asc' | 'desc' | null) => void;
}

const VitalsTableFilter = ({ 
  searchTerm, 
  sortOrder, 
  handleSearch, 
  setSearchTerm, 
  setSortOrder 
}: VitalsTableFilterProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search vitals (height, weight, BP, temp, date)..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm('');
            setSortOrder('desc');
          }}
          disabled={!searchTerm && sortOrder === 'desc'}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default VitalsTableFilter;