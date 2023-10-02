import { useEffect, useRef, useState } from 'react';

import Mapbox from './lib/mapbox';
import MapboxDirections from './lib/mapbox-directions';
import MapboxGeocoder from './lib/mapbox-geocoder';
import { createActions } from './actions';

const { Map, FullscreenControl, NavigationControl, Marker, Popup, GeolocateControl } = Mapbox;

const defaultMapboxProps = {
  START_POS            : { lat: 40.730610, lng: -73.935242 },
  MAP_STYLE            : 'mapbox://styles/mapbox/streets-v11',
  ZOOM                 : 10,
  PROJECTION           : 'mercator',
  POLYGON_OUTLINE_WIDTH: 0,
  POLYGON_OUTLINE_COLOR: '#000000',
};

export class MapController {
  constructor(mapRef) {
    this.mapRef = mapRef;
  }

  onLoad(listener) {
    this.mapRef.current.on('load', listener);
  }

  onMove(listener) {
    this.mapRef.current.on('move', listener);
  }

  addLayer(layer) {
    this.mapRef.current.addLayer(layer);
  }

  onClick(layerId, listener) {
    const handlerPayload = layerId ? [layerId, listener] : [listener];

    this.mapRef.current.on('click', ...handlerPayload);
  }

  addSource(id, source) {
    this.mapRef.current.addSource(id, source);
  }

  setFog(fog) {
    this.mapRef.current.setFog(fog);
  }

  addControl(control, position) {
    this.mapRef.current.addControl(control, position);
  }

  addPolygonOutline(id, outlineColor, outlineWidth) {
    this.mapRef.current.addLayer({
      id    : `${ id }-outline`,
      type  : 'line',
      source: id,
      layout: {},
      paint : {
        'line-color': outlineColor,
        'line-width': outlineWidth,
      },
    });
  }

  removePolygon(polygon) {
    if (polygon.outlineWidth > 0) {
      this.mapRef.current.removeLayer(`${ polygon.id }-outline`);
    }
    this.mapRef.current.removeLayer(`${ polygon.id }-layer`);
    this.mapRef.current.removeSource(polygon.id);
  }
}

const verifyPolygon = polygon => {
  const firstPoint = JSON.stringify(polygon[0]);
  const lastPoint = JSON.stringify(polygon[polygon.length - 1]);
  const verifiedPolygon = [...polygon];

  if (firstPoint !== lastPoint) {
    verifiedPolygon.push(polygon[0]);
  }

  return verifiedPolygon.map(coordinate => [coordinate.lng, coordinate.lat]);
};

export const preparePolygons = polygons => {
  const { POLYGON_OUTLINE_WIDTH, POLYGON_OUTLINE_COLOR } = defaultMapboxProps;

  return polygons.map(polygon => ({
    id          : BackendlessUI.UUID.short(),
    color       : polygon.color,
    coordinates : verifyPolygon(polygon.polygon.boundary.points),
    name        : polygon.name,
    opacity     : polygon.opacity,
    description : polygon.description,
    outlineWidth: polygon.outlineWidth || POLYGON_OUTLINE_WIDTH,
    outlineColor: polygon.outlineColor || POLYGON_OUTLINE_COLOR,
  }));
};

export const applyFog = (mapRef, component, map) => {
  const LOWER_ATMOSPHERE = '#BAD2EB';
  const UPPER_ATMOSPHERE = '#245CDF';
  const ATMOSPHERE_THICKNESS = 0.2;
  const SPACE_COLOR = '#0B0B19';
  const STAR_INTENSITY = 0.2;
  const { lowerAtmosphere, upperAtmosphere, atmosphereThickness, spaceColor, starIntensity } = component;

  map.setFog({
    color           : lowerAtmosphere || LOWER_ATMOSPHERE,
    'high-color'    : upperAtmosphere || UPPER_ATMOSPHERE,
    'horizon-blend' : atmosphereThickness || ATMOSPHERE_THICKNESS,
    'space-color'   : spaceColor || SPACE_COLOR,
    'star-intensity': starIntensity || STAR_INTENSITY,
  });
};

const appendDirections = (accessToken, mapRef, mapContainerRef) => {
  const directions = new MapboxDirections({ accessToken });
  const div = document.createElement('div');

  div.classList.add('mapbox-directions');
  div.appendChild(directions.onAdd(mapRef.current));

  mapContainerRef.current.parentNode.insertAdjacentElement('beforeend', div);
};

export const initMapboxLibrary = (mapRef, mapContainerRef, component, eventHandlers, map) => {
  const { START_POS, MAP_STYLE, ZOOM, PROJECTION } = defaultMapboxProps;
  const { mapStyle, center, zoom, projection, directions, fullScreen, navigation, searchBar, geolocation } = component;
  const { onDeterminingGeoposition } = eventHandlers;
  const { accessToken } = Mapbox;
  mapRef.current = new Map({
    container : mapContainerRef.current,
    style     : mapStyle || MAP_STYLE,
    center    : center || START_POS,
    zoom      : zoom || ZOOM,
    projection: projection || PROJECTION,
  });

  createActions(mapRef, component);

  if (directions) {
    appendDirections(accessToken, mapRef, mapContainerRef);
  }

  map.onLoad(() => {
    applyFog(mapRef, component, map);

    useEvents(mapRef, eventHandlers, map);

    if (searchBar) {
      map.addControl(new MapboxGeocoder({ accessToken, mapboxgl: Mapbox }));
    }

    if (fullScreen) {
      map.addControl(new FullscreenControl());
    }

    if (navigation) {
      map.addControl(new NavigationControl());
    }

    if (geolocation) {
      useGeolocation(mapRef, onDeterminingGeoposition, map);
    }
  });

};

