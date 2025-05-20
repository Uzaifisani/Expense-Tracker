import { 
  Box, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  useColorModeValue, 
  Flex,
  Icon,
} from '@chakra-ui/react';
import { Banknote, TrendingUp, Calendar, Receipt } from 'lucide-react';
import { Expense } from '../../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
  period?: 'day' | 'week' | 'month';
}

const ExpenseSummary = ({ expenses, period = 'month' }: ExpenseSummaryProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const iconBg1 = useColorModeValue('brand.50', 'brand.900');
  const iconBg2 = useColorModeValue('green.50', 'green.900');
  const iconBg3 = useColorModeValue('purple.50', 'purple.900');
  const iconBg4 = useColorModeValue('orange.50', 'orange.900');
  
  // Calculate total expenses
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  // Find most expensive category
  const categoryMap = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);
  
  const mostExpensiveCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
  
  // Calculate average expense
  const averageExpense = expenses.length > 0 ? totalAmount / expenses.length : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  let periodText = '';
  switch (period) {
    case 'day':
      periodText = 'Today';
      break;
    case 'week':
      periodText = 'This Week';
      break;
    case 'month':
      periodText = 'This Month';
      break;
  }
  
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
      <Box
        bg={bgColor}
        p={5}
        borderRadius="lg"
        boxShadow="md"
        transition="transform 0.3s"
        _hover={{ transform: 'translateY(-5px)' }}
      >
        <Flex justify="space-between">
          <Stat>
            <StatLabel color="gray.500">Total Expenses</StatLabel>
            <StatNumber fontSize="2xl">{formatCurrency(totalAmount)}</StatNumber>
            <StatHelpText>{periodText}</StatHelpText>
          </Stat>
          <Flex
            w="3rem"
            h="3rem"
            align="center"
            justify="center"
            rounded="full"
            bg={iconBg1}
            color="brand.500"
          >
            <Icon as={Banknote} boxSize={5} />
          </Flex>
        </Flex>
      </Box>
      
      <Box
        bg={bgColor}
        p={5}
        borderRadius="lg"
        boxShadow="md"
        transition="transform 0.3s"
        _hover={{ transform: 'translateY(-5px)' }}
      >
        <Flex justify="space-between">
          <Stat>
            <StatLabel color="gray.500">Average Expense</StatLabel>
            <StatNumber fontSize="2xl">{formatCurrency(averageExpense)}</StatNumber>
            <StatHelpText>Per Transaction</StatHelpText>
          </Stat>
          <Flex
            w="3rem"
            h="3rem"
            align="center"
            justify="center"
            rounded="full"
            bg={iconBg2}
            color="green.500"
          >
            <Icon as={TrendingUp} boxSize={5} />
          </Flex>
        </Flex>
      </Box>
      
      <Box
        bg={bgColor}
        p={5}
        borderRadius="lg"
        boxShadow="md"
        transition="transform 0.3s"
        _hover={{ transform: 'translateY(-5px)' }}
      >
        <Flex justify="space-between">
          <Stat>
            <StatLabel color="gray.500">Highest Category</StatLabel>
            <StatNumber fontSize="2xl">{mostExpensiveCategory[0]}</StatNumber>
            <StatHelpText>{formatCurrency(mostExpensiveCategory[1])}</StatHelpText>
          </Stat>
          <Flex
            w="3rem"
            h="3rem"
            align="center"
            justify="center"
            rounded="full"
            bg={iconBg3}
            color="purple.500"
          >
            <Icon as={Receipt} boxSize={5} />
          </Flex>
        </Flex>
      </Box>
      
      <Box
        bg={bgColor}
        p={5}
        borderRadius="lg"
        boxShadow="md"
        transition="transform 0.3s"
        _hover={{ transform: 'translateY(-5px)' }}
      >
        <Flex justify="space-between">
          <Stat>
            <StatLabel color="gray.500">Total Transactions</StatLabel>
            <StatNumber fontSize="2xl">{expenses.length}</StatNumber>
            <StatHelpText>{periodText}</StatHelpText>
          </Stat>
          <Flex
            w="3rem"
            h="3rem"
            align="center"
            justify="center"
            rounded="full"
            bg={iconBg4}
            color="orange.500"
          >
            <Icon as={Calendar} boxSize={5} />
          </Flex>
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

export default ExpenseSummary;