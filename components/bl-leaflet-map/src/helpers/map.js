import { useEffect, useRef } from 'react';

import Leaflet from '../lib/leaflet';
import { MapProviders } from '../maps';
import { toCoordinates } from './coordinates';

const DefaultValues = {
  ZOOM  : 10,
  CENTER: '40.6893, -74.0444',
  TYPE  : 'openStreet',
};

export function changeMapType(map, currentLayer, component) {
  const { mapType } = component;

  if (mapType !== undefined) {
    if (mapType in MapProviders) {
      map.current.removeLayer(currentLayer.current);

      currentLayer.current = Leaflet
        .tileLayer(MapProviders[mapType].mapUrl, MapProviders[mapType].options)
        .addTo(map.current);
    } else {
      console.error('Leaflet Map: not valid map type');
    }
  }
}

export function getGeolocation(map, geoMarker, icon, eventHandlers) {
  const { onDeterminingGeoposition } = eventHandlers;

  navigator.geolocation.getCurrentPosition(
    pos => {
      const coords = [pos.coords.latitude, pos.coords.longitude];

      onDeterminingGeoposition({ coordinates: coords });

      if (geoMarker.current) {
        map.removeLayer(geoMarker.current);
      }

      map.setView(coords, 14);

      geoMarker.current = Leaflet.marker(coords, { icon }).addTo(map);
    },
    (error) => {
      console.error(`Leaflet Map: ${ error.message }`);
    }
  );
}

export function initMap(component, eventHandlers, map, currentLayer, uid) {
  const { zoom, center, mapType, zoomControl } = component;
  const { onClick, onPan } = eventHandlers;

  const type = mapType || DefaultValues.TYPE;

  const centerPoint = toCoordinates(center || DefaultValues.CENTER);

  map.current = Leaflet.map(uid, {
    zoom             : zoom || DefaultValues.ZOOM,
    center           : centerPoint,
    fullscreenControl: true,
  });

  currentLayer.current = Leaflet
    .tileLayer(MapProviders[type].mapUrl, MapProviders[type].options)
    .addTo(map.current);

  if (!zoomControl) {
    removeZoomControl(map.current);
  }

  map.current.on('move', event => {
    const bounds = map.current.getBounds();

    onPan({
      center   : bounds.getCenter(),
      northEast: bounds.getNorthEast(),
      southWest: bounds.getSouthWest(),
    });
  });

  map.current.on('click', event => {
    onClick({ coordinates: [event.latlng.lat, event.latlng.lng] });
  });
}

export function createCircles(circles, map, eventHandlers) {
  if (circles) {
    const { onCircleClick } = eventHandlers;

    circles.forEach(item => {
      Leaflet.circle([item.point.lat, item.point.lng], { radius: item.radius })
        .on('click', () => {
          onCircleClick({
            coordinates: [item.point.lat, item.point.lng],
            radius     : item.radius,
            description: item.description,
          });
        })
        .addTo(map)
        .bindPopup(item.description);
    });
  }
}

function validateMarker(marker) {
  if (!marker.point) {
    console.error('Marker error!\n Marker should store "point" property with latlng object in\n', marker);

    return false;
  }

  const { point: { lat, lng }, description } = marker;

  if (description !== undefined && typeof description !== 'string') {
    console.error(`Marker Error!\n Expected description type string but received "${ description }" in\n`, marker);

    return false;
  }

  return [lat, lng].every(value => {
    const result = !isNaN(value);

    if (!result) {
      console.error(
        `Marker error!\n Expected point coordinates with number type but received "${ value }" in\n`,
        marker
      );
    }

    return result;
  });
}

export function useMarkers(markers, icon, map, eventHandlers) {
  const markersArray = useRef();

  useEffect(() => {
    clearOldMarkers(markersArray);

    if (map.current && markers) {
      const { onMarkerClick } = eventHandlers;

      markersArray.current = markers.map(marker => {
        if (validateMarker(marker)) {
          const { point: { lng, lat }, description } = marker;
          const processedMarker = Leaflet.marker([lat, lng], { icon })
            .on('click', () => onMarkerClick({ coordinates: [lat, lng], description }))
            .addTo(map.current);

          if (description) {
            processedMarker.bindPopup(description);
          }

          return processedMarker;
        }

        return null;
      });
    }
  }, [map.current, markers]);
}

function clearOldMarkers(markersArray) {
  if (markersArray.current) {
    markersArray.current.forEach(item => item?.remove());

    markersArray.current = [];
  }
}

export function createPolygons(polygons, map, eventHandlers) {
  if (polygons) {
    const { onPolygonClick } = eventHandlers;

    polygons.forEach(item => {
      const coordinates = item.polygon.boundary.points.map(point => [point.lat, point.lng]);

      Leaflet.polygon(coordinates)
        .on('click', () => {
          onPolygonClick({ coordinates, description: item.description });
        })
        .addTo(map)
        .bindPopup(item.description);
    });
  }
}

export function setCenter(map, center) {
  if (center) {
    const currentCoords = toCoordinates(center);
    const currentZoom = map.getZoom();

    map.setView(currentCoords, currentZoom);
  }
}

export function setZoom(map, zoom) {
  if (zoom && (20 > zoom > 0)) {
    map.setZoom(zoom);
  }
}

export function toggleDraggingControl(map, draggingControl) {
  if (draggingControl) {
    map.dragging.enable();
  } else {
    map.dragging.disable();
  }
}

export function toggleFullscreen(container, fullscreen, map) {
  if (fullscreen !== undefined) {
    container.classList.toggle('bl-customComponent-leafletMap-fullscreen', fullscreen);
  }
  map.invalidateSize();
}

export function toggleZoomControl(map, zoomControl) {
  if (zoomControl) {
    addZoomControl(map);
  } else {
    removeZoomControl(map);
  }
}

function addZoomControl(map) {
  map.addControl(map.zoomControl);
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();
  map.boxZoom.enable();
  map.keyboard.enable();
}

export function removeZoomControl(map) {
  map.removeControl(map.zoomControl);
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
}
