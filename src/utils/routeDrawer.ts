import type { Map } from 'mapbox-gl'
import type { Trip } from '../types/simulation'
import { createAnimatedTruckLayer, clearAllTruckAnimations } from './animatedTruck'

const activeRouteIds = new Set<string>()
const activeTruckIds = new Set<string>()
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''

async function getDirectionsRoute(waypoints: [number, number][]): Promise<[number, number][] | null> {
  if (waypoints.length < 2) return null
  
  const MAX_WAYPOINTS = 25
  
  if (waypoints.length <= MAX_WAYPOINTS) {
    const coordinatesString = waypoints.map(coord => `${coord[0]},${coord[1]}`).join(';')
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
    
    try {
      const response = await fetch(url)
      if (!response.ok) return null
      
      const data = await response.json()
      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates
      }
      return null
    } catch (error) {
      console.error('Error fetching directions:', error)
      return null
    }
  } else {
    const allCoordinates: [number, number][] = []
    
    for (let i = 0; i < waypoints.length - 1; i += MAX_WAYPOINTS - 1) {
      const chunk = waypoints.slice(i, Math.min(i + MAX_WAYPOINTS, waypoints.length))
      
      if (i + MAX_WAYPOINTS < waypoints.length) {
        chunk.push(waypoints[i + MAX_WAYPOINTS])
      }
      
      const segmentCoords = await getDirectionsRoute(chunk)
      if (!segmentCoords) return null
      
      if (allCoordinates.length > 0) {
        segmentCoords.shift()
      }
      
      allCoordinates.push(...segmentCoords)
    }
    
    return allCoordinates
  }
}

export async function drawSimulationRoutes(map: Map, routes: Trip[], withTrucks: boolean = false): Promise<void> {
  clearAllRoutes(map)
  
  if (routes.length === 0) return

  for (const route of routes) {
    try {
      await drawSingleRoute(map, route, withTrucks)
    } catch (error) {
      console.error(`Error drawing route ${route.trip_id}:`, error)
    }
  }
}

async function drawSingleRoute(map: Map, route: Trip, withTrucks: boolean = false): Promise<boolean> {
  const routeId = `route-${route.trip_id}`
  const truckId = `truck-${route.trip_id}`
  
  if (!route.slaughterhouse?.lat || !route.slaughterhouse?.lon) return false
  if (!route.farms || route.farms.length === 0) return false
  
  const waypoints: [number, number][] = []
  
  waypoints.push([route.slaughterhouse.lon, route.slaughterhouse.lat])
  
  for (const farm of route.farms) {
    waypoints.push([farm.lon, farm.lat])
  }
  
  waypoints.push([route.slaughterhouse.lon, route.slaughterhouse.lat])
  
  const invalidCoords = waypoints.filter(([lon, lat]) => 
    !isFinite(lon) || !isFinite(lat) || Math.abs(lon) > 180 || Math.abs(lat) > 90
  )
  
  if (invalidCoords.length > 0) return false
  
  const roadCoordinates = await getDirectionsRoute(waypoints)
  if (!roadCoordinates) return false
  
  if (map.getLayer(routeId)) {
    map.removeLayer(routeId)
  }
  if (map.getSource(routeId)) {
    map.removeSource(routeId)
  }
  
  map.addSource(routeId, {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {
        trip_id: route.trip_id,
        day: route.day,
        total_pigs: route.total_pigs,
        distance_km: route.distance_km,
        cost: route.cost,
        profit: route.profit,
        slaughterhouse_name: route.slaughterhouse.name,
        farm_count: route.farms.length
      },
      geometry: {
        type: 'LineString',
        coordinates: roadCoordinates
      }
    }
  })
  
  const color = getColorForDay(route.day)
  
  const firstSymbolLayer = map.getStyle().layers.find(layer => layer.type === 'symbol')
  
  map.addLayer({
    id: routeId,
    type: 'line',
    source: routeId,
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': color,
      'line-width': 3,
      'line-opacity': 0.7
    }
  }, firstSymbolLayer?.id)
  
  activeRouteIds.add(routeId)
  
  if (withTrucks) {
    const truckLayer = createAnimatedTruckLayer(truckId, roadCoordinates)
    map.addLayer(truckLayer)
    activeTruckIds.add(truckId)
  }
  
  return true
}

function getColorForDay(day: number): string {
  const colors = [
    '#3b82f6',
    '#06b6d4',
    '#10b981',
    '#84cc16',
    '#eab308',
    '#f97316',
    '#ef4444',
    '#ec4899',
    '#a855f7',
    '#6366f1'
  ]
  
  return colors[day % colors.length]
}

export function clearAllRoutes(map: Map): void {
  activeRouteIds.forEach(routeId => {
    try {
      if (map.getLayer(routeId)) {
        map.removeLayer(routeId)
      }
      if (map.getSource(routeId)) {
        map.removeSource(routeId)
      }
    } catch (error) {
      console.error(`Error clearing route ${routeId}:`, error)
    }
  })
  
  activeTruckIds.forEach(truckId => {
    try {
      if (map.getLayer(truckId)) {
        map.removeLayer(truckId)
      }
    } catch (error) {
      console.error(`Error clearing truck ${truckId}:`, error)
    }
  })
  
  clearAllTruckAnimations(map)
  activeRouteIds.clear()
  activeTruckIds.clear()
}

