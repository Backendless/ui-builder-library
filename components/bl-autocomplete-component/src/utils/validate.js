export const validate = (items) => {
  if (!items) {
    return [];
  }
  
  if (typeof items === 'string') {
    return items.split(',').map(item => ({
      objectId: item,
      value: item,
      label: item,
    }))
  }
    
  if (typeof items === 'object') {
    return Object.values(items);
  }
};