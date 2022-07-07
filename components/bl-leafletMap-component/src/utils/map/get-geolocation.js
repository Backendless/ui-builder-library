import Leaflet from '../../lib/leaflet/leaflet';

export function getGeolocation(mapRef, geoMarker, icon, eventHandlers) {
  const { onDeterminingGeoposition } = eventHandlers;

  navigator.geolocation.getCurrentPosition(
    pos => {
      const coords = [pos.coords.latitude, pos.coords.longitude];

      onDeterminingGeoposition({
        coordinates: coords
      });

      if (geoMarker.current) {
        mapRef.current.removeLayer(geoMarker.current);
      }

      mapRef.current.setView(coords, 14);

      geoMarker.current = Leaflet.marker(coords, {
        icon,
      })
        .addTo(mapRef.current);
    },
    (error) => {
      console.error(`Leaflet Map: ${ error.message }`);
    }
  );
}
