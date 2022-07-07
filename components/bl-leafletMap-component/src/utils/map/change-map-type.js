import { Maps } from '../../maps';
import Leaflet from '../../lib/leaflet/leaflet';

export function changeMapType(mapRef, currentLayer, component) {
  const { mapType } = component;

  if (mapType in Maps) {
    mapRef.current.removeLayer(currentLayer.current);

    currentLayer.current = Leaflet.tileLayer(Maps[mapType].mapUrl, Maps[mapType].options)
      .addTo(mapRef.current);
  } else if (mapType === undefined) {
  } else {
    console.error('Leaflet Map: not valid map type');
  }
}