export const useMarkers = (markers, mapRef, eventHandlers) => {
  const { onMarkerClick, onMarkersCreated } = eventHandlers;
  const markerElements = useRef();

  useEffect(() => {
    const collectedMarkerData = [];

    removeMarkers(markerElements.current);

    if (markers?.length) {
      markerElements.current = markers.map(markerItem => {
        const { color, description, data, coordinates: { lat, lng } } = markerItem;

        const marker = new Marker({ color })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);

        const popup = new Popup();

        popup.on('open', () => {
          const coordinates = { lat, lng };

          onMarkerClick({ coordinates, description: description || '', data });

          setMarkerActive(marker, true);
        });

        if (description) {
          popup.setText(description, false);
        }

        popup.on('close', () => {
          setMarkerActive(marker, false);
        });

        marker.setPopup(popup);

        collectedMarkerData.push({
          marker,
          markerProps: markerItem,
        })

        return marker;
      });
    }

    onMarkersCreated({markers: collectedMarkerData});
  }, [markers]);
};

const removeMarkers = markers => {
  if (markers?.length) {
    markers.forEach(marker => {
      marker.remove();
    });
  }
};

export const setMarkerActive = (marker, status) => {
  const element = marker?.getElement();

  if (element) {
    element.classList.toggle('marker-root--active', status);
  }
};


const updatePolygonsArray = (polygons, mapRef, polygonsArray, setPolygonsArray, map) => {
  polygonsArray.forEach(polygon => {
    if (mapRef.current.getSource(polygon.id)) {
      map.removePolygon(polygon);
    }
  });

  setPolygonsArray(preparePolygons(polygons));
};

const createPopup = (polygon, mapRef, onPolygonClick, map) => {
  const { description, id } = polygon;

  if (description) {
    map.onClick(`${ id }-layer`, e => {
      new Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(mapRef.current);

      const coordinates = { ...e.lngLat };

      onPolygonClick({ coordinates, description });
    });
  } else {
    map.onClick(`${ polygon.id }-layer`, e => {
      const coordinates = { ...e.lngLat };

      onPolygonClick({ coordinates, description: '' });
    });
  }
};

const addPolygons = (mapRef, polygonsArray, onPolygonClick, map) => {
  polygonsArray.forEach(polygon => {
    const { id, coordinates, color, opacity, outlineWidth, outlineColor } = polygon;

    map.addSource(id, {
      type: 'geojson',
      data: {
        type    : 'Feature',
        geometry: {
          type       : 'Polygon',
          coordinates: [coordinates],
        },
      },
    });

    map.addLayer({
      id    : `${ id }-layer`,
      type  : 'fill',
      source: id,
      layout: {},
      paint : {
        'fill-color'  : color,
        'fill-opacity': opacity,
      },
    });

    if (outlineWidth > 0) {
      map.addPolygonOutline(id, outlineColor, outlineWidth);
    }

    createPopup(polygon, mapRef, onPolygonClick, map);
  });
};

export const usePolygons = (polygons, mapRef, onPolygonClick, map, isMapLoaded) => {
  const [polygonsArray, setPolygonsArray] = useState([]);

  useEffect(() => {
    if (polygons?.length && isMapLoaded) {
      updatePolygonsArray(polygons, mapRef, polygonsArray, setPolygonsArray, map);
    }
  }, [polygons, isMapLoaded]);

  useEffect(() => {
    addPolygons(mapRef, polygonsArray, onPolygonClick, map);
  }, [polygonsArray]);
};

export const useEvents = (mapRef, eventHandlers, map) => {
  const { onClick, onPan } = eventHandlers;

  map.onClick(undefined, e => {
    const coordinates = { lat: e.lngLat.lat, lng: e.lngLat.lng };

    onClick({ coordinates: coordinates });
  });

  map.onMove(() => {
    const center = mapRef.current.getCenter();
    const southWest = mapRef.current.getBounds().getSouthWest();
    const northEast = mapRef.current.getBounds().getNorthEast();

    onPan({ center: center, southWest: southWest, northEast: northEast });
  });
};

export const useGeolocation = (mapRef, onDeterminingGeoposition, map) => {
  const geolocate = new GeolocateControl({
    positionOptions  : {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading  : true,
  });

  map.addControl(geolocate);

  geolocate.on('trackuserlocationstart', () => {
    navigator.geolocation.getCurrentPosition(function success(pos) {
      const coordinates = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      onDeterminingGeoposition({ coordinates: coordinates });
    });
  });
};
