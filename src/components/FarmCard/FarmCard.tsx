import { Box, VStack, HStack, Text, Heading, Badge } from '@chakra-ui/react'
import type { FarmDetails } from '../../types/entityDetails'
import type { FarmState } from '../../types/simulation'

interface FarmCardProps {
  farm: FarmDetails
  farmState?: FarmState
}

export default function FarmCard({ farm, farmState }: FarmCardProps) {
  return (
    <Box
      bg="#2d2d2d"
      borderRadius="8px"
      p={4}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
      border="1px solid"
      borderColor="#3a3a3a"
      minW="280px"
      maxW="320px"
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="md" color="#d4d4d4">{farm.name}</Heading>
        
        {farmState && (
          <>
            <HStack justify="space-between">
              <Text color="#a0a0a0" fontSize="sm">Current Pigs:</Text>
              <HStack spacing={2}>
                <Text color="#d4d4d4" fontWeight="bold">{farmState.numero_cerdos} pigs</Text>
                {farmState.diferencia_cerdos !== 0 && (
                  <Badge 
                    colorScheme={farmState.diferencia_cerdos > 0 ? 'green' : 'red'}
                    fontSize="xs"
                  >
                    {farmState.diferencia_cerdos > 0 ? '+' : ''}{farmState.diferencia_cerdos}
                  </Badge>
                )}
              </HStack>
            </HStack>
            {farmState.gasto_alimento_acumulado > 0 && (
              <HStack justify="space-between">
                <Text color="#a0a0a0" fontSize="sm">Feed Cost:</Text>
                <Text color="#ff6b4a" fontWeight="bold">€{farmState.gasto_alimento_acumulado.toFixed(2)}</Text>
              </HStack>
            )}
          </>
        )}
        
        {!farmState && farm.inventory_pigs !== undefined && (
          <HStack justify="space-between">
            <Text color="#a0a0a0" fontSize="sm">Inventory:</Text>
            <Text color="#d4d4d4" fontWeight="bold">{farm.inventory_pigs} pigs</Text>
          </HStack>
        )}

        <HStack justify="space-between">
          <Text color="#a0a0a0" fontSize="sm">Capacity:</Text>
          <Text color="#d4d4d4">{farm.capacity}</Text>
        </HStack>

        {farm.consumption_pigs !== undefined && (
          <HStack justify="space-between">
            <Text color="#a0a0a0" fontSize="sm">Consumption:</Text>
            <Text color="#d4d4d4">{farm.consumption_pigs} pigs</Text>
          </HStack>
        )}

        {farm.avg_weight_kg !== undefined && (
          <HStack justify="space-between">
            <Text color="#a0a0a0" fontSize="sm">Avg Weight:</Text>
            <Text color="#d4d4d4">{farm.avg_weight_kg} kg</Text>
          </HStack>
        )}

        {farm.age_weeks !== undefined && (
          <HStack justify="space-between">
            <Text color="#a0a0a0" fontSize="sm">Age:</Text>
            <Text color="#d4d4d4">{farm.age_weeks} weeks</Text>
          </HStack>
        )}

        {farm.growth_rate_kg_per_week !== undefined && (
          <HStack justify="space-between">
            <Text color="#a0a0a0" fontSize="sm">Growth Rate:</Text>
            <Text color="#d4d4d4">{farm.growth_rate_kg_per_week} kg/week</Text>
          </HStack>
        )}

        {farm.price_per_kg !== undefined && (
          <HStack justify="space-between">
            <Text color="#a0a0a0" fontSize="sm">Price per kg:</Text>
            <Text color="#d4d4d4" fontWeight="bold">€{farm.price_per_kg}</Text>
          </HStack>
        )}
      </VStack>
    </Box>
  )
}
