export function createActions(mapRef, component) {
  const map = mapRef.current;

  Object.assign(component, {
    isMoving  : () => map?.isMoving(),
    isZooming : () => map?.isZooming(),
    isRotating: () => map?.isRotating(),
    setStyle  : (style, options) => map?.setStyle(style, options),
    getStyle  : () => map?.getStyle(),
    setFog    : (fog) => map?.setFog(fog),
    getFog    : () => map?.getFog(),
    loaded    : () => map?.loaded(),
    getCenter : () => map?.getCenter(),
    setCenter : (center, eventData) => map?.setCenter(center, eventData),
    panBy     : (offset, options, eventData) => map?.panBy(offset, options, eventData),
    panTo     : (lnglat, options, eventData) => map?.panTo(lnglat, options, eventData),
    getZoom   : () => map?.getZoom(),
    setZoom   : (zoom, eventData) => map?.setZoom(zoom, eventData),
    flyTo     : (options, eventData) => map?.flyTo(options, eventData)
  });
}
