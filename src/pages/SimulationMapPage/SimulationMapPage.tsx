import { Box, Heading, Text, Select } from '@chakra-ui/react'
import './SimulationMapPage.css'
import { useEffect, useState } from 'react'
import { simulationService } from '../../services/simulationService'
import type { SimulationResponse } from '../../types/simulation'
import { MapProvider, useMap } from '../../contexts/MapContext'
import MapWithEntities from '../../components/MapWithEntities/MapWithEntities'
import { drawSimulationRoutes, clearAllRoutes } from '../../utils/routeDrawer'

function SimulationMapContent() {
  const { mapRef } = useMap()
  const [routes, setRoutes] = useState<SimulationResponse | null>(null)
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [availableDays, setAvailableDays] = useState<number[]>([])

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await simulationService.getRoutes(10)
      setRoutes(data)
      
      const daysWithRoutes = [...new Set(data.routes.map(r => r.day))].sort((a, b) => a - b)
      const minDay = daysWithRoutes.length > 0 ? Math.min(...daysWithRoutes) : 0
      const isZeroBased = minDay === 0
      
      const allDays = isZeroBased 
        ? Array.from({ length: 10 }, (_, i) => i)
        : Array.from({ length: 10 }, (_, i) => i + 1)
      
      setAvailableDays(allDays)
      
      if (daysWithRoutes.length > 0) {
        setSelectedDay(daysWithRoutes[0])
      } else {
        setSelectedDay(allDays[0])
      }
    }
    fetchRoutes()
  }, [])

  useEffect(() => {
    if (!mapRef.current || !routes || routes.routes.length === 0) return

    const drawRoutes = async () => {
      if (!mapRef.current) return
      
      const map = mapRef.current
      const filteredRoutes = routes.routes.filter(r => r.day === selectedDay)
      
      const draw = async () => {
        await drawSimulationRoutes(map, filteredRoutes, true)
      }
      
      if (map.isStyleLoaded()) {
        draw()
      } else {
        // Wait for style to load
        const checkStyleLoaded = setInterval(() => {
          if (map.isStyleLoaded()) {
            clearInterval(checkStyleLoaded)
            draw()
          }
        }, 100)
        
        // Cleanup interval after 5 seconds max
        setTimeout(() => clearInterval(checkStyleLoaded), 5000)
      }
    }

    drawRoutes()

    return () => {
      if (mapRef.current) {
        clearAllRoutes(mapRef.current)
      }
    }
  }, [mapRef, routes, selectedDay])

  return (
    <Box className="simulation-map-page">
      {mapRef.current && (
        <Box className="simulation-header">
          <Heading className="simulation-map-title">Day by Day Simulation</Heading>
          <Text className="simulation-map-subtitle">
            Visualize your supply chain simulation
          </Text>
          
          {availableDays.length > 0 && (
            <Box mt={4}>
              <Text fontSize="sm" color="#a0a0a0" mb={2}>
                Select Day
              </Text>
              <Select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="day-selector"
                size="sm"
              >
                {availableDays.map(dayValue => {
                  const hasRoutes = routes?.routes.some(r => r.day === dayValue) || false
                  const displayDay = availableDays[0] === 0 ? dayValue + 1 : dayValue
                  return (
                    <option key={dayValue} value={dayValue} disabled={!hasRoutes}>
                      Day {displayDay} {!hasRoutes ? '(No trips)' : ''}
                    </option>
                  )
                })}
              </Select>
            </Box>
          )}
        </Box>
      )}
      <Box className="simulation-map-container">
        <MapWithEntities />
      </Box>
    </Box>
  )
}

export default function SimulationMapPage() {
  return (
    <MapProvider>
      <SimulationMapContent />
    </MapProvider>
  )
}
