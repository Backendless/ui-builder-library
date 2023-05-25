import { useEffect, useState } from 'react';

import Mapbox from './lib/mapbox';
import MapboxDirections from './lib/mapbox-directions';
import MapboxGeocoder from './lib/mapbox-geocoder';
import { createActions } from './actions';

const { Map, FullscreenControl, NavigationControl, Marker, Popup, GeolocateControl } = Mapbox;

const defaultMapboxProps = {
  START_POS : { lat: 0, lng: 0 },
  MAP_STYLE : 'mapbox://styles/mapbox/streets-v11',
  ZOOM      : 10,
  PROJECTION: 'mercator',
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

  removeLayer(id) {
    this.mapRef.current.removeLayer(id);
  }

  removeSource(id) {
    this.mapRef.current.removeSource(id);
  }
}

export const preparePolygons = polygons => {
  return polygons.map(polygon => ({
    id         : BackendlessUI.UUID.short(),
    color      : polygon.color,
    coordinates: polygon.polygon.boundary.points.map(coordinate => [coordinate.lng, coordinate.lat]),
    name       : polygon.name,
    opacity    : polygon.opacity,
    description: polygon.description,
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

const appendDirectionsOnMobile = (directions, mapRef, mapContainerRef) => {
  const div = document.createElement('div');

  div.style.margin = '0 auto';
  div.appendChild(directions.onAdd(mapRef.current));

  mapContainerRef.current.parentNode.insertAdjacentElement('afterend', div);
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
    const directions = new MapboxDirections({ accessToken });
    const isFit = mapRef.current.transform.width > 570;

    if (isFit) {
      map.addControl(directions, 'top-left');
    } else {
      appendDirectionsOnMobile(directions, mapRef, mapContainerRef);
    }
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

export const useMarkers = (markers, mapRef, onMarkerClick) => {
  const [markersArray, setMarkersArray] = useState([]);

  useEffect(() => {
    if (markers?.length) {
      markersArray.forEach(marker => {
        marker.remove();
      });

      setMarkersArray([]);

      markers.forEach(markerItem => {
        const { color, description } = markerItem;

        const marker = new Marker({ color })
          .setLngLat([markerItem.coordinates.lng, markerItem.coordinates.lat])
          .addTo(mapRef.current);

        const popup = new Popup();

        popup.on('open', () => {
          const coordinates = { lat: markerItem.coordinates.lat, lng: markerItem.coordinates.lng };

          onMarkerClick({ coordinates, description: description || '' });
        });

        if (description) {
          popup.setText(description);
        }

        setMarkersArray(prev => [...prev, marker]);

        marker.setPopup(popup);
      });
    }
  }, [markers]);
};

const updatePolygonsArray = (polygons, mapRef, polygonsArray, polygonOutline, setPolygonsArray, map) => {
  polygonsArray.forEach(polygon => {
    if (mapRef.current.getSource(polygon.id)) {
      if (polygonOutline) {
        map.removeLayer(`${ polygon.id }-outline`);
      }
      map.removeLayer(`${ polygon.id }-layer`);
      map.removeSource(polygon.id);
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

const addPolygons = (mapRef, polygonsArray, onPolygonClick, map, polygonOutline, polygonOutlineColor,
                     polygonOutlineWidth) => {
  polygonsArray.forEach(polygon => {
    const { id, coordinates, color, opacity } = polygon;
    const verifiedCoordinates = [...coordinates];

    if (coordinates[0][0] !== coordinates[coordinates.length - 1][0]
      && coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
      verifiedCoordinates.push(coordinates[0]);
    }

    map.addSource(id, {
      type: 'geojson',
      data: {
        type    : 'Feature',
        geometry: {
          type       : 'Polygon',
          coordinates: [verifiedCoordinates],
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

    if (polygonOutline) {
      map.addLayer({
        id    : `${ id }-outline`,
        type  : 'line',
        source: id,
        layout: {},
        paint : {
          'line-color': polygonOutlineColor,
          'line-width': polygonOutlineWidth
        }
      });
    }

    createPopup(polygon, mapRef, onPolygonClick, map);
  });
};

export const usePolygons = (polygons, polygonOutline, polygonOutlineColor, polygonOutlineWidth, mapRef, onPolygonClick,
                            map, isMapLoaded) => {
  const [polygonsArray, setPolygonsArray] = useState([]);

  useEffect(() => {
    if (polygons?.length && isMapLoaded) {
      updatePolygonsArray(polygons, mapRef, polygonsArray, polygonOutline, setPolygonsArray, map);
    }
  }, [polygons, isMapLoaded]);

  useEffect(() => {
    addPolygons(mapRef, polygonsArray, onPolygonClick, map, polygonOutline, polygonOutlineColor, polygonOutlineWidth);
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
