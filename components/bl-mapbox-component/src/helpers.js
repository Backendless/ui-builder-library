import { useEffect, useState } from 'react';

import mapboxgl from './lib/mapbox';
import MapboxDirections from './lib/mapbox-directions';
import MapboxGeocoder from './lib/mapbox-geocoder';
import { createActions } from './actions';

export class Map {
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

export const initMapboxLibrary = (mapRef, mapContainerRef, component, eventHandlers, map) => {
  const START_POS = { lat: 0, lng: 0 };
  const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';
  const ZOOM = 10;
  const PROJECTION = 'mercator';
  const { mapStyle, center, zoom, projection, directions, fullScreen, navigation, searchBar, geolocation } = component;
  const { onDeterminingGeoposition } = eventHandlers;

  mapRef.current = new mapboxgl.Map({
    container : mapContainerRef.current,
    style     : mapStyle || MAP_STYLE,
    center    : center || START_POS,
    zoom      : zoom || ZOOM,
    projection: projection || PROJECTION,
  });

  createActions(mapRef, component);

  if (directions) {
    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      'top-left'
    );
  }

  map.onLoad(() => {
    applyFog(mapRef, component, map);

    useEvents(mapRef, eventHandlers, map);

    if (searchBar) {
      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl   : mapboxgl,
        })
      );
    }

    if (fullScreen) {
      map.addControl(new mapboxgl.FullscreenControl());
    }

    if (navigation) {
      map.addControl(new mapboxgl.NavigationControl());
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

        const marker = new mapboxgl.Marker({ color })
          .setLngLat([markerItem.coordinates.lng, markerItem.coordinates.lat])
          .addTo(mapRef.current);

        const popup = new mapboxgl.Popup();

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

const updatePolygonsArray = (polygons, mapRef, polygonsArray, setPolygonsArray, map) => {
  map.onLoad(() => {
    polygonsArray.forEach(polygon => {
      if (mapRef.current.getSource(polygon)) {
        map.removeLayer(`${ polygon.id }-layer`);
        map.removeSource(polygon.id);
      }
    });
  });

  setPolygonsArray(preparePolygons(polygons));
};

const createPopup = (polygon, mapRef, onPolygonClick, map) => {
  const { description, id } = polygon;

  if (description) {
    map.onClick(`${ id }-layer`, e => {
      new mapboxgl.Popup()
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
  map.onLoad(() => {
    polygonsArray.forEach(polygon => {
      const { id, coordinates, color, opacity } = polygon;

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

      createPopup(polygon, mapRef, onPolygonClick, map);
    });
  });
};

export const usePolygons = (polygons, mapRef, onPolygonClick, map) => {
  const [polygonsArray, setPolygonsArray] = useState([]);

  useEffect(() => {
    if (polygons?.length && mapRef.current) {
      updatePolygonsArray(polygons, mapRef, polygonsArray, setPolygonsArray, map);
    }
  }, [polygons]);

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
  const geolocate = new mapboxgl.GeolocateControl({
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
