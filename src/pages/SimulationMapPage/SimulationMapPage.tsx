import { Box } from '@chakra-ui/react'
import './SimulationMapPage.css'
import { useEffect, useState } from 'react'
import { simulationService } from '../../services/simulationService'
import type { SimulationResponse, SimulationDayResponse } from '../../types/simulation'
import { MapProvider, useMap } from '../../contexts/MapContext'
import MapWithEntities from '../../components/MapWithEntities/MapWithEntities'
import { drawSimulationRoutes } from '../../utils/routeDrawer'
import DaySelectorBox from '../../components/DaySelectorBox/DaySelectorBox'
import TripsInfoBox from '../../components/TripsInfoBox/TripsInfoBox'

function SimulationMapContent() {
  const { mapRef } = useMap()
  const [routes, setRoutes] = useState<SimulationResponse | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [availableDays, setAvailableDays] = useState<number[]>([])
  const [dayState, setDayState] = useState<SimulationDayResponse | null>(null)

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await simulationService.getRoutes()
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

  // Fetch day state when selected day changes
  useEffect(() => {
    if (selectedDay === null) return
    
    const fetchDayState = async () => {
      const data = await simulationService.getDayState(selectedDay)
      setDayState(data)
    }
    fetchDayState()
  }, [selectedDay])

  useEffect(() => {
    if (!mapRef.current || !routes || routes.routes.length === 0 || selectedDay === null) return

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
  }, [mapRef, routes, selectedDay])

  const filteredRoutes = selectedDay !== null ? routes?.routes.filter(r => r.day === selectedDay) || [] : []
  const displayDay = selectedDay !== null ? (availableDays[0] === 0 ? selectedDay + 1 : selectedDay) : 0

  return (
    <Box className="simulation-map-page">
      {mapRef.current && selectedDay !== null && (
        <>
          <DaySelectorBox 
            selectedDay={selectedDay}
            availableDays={availableDays}
            routes={routes?.routes}
            onDayChange={setSelectedDay}
          />

          <TripsInfoBox 
            displayDay={displayDay}
            trips={filteredRoutes}
          />
        </>
      )}
      <Box className="simulation-map-container">
        <MapWithEntities dayState={dayState} />
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
