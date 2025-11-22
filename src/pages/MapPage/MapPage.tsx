import { useEffect, type ReactNode } from 'react'
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
import { MapProvider, useMap } from '../../contexts/MapContext'
import { loadMapData } from '../../utils/mapDataLoader'
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

function MapContent() {
  const { mapRef } = useMap()
  const farmModal = useDisclosure()
  const slaughterhouseModal = useDisclosure()

  useEffect(() => {
    async function load() {
      if (!mapRef.current) return
      await loadMapData(mapRef.current)
    }

    if (mapRef.current) {
      if (mapRef.current.loaded()) {
        load()
      } else {
        mapRef.current.on('load', load)
      }
    }
  }, [mapRef])

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