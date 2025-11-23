import type { SimulationResponse, SimulationDayResponse } from "../types/simulation"


const endpoint = "http://127.0.0.1:8000/api/simulation"

export const simulationService = {
  async getRoutes(): Promise<SimulationResponse> {
    try {
      const response = await fetch(`${endpoint}/get-routes`, {
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
  },

  async getDayState(day: number): Promise<SimulationDayResponse> {
    try {
      const response = await fetch(`${endpoint}/simulate/${day}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch simulation day state: ${response.status} ${response.statusText}`)
      }
      const data: SimulationDayResponse = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching simulation day state:', error)
      return { 
        simulation_id: '', 
        timestamp: '', 
        day, 
        slaughterhouses: [], 
        farms: [] 
      }
    }
  }
}