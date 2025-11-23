import React from 'react'
import { VStack, Button, Box } from '@chakra-ui/react'
import FarmTable from '../../components/FarmTable/FarmTable'
import SearchInput from '../../components/SearchInput/SearchInput'
import { farmService } from '../../services/farmService'
import FarmAddModal from '../../components/FarmAddModal/FarmAddModal'
import { AddIcon } from '@chakra-ui/icons'
import FarmEditModal from '../../components/FarmEditModal/FarmEditModal'
import DeleteConfirm from '../../components/DeleteConfirm/DeleteConfirm'
import resolveId from '../../utils/idResolver'
import type { Farm } from '../../types/farm'
import './FarmsPage.css'

const FarmsPage: React.FC = () => {
  const [query, setQuery] = React.useState('')
  const [selectedFarm, setSelectedFarm] = React.useState<Farm | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [reloadKey, setReloadKey] = React.useState(0)

  const handleDelete = () => {
    if (!selectedFarm) return
    setIsDeleteOpen(true)
  }

  const performDelete = async () => {
    if (!selectedFarm) return
    const idToUse = resolveId(selectedFarm, ['farm_id', '_id'])
    if (!idToUse) {
      console.warn('No usable id found for selected farm')
      return
    }
    setIsDeleting(true)
    try {
      const success = await farmService.delete(String(idToUse))
      if (success) {
        setReloadKey((r) => r + 1)
        setSelectedFarm(null)
        setIsDeleteOpen(false)
      } else {
        window.alert('Failed to delete farm')
      }
    } catch (err) {
      console.error(err)
      window.alert('Error deleting farm')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="farms-page">
      <div className="farms-container">
        <VStack spacing={4} align="stretch" h="100%">
          <div className="farms-header">
            <div className="farms-title">Farms</div>
            <div className="farms-title-accent" />
          </div>
          
          <Box className="farms-controls">
            <div className="farms-search">
              <SearchInput
                placeholder="Search farms..."
                value={query}
                onChange={setQuery}
                onSearch={(v) => setQuery(v)}
              />
            </div>
            <div className="farms-buttons">
              <Button 
                leftIcon={<AddIcon />} 
                size="md" 
                bg="linear-gradient(to right, #ff6b4a, #dd2a7b)"
                color="white"
                borderRadius="0.75rem"
                fontWeight="600"
                _hover={{ 
                  bg: "linear-gradient(to right, #ff4d93, #dd2a7b)", 
                  transform: "translateY(-2px)", 
                  boxShadow: "0 10px 20px rgba(255, 107, 74, 0.4)" 
                }}
                transition="all 0.3s ease"
                onClick={() => setIsAddOpen(true)}
              >
                Add Farm
              </Button>
              <Button
                size="md"
                bg="#3a3a3a"
                color="white"
                borderRadius="0.75rem"
                fontWeight="600"
                border="1px solid"
                borderColor="#3a3a3a"
                _hover={{ 
                  bg: "#4a4a4a",
                  borderColor: "#ff6b4a",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.3s ease"
                onClick={() => setIsEditOpen(true)}
                isDisabled={!selectedFarm}
              >
                Edit
              </Button>
              <Button
                size="md"
                bg="#3a3a3a"
                color="white"
                borderRadius="0.75rem"
                fontWeight="600"
                border="1px solid"
                borderColor="#3a3a3a"
                _hover={{ 
                  bg: "#ef4444",
                  borderColor: "#ef4444",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.3s ease"
                onClick={handleDelete}
                isDisabled={!selectedFarm}
              >
                Delete
              </Button>
            </div>
          </Box>
          
          <Box className="farms-table-container" flex="1" minH="0">
            <FarmTable searchQuery={query} onRowSelect={setSelectedFarm} reloadKey={reloadKey} />
          </Box>
        </VStack>
      </div>
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
      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={performDelete}
        isLoading={isDeleting}
        title="Delete Farm"
        description={`Are you sure you want to delete "${selectedFarm?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default FarmsPage
