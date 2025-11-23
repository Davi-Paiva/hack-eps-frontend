import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StartSimulationPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleStartSimulation = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/simulation/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num_days: 10 }),
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      // Si necesitas la respuesta, descomenta:
      // const data = await response.json()
      // console.log(data)

      navigate('/simulation')
    } catch (error) {
      console.error(error)
      alert('Ha ocurrido un error al lanzar la simulación.')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={handleStartSimulation}
        disabled={loading}
        style={{
          padding: '1.25rem 2.5rem',
          fontSize: '1.25rem',
          fontWeight: 600,
          borderRadius: '999px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
          color: '#1e1e1e',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
          opacity: loading ? 0.7 : 1,
        }}
        onMouseOver={(e) => {
          if (loading) return
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 14px 40px rgba(0,0,0,0.5)'
        }}
        onMouseOut={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 10px 30px rgba(0,0,0,0.4)'
        }}
      >
        {loading ? 'Launching simulation...' : 'Launch Simulation'}
      </button>
    </div>
  )
}

export default StartSimulationPage
