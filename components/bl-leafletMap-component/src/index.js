import { useEffect, useRef } from 'react';

import {
  initMap,
  makeMarkers,
  makeCircles,
  makePolygons,
  changeMapType,
  setCenter,
  setZoom,
  toggleZoomControl,
  toggleDraggingControl,
  toggleFullscreen
} from './utils/map';
import { makeActions } from './utils/actions';
import { useIcon } from './hooks/useIcon';
import { IconOptions } from './icon-options';
import { Maps } from './maps';
import { MapTypeSelect } from './components/map-type-select';
import { GeopositionButton } from './components/geoposition-button';
import { FullscreenButton } from './components/fullscreen-button';

export default function LeafletMap({ component, eventHandlers }) {
  const {
    markers,
    circles,
    polygons,
    center,
    zoom,
    mapType,
    classList,
    mapVisibility,
    zoomControl,
    draggingControl,
    mapTypeControl,
    geopositionControl,
    display,
    fullscreen,
    fullscreenControl
  } = component;

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const currentLayer = useRef(null);
  const markerIcon = useIcon(IconOptions.marker);

  useEffect(() => {
    initMap(component, eventHandlers, mapRef, currentLayer);
    makeActions(component, mapRef, markers, circles, polygons);
  }, []);

  useEffect(() => {
    changeMapType(mapRef, currentLayer, component);
  }, [mapType]);

  useEffect(() => {
    makeMarkers(markers, markerIcon, mapRef, eventHandlers);
  }, [markers]);

  useEffect(() => {
    makeCircles(circles, mapRef, eventHandlers);
  }, [circles]);

  useEffect(() => {
    makePolygons(polygons, mapRef, eventHandlers);
  }, [polygons]);

  useEffect(() => {
    setCenter(mapRef, center);
  }, [center]);

  useEffect(() => {
    setZoom(mapRef, zoom);
  }, [zoom]);

  useEffect(() => {
    toggleZoomControl(mapRef, zoomControl);
  }, [zoomControl]);

  useEffect(() => {
    toggleDraggingControl(mapRef, draggingControl);
  }, [draggingControl]);

  useEffect(() => {
    toggleFullscreen(containerRef, fullscreen, mapRef);
  }, [fullscreen]);

  if (!display || !mapVisibility) {
    return null;
  }

  return (
    <div
      id="bl-customComponent-leafletMap"
      className={ 'bl-customComponent-leafletMap ' + classList.join(' ') }
      ref={ containerRef }>
      { geopositionControl && (
        <GeopositionButton
          mapRef={ mapRef }
          eventHandlers={ eventHandlers }/>
      ) }
      { mapTypeControl && (
        <MapTypeSelect
          maps={ Maps }
          selected={ mapType }
          eventHandlers={ eventHandlers }
        />
      ) }
      { fullscreenControl && (
        <FullscreenButton
          fullscreen={ fullscreen }
          eventHandlers={ eventHandlers }
        />
      ) }
    </div>
  );
}
