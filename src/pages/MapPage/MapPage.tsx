import { useEffect, useState, type ReactNode } from 'react'
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
import EntityCardOverlay from "../../components/EntityCardOverlay/EntityCardOverlay"
import { MapProvider, useMap } from '../../contexts/MapContext'
import { loadMapData } from '../../utils/mapDataLoader'
import { onEntityClick } from '../../utils/mapClickHandler'
import { farmService } from '../../services/farmService'
import { slaughterhouseService } from '../../services/slaughterhouseService'
import type { MapEntity } from '../../types/mapEntity'
import type { Farm } from '../../types/farm'
import type { Slaughterhouse } from '../../types/slaughterhouse'
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
  
  const [selectedEntity, setSelectedEntity] = useState<MapEntity | null>(null)
  const [entityDetails, setEntityDetails] = useState<Farm | Slaughterhouse | null>(null)
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 })

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

  useEffect(() => {
    onEntityClick(async (entity, position) => {
      setSelectedEntity(entity)
      if (entity.type === 'farm' && entity._id) {
        const details = await farmService.getById(entity._id)
        setEntityDetails(details)
      } else if (entity.type === 'slaughterhouse' && entity._id) {
        const details = await slaughterhouseService.getById(entity._id)
        setEntityDetails(details)
      }
      setCardPosition({ x: position.x + 20, y: position.y - 80 })
    })
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    const handleMapInteraction = () => {
      setSelectedEntity(null)
      setEntityDetails(null)
    }

    const map = mapRef.current
    map.on('zoom', handleMapInteraction)
    map.on('move', handleMapInteraction)
    map.on('rotate', handleMapInteraction)
    map.on('pitch', handleMapInteraction)

    return () => {
      map.off('zoom', handleMapInteraction)
      map.off('move', handleMapInteraction)
      map.off('rotate', handleMapInteraction)
      map.off('pitch', handleMapInteraction)
    }
  }, [mapRef])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (selectedEntity && !target.closest('.entity-card-overlay')) {
        setSelectedEntity(null)
        setEntityDetails(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [selectedEntity])

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
      
      <EntityCardOverlay
        entity={selectedEntity}
        details={entityDetails}
        position={cardPosition}
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