import Leaflet from '../../lib/leaflet/leaflet';

export function makeCircles(circles, mapRef, eventHandlers) {
  if (circles) {
    const { onCircleClick } = eventHandlers;

    circles.forEach(item => {
      Leaflet.circle([item.point.y, item.point.x], {
        radius: item.radius,
      })
        .on('click', () => {
          onCircleClick({
            coordinates: [item.point.y, item.point.x],
            radius     : item.radius,
            description: item.description
          });
        })
        .addTo(mapRef.current)
        .bindPopup(item.description);
    });
  }
}
