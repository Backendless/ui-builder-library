import Leaflet from '../lib/leaflet/leaflet';
import { Maps } from '../maps/index';

export function initMap(component, eventHandlers, mapRef) {
  const { zoom, center, mapType } = component;
  const { onClick } = eventHandlers;

  mapRef.current = Leaflet.map('bl-customComponent-leafletMap', {
    zoom,
    center: Array.isArray(center) ? center : center.split(',')
  });

  Leaflet.tileLayer(Maps[mapType].mapUrl, Maps[mapType].options)
    .addTo(mapRef.current);

  mapRef.current.on('click', event => {
    onClick({
      coordinates: [event.latlng.lat, event.latlng.lng]
    });
  });
}

export function makeMarkers(markers, markerIcon, mapRef) {
  markers.forEach(item => {
    Leaflet.marker([item.point.y, item.point.x], {
      icon: markerIcon,
    })
      .addTo(mapRef.current)
      .bindPopup(item.description);
  });
}

export function makeCircles(circles, mapRef) {
  circles.forEach(item => {
    Leaflet.circle([item.point.y, item.point.x], {
      radius: item.radius,
    })
      .addTo(mapRef.current)
      .bindPopup(item.description);
  });
}

export function makePolygons(polygons, mapRef) {
  polygons.forEach(item => {
    const coordinates = item.polygon.boundary.points.map(point => [point.y, point.x]);

    Leaflet.polygon(coordinates)
      .addTo(mapRef.current)
      .bindPopup(item.description);
  });
}

export function getGeolocation(mapRef, geoMarker, icon) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const coords = [pos.coords.latitude, pos.coords.longitude];

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
