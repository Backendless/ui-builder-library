import Leaflet from '../../lib/leaflet/leaflet';

export function makeMarkers(markers, markerIcon, mapRef, eventHandlers) {
  if (markers) {
    const { onMarkerClick } = eventHandlers;

    markers.forEach(item => {
      Leaflet.marker([item.point.y, item.point.x], {
        icon: markerIcon,
      })
        .on('click', () => {
          onMarkerClick({
            coordinates: [item.point.y, item.point.x],
            description: item.description
          });
        })
        .addTo(mapRef.current)
        .bindPopup(item.description);
    });
  }
}
