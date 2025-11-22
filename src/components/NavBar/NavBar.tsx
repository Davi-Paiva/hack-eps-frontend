import { Box, Container, HStack } from '@chakra-ui/react';
import Logo from '../Logo/Logo';
import NavLinks from './NavLinks';
import GitHubMenu from './GitHubMenu';
import './NavBar.css';

export default function NavBar(){
  return (
    <Box className="app-navbar">
      <Container maxW="container.xl" className="navbar-container">
        <HStack justify="space-between" w="full" align="center">
          <Logo />
          <NavLinks />
          <GitHubMenu />
        </HStack>
      </Container>
    </Box>
  );
}
