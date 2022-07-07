export function toggleZoomControl(mapRef, zoomControl) {
  if (zoomControl) {
    addZoomControl(mapRef);
  } else {
    removeZoomControl(mapRef);
  }
}

function addZoomControl(mapRef) {
  mapRef.current.addControl(mapRef.current.zoomControl);
  mapRef.current.touchZoom.enable();
  mapRef.current.doubleClickZoom.enable();
  mapRef.current.scrollWheelZoom.enable();
  mapRef.current.boxZoom.enable();
  mapRef.current.keyboard.enable();
}

export function removeZoomControl(mapRef) {
  mapRef.current.removeControl(mapRef.current.zoomControl);
  mapRef.current.touchZoom.disable();
  mapRef.current.doubleClickZoom.disable();
  mapRef.current.scrollWheelZoom.disable();
  mapRef.current.boxZoom.disable();
  mapRef.current.keyboard.disable();
}
