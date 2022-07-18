import { toCoordinates } from './coordinates';

export function createActions(component, map) {
  const { markers, circles, polygons } = component;

  component.mapCenteringAction = (coords) => {
    const currentCoords = toCoordinates(coords);
    const currentZoom = map.getZoom();

    map.setView(currentCoords, currentZoom);
  };

  component.zoomControlAction = (value) => {
    map.setZoom(value);
  };

  component.getMapZoomAction = () => {
    return map.getZoom();
  };

  component.getMapCenterAction = () => {
    return map.getCenter();
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
