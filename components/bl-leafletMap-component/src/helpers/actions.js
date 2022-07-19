import { toCoordinates } from './coordinates';

export function createActions(component, map) {
  const { markers, circles, polygons } = component;

  component.setMapCenter = (coords) => {
    const currentCoords = toCoordinates(coords);
    const currentZoom = map.getZoom();

    map.setView(currentCoords, currentZoom);
  };

  component.setMapZoom = (value) => {
    map.setZoom(value);
  };

  component.getMapZoom = () => {
    return map.getZoom();
  };

  component.getMapCenter = () => {
    return map.getCenter();
  };

  component.getMapMarkers = () => {
    return markers;
  };

  component.getMapCircles = () => {
    return circles;
  };

  component.getMapPolygons = () => {
    return polygons;
  };
}
