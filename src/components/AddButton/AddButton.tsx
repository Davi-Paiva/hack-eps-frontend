import { useState } from 'react'
import { Box, Button, IconButton, VStack, useColorModeValue } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

interface AddButtonProps {
  onAddFarm: () => void
  onAddSlaughterhouse: () => void
  onAddCSV: () => void
}

function AddButton({ onAddFarm, onAddSlaughterhouse, onAddCSV }: AddButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const bgGradient = 'linear(to-br, blue.500, blue.700)'
  const hoverBg = useColorModeValue('blue.600', 'blue.500')

  const handleOptionClick = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  return (
    <Box
      position="fixed"
      bottom="2rem"
      right="2rem"
      zIndex={1000}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
    >
      {isOpen && (
        <VStack spacing={2} animation="slideUp 0.3s ease">
          <Button
            size="sm"
            colorScheme="blue"
            variant="solid"
            onClick={() => handleOptionClick(onAddFarm)}
            minW="160px"
            boxShadow="md"
            _hover={{ transform: 'translateX(-4px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            Add Farm
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            variant="solid"
            onClick={() => handleOptionClick(onAddSlaughterhouse)}
            minW="160px"
            boxShadow="md"
            _hover={{ transform: 'translateX(-4px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            Add Slaughterhouse
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            variant="solid"
            onClick={() => handleOptionClick(onAddCSV)}
            minW="160px"
            boxShadow="md"
            _hover={{ transform: 'translateX(-4px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            Add CSV
          </Button>
        </VStack>
      )}
      
      <IconButton
        aria-label="Add"
        icon={<AddIcon />}
        isRound
        size="lg"
        bgGradient={bgGradient}
        color="white"
        boxShadow="lg"
        onClick={() => setIsOpen(!isOpen)}
        transform={isOpen ? 'rotate(45deg)' : 'rotate(0deg)'}
        transition="all 0.3s ease"
        _hover={{
          transform: isOpen ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)',
          boxShadow: 'xl',
          bg: hoverBg
        }}
      />
    </Box>
  )
}

export default AddButton
