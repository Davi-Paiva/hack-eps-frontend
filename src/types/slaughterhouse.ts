export interface Slaughterhouse {
  _id?: string
  name: string
  lat: number
  lon: number
  capacity_per_day: number
}

export interface SlaughterhouseFormData {
  name: string
  lat: string
  lon: string
  capacity_per_day: string
}
