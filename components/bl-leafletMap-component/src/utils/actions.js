import { toCoordinates } from './coordinates';

export function makeActions(component, mapRef, markers, circles, polygons) {
  component.mapCenteringAction = (coords) => {
    const currentCoords = toCoordinates(coords);
    const currentZoom = mapRef.current.getZoom();

    mapRef.current.setView(currentCoords, currentZoom);
  };

  component.zoomControlAction = (value) => {
    mapRef.current.setZoom(value);
  };

  component.getMapZoomAction = () => {
    return mapRef.current.getZoom();
  };

  component.getMapCenterAction = () => {
    return mapRef.current.getCenter();
  };

  component.getAllMarkers = () => {
    return markers;
  };

  component.getAllCircles = () => {
    return circles;
  };

  component.getAllPolygons = () => {
    return polygons;
  };
}
