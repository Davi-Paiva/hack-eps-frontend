import { Box, Heading, Text } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import './DaySelectorBox.css'

interface DaySelectorBoxProps {
  selectedDay: number
  availableDays: number[]
  routes: Array<{ day: number }> | undefined
  onDayChange: (day: number) => void
}

export default function DaySelectorBox({ 
  selectedDay, 
  availableDays, 
  routes, 
  onDayChange 
}: DaySelectorBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const displayDay = availableDays[0] === 0 ? selectedDay + 1 : selectedDay

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelectDay = (day: number) => {
    onDayChange(day)
    setIsOpen(false)
  }

  return (
    <Box className="simulation-header">
      <Heading className="simulation-map-title">Day by Day Simulation</Heading>
      <Text className="simulation-map-subtitle">
        Visualize your supply chain simulation
      </Text>
      
      {availableDays.length > 0 && (
        <Box mt={4} position="relative" ref={dropdownRef}>
          <Text fontSize="sm" color="#a0a0a0" mb={2}>
            Select Day
          </Text>
          
          <Box 
            className="custom-day-selector"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Text fontSize="sm" color="#d4d4d4">
              Day {displayDay}
            </Text>
            <ChevronDownIcon 
              boxSize={5} 
              color="#a0a0a0" 
              className={isOpen ? "chevron-open" : ""}
            />
          </Box>

          {isOpen && (
            <Box className="custom-dropdown">
              {availableDays.map(dayValue => {
                  const hasRoutes = routes?.some(r => r.day === dayValue) || false
                  const displayDayOption = availableDays[0] === 0 ? dayValue + 1 : dayValue
                  const isSelected = dayValue === selectedDay
                  
                  return (
                    <Box
                      key={dayValue}
                      className={`dropdown-item ${!hasRoutes ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => hasRoutes && handleSelectDay(dayValue)}
                    >
                      <Text fontSize="sm">
                        Day {displayDayOption}
                      </Text>
                      {!hasRoutes && (
                        <Text fontSize="xs" color="#666">
                          No trips
                        </Text>
                      )}
                    </Box>
                  )
                })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
