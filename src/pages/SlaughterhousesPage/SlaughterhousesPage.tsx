import React from 'react'
import { VStack, Button } from '@chakra-ui/react'
import SlaughterhouseTable from '../../components/SlaughterhouseTable/SlaughterhouseTable'
import SearchInput from '../../components/SearchInput/SearchInput'
import { slaughterhouseService } from '../../services/slaughterhouseService'
import SlaughterhouseAddModal from '../../components/SlaughterhouseAddModal/SlaughterhouseAddModal'
import { AddIcon } from '@chakra-ui/icons'
import SlaughterhouseEditModal from '../../components/SlaughterhouseEditModal/SlaughterhouseEditModal'
import DeleteConfirm from '../../components/DeleteConfirm/DeleteConfirm'
import resolveId from '../../utils/idResolver'
import type { Slaughterhouse } from '../../types/slaughterhouse'
import './SlaughterhousesPage.css'

const SlaughterhousesPage: React.FC = () => {
  const [query, setQuery] = React.useState('')
  const [selectedSlaughterhouse, setSelectedSlaughterhouse] = React.useState<Slaughterhouse | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [reloadKey, setReloadKey] = React.useState(0)

  const handleDelete = () => {
    if (!selectedSlaughterhouse) return
    setIsDeleteOpen(true)
  }

  const performDelete = async () => {
    if (!selectedSlaughterhouse) return
    const idToUse = resolveId(selectedSlaughterhouse, ['slaughterhouse_id', '_id'])
    if (!idToUse) return
    setIsDeleting(true)
    try {
      const success = await slaughterhouseService.delete(String(idToUse))
      if (success) {
        setReloadKey((r) => r + 1)
        setSelectedSlaughterhouse(null)
        setIsDeleteOpen(false)
      } else {
        window.alert('Failed to delete slaughterhouse')
      }
    } catch (err) {
      console.error(err)
      window.alert('Error deleting slaughterhouse')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="slaughterhouses-page">
      <div className="slaughterhouses-container">
        <VStack spacing={6} align="stretch">
          <div className="slaughterhouses-header">
            <div className="slaughterhouses-title">Slaughterhouses</div>
            <div className="slaughterhouses-title-accent" />
          </div>
          
          <div className="slaughterhouses-controls">
            <div className="slaughterhouses-search">
              <SearchInput
                placeholder="Search slaughterhouses..."
                value={query}
                onChange={setQuery}
                onSearch={(v) => setQuery(v)}
              />
            </div>
            <div className="slaughterhouses-buttons">
              <Button 
                leftIcon={<AddIcon />} 
                size="md" 
                bg="linear-gradient(to right, #fb923c, #f472b6)"
                color="white"
                _hover={{ bg: "linear-gradient(to right, #ff6b4a, #dd2a7b)", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(251, 146, 60, 0.3)" }}
                onClick={() => setIsAddOpen(true)}
              >
                Add Slaughterhouse
              </Button>
              <Button
                size="md"
                bg="linear-gradient(to right, #fbbf24, #f59e0b)"
                color="white"
                _hover={{ bg: "linear-gradient(to right, #f59e0b, #d97706)", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(251, 191, 36, 0.3)" }}
                onClick={() => setIsEditOpen(true)}
                isDisabled={!selectedSlaughterhouse}
              >
                Edit
              </Button>
              <Button
                size="md"
                bg="linear-gradient(to right, #ef4444, #dc2626)"
                color="white"
                _hover={{ bg: "linear-gradient(to right, #dc2626, #b91c1c)", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(239, 68, 68, 0.3)" }}
                onClick={handleDelete}
                isDisabled={!selectedSlaughterhouse}
              >
                Delete
              </Button>
            </div>
          </div>
          
          <div className="slaughterhouses-table-container">
            <SlaughterhouseTable searchQuery={query} onRowSelect={setSelectedSlaughterhouse} reloadKey={reloadKey} />
          </div>
        </VStack>
      </div>
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
      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={performDelete}
        isLoading={isDeleting}
        title="Delete Slaughterhouse"
        description={`Are you sure you want to delete "${selectedSlaughterhouse?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default SlaughterhousesPage
