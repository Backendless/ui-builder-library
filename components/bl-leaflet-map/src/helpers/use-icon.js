import { useMemo } from 'react';

import Leaflet from '../lib/leaflet';

export const useIcon = (options) => useMemo(() => Leaflet.divIcon(options), []);
