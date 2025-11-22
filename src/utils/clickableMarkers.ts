import type { Map } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { triggerEntityClick } from './mapClickHandler'

export function addClickableMarker(
  map: Map,
  layerId: string,
  longitude: number,
  latitude: number
): void {
  const el = document.createElement('div')
  el.style.width = '80px'
  el.style.height = '80px'
  el.style.cursor = 'pointer'
  el.style.background = 'transparent'
  
  el.addEventListener('click', (e) => {
    e.stopPropagation()
    triggerEntityClick(layerId, e.clientX, e.clientY)
  })

  new mapboxgl.Marker(el)
    .setLngLat([longitude, latitude])
    .addTo(map)
}
