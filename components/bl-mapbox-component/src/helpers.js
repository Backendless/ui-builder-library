import { useEffect } from 'react';

import mapboxgl from './lib/mapbox';
import MapboxDirections from './lib/mapbox-directions';
import { createActions } from './actions';

export const preparePolygons = polygons => {
  return polygons.map(polygon => ({
    id         : BackendlessUI.UUID.short(),
    color      : polygon.color,
    coordinates: polygon.polygon.boundary.points.map(coordinate => [coordinate.lng, coordinate.lat]),
    name       : polygon.name,
    opacity    : polygon.opacity,
    description: polygon.description,
  }));
};

export const applyFog = (mapRef, component) => {
  const LOWER_ATMOSPHERE = '#BAD2EB';
  const UPPER_ATMOSPHERE = '#245CDF';
  const ATMOSPHERE_THICKNESS = 0.2;
  const SPACE_COLOR = '#0B0B19';
  const STAR_INTENSITY = 0.2;
  const { lowerAtmosphere, upperAtmosphere, atmosphereThickness, spaceColor, starIntensity } = component;

  mapRef.current.setFog({
    color           : lowerAtmosphere || LOWER_ATMOSPHERE,
    'high-color'    : upperAtmosphere || UPPER_ATMOSPHERE,
    'horizon-blend' : atmosphereThickness || ATMOSPHERE_THICKNESS,
    'space-color'   : spaceColor || SPACE_COLOR,
    'star-intensity': starIntensity || STAR_INTENSITY,
  });
};

export const initMapboxLibrary = (mapRef, mapContainerRef, component, eventHandlers) => {
  const START_POS = { lat: 0, lng: 0 };
  const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';
  const ZOOM = 10;
  const PROJECTION = 'mercator';
  const { mapStyle, center, zoom, projection, directions, fullScreen, navigation, searchBar, geolocation } = component;
  const { onDeterminingGeoposition } = eventHandlers;

  mapRef.current = new mapboxgl.Map({
    container : mapContainerRef.current,
    style     : mapStyle || MAP_STYLE,
    center    : center || START_POS,
    zoom      : zoom || ZOOM,
    projection: projection || PROJECTION,
  });

  createActions(mapRef, component);

  if (directions) {
    mapRef.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      'top-left'
    );
  }

  mapRef.current.on('load', () => {
    applyFog(mapRef, component);

    useEvents(mapRef, eventHandlers);

    if (searchBar) {
      mapRef.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl   : mapboxgl,
        })
      );
    }

    if (fullScreen) {
      mapRef.current.addControl(new mapboxgl.FullscreenControl());
    }

    if (navigation) {
      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }

    if (geolocation) {
      useGeolocation(mapRef, onDeterminingGeoposition);
    }
  });
};

export const useMarkers = (markers, markersArray, setMarkersArray, mapRef, onMarkerClick) => {
  useEffect(() => {
    if (markers?.length) {
      markersArray.forEach(marker => {
        marker.remove();
      });

      setMarkersArray([]);

      markers.forEach(markerItem => {
        const marker = new mapboxgl.Marker({ color: markerItem.color })
          .setLngLat([markerItem.coordinates.lng, markerItem.coordinates.lat])
          .addTo(mapRef.current);

        const popup = new mapboxgl.Popup();

        popup.on('open', () => {
          const coordinates = { lat: markerItem.coordinates.lat, lng: markerItem.coordinates.lng };

          onMarkerClick({ coordinates: coordinates, description: markerItem.description || '' });
        });

        if (markerItem.description) {
          popup.setText(markerItem.description);
        }

        setMarkersArray(prev => [...prev, marker]);

        marker.setPopup(popup);
      });
    }
  }, [markers]);
};

export const usePolygons = (polygons, polygonsArray, setPolygonsArray, mapRef, onPolygonClick) => {
  useEffect(() => {
    if (polygons?.length && mapRef.current) {
      mapRef.current.on('load', () => {
        polygonsArray.forEach(polygon => {
          if (mapRef.current.getSource(polygon)) {
            mapRef.current.removeLayer(`${ polygon.id }-layer`);
            mapRef.current.removeSource(polygon.id);
          }
        });
      });

      setPolygonsArray(preparePolygons(polygons));

      polygonsArray.forEach(polygon => {
        mapRef.current.addSource(polygon.id, {
          'type': 'geojson',
          'data': {
            'type'    : 'Feature',
            'geometry': {
              'type'       : 'Polygon',
              'coordinates': [[...polygon.coordinates]],
            },
          },
        });

        mapRef.current.addLayer({
          'id'    : `${ polygon.id }-layer`,
          'type'  : 'fill',
          'source': polygon.id,
          'layout': {},
          'paint' : {
            'fill-color'  : polygon.color,
            'fill-opacity': polygon.opacity,
          },
        });

        if (polygon.description) {
          mapRef.current.on('click', `${ polygon.id }-layer`, e => {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(polygon.description)
              .addTo(mapRef.current);

            const coordinates = { lat: e.lngLat.lat, lng: e.lngLat.lng };

            onPolygonClick({ coordinates: coordinates, description: polygon.description });
          });
        } else {
          mapRef.current.on('click', `${ polygon.id }-layer`, e => {
            const coordinates = { lat: e.lngLat.lat, lng: e.lngLat.lng };

            onPolygonClick({ coordinates: coordinates, description: '' });
          });
        }
      });
    }
  }, [polygons]);
};

export const useEvents = (mapRef, eventHandlers) => {
  const { onClick, onPan } = eventHandlers;

  mapRef.current.on('click', e => {
    const coordinates = { lat: e.lngLat.lat, lng: e.lngLat.lng };

    onClick({ coordinates: coordinates });
  });

  mapRef.current.on('move', () => {
    const center = mapRef.current.getCenter();
    const southWest = mapRef.current.getBounds().getSouthWest();
    const northEast = mapRef.current.getBounds().getNorthEast();

    onPan({ center: center, southWest: southWest, northEast: northEast });
  });
};

export const useGeolocation = (mapRef, onDeterminingGeoposition) => {
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions  : {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading  : true,
  });

  mapRef.current.addControl(geolocate);

  geolocate.on('trackuserlocationstart', () => {
    navigator.geolocation.getCurrentPosition(function success(pos) {
      const coordinates = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      onDeterminingGeoposition({ coordinates: coordinates });
    });
  });
};
