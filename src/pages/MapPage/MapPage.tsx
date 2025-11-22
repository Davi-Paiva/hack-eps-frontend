import type { ReactNode } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import Map from "../../components/Map/Map"
import AddButton from "../../components/AddButton/AddButton"
import ImportFarm from "../../components/ImportFarm/ImportFarm"
import ImportSlaughterhouse from "../../components/ImportSlaughterHouse/ImportSlaughterHouse"
import './MapPage.css'

function FormModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalCloseButton />
        <ModalBody p={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

function MapPage() {
  const farmModal = useDisclosure()
  const slaughterhouseModal = useDisclosure()

  const handleAddCSV = () => {
    console.log('Add CSV clicked')
    // TODO: Create CSV upload modal
  }

  return (
    <div className="map-page-container">
      <Map/>
      <AddButton
        onAddFarm={farmModal.onOpen}
        onAddSlaughterhouse={slaughterhouseModal.onOpen}
        onAddCSV={handleAddCSV}
      />
      
      <FormModal isOpen={farmModal.isOpen} onClose={farmModal.onClose}>
        <ImportFarm endpoint="/api/farms" onSuccess={farmModal.onClose} />
      </FormModal>

      <FormModal isOpen={slaughterhouseModal.isOpen} onClose={slaughterhouseModal.onClose}>
        <ImportSlaughterhouse endpoint="/api/slaughterhouses" onSuccess={slaughterhouseModal.onClose} />
      </FormModal>
    </div>
  )
}

export default MapPage