import type { Farm } from '../types/farm'

const endpoint = "http://127.0.0.1:8000/api/farms"

export const farmService = {
  async create(farm: Farm): Promise<boolean> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farm),
      })
      return response.ok
    } catch (error) {
      console.error('Error creating farm:', error)
      return false
    }
  },

  async getAll(): Promise<Farm[]> {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error('Failed to fetch farms')
      }
      const data: Farm[] = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching farms:', error)
      return []
    }
  },

  async getById(id: string): Promise<Farm | null> {
    try {
      const response = await fetch(`${endpoint}/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch farm')
      }
      const data: Farm = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching farm:', error)
      return null
    }
  }
}
