export function setZoom(mapRef, zoom) {
  if (zoom && (20 > zoom > 0)) {
    mapRef.current.setZoom(zoom);
  }
}
