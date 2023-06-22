export const treeItemsValidator = treeItems => {
  const validate = treeItems => {
    for (const item of treeItems) {
      if (item.children) {
        if (!Array.isArray(item.children)) {
          console.error('treeItems.children must be an array');

          return false;
        }

        validate(item.children);
      }
    }

    return true;
  };

  if (!Array.isArray(treeItems)) {
    console.error('treeItems must be an array');

    return false;
  }

  const [detected, locate] = isCyclic(treeItems);

  if (detected) {
    console.error('treeItems have cycling object in ' + locate);
  }

  return validate(treeItems);
};

function isCyclic(obj) {
  const keys = [];
  const stack = [];
  const stackSet = new Set();
  let detected = false;
  let locate;

  function detect(obj, key) {
    if (obj && typeof obj != 'object') {
      return;
    }

    if (stackSet.has(obj)) {
      locate = keys.join('.') + '.' + key;
      detected = true;

      return;
    }

    keys.push(key);
    stack.push(obj);
    stackSet.add(obj);

    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        detect(obj[k], k);
      }
    }

    keys.pop();
    stack.pop();
    stackSet.delete(obj);
  }

  detect(obj, 'obj');

  return [detected, locate];
}
