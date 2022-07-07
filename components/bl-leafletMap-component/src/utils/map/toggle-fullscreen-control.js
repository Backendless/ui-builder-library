export function toggleFullscreen(containerRef, fullscreen, mapRef) {
  if (fullscreen) {
    containerRef.current.classList.add('bl-customComponent-leafletMap-fullscreen');
  } else if (fullscreen === undefined) {
  } else {
    containerRef.current.classList.remove('bl-customComponent-leafletMap-fullscreen');
  }
  mapRef.current.invalidateSize();
}
