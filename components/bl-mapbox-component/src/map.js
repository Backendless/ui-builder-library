import { useEffect, useRef, useState } from 'react';

import mapboxgl from './lib/mapbox';
import MapboxGeocoder from './lib/mapbox-geocoder';
import { createActions } from './actions';
import { applyFog, initMapboxLibrary, useEvents, useGeolocation, useMarkers, usePolygons } from './helpers';

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
    if (mapRef.current && center) {
      mapRef.current.setCenter([center.lng, center.lat]);
    }
  }, [center]);

  useMarkers(markers, markersArray, setMarkersArray, mapRef, onMarkerClick);

  usePolygons(polygons, polygonsArray, setPolygonsArray, mapRef, onPolygonClick);

  return (
    <div>
      <div ref={ mapContainerRef } className={ cn('bl-customComponent-mapbox', classList) }/>
    </div>
  );
}
