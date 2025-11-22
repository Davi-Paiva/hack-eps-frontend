import { HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NavLinks(){
  return (
    <HStack gap={8} className="nav-links">
      <Link to="/">
        <Button variant="ghost" size="md" className="navbar-button">
          Home
        </Button>
      </Link>

      <Link to="/map">
        <Button variant="ghost" size="md" className="navbar-button">
          Map
        </Button>
      </Link>

      <Link to="/import-farm">
        <Button variant="ghost" size="md" className="navbar-button">
          Import Farm
        </Button>
      </Link>
    </HStack>
  );
}
