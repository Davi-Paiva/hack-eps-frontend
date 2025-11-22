import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import FarmTable from '../../components/FarmTable/FarmTable'
import BoxCard from '../../components/BoxCard/BoxCard'
import SearchInput from '../../components/SearchInput/SearchInput'

const FarmsPage: React.FC = () => {
  const [query, setQuery] = React.useState('')

  return (
    <Box p={6}>
      <BoxCard title="Farms">
        <VStack spacing={4} align="stretch">
          <Box w={{ base: '100%', md: '50%' }}>
            <SearchInput
              placeholder="Search farms..."
              value={query}
              onChange={setQuery}
              onSearch={(v) => setQuery(v)}
            />
          </Box>
          <FarmTable searchQuery={query} />
        </VStack>
      </BoxCard>
    </Box>
  )
}

export default FarmsPage
