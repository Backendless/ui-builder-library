export const validate = items => {
  if (!items) {
    return [];
  }
  
  if (typeof items === 'string') {
    return items.split(',').map(item => ({
      value: item,
      label: item,
    }));
  }
    
  if (Array.isArray(items)) {
    return items;
  }
  
  return [];
};
