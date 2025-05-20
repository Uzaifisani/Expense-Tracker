import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Text,
  useToast,
  useColorModeValue,
  HStack,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Edit2, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Expense } from '../../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

const CategoryBadge = ({ category }: { category: string }) => {
  let colorScheme;
  
  switch (category) {
    case 'Food':
      colorScheme = 'green';
      break;
    case 'Transportation':
      colorScheme = 'purple';
      break;
    case 'Entertainment':
      colorScheme = 'pink';
      break;
    case 'Housing':
      colorScheme = 'blue';
      break;
    case 'Utilities':
      colorScheme = 'cyan';
      break;
    case 'Healthcare':
      colorScheme = 'red';
      break;
    case 'Education':
      colorScheme = 'yellow';
      break;
    case 'Shopping':
      colorScheme = 'orange';
      break;
    case 'Travel':
      colorScheme = 'teal';
      break;
    default:
      colorScheme = 'gray';
  }
  
  return (
    <Badge colorScheme={colorScheme} borderRadius="full" px={2}>
      {category}
    </Badge>
  );
};

const ExpenseList = ({ expenses, onDelete, isLoading = false }: ExpenseListProps) => {
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      toast({
        title: 'Expense deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete expense',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (expenses.length === 0 && !isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          No expenses found. Add a new expense to get started.
        </Text>
        <Button
          as={Link}
          to="/expenses/add"
          colorScheme="blue"
          mt={4}
        >
          Add Expense
        </Button>
      </Box>
    );
  }
  
  return (
    <Box overflowX="auto" bg={bg} borderRadius="lg" boxShadow="md">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Date</Th>
            <Th isNumeric>Amount</Th>
            <Th width="100px">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((expense) => (
            <Tr
              key={expense.id}
              _hover={{ bg: hoverBg }}
              transition="background-color 0.2s"
            >
              <Td>{expense.description}</Td>
              <Td>
                <CategoryBadge category={expense.category} />
              </Td>
              <Td>{formatDate(expense.date)}</Td>
              <Td isNumeric fontWeight="medium">
                {formatCurrency(expense.amount)}
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Actions"
                      icon={<ChevronDownIcon />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<Edit2 size={16} />}
                        as={Link}
                        to={`/expenses/edit/${expense.id}`}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<Trash size={16} />}
                        onClick={() => handleDelete(expense.id)}
                        color="red.500"
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpenseList;