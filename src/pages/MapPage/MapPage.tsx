import { type ReactNode } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import AddButton from "../../components/AddButton/AddButton"
import ImportFarm from "../../components/ImportFarm/ImportFarm"
import ImportSlaughterhouse from "../../components/ImportSlaughterHouse/ImportSlaughterHouse"
import { MapProvider } from '../../contexts/MapContext'
import MapWithEntities from '../../components/MapWithEntities/MapWithEntities'
import './MapPage.css'

function FormModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto" bg="black" borderColor="gray.700" borderWidth="1px">
        <ModalCloseButton color="white" />
        <ModalBody p={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

function MapContent() {
  const farmModal = useDisclosure()
  const slaughterhouseModal = useDisclosure()

  const handleAddCSV = () => {
    console.log('Add CSV clicked')
    // TODO: Create CSV upload modal
  }

  return (
    <div className="map-page-container">
      <MapWithEntities />
      <AddButton
        onAddFarm={farmModal.onOpen}
        onAddSlaughterhouse={slaughterhouseModal.onOpen}
        onAddCSV={handleAddCSV}
      />
      
      <FormModal isOpen={farmModal.isOpen} onClose={farmModal.onClose}>
        <ImportFarm onSuccess={farmModal.onClose} />
      </FormModal>

      <FormModal isOpen={slaughterhouseModal.isOpen} onClose={slaughterhouseModal.onClose}>
        <ImportSlaughterhouse onSuccess={slaughterhouseModal.onClose} />
      </FormModal>
    </div>
  )
}

function MapPage() {
  return (
    <MapProvider>
      <MapContent />
    </MapProvider>
  )
}

export default MapPage