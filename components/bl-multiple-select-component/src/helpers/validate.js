export const validate = items => {
  if (!items) {
    return [];
  }
  
  if (typeof items === 'string') {
    return items.trim().split(',').map(item => ({
      objectId: item.trim(),
      value: item.trim(),
      label: item.trim(),
    }));
  }
    
  if (typeof items === 'array') {
    if (!items[0].hasOwnProperty('objectId')) {
      return items.map(item => ({
        ...item,
        objectId: getId(),
      }));
    }
    
    return items;
  }
  
  return items;
};

const getId = () => {
  const chr4 = () => Math.random().toString(16).slice(-4);
  const chr8 = () => `${chr4()}${chr4()}`;

  return `${chr8()}${chr8()}`;
};
