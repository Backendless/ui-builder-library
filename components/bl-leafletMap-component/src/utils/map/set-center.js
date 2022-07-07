import { toCoordinates } from '../coordinates';

export function setCenter(mapRef, center) {
  if (center) {
    const currentCoords = toCoordinates(center);
    const currentZoom = mapRef.current.getZoom();

    mapRef.current.setView(currentCoords, currentZoom);
  }
}
