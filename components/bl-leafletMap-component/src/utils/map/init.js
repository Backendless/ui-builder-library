import { toCoordinates } from '../coordinates';
import Leaflet from '../../lib/leaflet/leaflet';
import { Maps } from '../../maps';
import { removeZoomControl } from './toggle-zoom-control'

export function initMap(component, eventHandlers, mapRef, currentLayer) {
  const { zoom, center, mapType, zoomControl } = component;
  const { onClick } = eventHandlers;
  const centerCoords = toCoordinates(center);

  mapRef.current = Leaflet.map('bl-customComponent-leafletMap', {
    zoom,
    center           : centerCoords,
    fullscreenControl: true
  });

  if (!zoomControl) {
    removeZoomControl(mapRef);
  }

  currentLayer.current = Leaflet.tileLayer(Maps[mapType].mapUrl, Maps[mapType].options)
    .addTo(mapRef.current);

  mapRef.current.on('click', event => {
    onClick({
      coordinates: [event.latlng.lat, event.latlng.lng]
    });
  });
}
