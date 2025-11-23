import { HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NavLinks(){
  return (
    <HStack gap={8} className="nav-links">
      
      <Link to="/map">
        <Button variant="ghost" size="md" className="navbar-button">
          Map
        </Button>
      </Link>
      <Link to="/farms">
        <Button variant="ghost" size="md" className="navbar-button">
          Farms
        </Button>
      </Link>

      <Link to="/slaughterhouses">
        <Button variant="ghost" size="md" className="navbar-button">
          Slaughterhouses
        </Button>
      </Link>

      <Link to="/simulation">
        <Button variant="ghost" size="md" className="navbar-button">
          Simulation
        </Button>
      </Link>
    </HStack>
  );
}
