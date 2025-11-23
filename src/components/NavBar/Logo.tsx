import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo(){
  return (
    <Box className="product-name">
      <Link to="/">
        <Text fontWeight="bold" fontSize="xl">
          AppName
        </Text>
      </Link>
    </Box>
  );
}
