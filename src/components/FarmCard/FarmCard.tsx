import { Box, VStack, HStack, Text, Heading } from '@chakra-ui/react'
import type { FarmDetails } from '../../types/entityDetails'

interface FarmCardProps {
  farm: FarmDetails
}

export default function FarmCard({ farm }: FarmCardProps) {
  return (
    <Box
      bg="#1a1a2e"
      borderRadius="lg"
      p={4}
      boxShadow="xl"
      border="1px solid"
      borderColor="rgba(255, 75, 147, 0.2)"
      minW="280px"
      maxW="320px"
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="md" color="#ff4d93">{farm.name}</Heading>
        
        {farm.inventory_pigs !== undefined && (
          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">Inventory:</Text>
            <Text color="white" fontWeight="bold">{farm.inventory_pigs} pigs</Text>
          </HStack>
        )}

        <HStack justify="space-between">
          <Text color="gray.400" fontSize="sm">Capacity:</Text>
          <Text color="white">{farm.capacity}</Text>
        </HStack>

        {farm.consumption_pigs !== undefined && (
          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">Consumption:</Text>
            <Text color="white">{farm.consumption_pigs} pigs</Text>
          </HStack>
        )}

        {farm.avg_weight_kg !== undefined && (
          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">Avg Weight:</Text>
            <Text color="white">{farm.avg_weight_kg} kg</Text>
          </HStack>
        )}

        {farm.age_weeks !== undefined && (
          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">Age:</Text>
            <Text color="white">{farm.age_weeks} weeks</Text>
          </HStack>
        )}

        {farm.growth_rate_kg_per_week !== undefined && (
          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">Growth Rate:</Text>
            <Text color="white">{farm.growth_rate_kg_per_week} kg/week</Text>
          </HStack>
        )}

        {farm.price_per_kg !== undefined && (
          <HStack justify="space-between">
            <Text color="gray.400" fontSize="sm">Price per kg:</Text>
            <Text color="#ff6b4a" fontWeight="bold">€{farm.price_per_kg}</Text>
          </HStack>
        )}
      </VStack>
    </Box>
  )
}
