import { Box, VStack, HStack, Text, Heading } from '@chakra-ui/react'
import type { SlaughterhouseDetails } from '../../types/entityDetails'

interface SlaughterhouseCardProps {
  slaughterhouse: SlaughterhouseDetails
}

export default function SlaughterhouseCard({ slaughterhouse }: SlaughterhouseCardProps) {
  return (
    <Box
      bg="gray.800"
      borderRadius="lg"
      p={4}
      boxShadow="xl"
      minW="280px"
      maxW="320px"
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="md" color="red.300">{slaughterhouse.name}</Heading>
        
        <HStack justify="space-between">
          <Text color="gray.400" fontSize="sm">Capacity/Day:</Text>
          <Text color="white" fontWeight="bold">{slaughterhouse.capacity_per_day}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="gray.400" fontSize="sm">Location:</Text>
          <Text color="white" fontSize="xs">{slaughterhouse.lat.toFixed(4)}, {slaughterhouse.lon.toFixed(4)}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
