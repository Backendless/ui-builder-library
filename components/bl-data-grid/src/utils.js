export function rowsValidation(data) {
  if (!data) {
    return null;
  }

  return data.map(item => {
    const parentObj = {};

    for (const key in item) {
      if (!isObject(item[key])) {
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
    if (isObject(nestedObj[key])) {
      flattenObject(parentObj, nestedObj[key]);
    } else {
      parentObj[key] = nestedObj[key];
    }
  }

  return parentObj;
}

function isObject(param) {
  return typeof param === 'object' && param !== null && !Array.isArray(param);
}
