import mapboxgl from 'mapbox-gl'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface CustomLayerWithThree extends mapboxgl.CustomLayerInterface {
  camera?: THREE.Camera
  scene?: THREE.Scene
  renderer?: THREE.WebGLRenderer
  map?: mapboxgl.Map
}

interface ModelTransform {
  translateX: number
  translateY: number
  translateZ: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
}

export function createThreeJSLayer(
  layerId: string,
  modelPath: string,
  longitude: number,
  latitude: number,
  altitude = 0,
  rotation: [number, number, number] = [Math.PI / 2, 0, 0],
  scaleMultiplier = 1
): CustomLayerWithThree {
  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    [longitude, latitude],
    altitude
  )

  const modelTransform: ModelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: rotation[0],
    rotateY: rotation[1],
    rotateZ: rotation[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
  }

  const customLayer: CustomLayerWithThree = {
    id: layerId,
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera()
      this.scene = new THREE.Scene()

      // Lighting setup
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(0, -70, 100).normalize()
      this.scene.add(directionalLight)

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight2.position.set(0, 70, 100).normalize()
      this.scene.add(directionalLight2)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      this.scene.add(ambientLight)

      // Load model
      const loader = new GLTFLoader()
      loader.load(
        modelPath,
        (gltf) => {
          if (this.scene) {
            this.scene.add(gltf.scene)
          }
        },
        undefined,
        (error) => console.error(`✗ Error loading model ${modelPath}:`, error)
      )

      this.map = map
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      })

      this.renderer.autoClear = false
    },
    render: function (_gl, matrix) {
      if (!this.camera || !this.renderer || !this.scene || !this.map) return

      const zoom = this.map.getZoom()
      
      const baseZoom = 16
      const zoomDiff = baseZoom - zoom
      const zoomScale = zoomDiff > 0 ? Math.pow(2, zoomDiff * 0.7) : 1
      
      const finalScale = modelTransform.scale * zoomScale * scaleMultiplier

      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      )
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      )
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      )

      const m = new THREE.Matrix4().fromArray(matrix)
      const l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            finalScale,
            -finalScale,
            finalScale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ)

      this.camera.projectionMatrix = m.multiply(l)
      this.renderer.resetState()
      this.renderer.render(this.scene, this.camera)
      this.map.triggerRepaint()
    }
  }

  return customLayer
}
