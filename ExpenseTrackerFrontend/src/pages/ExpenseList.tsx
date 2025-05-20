import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  HStack,
  useToast,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExpenseFilters from '../components/expenses/ExpenseFilters';
import ExpenseListComponent from '../components/expenses/ExpenseList';
import { expenseService } from '../services/api';
import { Expense, ExpenseFilters as FilterType } from '../types';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterType>({});
  const toast = useToast();
  
  useEffect(() => {
    fetchExpenses();
  }, []);
  
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await expenseService.getAll();
      setExpenses(response.data);
    } catch (error: any) {
      console.error('Error fetching expenses:', error);
      toast({
        title: 'Error fetching expenses',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await expenseService.delete(id);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error: any) {
      toast({
        title: 'Error deleting expense',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  const handleFilter = async (newFilters: FilterType) => {
    setIsLoading(true);
    setFilters(newFilters);
    
    try {
      let response;
      
      // Determine which API endpoint to call based on filters
      if (newFilters.category && newFilters.startDate && newFilters.endDate) {
        // Category and date range filter
        response = await expenseService.getByCategoryAndDateRange(
          newFilters.category,
          newFilters.startDate,
          newFilters.endDate
        );
      } else if (newFilters.startDate && newFilters.endDate) {
        // Date range filter
        response = await expenseService.getByDateRange(
          newFilters.startDate,
          newFilters.endDate
        );
      } else if (newFilters.category && newFilters.date) {
        // Category and specific date filter
        response = await expenseService.getByCategory(
          newFilters.category,
          newFilters.date
        );
      } else if (newFilters.date) {
        // Specific date filter
        response = await expenseService.getByDate(newFilters.date);
      } else {
        // No filters, get all
        response = await expenseService.getAll();
      }
      
      setExpenses(response.data);
    } catch (error: any) {
      console.error('Error applying filters:', error);
      toast({
        title: 'Error filtering expenses',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading as="h1" size="xl">
          Expenses
        </Heading>
        <Button
          as={Link}
          to="/expenses/add"
          leftIcon={<PlusIcon size={18} />}
          colorScheme="blue"
        >
          Add Expense
        </Button>
      </HStack>
      
      <ExpenseFilters onFilter={handleFilter} />
      
      {isLoading ? (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Skeleton height="48px" mb={6} />
          <SkeletonText mt={4} noOfLines={6} spacing={4} skeletonHeight={4} />
        </Box>
      ) : (
        <ExpenseListComponent 
          expenses={expenses} 
          onDelete={handleDelete} 
        />
      )}
    </Box>
  );
};

export default ExpenseList;