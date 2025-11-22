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
  el.style.width = '50px'
  el.style.height = '50px'
  el.style.cursor = 'pointer'
  el.style.background = 'transparent'
  
  el.addEventListener('click', (e) => {
    e.stopPropagation()
    triggerEntityClick(layerId)
  })

  new mapboxgl.Marker(el)
    .setLngLat([longitude, latitude])
    .addTo(map)
}
