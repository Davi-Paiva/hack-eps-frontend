import type { Map } from 'mapbox-gl'
import { createThreeJSLayer } from './mapbox3D'

let modelCounter = 0

export function addPig(
  map: Map,
  longitude: number,
  latitude: number
): void {
  const layerId = `pig-model-${modelCounter++}`
  const layer = createThreeJSLayer(
    layerId,
    '/models/pig.glb',
    longitude,
    latitude
  )
  map.addLayer(layer)
}

export function addFarm(
  map: Map,
  longitude: number,
  latitude: number
): void {
  const layerId = `farm-model-${modelCounter++}`
  const layer = createThreeJSLayer(
    layerId,
    '/models/Farm.glb',
    longitude,
    latitude,
    0,
    [Math.PI / 2, Math.PI, 0]
  )
  map.addLayer(layer)
}

export function addSlaughterhouse(
  map: Map,
  longitude: number,
  latitude: number
): void {
  const layerId = `slaughterhouse-model-${modelCounter++}`
  const layer = createThreeJSLayer(
    layerId,
    '/models/SlaughterHouse.glb',
    longitude,
    latitude,
    0,
    [Math.PI / 2, 0, 0],
    400
  )
  map.addLayer(layer)
}
