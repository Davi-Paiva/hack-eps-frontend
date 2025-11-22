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
      if (sh._id) {
        addSlaughterhouse(map, sh.lon, sh.lat, sh._id)
      }
    })

    farms.forEach(farm => {
      if (farm._id) {
        addFarm(map, farm.lon, farm.lat, farm._id)
      }
    })
  } catch (error) {
    throw error
  }
}
