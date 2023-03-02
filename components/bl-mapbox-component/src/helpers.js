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
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });
    if (!isMobile()) {
      map.addControl(directions, 'top-left');
    } else {
      const div = document.createElement('div');

      div.style.margin = '0 auto';
      div.appendChild(directions.onAdd(mapRef.current));

      mapContainerRef.current.parentNode.insertAdjacentElement('afterend', div);
    }
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

window.isMobile = function() {
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
