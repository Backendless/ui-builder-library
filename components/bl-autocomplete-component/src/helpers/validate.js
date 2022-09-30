export const validate = items => {
  if (!items) {
    return [];
  }
  
  if (typeof items === 'string') {
    return items.split(',').map(item => ({
      objectId: BackendlessUI.UUID.short(),
      value: item,
      label: item,
    }));
  }
    
  if (Array.isArray(items)) {
    if (!items[0].hasOwnProperty('objectId')) {
      return items.map(item => ({
        ...item,
        objectId: BackendlessUI.UUID.short()
      }))
    }
    
    return items;
  }
};
