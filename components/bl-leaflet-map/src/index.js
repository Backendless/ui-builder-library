import { useEffect, useMemo, useRef } from 'react';

import { createActions } from './helpers/actions';
import {
  initMap,
  createCircles,
  createPolygons,
  changeMapType,
  setCenter,
  setZoom,
  toggleDraggingControl,
  toggleFullscreen,
  toggleZoomControl,
  useMarkers,
} from './helpers/map';
import { useIcon } from './helpers/use-icon';
import { FullscreenButton } from './fullscreen-button';
import { GeopositionButton } from './geoposition-button';
import { IconOptions } from './icons';
import { MapTypeSelect } from './map-type-select';

export default function LeafletMap({ component, eventHandlers }) {
  const {
    style,
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
  const uid = useMemo(() => BackendlessUI.UUID.short(), []);

  useEffect(() => {
    initMap(component, eventHandlers, mapRef, currentLayer, uid);
  }, []);

  useEffect(() => {
    createActions(component, mapRef.current);
  }, [markers, circles, polygons]);

  useEffect(() => {
    changeMapType(mapRef, currentLayer, component);
  }, [mapType]);

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

  useMarkers(markers, markerIcon, mapRef.current, eventHandlers);

  if (!display) {
    return null;
  }

  return (
    <div
      id={ uid }
      className={ 'bl-customComponent-leafletMap ' + classList.join(' ') }
      style={ style }
      ref={ containerRef }>
      { geopositionControl && <GeopositionButton map={ mapRef.current } eventHandlers={ eventHandlers }/> }
      { mapTypeControl && <MapTypeSelect selected={ mapType } eventHandlers={ eventHandlers } component={ component }/>}
      { fullscreenControl && <FullscreenButton component={ component } eventHandlers={ eventHandlers }/> }
    </div>
  );
}
