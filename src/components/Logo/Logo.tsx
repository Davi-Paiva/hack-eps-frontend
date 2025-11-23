import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import './Logo.css';

export default function Logo(){
  return (
    <Link to="/">
      <Box className="product-name" display="flex" alignItems="center">
        <Image src={logoImg} alt="App Logo" className='logo-image' />
        <p className='app-name'>PiggyBack Ride</p>
      </Box>
    </Link>
  );
}
