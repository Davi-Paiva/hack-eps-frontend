import React from 'react'
import { Box, SimpleGrid, Card, CardBody, Text, Heading, Button, Icon, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { MdAgriculture, MdFactory, MdMap, MdTrendingUp, MdLocationOn } from 'react-icons/md'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box p={8} bgGradient="linear(to-br, red.50, orange.50)" minH="100vh">
      <Heading size="xl" mb={2} bgGradient="linear(to-r, #ff6b4a, #dd2a7b)" bgClip="text">
        Welcome to Farm Management System
      </Heading>
      <Text fontSize="lg" color="gray.700" mb={8}>
        Manage your farms, slaughterhouses, and optimize logistics all in one place
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Card 
          size="lg" 
          height="100%" 
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }}
          onClick={() => navigate('/farms')}
          bg="white"
        >
          <CardBody p={8} display="flex" flexDirection="column">
            <Flex align="center" mb={4}>
              <Icon as={MdAgriculture} boxSize={10} color="orange.300" mr={3} />
              <Heading size="lg" color="gray.800">
                Farms
              </Heading>
            </Flex>
            <Text fontSize="md" mb={6} flex="1" color="gray.700">
              View and manage all your farms. Add new farms, edit existing ones, and track their details.
            </Text>
            <Button size="lg" bgGradient="linear(to-r, orange.300, orange.400)" color="white" _hover={{ bgGradient: 'linear(to-r, orange.400, orange.500)' }} onClick={(e) => { e.stopPropagation(); navigate('/farms'); }}>
              Go to Farms
            </Button>
          </CardBody>
        </Card>

        <Card 
          size="lg" 
          height="100%"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }}
          onClick={() => navigate('/slaughterhouses')}
          bg="white"
        >
          <CardBody p={8} display="flex" flexDirection="column">
            <Flex align="center" mb={4}>
              <Icon as={MdFactory} boxSize={10} color="pink.300" mr={3} />
              <Heading size="lg" color="gray.800">
                Slaughterhouses
              </Heading>
            </Flex>
            <Text fontSize="md" mb={6} flex="1" color="gray.700">
              Manage slaughterhouse locations and capacity. View all slaughterhouses and their details.
            </Text>
            <Button size="lg" bgGradient="linear(to-r, pink.300, pink.400)" color="white" _hover={{ bgGradient: 'linear(to-r, pink.400, pink.500)' }} onClick={(e) => { e.stopPropagation(); navigate('/slaughterhouses'); }}>
              Go to Slaughterhouses
            </Button>
          </CardBody>
        </Card>

        <Card 
          size="lg" 
          height="100%"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }}
          onClick={() => navigate('/map')}
          bg="white"
        >
          <CardBody p={8} display="flex" flexDirection="column">
            <Flex align="center" mb={4}>
              <Icon as={MdMap} boxSize={10} color="purple.300" mr={3} />
              <Heading size="lg" color="gray.800">
                Map View
              </Heading>
            </Flex>
            <Text fontSize="md" mb={6} flex="1" color="gray.700">
              Visualize all farms and slaughterhouses on an interactive map with 3D models.
            </Text>
            <Button size="lg" bgGradient="linear(to-r, purple.300, purple.400)" color="white" _hover={{ bgGradient: 'linear(to-r, purple.400, purple.500)' }} onClick={(e) => { e.stopPropagation(); navigate('/map'); }}>
              View Map
            </Button>
          </CardBody>
        </Card>

        <Card 
          size="lg" 
          height="100%"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }}
          onClick={() => navigate('/simulation')}
          bg="white"
        >
          <CardBody p={8} display="flex" flexDirection="column">
            <Flex align="center" mb={4}>
              <Icon as={MdTrendingUp} boxSize={10} color="red.300" mr={3} />
              <Heading size="lg" color="gray.800">
                Simulation
              </Heading>
            </Flex>
            <Text fontSize="md" mb={6} flex="1" color="gray.700">
              Run simulations to optimize routes and logistics between farms and slaughterhouses.
            </Text>
            <Button size="lg" bgGradient="linear(to-r, red.300, red.400)" color="white" _hover={{ bgGradient: 'linear(to-r, red.400, red.500)' }} onClick={(e) => { e.stopPropagation(); navigate('/simulation'); }}>
              Run Simulation
            </Button>
          </CardBody>
        </Card>

        <Card 
          size="lg" 
          height="100%"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }}
          onClick={() => navigate('/simulation-map')}
          bg="white"
        >
          <CardBody p={8} display="flex" flexDirection="column">
            <Flex align="center" mb={4}>
              <Icon as={MdLocationOn} boxSize={10} color="teal.300" mr={3} />
              <Heading size="lg" color="gray.800">
                Simulation Map
              </Heading>
            </Flex>
            <Text fontSize="md" mb={6} flex="1" color="gray.700">
              View simulation results on an interactive map showing optimized routes and connections.
            </Text>
            <Button size="lg" bgGradient="linear(to-r, teal.300, teal.400)" color="white" _hover={{ bgGradient: 'linear(to-r, teal.400, teal.500)' }} onClick={(e) => { e.stopPropagation(); navigate('/simulation-map'); }}>
              View Simulation Map
            </Button>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )
}

export default HomePage
