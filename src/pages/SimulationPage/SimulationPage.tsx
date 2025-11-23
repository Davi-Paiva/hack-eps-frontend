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

// ===== Tipos que reflejan EXACTAMENTE los JSON de tus endpoints =====

// /api/simulation/overall-farmls/latest
type OverallFarmsResponse = {
  simulation_id: string
  timestamp: string
  num_days: number
  overall_farms: OverallFarms
}

type OverallFarms = {
  beneficio_bruto: number
  coste: number
  beneficio_neto: number
  perdidas_por_penalizacion: number
}

// /api/simulation/overall-trips/latest
type OverallTripsResponse = {
  simulation_id: string
  timestamp: string
  num_days: number
  overall_trips: OverallTrips
}

type OverallTrips = {
  total_viajes: number
  total_camiones: TrucksInfo
  coste_total: number
}

type TrucksInfo = {
  semana_1: number
  semana_2: number
  total: number
}

// /api/simulation/overall-slaughterhouses/latest
type OverallSlaughterhousesResponse = {
  simulation_id: string
  timestamp: string
  num_days: number
  overall_slaughterhouses: OverallSlaughterhouses
}

type Slaughterhouse = {
  nombre: string
  slaughterhouse_id: string
  beneficio_bruto: number
  coste: number
  beneficio_neto: number
}

type OverallSlaughterhouses = {
  slaughterhouses: Slaughterhouse[]
  total_beneficio_bruto: number
  total_coste: number
  total_beneficio_neto: number
}

// /api/simulation/get-routes
type RoutesResponse = {
  total_routes: number
  routes: Route[]
}

type Route = {
  trip_id: number
  slaughterhouse_id: string
  slaughterhouse_name: string
  farm_ids: string[]
  farm_names: string[]
  day: number
  total_pigs: number
  distance_km: number
  // Si en el futuro añades coste en el backend:
  costo_viaje?: number
}

