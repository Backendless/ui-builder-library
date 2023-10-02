import { useEffect, useMemo, useRef, useState } from 'react';

import Mapbox from './lib/mapbox';
import { initMapboxLibrary, MapController, useMarkers, usePolygons } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function MapboxComponent({ component, eventHandlers, settings }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const { accessToken } = settings;

  const { onPolygonClick } = eventHandlers;

  const { markers, polygons, center, classList } = component;

  const map = useMemo(() => new MapController(mapRef), [mapRef]);

  useEffect(() => {
    Mapbox.accessToken = accessToken;

    initMapboxLibrary(mapRef, mapContainerRef, component, eventHandlers, map);

    map.onLoad(() => setIsMapLoaded(true));
  }, []);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setCenter([center.lng, center.lat]);
    }
  }, [center]);

  useMarkers(markers, mapRef, eventHandlers);

  usePolygons(polygons, mapRef, onPolygonClick, map, isMapLoaded);

  return (
    <div className={ cn('bl-customComponent-mapbox', classList) }>
      <div ref={ mapContainerRef } className="map-dimensions"/>
    </div>
  );
}
