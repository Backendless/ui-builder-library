import { useEffect, useRef, useMemo } from 'react';

import {
  initMap,
  createMarkers,
  createCircles,
  createPolygons,
  changeMapType,
  setCenter,
  setZoom,
  toggleZoomControl,
  toggleDraggingControl,
  toggleFullscreen
} from './helpers/map';
import { createActions } from './helpers/actions';
import { useIcon } from './helpers/use-icon';
import { IconOptions } from './icons';
import { MapTypeSelect } from './map-type-select';
import { GeopositionButton } from './geoposition-button';
import { FullscreenButton } from './fullscreen-button';

export default function LeafletMap({ component, eventHandlers }) {
  const {
    markers,
    circles,
    polygons,
    center,
    zoom,
    mapType,
    classList,
    zoomControl,
    draggingControl,
    mapTypeControl,
    geopositionControl,
    display,
    fullscreen,
    fullscreenControl,
  } = component;

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const currentLayer = useRef(null);
  const markerIcon = useIcon(IconOptions.marker);
  const uid = useMemo(() => `uid_Backendless.UUID.short()`,[])

  useEffect(() => {
    initMap(component, eventHandlers, mapRef, currentLayer, uid);
    createActions(component, mapRef.current);
  }, []);

  useEffect(() => {
    changeMapType(mapRef, currentLayer, component);
  }, [mapType]);

  useEffect(() => {
    createMarkers(markers, markerIcon, mapRef.current, eventHandlers);
  }, [markers]);

  useEffect(() => {
    createCircles(circles, mapRef.current, eventHandlers);
  }, [circles]);

  useEffect(() => {
    createPolygons(polygons, mapRef.current, eventHandlers);
  }, [polygons]);

  useEffect(() => {
    setCenter(mapRef.current, center);
  }, [center]);

  useEffect(() => {
    setZoom(mapRef.current, zoom);
  }, [zoom]);

  useEffect(() => {
    toggleZoomControl(mapRef.current, zoomControl);
  }, [zoomControl]);

  useEffect(() => {
    toggleDraggingControl(mapRef.current, draggingControl);
  }, [draggingControl]);

  useEffect(() => {
    toggleFullscreen(containerRef.current, fullscreen, mapRef.current);
  }, [fullscreen]);

  if (!display) {
    return null;
  }

  return (
    <div
      id={ uid }
      className={ 'bl-customComponent-leafletMap ' + classList.join(' ') }
      ref={ containerRef }>
      { geopositionControl && <GeopositionButton map={ mapRef.current } eventHandlers={ eventHandlers }/> }
      { mapTypeControl && <MapTypeSelect selected={ mapType } eventHandlers={ eventHandlers }/> }
      { fullscreenControl && <FullscreenButton component={ component } eventHandlers={ eventHandlers }/> }
    </div>
  );
}