export default function SimulationPage() {
  const navigate = useNavigate()

  // Estados principales
  const [overallFarms, setOverallFarms] = useState<OverallFarms | null>(null)
  const [overallTrips, setOverallTrips] = useState<OverallTrips | null>(null)
  const [overallSlaughterhouses, setOverallSlaughterhouses] =
    useState<OverallSlaughterhouses | null>(null)
  const [routes, setRoutes] = useState<Route[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        setError(null)

        const [farmsRes, tripsRes, slaughterRes, routesRes] = await Promise.all([
          fetch('http://localhost:8000/api/simulation/overall-farms/latest'),
          fetch('http://localhost:8000/api/simulation/overall-trips/latest'),
          fetch('http://localhost:8000/api/simulation/overall-slaughterhouses/latest'),
          fetch('http://localhost:8000/api/simulation/get-routes'),
        ])

        if (!farmsRes.ok || !tripsRes.ok || !slaughterRes.ok || !routesRes.ok) {
          throw new Error('Alguna petición ha fallado')
        }

        const farmsData: OverallFarmsResponse = await farmsRes.json()
        const tripsData: OverallTripsResponse = await tripsRes.json()
        const slaughterData: OverallSlaughterhousesResponse = await slaughterRes.json()
        const routesData: RoutesResponse = await routesRes.json()

        setOverallFarms(farmsData.overall_farms)
        setOverallTrips(tripsData.overall_trips)
        setOverallSlaughterhouses(slaughterData.overall_slaughterhouses)
        setRoutes(routesData.routes || [])
      } catch (err: any) {
        setError(err.message ?? 'Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  // Farms neto: clase + flecha según signo
  const farmsNetValue = overallFarms?.beneficio_neto
  const farmsNetIsPositive = farmsNetValue === undefined ? true : farmsNetValue >= 0
  const farmsNetClass = `simulation-card-value ${
    farmsNetIsPositive ? 'simulation-card-value-positive' : 'simulation-card-value-negative'
  }`
  const farmsNetArrow = farmsNetIsPositive ? '↑' : '↓'

  // Slaughterhouses neto: clase + flecha según signo (usamos total_beneficio_neto)
  const slaughterNetValue = overallSlaughterhouses?.total_beneficio_neto
  const slaughterNetIsPositive =
    slaughterNetValue === undefined ? true : slaughterNetValue >= 0
  const slaughterNetClass = `simulation-card-value ${
    slaughterNetIsPositive ? 'simulation-card-value-positive' : 'simulation-card-value-negative'
  }`
  const slaughterNetArrow = slaughterNetIsPositive ? '↑' : '↓'

  // Helper para construir la ruta en texto
  const buildRoutePath = (route: Route): string => {
    const middle = route.farm_names.join(' --> ')
    if (!middle) return `${route.slaughterhouse_name} --> ${route.slaughterhouse_name}`
    return `${route.slaughterhouse_name} --> ${middle} --> ${route.slaughterhouse_name}`
  }

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
                          ? overallFarms.beneficio_bruto.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Coste - ROJO + ↓ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Coste</Text>
                      <Text className="simulation-card-value simulation-card-value-negative">
                        <span className="simulation-card-arrow">↓</span>
                        {overallFarms ? overallFarms.coste.toLocaleString() : '-'}
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
                          {overallFarms.beneficio_neto.toLocaleString()}
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
                          ? overallFarms.perdidas_por_penalizacion.toLocaleString()
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
                          ? overallTrips.total_viajes.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    <Box className="simulation-card">
                      <Text className="simulation-card-label">
                        Transportes semana 1
                      </Text>
                      <Text className="simulation-card-value">
                        {overallTrips
                          ? overallTrips.total_camiones.semana_1.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    <Box className="simulation-card">
                      <Text className="simulation-card-label">
                        Transportes semana 2
                      </Text>
                      <Text className="simulation-card-value">
                        {overallTrips
                          ? overallTrips.total_camiones.semana_2.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Costes totales - ROJO + ↓ */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Costes totales</Text>
                      <Text className="simulation-card-value simulation-card-value-negative">
                        <span className="simulation-card-arrow">↓</span>
                        {overallTrips
                          ? overallTrips.coste_total.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>
                  </SimpleGrid>

                  {/* Tabla de rutas scrolleable */}
                  <Box mt={6} className="routes-table-container">
                    <Box className="routes-table-header">
                      <Text className="routes-table-cell routes-table-cell-header">
                        Trip ID
                      </Text>
                      <Text className="routes-table-cell routes-table-cell-header">
                        Día
                      </Text>
                      <Text className="routes-table-cell routes-table-cell-header">
                        Ruta
                      </Text>
                      <Text className="routes-table-cell routes-table-cell-header">
                        Km totales
                      </Text>
                      <Text className="routes-table-cell routes-table-cell-header">
                        Coste viaje
                      </Text>
                    </Box>
                    <Box className="routes-table-body">
                      {routes.map((route) => (
                        <Box key={route.trip_id} className="routes-table-row">
                          <Text className="routes-table-cell">{route.trip_id}</Text>
                          <Text className="routes-table-cell">{route.day + 1}</Text>
                          <Text className="routes-table-cell">
                            {buildRoutePath(route)}
                          </Text>
                          <Text className="routes-table-cell">
                            {route.distance_km.toFixed(2)}
                          </Text>
                          <Text className="routes-table-cell">
                            {route.costo_viaje !== undefined
                              ? route.costo_viaje.toLocaleString()
                              : '-'}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
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
                    {/* Beneficio bruto - VERDE + ↑ (total) */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Beneficio Bruto</Text>
                      <Text className="simulation-card-value simulation-card-value-positive">
                        <span className="simulation-card-arrow">↑</span>
                        {overallSlaughterhouses
                          ? overallSlaughterhouses.total_beneficio_bruto.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Costes - ROJO + ↓ (total) */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Costes</Text>
                      <Text className="simulation-card-value simulation-card-value-negative">
                        <span className="simulation-card-arrow">↓</span>
                        {overallSlaughterhouses
                          ? overallSlaughterhouses.total_coste.toLocaleString()
                          : '-'}
                      </Text>
                    </Box>

                    {/* Beneficio neto - VERDE/ROJO + ↑/↓ según signo (total) */}
                    <Box className="simulation-card">
                      <Text className="simulation-card-label">Beneficio Neto</Text>
                      {overallSlaughterhouses ? (
                        <Text className={slaughterNetClass}>
                          <span className="simulation-card-arrow">
                            {slaughterNetArrow}
                          </span>
                          {overallSlaughterhouses.total_beneficio_neto.toLocaleString()}
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
