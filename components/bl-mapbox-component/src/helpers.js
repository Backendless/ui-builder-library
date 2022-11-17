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

export const applyFog = (mapRef, component) => {
  const LOWER_ATMOSPHERE = '#BAD2EB';
  const UPPER_ATMOSPHERE = '#245CDF';
  const ATMOSPHERE_THICKNESS = 0.2;
  const SPACE_COLOR = '#0B0B19';
  const STAR_INTENSITY = 0.2;
  const { lowerAtmosphere, upperAtmosphere, atmosphereThickness, spaceColor, starIntensity } = component;

  mapRef.current.setFog({
    color           : lowerAtmosphere || LOWER_ATMOSPHERE,
    'high-color'    : upperAtmosphere || UPPER_ATMOSPHERE,
    'horizon-blend' : atmosphereThickness || ATMOSPHERE_THICKNESS,
    'space-color'   : spaceColor || SPACE_COLOR,
    'star-intensity': starIntensity || STAR_INTENSITY,
  });
};
