import { useRef, useCallback } from 'react';

import { PositionIcon } from './icons';
import { useIcon } from './helpers/use-icon';
import { IconOptions } from './icons';
import { getGeolocation } from './helpers/map';

export function GeopositionButton({ map, eventHandlers }) {
  const geoMarker = useRef(null);
  const positionIcon = useIcon(IconOptions.position);

  const handleClick = useCallback(() => {
    getGeolocation(map, geoMarker, positionIcon, eventHandlers);
  }, [map]);

  return (
    <button className="control button geo-button" onClick={ handleClick }><PositionIcon/></button>
  );
}
