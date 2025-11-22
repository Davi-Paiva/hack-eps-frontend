import { createContext, useContext, useRef, type ReactNode, type MutableRefObject } from 'react'
import type { Map } from 'mapbox-gl'

interface MapContextType {
  mapRef: MutableRefObject<Map | null>
}

const MapContext = createContext<MapContextType | null>(null)

export function MapProvider({ children }: { children: ReactNode }) {
  const mapRef = useRef<mapboxgl.Map | null>(null)

  return (
    <MapContext.Provider value={{ mapRef }}>
      {children}
    </MapContext.Provider>
  )
}

export function useMap() {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap must be used within MapProvider')
  }
  return context
}
