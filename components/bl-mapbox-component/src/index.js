import { useEffect, useRef, useState } from 'react';

import mapboxgl from './lib/mapbox';
import MapboxDirections from './lib/mapbox-directions';
import MapboxGeocoder from './lib/mapbox-geocoder';
import { createActions } from './actions';

const { cn } = BackendlessUI.CSSUtils;

const defaultValues = {
  START_POS           : { lat: 0, lng: 0 },
  MAP_STYLE           : 'mapbox://styles/mapbox/streets-v11',
  ZOOM                : 10,
  PROJECTION          : 'mercator',
  LOWER_ATMOSPHERE    : '#BAD2EB',
  UPPER_ATMOSPHERE    : '#245CDF',
  ATMOSPHERE_THICKNESS: 0.2,
  SPACE_COLOR         : '#0B0B19',
  STAR_INTENSITY      : 0.2,
};

export default function Mapbox({ component, eventHandlers }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [polygonsObject, setPolygonsObject] = useState([]);

  const { onClick, onMarkerClick, onPolygonClick, onDeterminingGeoposition, onPan } = eventHandlers;

  const {
    markers, polygons, center, zoom, fullScreen, accessToken, projection, lowerAtmosphere, upperAtmosphere,
    atmosphereThickness, spaceColor, starIntensity, mapStyle, navigation, searchBar, geolocation, directions,
    display, classList,
  } = component;

  if (!display) {
    return null;
  }

  useEffect(() => {
    if (polygons) {
      if (polygons.length) {
        mapRef.current.on('load', () => {
          polygonsObject.forEach(polygon => {
            if (mapRef.current.getSource(polygon)) {
              mapRef.current.removeLayer(`${ polygon.id }-layer`);
              mapRef.current.removeSource(polygon.id);
            }
          });
        });

        setPolygonsObject(polygons.map(polygon => ({
          id         : BackendlessUI.UUID.short(),
          color      : polygon.color,
          coordinates: polygon.polygon.boundary.points.map(coordinate => [coordinate.lng, coordinate.lat]),
          name       : polygon.name,
          opacity    : polygon.opacity,
          description: polygon.description,
        })));
      }
    }
  }, [polygons]);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    if (mapRef.current) return; // initialize map only once
    mapRef.current = new mapboxgl.Map({
      container : mapContainerRef.current,
      style     : mapStyle || defaultValues.MAP_STYLE,
      center    : defaultValues.START_POS,
      zoom      : zoom || defaultValues.ZOOM,
      projection: projection || defaultValues.PROJECTION,
    });

    if (directions) {
      mapRef.current.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        }),
        'top-left'
      );
    }
  });

  useEffect(() => {
    if (mapRef.current && center) {

      mapRef.current.setCenter([center.lng, center.lat]);
    }
  }, [center]);

  useEffect(() => {
    mapRef.current.on('load', () => {
      mapRef.current.setFog({
        color           : lowerAtmosphere || defaultValues.LOWER_ATMOSPHERE,
        'high-color'    : upperAtmosphere || defaultValues.UPPER_ATMOSPHERE,
        'horizon-blend' : atmosphereThickness || defaultValues.ATMOSPHERE_THICKNESS,
        'space-color'   : spaceColor || defaultValues.SPACE_COLOR,
        'star-intensity': starIntensity || defaultValues.STAR_INTENSITY,
      });

      mapRef.current.on('click', e => {
        const coordinates = { lat: e.lngLat.lat, lng: e.lngLat.lng };
        onClick({ coordinates: coordinates });
      });

      mapRef.current.on('move', () => {
        const center = mapRef.current.getCenter();
        const southWest = mapRef.current.getBounds().getSouthWest();
        const northEast = mapRef.current.getBounds().getNorthEast();
        onPan({ center: center, southWest: southWest, northEast: northEast });
      });

      if (searchBar) {
        mapRef.current.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl   : mapboxgl,
          })
        );
      }

      if (fullScreen) {
        mapRef.current.addControl(new mapboxgl.FullscreenControl());
      }

      if (navigation) {
        mapRef.current.addControl(new mapboxgl.NavigationControl());
      }

      if (geolocation) {
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions  : {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading  : true,
        });
        mapRef.current.addControl(geolocate);
        geolocate.on('trackuserlocationstart', () => {
          navigator.geolocation.getCurrentPosition(function success(pos) {
            const coordinates = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            onDeterminingGeoposition({ coordinates: coordinates });
          });
        });
      }

      createActions(mapRef, component);
    });
  }, []);

  useEffect(() => {
    if (markers) {
      if (markers.length) {
        markers.forEach(markerItem => {
          const marker = new mapboxgl.Marker({ color: markerItem.color })
            .setLngLat([markerItem.coordinates.lng, markerItem.coordinates.lat])
            .addTo(mapRef.current);

          if (markerItem.description) {
            const popup = new mapboxgl.Popup()
              .setText(markerItem.description);

            marker.setPopup(popup);
          }

          marker.getElement().addEventListener('click', () => {
            const coordinates = { lat: markerItem.coordinates.lat, lng: markerItem.coordinates.lng };

            onMarkerClick({ coordinates: coordinates, description: markerItem.description });
          });
        });
      }
    }
  }, [markers, mapRef]);

  useEffect(() => {
    mapRef.current.on('load', () => {
      polygonsObject.forEach(polygon => {
        mapRef.current.addSource(polygon.id, {
          'type': 'geojson',
          'data': {
            'type'    : 'Feature',
            'geometry': {
              'type'       : 'Polygon',
              'coordinates': [[...polygon.coordinates]],
            },
          },
        });

        mapRef.current.addLayer({
          'id'    : `${ polygon.id }-layer`,
          'type'  : 'fill',
          'source': polygon.id,
          'layout': {},
          'paint' : {
            'fill-color'  : polygon.color,
            'fill-opacity': polygon.opacity,
          },
        });

        if (polygon.description) {
          mapRef.current.on('click', `${ polygon.id }-layer`, e => {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(polygon.description)
              .addTo(mapRef.current);

            const coordinates = { lat: e.lngLat.lat, lng: e.lngLat.lng };

            onPolygonClick({ coordinates: coordinates, description: polygon.description });
          });
        }
      });

    });
  }, [polygonsObject]);

  return (
    <div>
      <div ref={ mapContainerRef } className={ cn('bl-customComponent-mapbox', classList) }/>
    </div>
  );
}
