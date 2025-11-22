export interface FarmDetails {
  _id?: string
  name: string
  lat: number
  lon: number
  capacity: number
  inventory_pigs?: number
  consumption_pigs?: number
  age_weeks?: number
  avg_weight_kg?: number
  growth_rate_kg_per_week?: number
  price_per_kg?: number
  farm_id?: string
}

export interface SlaughterhouseDetails {
  _id?: string
  name: string
  lat: number
  lon: number
  capacity_per_day: number
}
