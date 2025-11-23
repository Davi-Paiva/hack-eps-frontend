import React from 'react'
import { VStack, Button, Box } from '@chakra-ui/react'
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
        <VStack spacing={4} align="stretch" h="100%">
          <div className="slaughterhouses-header">
            <div className="slaughterhouses-title">Slaughterhouses</div>
            <div className="slaughterhouses-title-accent" />
          </div>
          
          <Box className="slaughterhouses-controls">
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
                Add Slaughterhouse
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
                isDisabled={!selectedSlaughterhouse}
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
                isDisabled={!selectedSlaughterhouse}
              >
                Delete
              </Button>
            </div>
          </Box>
          
          <Box className="slaughterhouses-table-container" flex="1" minH="0">
            <SlaughterhouseTable searchQuery={query} onRowSelect={setSelectedSlaughterhouse} reloadKey={reloadKey} />
          </Box>
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
