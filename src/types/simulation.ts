export interface Trip {
  trip_id: string
  slaughterhouse_id: string
  slaughterhouse_name: string
  farm_ids: string[]
  farm_names: string[]
  day: number
  total_pigs: number
  distance_km: number
}

export interface SimulationResponse {
  total_routes: number
  routes: Trip[]
}
