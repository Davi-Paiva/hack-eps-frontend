import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import './SimulationPage.css'

export default function SimulationPage() {
  const navigate = useNavigate()

  return (
    <Box className="simulation-page">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Box className="simulation-header">
            <Heading className="simulation-title">Simulation</Heading>
            <Text className="simulation-subtitle">Run simulations to optimize your supply chain</Text>
          </Box>

          <Box className="simulation-content">
            <Text>Simulation content coming soon...</Text>
          </Box>

          <Button className="simulation-button" onClick={() => navigate('/simulation-map')}>
            See Day by Day Simulation
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}
