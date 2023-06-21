export function validateRows(data) {
  if (!data) {
    return [];
  }

  return data.map(item => {
    const parentObj = {};

    for (let key in item) {
      if (typeof item[key] !== 'object' || item[key] === null || Array.isArray(item[key])) {
        parentObj[key] = item[key];
      }
    }

    flattenObject(parentObj, item);

    return parentObj;
  });
}

function flattenObject(parent, nestedObj) {
  const parentObj = parent;

  for (const key in nestedObj) {
    if (typeof nestedObj[key] === 'object' && nestedObj[key] !== null && !Array.isArray(nestedObj[key])) {
      flattenObject(parentObj, nestedObj[key]);
    } else {
      parentObj[key] = nestedObj[key];
    }
  }

  return parentObj;
}
