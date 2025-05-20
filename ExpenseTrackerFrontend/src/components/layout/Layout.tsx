import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1">
        <Sidebar />
        <Box flex="1" p={4} bg="gray.50">
          <Container maxW="container.xl" py={6}>
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;