import { farmService } from '../services/farmService'
import { slaughterhouseService } from '../services/slaughterhouseService'
import type { MapEntity } from '../types/mapEntity'

const entityRegistry = new Map<string, MapEntity>()

let clickCallbacks: Array<(entity: MapEntity, position: { x: number; y: number }) => void> = []

export function registerEntity(layerId: string, entity: MapEntity): void {
  entityRegistry.set(layerId, entity)
}

export function getEntityByLayerId(layerId: string): MapEntity | undefined {
  return entityRegistry.get(layerId)
}

export function onEntityClick(callback: (entity: MapEntity, position: { x: number; y: number }) => void): () => void {
  clickCallbacks.push(callback)
  
  return () => {
    clickCallbacks = clickCallbacks.filter(cb => cb !== callback)
  }
}

export function triggerEntityClick(layerId: string, clickX: number, clickY: number): void {
  const entity = entityRegistry.get(layerId)
  if (entity) {
    if (entity.type === 'farm') {
        farmService.getById(entity._id).then(farmData => {
          console.log('Farm data on click:', farmData)
        })
    }
    else if (entity.type === 'slaughterhouse') {
        slaughterhouseService.getById(entity._id).then(shData => {
          console.log('Slaughterhouse data on click:', shData)
        })
    }
    clickCallbacks.forEach(callback => callback(entity, { x: clickX, y: clickY }))
  }
}
