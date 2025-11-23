import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import './SimulationPage.css'

type ObjectOverallFarms = {
  num_days: number
  overrall_farms: OverallFarms
  simulation_id: number
  timestamp: string
}

type OverallFarms = {
  beneficio_bruto: number
  costes: number
  beneficio_neto: number
  perdidas_por_penalizacion: number
}

type ObjectOverallTrips = {
  num_days: number
  overall_trips: OverallTrips
  simulation_id: number
  timestamp: string
}

type OverallTrips = {
  viajes_totales: number
  total_camiones: TrucksInfo
  coste_total: number
}
type TrucksInfo = {
  semana_1: number
  semana_2: number
  total: number
}

type ObjectOverallSlaughterhouses = {
  num_days: number
  overall_slaughterhouses: OverallSlaughterhouses
  simulation_id: number
  timestamp: string
}
type OverallSlaughterhouses = {
  total_beneficio_bruto: number
  total_costes: number
  total_beneficio_neto: number
  slaughterhouses: string[]
}

export default function SimulationPage() {
  const navigate = useNavigate()

  const [overallFarms, setOverallFarms] = useState<ObjectOverallFarms | null>(null)
  const [overallTrips, setOverallTrips] = useState<ObjectOverallTrips | null>(null)
  const [overallSlaughterhouses, setOverallSlaughterhouses] =
    useState<ObjectOverallSlaughterhouses | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        setError(null)

        const [farmsRes, tripsRes, slaughterRes] = await Promise.all([
          fetch('http://localhost:8000/api/simulation/overall-farms/latest'),
          fetch('http://localhost:8000/api/simulation/overall-trips/latest'),
          fetch('http://localhost:8000/api/simulation/overall-slaughterhouses/latest'),
        ])

        if (!farmsRes.ok || !tripsRes.ok || !slaughterRes.ok) {
          throw new Error('Alguna petición ha fallado')
        }

        const farmsData = await farmsRes.json()
        const tripsData = await tripsRes.json()
        const slaughterData = await slaughterRes.json()

        // Claves según tu especificación
        setOverallFarms(farmsData.overrall_farms)
        setOverallTrips(tripsData.overall_trips)
        setOverallSlaughterhouses(slaughterData.overall_slaughterhouses)
      } catch (err: any) {
        setError(err.message ?? 'Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  // Farms neto: clase + flecha según signo
  const farmsNetValue = overallFarms?.overrall_farms.beneficio_neto
  const farmsNetIsPositive = farmsNetValue === undefined ? true : farmsNetValue >= 0
  const farmsNetClass = `simulation-card-value ${
    farmsNetIsPositive ? 'simulation-card-value-positive' : 'simulation-card-value-negative'
  }`
  const farmsNetArrow = farmsNetIsPositive ? '↑' : '↓'

  // Slaughterhouses neto: clase + flecha según signo
  const slaughterNetValue = overallSlaughterhouses?.overall_slaughterhouses.total_beneficio_neto
  const slaughterNetIsPositive =
    slaughterNetValue === undefined ? true : slaughterNetValue >= 0
  const slaughterNetClass = `simulation-card-value ${
    slaughterNetIsPositive ? 'simulation-card-value-positive' : 'simulation-card-value-negative'
  }`
  const slaughterNetArrow = slaughterNetIsPositive ? '↑' : '↓'

  return (
    <Box className="simulation-page">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Box className="simulation-header">
            <Heading className="simulation-title">Simulation</Heading>
            <Text className="simulation-subtitle">
              Run simulations to optimize your supply chain
            </Text>
          </Box>

          <Box className="simulation-content">
            {loading && (
              <Box className="simulation-loading">
                <Spinner />
                <Text mt={2}>Cargando datos generales...</Text>
              </Box>
            )}

            {error && !loading && (
              <Box className="simulation-error">
                <Text>Error: {error}</Text>
              </Box>
            )}

            {!loading && !error && (
              <>
                {/* FARMS */}
                <Box mb={8} className="simulation-section">
                  <Heading
                    as="h3"
                    size="md"
                    mb={4}
                    className="simulation-section-title"
                  >
                    Farms
                  </Heading>
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
                    {/* Beneficio bruto - VERDE + ↑ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Beneficio Bruto</Text>
                      <Text className="simulation-card-value simulation-card-value-positive">
                        <span className="simulation-card-arrow">↑</span>
                        {overallFarms
                          ? overallFarms.overrall_farms.beneficio_bruto.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Coste - ROJO + ↓ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Coste</Text>
                      <Text className="simulation-card-value simulation-card-value-negative">
                        <span className="simulation-card-arrow">↓</span>
                        {overallFarms ? overallFarms.overrall_farms.costes.toLocaleString() : '-'}
                      </Text>
                    </Box>

                    {/* Beneficio neto - VERDE/ROJO + ↑/↓ según signo */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Beneficio Neto</Text>
                      {overallFarms ? (
                        <Text className={farmsNetClass}>
                          <span className="simulation-card-arrow">
                            {farmsNetArrow}
                          </span>
                          {overallFarms.overrall_farms.beneficio_neto.toLocaleString()}
                        </Text>
                      ) : (
                        <Text className="simulation-card-value">-</Text>
                      )}
                    </Box>

                    {/* Penalización acumulada - SIEMPRE ROJA + ↓ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">
                        Penalización Acumulada
                      </Text>
                      <Text className="simulation-card-value simulation-card-value-negative">
                        <span className="simulation-card-arrow">↓</span>
                        {overallFarms
                          ? overallFarms.overrall_farms.perdidas_por_penalizacion.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* TRIPS */}
                <Box mb={8} className="simulation-section">
                  <Heading
                    as="h3"
                    size="md"
                    mb={4}
                    className="simulation-section-title"
                  >
                    Trips
                  </Heading>
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Viajes realizados</Text>
                      <Text className="simulation-card-value">
                        {overallTrips
                          ? overallTrips.overall_trips.viajes_totales.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    <Box className="simulation-card">
                      <Text className="simulation-card-label">
                        Transportes semana 1
                      </Text>
                      <Text className="simulation-card-value">
                        {overallTrips
                          ? overallTrips.overall_trips.total_camiones.semana_1.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    <Box className="simulation-card">
                      <Text className="simulation-card-label">
                        Transportes semana 2
                      </Text>
                      <Text className="simulation-card-value">
                        {overallTrips
                          ? overallTrips.overall_trips.total_camiones.semana_2.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Costes totales - ROJO + ↓ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Costes totales</Text>
                      <Text className="simulation-card-value simulation-card-value-negative">
                        <span className="simulation-card-arrow">↓</span>
                        {overallTrips
                          ? overallTrips.overall_trips.coste_total.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* SLAUGHTERHOUSES */}
                <Box mb={4} className="simulation-section">
                  <Heading
                    as="h3"
                    size="md"
                    mb={4}
                    className="simulation-section-title"
                  >
                    Slaughterhouses
                  </Heading>
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                    {/* Beneficio bruto - VERDE + ↑ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Beneficio Bruto</Text>
                      <Text className="simulation-card-value simulation-card-value-positive">
                        <span className="simulation-card-arrow">↑</span>
                        {overallSlaughterhouses
                          ? overallSlaughterhouses.overall_slaughterhouses.total_beneficio_bruto.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Costes - ROJO + ↓ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Costes</Text>
                      <Text className="simulation-card-value simulation-card-value-negative">
                        <span className="simulation-card-arrow">↓</span>
                        {overallSlaughterhouses
                          ? overallSlaughterhouses.overall_slaughterhouses.total_costes.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Beneficio neto - VERDE/ROJO + ↑/↓ según signo */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Beneficio Neto</Text>
                      {overallSlaughterhouses ? (
                        <Text className={slaughterNetClass}>
                          <span className="simulation-card-arrow">
                            {slaughterNetArrow}
                          </span>
                          {overallSlaughterhouses.overall_slaughterhouses.total_beneficio_neto.toLocaleString()}
                        </Text>
                      ) : (
                        <Text className="simulation-card-value">-</Text>
                      )}
                    </Box>
                  </SimpleGrid>
                </Box>
              </>
            )}
          </Box>

          {/* Botón original */}
          <Button
            className="simulation-button"
            onClick={() => navigate('/simulation-map')}
          >
            See Day by Day Simulation
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}
