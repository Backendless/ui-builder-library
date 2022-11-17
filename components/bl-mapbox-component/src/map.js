import { useEffect, useRef, useState } from 'react';

import mapboxgl from './lib/mapbox';
import MapboxDirections from './lib/mapbox-directions';
import MapboxGeocoder from './lib/mapbox-geocoder';
import { createActions } from './actions';
import { preparePolygons, applyFog } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function Map({ component, eventHandlers, settings }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [polygonsArray, setPolygonsArray] = useState([]);
  const [markersArray, setMarkersArray] = useState([]);

  const { accessToken } = settings;

  const { onMarkerClick, onPolygonClick, onDeterminingGeoposition } = eventHandlers;

  const { markers, polygons, center, fullScreen, navigation, searchBar, geolocation, classList } = component;

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    initMapboxLibrary(mapRef, mapContainerRef, component);
  }, []);

  useEffect(() => {
    if (mapRef.current && center) {

      mapRef.current.setCenter([center.lng, center.lat]);
    }
  }, [center]);

  useEffect(() => {
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

      createActions(mapRef, component);
    });
  }, []);

  useEffect(() => {
    useMarkers(markers, markersArray, setMarkersArray, mapRef, onMarkerClick);
  }, [markers]);

  useEffect(() => {
    usePolygons(polygons, polygonsArray, setPolygonsArray, mapRef, onPolygonClick);
  }, [polygons]);

  return (
    <div>
      <div ref={ mapContainerRef } className={ cn('bl-customComponent-mapbox', classList) }/>
    </div>
  );
}

const initMapboxLibrary = (mapRef, mapContainerRef, component) => {
  const START_POS = { lat: 0, lng: 0 };
  const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';
  const ZOOM = 10;
  const PROJECTION = 'mercator';
  const { mapStyle, center, zoom, projection, directions } = component;

  mapRef.current = new mapboxgl.Map({
    container : mapContainerRef.current,
    style     : mapStyle || MAP_STYLE,
    center    : center || START_POS,
    zoom      : zoom || ZOOM,
    projection: projection || PROJECTION,
  });

  if (directions) {
    mapRef.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      'top-left'
    );
  }
};

const useMarkers = (markers, markersArray, setMarkersArray, mapRef, onMarkerClick) => {
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
};

const usePolygons = (polygons, polygonsArray, setPolygonsArray, mapRef, onPolygonClick) => {
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
};

const useEvents = (mapRef, eventHandlers) => {
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

const useGeolocation = (mapRef, onDeterminingGeoposition) => {
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
