import type { Slaughterhouse } from '../types/slaughterhouse'

const endpoint = "http://127.0.0.1:8000/api/slaughterhouses"

export const slaughterhouseService = {
  async create(slaughterhouse: Slaughterhouse): Promise<boolean> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slaughterhouse),
      })
      return response.ok
    } catch (error) {
      console.error('Error creating slaughterhouse:', error)
      return false
    }
  },

  async getAll(): Promise<Slaughterhouse[]> {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error('Failed to fetch slaughterhouses')
      }
      const data: Slaughterhouse[] = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching slaughterhouses:', error)
      return []
    }
  }
}
