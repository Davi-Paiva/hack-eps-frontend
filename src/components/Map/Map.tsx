import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import { addFarm } from '../../utils/modelHelpers'

function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (mapRef.current) return

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''
    
    if (!mapContainerRef.current) {
      console.error('Map container not found')
      return
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0.623446499953393, 41.608433991761345],
      zoom: 15,
      pitch: 60,
      bearing: -30,
      antialias: true
    })

    // Add models once the map style is loaded
    mapRef.current.on('style.load', () => {
      if (mapRef.current) {
        // Example: Add a farm at the map center
        addFarm(mapRef.current, 0.623446499953393, 41.608433991761345)
      }
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div id='map-container' ref={mapContainerRef} />
  )
}

export default Map