import { Box, HStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';

export default function GitHubMenu(){
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <Box
      className="github-slide-container"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <HStack
        gap={0}
        className={`github-slide-menu ${isDropdownOpen ? 'expanded' : ''}`}
      >

        <a
          href="https://github.com/Davi-Paiva/hack-eps-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="github-repo-button"
        >
          Frontend
        </a>

        <a
          href="https://github.com/ppuig2503/hack-eps-backend"
          target="_blank"
          rel="noopener noreferrer"
          className="github-repo-button"
        >
          Backend
        </a>

        <Box className="github-icon-button">
          <FaGithub size={24} />
        </Box>
      </HStack>
    </Box>
  );
}
