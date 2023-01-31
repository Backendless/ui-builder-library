import { useEffect, useRef, useState } from 'react';

import mapboxgl from './lib/mapbox';
import { initMapboxLibrary, useMarkers, usePolygons } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function Map({ component, eventHandlers, settings }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [polygonsArray, setPolygonsArray] = useState([]);
  const [markersArray, setMarkersArray] = useState([]);

  const { accessToken } = settings;

  const { onMarkerClick, onPolygonClick } = eventHandlers;

  const { markers, polygons, center, classList } = component;

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    initMapboxLibrary(mapRef, mapContainerRef, component, eventHandlers);
  }, []);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setCenter([center.lng, center.lat]);
    }
  }, [center]);

  useMarkers(markers, markersArray, setMarkersArray, mapRef, onMarkerClick);

  usePolygons(polygons, polygonsArray, setPolygonsArray, mapRef, onPolygonClick);

  return (
    <div className={ cn('bl-customComponent-mapbox', classList) }>
      <div ref={ mapContainerRef } className={ 'map-dimensions' }/>
    </div>
  );
}
