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
    latitude
  )
  map.addLayer(layer)
}

export function addCustomModel(
  map: Map,
  modelPath: string,
  longitude: number,
  latitude: number,
  altitude = 0,
  rotation: [number, number, number] = [Math.PI / 2, 0, 0]
): void {
  const layerId = `custom-model-${modelCounter++}`
  const layer = createThreeJSLayer(
    layerId,
    modelPath,
    longitude,
    latitude,
    altitude,
    rotation
  )
  map.addLayer(layer)
}
