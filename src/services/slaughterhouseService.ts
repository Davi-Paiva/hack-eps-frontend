import type { Slaughterhouse } from '../types/slaughterhouse'

const endpoint = "http://127.0.0.1:8000/api/slaughterhouses"

export const slaughterhouseService = {
  async create(slaughterhouse: Slaughterhouse): Promise<boolean> {
    try {
      const response = await fetch(`${endpoint}/init-slaughterhouse`, {
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
  },

  async getById(id: string): Promise<Slaughterhouse | null> {
    try {
      const response = await fetch(`${endpoint}/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch slaughterhouse')
      }
      const data: Slaughterhouse = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching slaughterhouse:', error)
      return null
    }
  }
  ,

  async update(id: string, slaughterhouse_data: Partial<Slaughterhouse>): Promise<boolean> {
    try {
      const response = await fetch(`${endpoint}/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slaughterhouse_data),
      })
      return response.ok
    } catch (error) {
      console.error('Error updating slaughterhouse:', error)
      return false
    }
  }

  ,

  async delete(id: string): Promise<boolean> {
    try {
      // Try domain-specific delete endpoint first (expects slaughterhouse_id query param).
      const queryUrl = `${endpoint}/delete?slaughterhouse_id=${encodeURIComponent(id)}`
      console.debug('slaughterhouseService.delete: trying', queryUrl)
      let response = await fetch(queryUrl, { method: 'DELETE' })
      if (response.ok) return true

      // If that failed, fallback to RESTful DELETE /api/slaughterhouses/:id
      const restUrl = `${endpoint}/${encodeURIComponent(id)}`
      console.debug('slaughterhouseService.delete: fallback to', restUrl, 'status from query:', response.status)
      response = await fetch(restUrl, { method: 'DELETE' })
      return response.ok
    } catch (error) {
      console.error('Error deleting slaughterhouse:', error)
      return false
    }
  },

  async importCSV(file: File): Promise<boolean> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch(`${endpoint}/import-csv`, {
        method: 'POST',
        body: formData,
      })
      return response.ok
    } catch (error) {
      console.error('Error importing CSV:', error)
      return false
    }
  }
}
