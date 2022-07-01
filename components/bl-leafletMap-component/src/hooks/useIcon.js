import { useMemo } from 'react';

import Leaflet from '../lib/leaflet/leaflet';

export function useIcon(options) {
  return useMemo(() => {
    return Leaflet.divIcon(options);
  }, []);
}
