import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#1e1e1e',
        color: '#d4d4d4',
      },
    },
  },
  colors: {
    brand: {
      50: '#ffe5f0',
      100: '#ffb3d1',
      200: '#ff80b2',
      300: '#ff4d93',
      400: '#ff1a74',
      500: '#dd2a7b',
      600: '#b8225f',
      700: '#931b4b',
      800: '#6e1437',
      900: '#490d23',
    },
    dark: {
      bg: '#1e1e1e',
      surface: '#2d2d2d',
      elevated: '#3a3a3a',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)