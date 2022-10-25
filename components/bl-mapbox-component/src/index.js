import { useEffect, useState, useRef } from 'react';
import mapboxgl from './lib/mapbox';
import MapboxGeocoder from './lib/mapbox-geocoder';
import MapboxDirections from './lib/mapbox-directions';
import { createActions } from './actions';

const defaultValues = {
  START_POS : {
    lat: 0,
    lng: 0
  },
  MAP_STYLE : 'mapbox://styles/mapbox/streets-v11',
  ZOOM : 10,
  PROJECTION: 'mercator',
  LOWER_ATMOSPHERE: '#BAD2EB',
  UPPER_ATMOSPHERE: '#245CDF',
  ATMOSPHERE_THICKNESS: 0.2,
  SPACE_COLOR: '#0B0B19',
  STAR_INTENSITY: 0.2
}

export default function Mapbox({ component, eventHandlers }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [polygonsObject, setPolygonsObject] = useState([]);

  const { onClick, onMarkerClick, onPolygonClick, onDeterminingGeoposition} = eventHandlers;

  const {
    markers,
    polygons,
    startPos,
    zoom,
    fullScreen,
    accessToken,
    projection,
    lowerAtmosphere,
    upperAtmosphere,
    atmosphereThickness,
    spaceColor,
    starIntensity,
    mapStyle,
    navigation,
    searchBar,
    geolocation,
    directions
  } = component;

  if (!display) {
    return null;
  }

  useEffect(()=>{
    if (polygons) {
      if (polygons.length) {
        mapRef.current.on('load',()=>{
          polygonsObject.map(el => {
            if (mapRef.current.getSource(el.id)){
              mapRef.current.removeLayer(`${el.id}-layer`)
              mapRef.current.removeSource(el.id);
            }
          });
        })

        setPolygonsObject(polygons.map(el => ({
          id: BackendlessUI.UUID.short(),
          color: el.color,
          coordinates: el.polygon.boundary.points.map(coordinate => [coordinate.lng, coordinate.lat]),
          name: el.name,
          opacity: el.opacity,
          description: el.description
        })))
      }
    }
  },[polygons]);

  useEffect(()=>{
    mapboxgl.accessToken = accessToken;
    if (mapRef.current) return; // initialize map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle || defaultValues.MAP_STYLE,
      center: defaultValues.START_POS,
      zoom: zoom || defaultValues.ZOOM,
      projection: projection || defaultValues.PROJECTION
    });

    if (directions) {
      mapRef.current.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken
        }),
        'top-left'
      );
    }
  });

  useEffect(()=>{
    if (mapRef.current && startPos) {
      mapRef.current.setCenter([startPos.lng, startPos.lat]);
    }
  },[startPos])

  useEffect(() => {
    mapRef.current.on ('load', () => {
      mapRef.current.setFog({
        color: lowerAtmosphere || defaultValues.LOWER_ATMOSPHERE,
        'high-color': upperAtmosphere || defaultValues.UPPER_ATMOSPHERE,
        'horizon-blend': atmosphereThickness || defaultValues.ATMOSPHERE_THICKNESS,
        'space-color': spaceColor || defaultValues.SPACE_COLOR,
        'star-intensity': starIntensity || defaultValues.STAR_INTENSITY,
      });



      mapRef.current.on('click', (e) => {
        const coordinates = {lat: e.lngLat.lat, lng: e.lngLat.lng};
        onClick({coordinates: coordinates})
      });

      if (searchBar) {
        mapRef.current.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
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
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        });
        mapRef.current.addControl(geolocate);
        geolocate.on('trackuserlocationstart', () => {
          navigator.geolocation.getCurrentPosition(function success(pos) {
            const coordinates = {lat: pos.coords.latitude, lng: pos.coords.longitude}
            onDeterminingGeoposition({coordinates: coordinates})
          })
        });
      }

      createActions(mapRef, component);
    })
  }, []);

  useEffect(()=>{
    if (markers){
      if (markers.length) {
        markers.forEach(el => {
          const marker = new mapboxgl.Marker({color: el.color})
            .setLngLat([el.coordinates.lng, el.coordinates.lat])
            .addTo(mapRef.current);

          if (el.description) {
            const popup = new mapboxgl.Popup()
              .setText(el.description);

            marker.setPopup(popup);
          }

          marker.getElement().addEventListener('click', () => {
            const coordinates = {lat: el.coordinates.lat, lng: el.coordinates.lng};

            onMarkerClick({coordinates: coordinates, description: el.description})
          });
        })
      }
    }
  },[markers, mapRef]);

  useEffect(()=>{
    mapRef.current.on('load', ()=>{
      polygonsObject.map(polygon => {
        mapRef.current.addSource(polygon.id, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[...polygon.coordinates]]
            }
          }
        });

        mapRef.current.addLayer({
          'id': `${polygon.id}-layer`,
          'type': 'fill',
          'source': polygon.id,
          'layout': {},
          'paint': {
            'fill-color': polygon.color,
            'fill-opacity': polygon.opacity
          }
        });

        if (polygon.description) {
          mapRef.current.on('click', `${polygon.id}-layer`, (e) => {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(polygon.description)
              .addTo(mapRef.current);

            const coordinates = {lat: e.lngLat.lat, lng: e.lngLat.lng};

            onPolygonClick({coordinates: coordinates, description: polygon.description});
          });
        }
      })

    })
  },[polygonsObject])

  return (
    <div>
      <div ref={mapContainer} className={ 'bl-customComponent-mapbox' + component.classList.join(' ') }></div>
    </div>
  )
}
