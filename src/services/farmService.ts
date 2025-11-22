import type { Farm } from '../types/farm'

export const farmService = {
  async create(endpoint: string, farm: Farm): Promise<boolean> {
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
  }
}
