import type { Map } from 'mapbox-gl'
import type { Trip } from '../types/simulation'
import { farmService } from '../services/farmService'
import { slaughterhouseService } from '../services/slaughterhouseService'

const activeRouteIds = new Set<string>()

export async function drawSimulationRoutes(map: Map, routes: Trip[]): Promise<void> {
  clearAllRoutes(map)
  
  if (routes.length === 0) return

  for (const route of routes) {
    try {
      await drawSingleRoute(map, route)
    } catch (error) {
      console.error(`Error drawing route ${route.trip_id}:`, error)
    }
  }
}

async function drawSingleRoute(map: Map, route: Trip): Promise<boolean> {
  const routeId = `route-${route.trip_id}`
  
  const slaughterhouse = await slaughterhouseService.getById(route.slaughterhouse_id)
  if (!slaughterhouse) return false
  
  const farmPromises = route.farm_ids.map(id => farmService.getById(id))
  const farms = await Promise.all(farmPromises)
  const validFarms = farms.filter(farm => farm !== null)
  
  if (validFarms.length === 0) return false
  
  const coordinates: [number, number][] = []
  
  coordinates.push([slaughterhouse.lon, slaughterhouse.lat])
  
  for (const farm of validFarms) {
    if (farm) {
      coordinates.push([farm.lon, farm.lat])
    }
  }
  
  coordinates.push([slaughterhouse.lon, slaughterhouse.lat])
  
  const invalidCoords = coordinates.filter(([lon, lat]) => 
    !isFinite(lon) || !isFinite(lat) || Math.abs(lon) > 180 || Math.abs(lat) > 90
  )
  
  if (invalidCoords.length > 0) return false
  
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
        slaughterhouse_name: route.slaughterhouse_name,
        farm_count: validFarms.length
      },
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    }
  })
  
  const color = getColorForDay(route.day)
  
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
  })
  
  activeRouteIds.add(routeId)
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
  
  activeRouteIds.clear()
}

