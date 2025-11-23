import { Box, VStack, HStack, Text, Heading } from '@chakra-ui/react'
import type { SlaughterhouseDetails } from '../../types/entityDetails'

interface SlaughterhouseCardProps {
  slaughterhouse: SlaughterhouseDetails
}

export default function SlaughterhouseCard({ slaughterhouse }: SlaughterhouseCardProps) {
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
        <Heading size="md" color="#d4d4d4">{slaughterhouse.name}</Heading>
        
        <HStack justify="space-between">
          <Text color="#a0a0a0" fontSize="sm">Capacity/Day:</Text>
          <Text color="#d4d4d4" fontWeight="bold">{slaughterhouse.capacity_per_day}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="#a0a0a0" fontSize="sm">Location:</Text>
          <Text color="#d4d4d4" fontSize="xs">{slaughterhouse.lat.toFixed(4)}, {slaughterhouse.lon.toFixed(4)}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
