export const validate = items => {
  if (!items) {
    return [];
  }
  
  if (typeof items === 'string') {
    return items.split(',').map(item => ({
      objectId: getId(),
      value: item,
      label: item,
    }));
  }
    
  if (typeof items === 'object') {
    const data = Object.values(items);
    
    if (!data[0].hasOwnProperty('objectId')) {
      return data.map(item => ({
        ...item,
        objectId: getId(),
      }));
    }
    
    return data;
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
    
  return [];
};

const getId = () => {
  const chr4 = () => Math.random().toString(16).slice(-4);
  const chr8 = () => `${chr4()}${chr4()}`;

  return `${chr8()}${chr8()}`;
};