import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import FarmTable from '../../components/FarmTable/FarmTable'
import SlaughterhouseTable from '../../components/SlaughterhouseTable/SlaughterhouseTable'
import BoxCard from '../../components/BoxCard/BoxCard'

const TablesPage: React.FC = () => {
  return (
    <Box p={6}>
      <Flex gap={6} direction={{ base: 'column', md: 'row' }} align="flex-start">
        <Box flex={1}>
          <BoxCard title="Farms">
            <FarmTable />
          </BoxCard>
        </Box>
        <Box flex={1}>
          <BoxCard title="Slaughterhouses">
            <SlaughterhouseTable />
          </BoxCard>
        </Box>
      </Flex>
    </Box>
  )
}

export default TablesPage
