import Leaflet from '../../lib/leaflet/leaflet';

export function makePolygons(polygons, mapRef, eventHandlers) {
  if (polygons) {
    const { onPolygonClick } = eventHandlers;

    polygons.forEach(item => {
      const coordinates = item.polygon.boundary.points.map(point => [point.y, point.x]);

      Leaflet.polygon(coordinates)
        .on('click', () => {
          onPolygonClick({
            coordinates,
            description: item.description
          });
        })
        .addTo(mapRef.current)
        .bindPopup(item.description);
    });
  }
}
