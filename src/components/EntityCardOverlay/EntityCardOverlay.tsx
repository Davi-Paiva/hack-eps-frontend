import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import FarmCard from '../FarmCard/FarmCard'
import SlaughterhouseCard from '../SlaughterhouseCard/SlaughterhouseCard'
import type { FarmDetails, SlaughterhouseDetails } from '../../types/entityDetails'
import type { MapEntity } from '../../types/mapEntity'

interface EntityCardOverlayProps {
  entity: MapEntity | null
  details: FarmDetails | SlaughterhouseDetails | null
  position: { x: number; y: number }
}

export default function EntityCardOverlay({ entity, details, position }: EntityCardOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (entity && details) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [entity, details])

  if (!isVisible || !entity || !details) return null

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
        <FarmCard farm={details as FarmDetails} />
      ) : (
        <SlaughterhouseCard slaughterhouse={details as SlaughterhouseDetails} />
      )}
    </Box>
  )
}
