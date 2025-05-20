import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <VStack spacing={8} mx="auto" maxW="lg" py={12} px={6} textAlign="center">
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bg={useColorModeValue('brand.500', 'brand.300')}
          backgroundClip="text"
          color="transparent"
        >
          404
        </Heading>
        <Heading as="h2" size="xl">
          Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button
          as={Link}
          to="/"
          colorScheme="blue"
          leftIcon={<HomeIcon size={16} />}
        >
          Go to Home
        </Button>
      </VStack>
    </Flex>
  );
};

export default NotFound;