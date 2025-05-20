import { useState } from 'react';
import {
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ExpenseFilters as FilterType } from '../../types';

interface ExpenseFiltersProps {
  onFilter: (filters: FilterType) => void;
}

const EXPENSE_CATEGORIES = [
  'All',
  'Food',
  'Transportation',
  'Entertainment',
  'Housing',
  'Utilities',
  'Healthcare',
  'Education',
  'Shopping',
  'Travel',
  'Other',
];

const ExpenseFilters = ({ onFilter }: ExpenseFiltersProps) => {
  const [filterType, setFilterType] = useState<'date' | 'dateRange' | 'category' | 'categoryDate'>('date');
  const [filters, setFilters] = useState<FilterType>({
    date: new Date().toISOString().split('T')[0],
    category: 'All',
  });
  
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  
  const handleFilterTypeChange = (type: 'date' | 'dateRange' | 'category' | 'categoryDate') => {
    setFilterType(type);
    // Reset filters except for the selected type
    setFilters({
      date: type === 'date' || type === 'category' ? new Date().toISOString().split('T')[0] : undefined,
      startDate: type === 'dateRange' ? new Date().toISOString().split('T')[0] : undefined,
      endDate: type === 'dateRange' ? new Date().toISOString().split('T')[0] : undefined,
      category: type === 'category' || type === 'categoryDate' ? 'All' : undefined,
    });
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  
  const handleApplyFilter = () => {
    // Transform filters based on the selected filter type
    let appliedFilters: FilterType = {};
    
    switch (filterType) {
      case 'date':
        appliedFilters = { date: filters.date };
        break;
      case 'dateRange':
        appliedFilters = { 
          startDate: filters.startDate,
          endDate: filters.endDate,
        };
        break;
      case 'category':
        appliedFilters = { 
          category: filters.category !== 'All' ? filters.category : undefined,
          date: filters.date,
        };
        break;
      case 'categoryDate':
        appliedFilters = {
          category: filters.category !== 'All' ? filters.category : undefined,
          startDate: filters.startDate,
          endDate: filters.endDate,
        };
        break;
    }
    
    onFilter(appliedFilters);
  };
  
  const handleReset = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Reset based on filter type
    switch (filterType) {
      case 'date':
        setFilters({ date: today });
        onFilter({ date: today });
        break;
      case 'dateRange':
        setFilters({ startDate: today, endDate: today });
        onFilter({ startDate: today, endDate: today });
        break;
      case 'category':
        setFilters({ category: 'All', date: today });
        onFilter({ date: today });
        break;
      case 'categoryDate':
        setFilters({ category: 'All', startDate: today, endDate: today });
        onFilter({ startDate: today, endDate: today });
        break;
    }
  };
  
  return (
    <Box 
      bg="white" 
      p={4} 
      borderRadius="lg" 
      boxShadow="md" 
      mb={6}
      transition="all 0.3s"
    >
      <HStack spacing={2} mb={4} wrap="wrap">
        <Button
          size={buttonSize}
          colorScheme={filterType === 'date' ? 'blue' : 'gray'}
          variant={filterType === 'date' ? 'solid' : 'outline'}
          onClick={() => handleFilterTypeChange('date')}
          mb={{ base: 2, md: 0 }}
        >
          By Date
        </Button>
        <Button
          size={buttonSize}
          colorScheme={filterType === 'dateRange' ? 'blue' : 'gray'}
          variant={filterType === 'dateRange' ? 'solid' : 'outline'}
          onClick={() => handleFilterTypeChange('dateRange')}
          mb={{ base: 2, md: 0 }}
        >
          By Date Range
        </Button>
        <Button
          size={buttonSize}
          colorScheme={filterType === 'category' ? 'blue' : 'gray'}
          variant={filterType === 'category' ? 'solid' : 'outline'}
          onClick={() => handleFilterTypeChange('category')}
          mb={{ base: 2, md: 0 }}
        >
          By Category
        </Button>
        <Button
          size={buttonSize}
          colorScheme={filterType === 'categoryDate' ? 'blue' : 'gray'}
          variant={filterType === 'categoryDate' ? 'solid' : 'outline'}
          onClick={() => handleFilterTypeChange('categoryDate')}
          mb={{ base: 2, md: 0 }}
        >
          By Category & Date Range
        </Button>
      </HStack>
      
      <SimpleGrid columns={{ base: 1, md: filterType === 'dateRange' || filterType === 'categoryDate' ? 3 : 2 }} spacing={4}>
        {(filterType === 'date' || filterType === 'category') && (
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={filters.date || ''}
              onChange={handleFilterChange}
            />
          </FormControl>
        )}
        
        {(filterType === 'dateRange' || filterType === 'categoryDate') && (
          <>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                name="startDate"
                value={filters.startDate || ''}
                onChange={handleFilterChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                name="endDate"
                value={filters.endDate || ''}
                onChange={handleFilterChange}
              />
            </FormControl>
          </>
        )}
        
        {(filterType === 'category' || filterType === 'categoryDate') && (
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={filters.category || 'All'}
              onChange={handleFilterChange}
            >
              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </SimpleGrid>
      
      <HStack mt={4} justify="flex-end" spacing={4}>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button colorScheme="blue" onClick={handleApplyFilter}>
          Apply Filters
        </Button>
      </HStack>
    </Box>
  );
};

export default ExpenseFilters;