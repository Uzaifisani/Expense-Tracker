import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Button,
  HStack,
  useToast,
  Text,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExpenseSummary from '../components/dashboard/ExpenseSummary';
import CategoryBreakdown from '../components/dashboard/CategoryBreakdown';
import ExpenseList from '../components/expenses/ExpenseList';
import { expenseService } from '../services/api';
import { Expense } from '../types';
import dayjs from 'dayjs';

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  
  const gridColumns = useBreakpointValue({ base: 1, md: 3 });
  
  useEffect(() => {
    fetchExpenses();
  }, []);
  
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      // Get all expenses
      const response = await expenseService.getAll();
      const allExpenses = response.data;
      setExpenses(allExpenses);
      
      // Get recent expenses (last 5)
      setRecentExpenses(allExpenses.slice(0, 5));
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
      // Refresh expenses after deletion
      fetchExpenses();
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
  
  // Calculate monthly expenses (current month)
  const currentDate = dayjs();
  const startOfMonth = currentDate.startOf('month').format('YYYY-MM-DD');
  const endOfMonth = currentDate.endOf('month').format('YYYY-MM-DD');
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = dayjs(expense.date);
    return expenseDate.isAfter(startOfMonth) && expenseDate.isBefore(endOfMonth);
  });
  
  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading as="h1" size="xl">
          Dashboard
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
      
      <ExpenseSummary expenses={monthlyExpenses} period="month" />
      
      <Grid
        templateColumns={{ base: '1fr', lg: '3fr 1fr' }}
        gap={6}
        mb={6}
      >
        <GridItem>
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>
              Recent Expenses
            </Heading>
            <ExpenseList
              expenses={recentExpenses}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
            {recentExpenses.length > 0 && (
              <Box mt={4} textAlign="center">
                <Button
                  as={Link}
                  to="/expenses"
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                >
                  View All Expenses
                </Button>
              </Box>
            )}
          </Box>
        </GridItem>
        
        <GridItem>
          <CategoryBreakdown expenses={monthlyExpenses} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;