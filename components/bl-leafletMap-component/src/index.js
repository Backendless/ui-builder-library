import { useCallback, useEffect, useRef } from 'react';

import { initMap, makeMarkers, makeCircles, makePolygons, getGeolocation } from './utils/map';
import { useIcon } from './hooks/useIcon';
import { PositionSVG } from './svg/position';
import { IconOptions } from './icon-options';

export default function LeafletMap({ component, eventHandlers }) {
  const { markers, circles, polygons, classList, mapVisibility, display } = component;

  const mapRef = useRef(null);
  const geoMarker = useRef(null);
  const markerIcon = useIcon(IconOptions.marker);
  const positionIcon = useIcon(IconOptions.position);

  useEffect(() => {
    initMap(component, eventHandlers, mapRef);
  }, []);

  useEffect(() => {
    if (markers) {
      makeMarkers(markers, markerIcon, mapRef);
    }
  }, [markers]);

  useEffect(() => {
    if (circles) {
      makeCircles(circles, mapRef);
    }
  }, [circles]);

  useEffect(() => {
    if (polygons) {
      makePolygons(polygons, mapRef);
    }
  }, [polygons]);

  const handleClick = useCallback(() => {
    getGeolocation(mapRef, geoMarker, positionIcon);
  }, [mapRef]);

  if (!display || !mapVisibility) {
    return null;
  }

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
