import type { SimulationResponse } from "../types/simulation"


const endpoint = "http://127.0.0.1:8000/api/simulation"

export const simulationService = {
  async getRoutes(numDays: number = 10): Promise<SimulationResponse> {
    try {
      const response = await fetch(`${endpoint}/get-routes?num_days=${numDays}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch simulation routes: ${response.status} ${response.statusText}`)
      }
      const data: SimulationResponse = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching simulation routes:', error)
      return { total_routes: 0, routes: [] }
    }
  }
}