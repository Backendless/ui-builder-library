export function createActions(mapRef, component) {
  const map = mapRef.current;

  component.isMoving = () => {
    if (map) {
      return map.isMoving();
    }
  };

  component.isZooming = () => {
    if (map) {
      return map.isZooming();
    }
  };

  component.isRotating = () => {
    if (map) {
      return map.isRotating();
    }
  };

  component.setStyle = (style, options) => {
    if (map) {
      map.setStyle(style, options);
    }
  };

  component.getStyle = () => {
    if (map) {
      return map.getStyle();
    }
  };

  component.setFog = (fog) => {
    if (map) {
      map.setFog(fog);
    }
  };

  component.getFog = () => {
    if (map) {
      return map.getFog();
    }
  };

  component.loaded = () => {
    if (map) {
      return map.loaded();
    }
  };

  component.getCenter = () => {
    if (map) {
      return map.getCenter();
    }
  };

  component.setCenter = (center, eventData) => {
    if (map) {
      map.setCenter(center, eventData);
    }
  };

  component.panBy = (offset, options, eventData) => {
    if (map) {
      map.panBy(offset, options, eventData);
    }
  };

  component.panTo = (lnglat, options, eventData) => {
    if (map) {
      map.panTo(lnglat, options, eventData);
    }
  };

  component.getZoom = () => {
    if (map) {
      return map.getZoom();
    }
  };

  component.setZoom = (zoom, eventData) => {
    if (map) {
      map.setZoom(zoom, eventData);
    }
  };

  component.flyTo = (options, eventData) => {
    if (map) {
      map.flyTo(options, eventData);
    }
  };
}
