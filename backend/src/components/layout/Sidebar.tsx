import { Box, Stack, Text, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import { 
  PieChartIcon,
  ListIcon, 
  PlusCircleIcon,
} from 'lucide-react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: any;
  children: React.ReactNode;
  to: string;
}

const SidebarItem = ({ icon, children, to }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Box
      as={RouterLink}
      to={to}
      w="full"
      borderRadius="md"
      bg={isActive ? 'brand.500' : 'transparent'}
      color={isActive ? 'white' : 'gray.600'}
      _hover={{
        bg: isActive ? 'brand.600' : 'gray.100',
        color: isActive ? 'white' : 'gray.800',
      }}
      transition="all 0.2s"
    >
      <Flex align="center" p={3}>
        <Icon as={icon} boxSize={5} mr={3} />
        <Text fontWeight="medium">{children}</Text>
      </Flex>
    </Box>
  );
};

const Sidebar = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      display={{ base: 'none', md: 'block' }}
    >
      <Box p={5}>
        <Stack spacing={2}>
          <SidebarItem icon={PieChartIcon} to="/">
            Dashboard
          </SidebarItem>
          <SidebarItem icon={ListIcon} to="/expenses">
            Expenses
          </SidebarItem>
          <SidebarItem icon={PlusCircleIcon} to="/expenses/add">
            Add Expense
          </SidebarItem>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sidebar;