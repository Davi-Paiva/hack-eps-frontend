import mapboxgl from 'mapbox-gl'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface TruckAnimation {
  layerId: string
  coordinates: [number, number][]
  currentIndex: number
  progress: number
  speed: number
  model?: THREE.Object3D
  isComplete: boolean
}

const activeTrucks = new Map<string, TruckAnimation>()

export function createAnimatedTruckLayer(
  layerId: string,
  routeCoordinates: [number, number][],
  speed: number = 0.015
): mapboxgl.CustomLayerInterface {
  let camera: THREE.Camera
  let scene: THREE.Scene
  let renderer: THREE.WebGLRenderer
  let map: mapboxgl.Map
  let model: THREE.Object3D | null = null

  const animation: TruckAnimation = {
    layerId,
    coordinates: routeCoordinates,
    currentIndex: 0,
    progress: 1, // Start 50% along the first segment to avoid overlapping with slaughterhouse
    speed,
    isComplete: false
  }

  activeTrucks.set(layerId, animation)

  return {
    id: layerId,
    type: 'custom',
    renderingMode: '3d',

    onAdd: function (mapInstance, gl) {
      map = mapInstance

      camera = new THREE.Camera()
      scene = new THREE.Scene()

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(0, 70, 100).normalize()
      scene.add(directionalLight)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const loader = new GLTFLoader()
      loader.load(
        '/models/Truck.glb',
        (gltf) => {
          model = gltf.scene
          animation.model = model
          scene.add(model)
          console.log('Truck model loaded and added to scene')
        },
        (progress) => {
          console.log('Loading truck:', (progress.loaded / progress.total * 100).toFixed(2) + '%')
        },
        (error) => {
          console.error('Error loading truck model:', error)
          console.error('Make sure Truck.glb exists in /public/models/')
        }
      )

      renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      })

      renderer.autoClear = false
    },

    render: function (_gl, matrix) {
      if (!model || animation.isComplete) {
        if (!model && animation.currentIndex === 0) {
          console.log('Truck model not yet loaded')
        }
        return
      }

      const { coordinates, currentIndex, progress, speed } = animation
      
      if (currentIndex === 0 && progress === 0) {
        console.log('Starting truck animation rendering')
      }

      if (currentIndex >= coordinates.length - 1) {
        animation.isComplete = true
        return
      }

      const start = coordinates[currentIndex]
      const end = coordinates[currentIndex + 1]

      const currentLon = start[0] + (end[0] - start[0]) * progress
      const currentLat = start[1] + (end[1] - start[1]) * progress

      // Calculate next position slightly ahead for smooth heading calculation
      const nextProgress = Math.min(progress + 0.01, 1)
      let nextLon, nextLat
      
      if (nextProgress >= 1 && currentIndex < coordinates.length - 2) {
        // If we're at the end of current segment, look at next segment
        const nextSegmentStart = coordinates[currentIndex + 1]
        const nextSegmentEnd = coordinates[currentIndex + 2]
        const overshoot = nextProgress - 1
        nextLon = nextSegmentStart[0] + (nextSegmentEnd[0] - nextSegmentStart[0]) * overshoot
        nextLat = nextSegmentStart[1] + (nextSegmentEnd[1] - nextSegmentStart[1]) * overshoot
      } else {
        nextLon = start[0] + (end[0] - start[0]) * nextProgress
        nextLat = start[1] + (end[1] - start[1]) * nextProgress
      }

      // Position truck on the road
      const mercatorCoord = mapboxgl.MercatorCoordinate.fromLngLat(
        [currentLon, currentLat],
        0
      )

      const scale = mercatorCoord.meterInMercatorCoordinateUnits()
      
      // Apply zoom scaling like other 3D models
      const zoom = map.getZoom()
      const baseZoom = 16
      const zoomDiff = baseZoom - zoom
      const zoomScale = zoomDiff > 0 ? Math.pow(2, zoomDiff * 0.7) : 1
      const finalScale = scale * zoomScale * 0.4

      // Calculate heading based on actual movement direction (look slightly ahead)
      const heading = Math.atan2(nextLon - currentLon, nextLat - currentLat)
      
      // Rotations: first stand upright, then rotate to face direction
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        Math.PI / 2  // Stand upright (90 degrees)
      )
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        -heading + Math.PI  // Face the direction of movement (flip 180 degrees)
      )

      const m = new THREE.Matrix4().fromArray(matrix)
      const l = new THREE.Matrix4()
        .makeTranslation(
          mercatorCoord.x,
          mercatorCoord.y,
          mercatorCoord.z
        )
        .scale(new THREE.Vector3(finalScale, -finalScale, finalScale))
        .multiply(rotationZ)
        .multiply(rotationX)

      camera.projectionMatrix = m.multiply(l)
      renderer.resetState()
      renderer.render(scene, camera)

      animation.progress += speed
      if (animation.progress >= 1) {
        animation.progress = 0
        animation.currentIndex++
      }

      map.triggerRepaint()
    }
  }
}

export function startTruckAnimation(map: mapboxgl.Map, layerId: string) {
  const animation = activeTrucks.get(layerId)
  if (animation) {
    animation.currentIndex = 0
    animation.progress = 0
    animation.isComplete = false
    map.triggerRepaint()
  }
}

export function stopTruckAnimation(_map: mapboxgl.Map, layerId: string) {
  const animation = activeTrucks.get(layerId)
  if (animation) {
    animation.isComplete = true
  }
}

export function removeTruckAnimation(map: mapboxgl.Map, layerId: string) {
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId)
  }
  activeTrucks.delete(layerId)
}

export function clearAllTruckAnimations(map: mapboxgl.Map) {
  activeTrucks.forEach((_, layerId) => {
    removeTruckAnimation(map, layerId)
  })
}
