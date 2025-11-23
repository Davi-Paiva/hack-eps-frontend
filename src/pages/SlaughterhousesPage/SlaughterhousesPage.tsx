import React from 'react'
import { Box, VStack, Flex } from '@chakra-ui/react'
import SlaughterhouseTable from '../../components/SlaughterhouseTable/SlaughterhouseTable'
import BoxCard from '../../components/BoxCard/BoxCard'
import SearchInput from '../../components/SearchInput/SearchInput'
import EditButton from '../../components/EditButton/EditButton'
import DeleteButton from '../../components/DeleteButton/DeleteButton'
import { slaughterhouseService } from '../../services/slaughterhouseService'
import SlaughterhouseEditModal from '../../components/SlaughterhouseEditModal/SlaughterhouseEditModal'
import SlaughterhouseAddModal from '../../components/SlaughterhouseAddModal/SlaughterhouseAddModal'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import type { Slaughterhouse } from '../../types/slaughterhouse'

const SlaughterhousesPage: React.FC = () => {
  const [query, setQuery] = React.useState('')
  const [selectedSlaughterhouse, setSelectedSlaughterhouse] = React.useState<Slaughterhouse | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [reloadKey, setReloadKey] = React.useState(0)

  const handleDelete = async () => {
    if (!selectedSlaughterhouse) return
    // prefer domain-specific id if present, otherwise use MongoDB _id
    const idToUse = (selectedSlaughterhouse as any).slaughterhouse_id ?? selectedSlaughterhouse._id
    if (!idToUse) return
    const ok = window.confirm(`Delete slaughterhouse "${selectedSlaughterhouse.name}"?`)
    if (!ok) return
    try {
      const success = await slaughterhouseService.delete(String(idToUse))
      if (success) {
        setReloadKey((r) => r + 1)
        setSelectedSlaughterhouse(null)
      } else {
        window.alert('Failed to delete slaughterhouse')
      }
    } catch (err) {
      console.error(err)
      window.alert('Error deleting slaughterhouse')
    }
  }

  return (
    <Box p={6}>
      <BoxCard title="Slaughterhouses">
        <VStack spacing={4} align="stretch">
          <Box w={{ base: '100%', md: '50%' }}>
            <Flex align="center">
              <Box flex={1}>
                <SearchInput
                  placeholder="Search slaughterhouses..."
                  value={query}
                  onChange={setQuery}
                  onSearch={(v) => setQuery(v)}
                />
              </Box>
              <Box ml={3} display="flex" gap={2} alignItems="center">
                <Button leftIcon={<AddIcon />} size="sm" colorScheme="green" onClick={() => setIsAddOpen(true)}>
                  Add Slaughterhouse
                </Button>
                <EditButton onClick={() => setIsEditOpen(true)} isDisabled={!selectedSlaughterhouse} />
                <DeleteButton
                  onClick={handleDelete}
                  isDisabled={
                    !selectedSlaughterhouse || !((selectedSlaughterhouse as any).slaughterhouse_id ?? selectedSlaughterhouse._id)
                  }
                  size="sm"
                />
              </Box>
            </Flex>
          </Box>
          <SlaughterhouseTable searchQuery={query} onRowSelect={setSelectedSlaughterhouse} reloadKey={reloadKey} />
        </VStack>
      </BoxCard>
      <SlaughterhouseEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        slaughterhouse={selectedSlaughterhouse}
        onSaveSuccess={() => setReloadKey((r) => r + 1)}
      />
      <SlaughterhouseAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCreateSuccess={() => setReloadKey((r) => r + 1)}
      />
    </Box>
  )
}

export default SlaughterhousesPage
