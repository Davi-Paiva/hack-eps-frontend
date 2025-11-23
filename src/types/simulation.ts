export interface Slaughterhouse {
  id: string
  name: string
  lat: number
  lon: number
}

export interface Farm {
  farm_id: string
  farm_name: string
  lat: number
  lon: number
  pigs: number
  load_kg: number
}

export interface Trip {
  trip_id: number
  slaughterhouse: Slaughterhouse
  farms: Farm[]
  day: number
  total_pigs: number
  distance_km: number
  cost: number
  purchase_cost: number
  revenue: number
  profit: number
}

export interface SimulationResponse {
  total_routes: number
  routes: Trip[]
}
