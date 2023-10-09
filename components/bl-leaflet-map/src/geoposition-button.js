import { useCallback, useRef } from 'react';

import { getGeolocation } from './helpers/map';
import { useIcon } from './helpers/use-icon';
import { PositionIcon } from './icons';
import { IconOptions } from './icons';

export function GeopositionButton({ map, eventHandlers }) {
  const geoMarker = useRef(null);
  const positionIcon = useIcon(IconOptions.position);

  const handleClick = useCallback(() => {
    getGeolocation(map, geoMarker, positionIcon, eventHandlers);
  }, [map]);

  return (
    <button className="control button geo-button" onClick={ handleClick }>
      <PositionIcon/>
    </button>
  );
}
