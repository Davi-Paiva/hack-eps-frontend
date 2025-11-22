import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import SlaughterhouseTable from '../../components/SlaughterhouseTable/SlaughterhouseTable'
import BoxCard from '../../components/BoxCard/BoxCard'
import SearchInput from '../../components/SearchInput/SearchInput'

const SlaughterhousesPage: React.FC = () => {
  const [query, setQuery] = React.useState('')

  return (
    <Box p={6}>
      <BoxCard title="Slaughterhouses">
        <VStack spacing={4} align="stretch">
          <Box w={{ base: '100%', md: '50%' }}>
            <SearchInput
              placeholder="Search slaughterhouses..."
              value={query}
              onChange={setQuery}
              onSearch={(v) => setQuery(v)}
            />
          </Box>
          <SlaughterhouseTable searchQuery={query} />
        </VStack>
      </BoxCard>
    </Box>
  )
}

export default SlaughterhousesPage
