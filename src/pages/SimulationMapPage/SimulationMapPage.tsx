import { Box, Container, Heading, Text } from '@chakra-ui/react'
import './SimulationMapPage.css'
import { use, useEffect } from 'react'
import { simulationService } from '../../services/simulationService'
import type { SimulationResponse } from '../../types/simulation'

export default function SimulationMapPage() {
  useEffect(() => {
    const fetchRoutes = async () => {
      const routes: SimulationResponse = await simulationService.getRoutes()
      console.log('Fetched simulation routes:', routes)
    }
    fetchRoutes()
  }, [])
  return (
    <Box className="simulation-map-page">
      <Container maxW="container.xl" py={8}>
        <Heading className="simulation-map-title">Day by Day Simulation</Heading>
        <Text className="simulation-map-subtitle" mt={2}>
          Visualize your supply chain simulation
        </Text>

        <Box className="simulation-map-content" mt={6}>
          <Text>Simulation map content coming soon...</Text>
        </Box>
      </Container>
    </Box>
  )
}
