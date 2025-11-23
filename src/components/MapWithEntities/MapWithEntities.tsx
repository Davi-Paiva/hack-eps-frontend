import { useEffect, useState } from 'react'
import { useMap } from '../../contexts/MapContext'
import { loadMapData } from '../../utils/mapDataLoader'
import { onEntityClick } from '../../utils/mapClickHandler'
import { farmService } from '../../services/farmService'
import { slaughterhouseService } from '../../services/slaughterhouseService'
import EntityCardOverlay from '../EntityCardOverlay/EntityCardOverlay'
import Map from '../Map/Map'
import type { MapEntity } from '../../types/mapEntity'
import type { Farm } from '../../types/farm'
import type { Slaughterhouse } from '../../types/slaughterhouse'

export default function MapWithEntities() {
  const { mapRef } = useMap()
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
    console.log('Setting up entity click handler')
    const cleanup = onEntityClick(async (entity, position) => {
      console.log('Entity clicked:', entity)
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
    
    return () => {
      console.log('Cleaning up entity click handler')
      cleanup()
    }
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

  return (
    <>
      <Map />
      {selectedEntity && entityDetails && (
        <EntityCardOverlay
          entity={selectedEntity}
          details={entityDetails}
          position={cardPosition}
        />
      )}
    </>
  )
}
