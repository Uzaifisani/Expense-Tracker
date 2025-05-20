import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  Progress,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Expense } from '../../types';

interface CategoryBreakdownProps {
  expenses: Expense[];
}

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: 'green.500',
  Transportation: 'purple.500',
  Entertainment: 'pink.500',
  Housing: 'blue.500',
  Utilities: 'cyan.500',
  Healthcare: 'red.500',
  Education: 'yellow.500',
  Shopping: 'orange.500',
  Travel: 'teal.500',
  Other: 'gray.500',
};

const CategoryBreakdown = ({ expenses }: CategoryBreakdownProps) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const bgColor = useColorModeValue('white', 'gray.800');
  
  useEffect(() => {
    if (expenses.length === 0) {
      setCategoryData([]);
      return;
    }
    
    // Calculate totals by category
    const categoryMap = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate total amount
    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    
    // Transform into array with percentages
    const data = Object.entries(categoryMap)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: (amount / totalAmount) * 100,
        color: CATEGORY_COLORS[name] || 'gray.500',
      }))
      .sort((a, b) => b.amount - a.amount);
    
    setCategoryData(data);
  }, [expenses]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  if (expenses.length === 0) {
    return (
      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        boxShadow="md"
        height="100%"
      >
        <Heading size="md" mb={4}>
          Category Breakdown
        </Heading>
        <Text color="gray.500">No expense data available</Text>
      </Box>
    );
  }
  
  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      height="100%"
    >
      <Heading size="md" mb={6}>
        Category Breakdown
      </Heading>
      
      <VStack spacing={4} align="stretch">
        {categoryData.map((category) => (
          <Box key={category.name}>
            <Grid templateColumns="1fr auto auto" gap={2} mb={1}>
              <GridItem>
                <Text fontWeight="medium">{category.name}</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold" color={category.color}>
                  {formatCurrency(category.amount)}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" color="gray.500">
                  {category.percentage.toFixed(1)}%
                </Text>
              </GridItem>
            </Grid>
            <Progress
              value={category.percentage}
              colorScheme={category.color.split('.')[0]}
              size="sm"
              borderRadius="full"
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CategoryBreakdown;