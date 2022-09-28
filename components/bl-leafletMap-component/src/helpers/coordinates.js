const regEx = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export function toCoordinates(coords) {
  if (Array.isArray(coords) && regEx.test(coords.join(','))) {
    return coords;
  }

  if (typeof coords === 'string' && regEx.test(coords)) {
    return coords.split(',');
  }

  console.error('Leaflet Map: not valid coordinates');

  return [0, 0];
}
