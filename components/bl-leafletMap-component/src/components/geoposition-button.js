import { useRef, useCallback } from 'react';

import { PositionSVG } from '../svg/position';
import { useIcon } from '../hooks/useIcon';
import { IconOptions } from '../icon-options';
import { getGeolocation } from '../utils/map';

export function GeopositionButton({ mapRef, eventHandlers }) {
  const geoMarker = useRef(null);
  const positionIcon = useIcon(IconOptions.position);

  const handleClick = useCallback(() => {
    getGeolocation(mapRef, geoMarker, positionIcon, eventHandlers);
  }, [mapRef]);

  return (
    <button
      className="control button geo-button"
      onClick={ handleClick }>
      <PositionSVG/>
    </button>
  );
}
