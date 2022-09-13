export const getMapFromObjectsArray = array => {
  return array.reduce((m, item) => ({ ...m, [item.objectId]: 1 }), {});
};