import React from 'react'
import { Box, VStack, Flex } from '@chakra-ui/react'
import FarmTable from '../../components/FarmTable/FarmTable'
import BoxCard from '../../components/BoxCard/BoxCard'
import SearchInput from '../../components/SearchInput/SearchInput'
import EditButton from '../../components/EditButton/EditButton'
import FarmAddModal from '../../components/FarmAddModal/FarmAddModal'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import FarmEditModal from '../../components/FarmEditModal/FarmEditModal'
import type { Farm } from '../../types/farm'

const FarmsPage: React.FC = () => {
  const [query, setQuery] = React.useState('')
  const [selectedFarm, setSelectedFarm] = React.useState<Farm | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [reloadKey, setReloadKey] = React.useState(0)

  return (
    <Box p={6}>
      <BoxCard title="Farms">
        <VStack spacing={4} align="stretch">
          <Box w={{ base: '100%', md: '50%' }}>
            <Flex align="center">
              <Box flex={1}>
                <SearchInput
                  placeholder="Search farms..."
                  value={query}
                  onChange={setQuery}
                  onSearch={(v) => setQuery(v)}
                />
              </Box>
              <Box ml={3} display="flex" gap={2} alignItems="center">
                <Button leftIcon={<AddIcon />} size="sm" colorScheme="green" onClick={() => setIsAddOpen(true)}>
                  Add Farm
                </Button>
                <EditButton onClick={() => setIsEditOpen(true)} isDisabled={!selectedFarm} />
              </Box>
            </Flex>
          </Box>
          <FarmTable searchQuery={query} onRowSelect={setSelectedFarm} reloadKey={reloadKey} />
        </VStack>
      </BoxCard>
      <FarmEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        farm={selectedFarm}
        onSaveSuccess={(updated) => {
          // update selected farm in-place so UI reflects the change
          if (updated) setSelectedFarm(updated)
          // also trigger table refetch to keep list in sync
          setReloadKey((r) => r + 1)
        }}
      />
      <FarmAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCreateSuccess={() => setReloadKey((r) => r + 1)}
      />
    </Box>
  )
}

export default FarmsPage
