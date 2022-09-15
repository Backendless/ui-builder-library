export const validate = items => {
  if (!items) {
    return [];
  }
  
  if (typeof items === 'string') {
    return items.split(',').map(i => i.trim()).map(i => ({ objectId: i, value: i, label: i }));
  }
    
  if (Array.isArray(items)) {
    if (!items[0].hasOwnProperty('objectId')) {
      return items.map(item => ({
        ...item,
        objectId: BackendlessUI.UUID.short(),
      }));
    }
  }
  
  return items;
};
