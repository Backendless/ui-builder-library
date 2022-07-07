export function toggleDraggingControl(mapRef, draggingControl) {
  if (draggingControl) {
    mapRef.current.dragging.enable();
  } else {
    mapRef.current.dragging.disable();
  }
}
