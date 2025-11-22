import type { Slaughterhouse } from '../types/slaughterhouse'

export const slaughterhouseService = {
  async create(endpoint: string, slaughterhouse: Slaughterhouse): Promise<boolean> {
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
  }
}
