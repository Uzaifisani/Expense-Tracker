import {
  Box,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { expenseService } from '../services/api';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { ExpenseFormData } from '../types';

const AddExpense = () => {
  const toast = useToast();
  
  const handleAddExpense = async (data: ExpenseFormData) => {
    try {
      await expenseService.create(data);
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error adding expense:', error);
      toast({
        title: 'Error adding expense',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return Promise.reject(error);
    }
  };
  
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Add New Expense
      </Heading>
      
      <ExpenseForm onSubmit={handleAddExpense} />
    </Box>
  );
};

export default AddExpense;