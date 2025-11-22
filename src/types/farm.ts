export interface Farm {
  _id?: string
  name: string
  lat: number
  lon: number
  capacity: number
}

export interface FarmFormData {
  name: string
  lat: string
  lon: string
  capacity: string
}
