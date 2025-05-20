import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f1ff',
      100: '#c0d6ff',
      200: '#99bbff',
      300: '#739fff',
      400: '#4c84ff',
      500: '#2468ff', // primary
      600: '#1a4dd6',
      700: '#1033ad',
      800: '#071a84',
      900: '#03095c',
    },
    accent: {
      50: '#e6fbff',
      100: '#b3f1ff',
      200: '#80e8ff',
      300: '#4ddfff',
      400: '#1ad6ff',
      500: '#00c7ff', // secondary
      600: '#00a3d6',
      700: '#007fad',
      800: '#005b84',
      900: '#00375c',
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'md',
        },
      },
    },
  },
});

export default theme;