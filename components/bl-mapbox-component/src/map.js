import { useEffect, useMemo,useRef } from 'react';

import Mapbox from './lib/mapbox';
import { initMapboxLibrary, useMarkers, usePolygons, MapClass } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function MapboxComponent({ component, eventHandlers, settings }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const { accessToken } = settings;

  const { onMarkerClick, onPolygonClick } = eventHandlers;

  const { markers, polygons, center, classList } = component;

  const map = useMemo(() => new MapClass(mapRef), [mapRef]);

  useEffect(() => {
    Mapbox.accessToken = accessToken;

    initMapboxLibrary(mapRef, mapContainerRef, component, eventHandlers, map);
  }, []);


  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setCenter([center.lng, center.lat]);
    }
  }, [center]);

  useMarkers(markers, mapRef, onMarkerClick);

  usePolygons(polygons, mapRef, onPolygonClick, map);

  return (
    <div className={ cn('bl-customComponent-mapbox', classList) }>
      <div ref={ mapContainerRef } className="map-dimensions"/>
    </div>
  );
}
