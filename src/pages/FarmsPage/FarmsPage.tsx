import React from 'react'
import { VStack, Button } from '@chakra-ui/react'
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
        <VStack spacing={6} align="stretch">
          <div className="farms-header">
            <div className="farms-title">Farms</div>
            <div className="farms-title-accent" />
          </div>
          
          <div className="farms-controls">
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
                bg="linear-gradient(to right, #fb923c, #f472b6)"
                color="white"
                _hover={{ bg: "linear-gradient(to right, #ff6b4a, #dd2a7b)", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(251, 146, 60, 0.3)" }}
                onClick={() => setIsAddOpen(true)}
              >
                Add Farm
              </Button>
              <Button
                size="md"
                bg="linear-gradient(to right, #fbbf24, #f59e0b)"
                color="white"
                _hover={{ bg: "linear-gradient(to right, #f59e0b, #d97706)", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(251, 191, 36, 0.3)" }}
                onClick={() => setIsEditOpen(true)}
                isDisabled={!selectedFarm}
              >
                Edit
              </Button>
              <Button
                size="md"
                bg="linear-gradient(to right, #ef4444, #dc2626)"
                color="white"
                _hover={{ bg: "linear-gradient(to right, #dc2626, #b91c1c)", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(239, 68, 68, 0.3)" }}
                onClick={handleDelete}
                isDisabled={!selectedFarm}
              >
                Delete
              </Button>
            </div>
          </div>
          
          <div className="farms-table-container">
            <FarmTable searchQuery={query} onRowSelect={setSelectedFarm} reloadKey={reloadKey} />
          </div>
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
