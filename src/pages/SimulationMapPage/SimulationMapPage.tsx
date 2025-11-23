import { Box, Container, Heading, Text } from '@chakra-ui/react'
import './SimulationMapPage.css'

export default function SimulationMapPage() {
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
