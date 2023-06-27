const POINT_REGEX = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export function toCoordinates(coords) {
  if (Array.isArray(coords) && POINT_REGEX.test(coords.join(','))) {
    return coords;
  }

  if (typeof coords === 'string' && POINT_REGEX.test(coords)) {
    return coords.split(',');
  }

  if (typeof coords === 'object' && coords.center) {
    if (POINT_REGEX.test(`${ coords.center.lat },${ coords.center.lng }`)) {
      return [coords.center.lat, coords.center.lng];
    }
  }

  console.error('Leaflet Map: not valid coordinates');

  return [0, 0];
}
