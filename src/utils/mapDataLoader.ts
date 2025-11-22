import type { Map } from 'mapbox-gl'
import { farmService } from '../services/farmService'
import { slaughterhouseService } from '../services/slaughterhouseService'
import { addFarm, addSlaughterhouse } from './modelHelpers'

export async function loadMapData(map: Map): Promise<void> {
  try {
    const [farms, slaughterhouses] = await Promise.all([
      farmService.getAll(),
      slaughterhouseService.getAll()
    ])
    
    slaughterhouses.forEach(sh => {
      addSlaughterhouse(map, sh.lon, sh.lat)
    })

    farms.forEach(farm => {
      addFarm(map, farm.lon, farm.lat)
    })
  } catch (error) {
    throw error
  }
}
