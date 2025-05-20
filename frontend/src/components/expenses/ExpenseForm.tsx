import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ExpenseFormData } from '../../types';

interface ExpenseFormProps {
  initialData?: ExpenseFormData;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  isEditing?: boolean;
}

const EXPENSE_CATEGORIES = [
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

const ExpenseForm = ({ initialData, onSubmit, isEditing = false }: ExpenseFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  
  const defaultValues: ExpenseFormData = initialData || {
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({ defaultValues });
  
  const handleFormSubmit = async (data: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: isEditing ? 'Expense updated' : 'Expense added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/expenses');
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      width="100%"
    >
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            id="amount"
            type="number"
            step="0.01"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
          />
          <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.category}>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select
            id="category"
            placeholder="Select category"
            {...register('category', { required: 'Category is required' })}
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.date}>
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input
            id="date"
            type="date"
            {...register('date', { required: 'Date is required' })}
          />
          <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        
        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          mt={4}
          isLoading={isSubmitting}
        >
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </Button>
      </VStack>
    </Box>
  );
};

export default ExpenseForm;