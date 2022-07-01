import { useCallback, useEffect, useRef } from 'react';

import { useIcon } from './hooks/useIcon';
import Leaflet from './lib/leaflet/leaflet';
import { PositionSVG } from './svg/position';
import { IconOptions } from './icon-options';
import { Maps } from './maps';

export default function LeafletMap({ component }) {
  const { center, defaultZoom, markers, circles, polygons, mapType, classList } = component;

  const mapRef = useRef(null);
  const geoMarker = useRef(null);
  const markerIcon = useIcon(IconOptions.marker);
  const positionIcon = useIcon(IconOptions.position);

  useEffect(() => {
    mapRef.current = Leaflet.map('bl-customComponent-leafletMap', {
      zoom  : defaultZoom,
      center: center.split(','),
    });
    Leaflet.tileLayer(Maps[mapType].mapUrl, Maps[mapType].options)
      .addTo(mapRef.current);
  }, []);

  useEffect(() => {
    if (markers) {
      markers.forEach(item => {
        Leaflet.marker([item.point.y, item.point.x], {
          icon: markerIcon,
        })
          .addTo(mapRef.current)
          .bindPopup(item.description);
      });
    }
  }, [markers]);

  useEffect(() => {
    if (circles) {
      circles.forEach(item => {
        Leaflet.circle([item.point.y, item.point.x], {
          radius: item.radius,
        })
          .addTo(mapRef.current)
          .bindPopup(item.description);
      });
    }
  }, [circles]);
  useEffect(() => {
    if (polygons) {
      polygons.forEach(item => {
        const coordinates = item.polygon.boundary.points.map(point => [point.y, point.x]);
        Leaflet.polygon(coordinates)
          .addTo(mapRef.current)
          .bindPopup(item.description);
      });
    }
  }, [polygons]);

  const handleClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        if (geoMarker.current) {
          mapRef.current.removeLayer(geoMarker.current);
        }
        mapRef.current.setView(coords, 14);
        geoMarker.current = Leaflet.marker(coords, {
          icon: positionIcon,
        })
          .addTo(mapRef.current);
      },
      () => {
        alert('Location permission required');
      }
    );
  }, [mapRef]);

  return (
    <div
      id="bl-customComponent-leafletMap"
      className={ 'bl-customComponent-leafletMap ' + classList.join(' ') }>
      <button className="button" onClick={ handleClick }>
        <PositionSVG/>
      </button>
    </div>
  );
}
