import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import FarmCard from '../FarmCard/FarmCard'
import SlaughterhouseCard from '../SlaughterhouseCard/SlaughterhouseCard'
import type { FarmDetails, SlaughterhouseDetails } from '../../types/entityDetails'
import type { MapEntity } from '../../types/mapEntity'
import type { SimulationDayResponse, FarmState, SlaughterHouseState } from '../../types/simulation'

interface EntityCardOverlayProps {
  entity: MapEntity | null
  details: FarmDetails | SlaughterhouseDetails | null
  position: { x: number; y: number }
  dayState?: SimulationDayResponse | null
}

export default function EntityCardOverlay({ entity, details, position, dayState }: EntityCardOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (entity && details) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [entity, details])

  if (!isVisible || !entity || !details) return null

  // Find the corresponding state for this entity
  let entityState: FarmState | SlaughterHouseState | undefined
  if (dayState && dayState.farms && dayState.slaughterhouses && entity._id) {
    if (entity.type === 'farm') {
      entityState = dayState.farms.find(f => f.id === entity._id)
    } else if (entity.type === 'slaughterhouse') {
      entityState = dayState.slaughterhouses.find(s => s.id === entity._id)
    }
  }

  return (
    <Box
      className="entity-card-overlay"
      position="fixed"
      left={`${position.x}px`}
      top={`${position.y}px`}
      zIndex={1000}
      pointerEvents="auto"
    >
      {entity.type === 'farm' ? (
        <FarmCard farm={details as FarmDetails} farmState={entityState as FarmState | undefined} />
      ) : (
        <SlaughterhouseCard 
          slaughterhouse={details as SlaughterhouseDetails} 
          slaughterhouseState={entityState as SlaughterHouseState | undefined} 
        />
      )}
    </Box>
  )
}
