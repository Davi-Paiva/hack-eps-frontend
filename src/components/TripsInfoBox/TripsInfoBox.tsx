import { Box, Text, IconButton, VStack, HStack } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import './TripsInfoBox.css'

interface Trip {
  trip_id: number
  slaughterhouse: {
    name: string
  }
  farms: Array<unknown>
  total_pigs: number
  distance_km: number
  cost: number
  profit: number
}

interface TripsInfoBoxProps {
  displayDay: number
  trips: Trip[]
}

export default function TripsInfoBox({ displayDay, trips }: TripsInfoBoxProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <Box className="trips-info-panel">
      <HStack 
        justify="space-between" 
        cursor="pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
        p={2}
      >
        <Text fontSize="sm" fontWeight="bold" color="#d4d4d4">
          Day {displayDay} Trips ({trips.length})
        </Text>
        <IconButton
          aria-label={isExpanded ? "Collapse" : "Expand"}
          icon={isExpanded ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
          size="lg"
          variant="ghost"
          colorScheme="pink"
        />
      </HStack>
      
      {isExpanded && (
        <VStack 
          className="trips-info-content" 
          align="stretch" 
          spacing={2} 
          mt={2}
          maxH="60vh"
          overflowY="auto"
        >
          {trips.length === 0 ? (
            <Text fontSize="sm" color="#a0a0a0" textAlign="center" py={4}>
              No trips for this day
            </Text>
          ) : (
            trips.map((route) => (
              <Box 
                key={route.trip_id} 
                className="trip-card"
                p={3}
                borderRadius="6px"
                bg="rgba(30, 30, 30, 0.8)"
                border="1px solid #3a3a3a"
              >
                <Text fontSize="sm" fontWeight="bold" color="#ff6b4a" mb={2}>
                  Trip #{route.trip_id}
                </Text>
                <VStack align="stretch" spacing={1} fontSize="xs">
                  <HStack justify="space-between">
                    <Text color="#a0a0a0">Slaughterhouse:</Text>
                    <Text color="#d4d4d4">{route.slaughterhouse.name}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="#a0a0a0">Farms:</Text>
                    <Text color="#d4d4d4">{route.farms.length}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="#a0a0a0">Total Pigs:</Text>
                    <Text color="#d4d4d4">{route.total_pigs}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="#a0a0a0">Distance:</Text>
                    <Text color="#d4d4d4">{route.distance_km.toFixed(1)} km</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="#a0a0a0">Cost:</Text>
                    <Text color="#ff6b4a">${route.cost.toFixed(2)}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="#a0a0a0">Profit:</Text>
                    <Text color={route.profit >= 0 ? "#4ade80" : "#ef4444"}>
                      ${route.profit.toFixed(2)}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            ))
          )}
        </VStack>
      )}
    </Box>
  )
}
