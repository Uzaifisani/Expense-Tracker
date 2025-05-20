import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  useToast,
  Skeleton,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { expenseService } from '../services/api';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { ExpenseFormData, Expense } from '../types';
import { useAuth } from '../context/AuthContext';

const EditExpense = () => {
  const { id } = useParams<{ id: string }>();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!id) return;
    
    const fetchExpense = async () => {
      setIsLoading(true);
      try {
        const response = await expenseService.getById(id);
        setExpense(response.data);
      } catch (error: any) {
        console.error('Error fetching expense:', error);
        toast({
          title: 'Error fetching expense',
          description: error.message || 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        navigate('/expenses');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpense();
  }, [id, toast, navigate]);
  
  const handleUpdateExpense = async (data: ExpenseFormData) => {
    if (!id) return Promise.reject(new Error('No expense ID provided'));
    
    try {
      await expenseService.update(id, data);
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error updating expense:', error);
      return Promise.reject(error);
    }
  };
  
  if (isLoading) {
    return (
      <Box>
        <Heading as="h1" size="xl" mb={6}>
          Edit Expense
        </Heading>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Skeleton height="400px" />
        </Box>
      </Box>
    );
  }
  
  if (!expense) {
    return null;
  }
  
  const formData: ExpenseFormData = {
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    description: expense.description,
    user_id: user?.id || '',
  };
  
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Edit Expense
      </Heading>
      
      <ExpenseForm
        initialData={formData}
        onSubmit={handleUpdateExpense}
        isEditing={true}
      />
    </Box>
  );
};

export default EditExpense;