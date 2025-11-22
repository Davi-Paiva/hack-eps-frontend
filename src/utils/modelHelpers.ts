import type { Map } from 'mapbox-gl'
import { createThreeJSLayer } from './mapbox3D'
import { registerEntity } from './mapClickHandler'
import { addClickableMarker } from './clickableMarkers'

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
  latitude: number,
  _id: string
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
  registerEntity(layerId, { _id, type: 'farm', lat: latitude, lon: longitude })
  map.addLayer(layer)
  addClickableMarker(map, layerId, longitude, latitude)
}

export function addSlaughterhouse(
  map: Map,
  longitude: number,
  latitude: number,
  _id: string
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
  registerEntity(layerId, { _id, type: 'slaughterhouse', lat: latitude, lon: longitude })
  map.addLayer(layer)
  addClickableMarker(map, layerId, longitude, latitude)
}
