export function isCyclic(obj) {
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

    return;
  }

  detect(obj, 'obj');

  return [detected, locate];
}

export const prepareCascade = (cascade, setParentItems) => {
  let levelOfNesting = 0;

  const prepare = (cascade) => {
    const validCascade = cascade.map(item => {
      let validItem = { ...item, levelOfNesting };

      if (item.children) {
        levelOfNesting++;
        validItem = {
          ...validItem,
          children: prepare(item.children)
        };

        setParentItems(state => [...state, { code: item.code, isOpen: false, levelOfNesting }]);
      }

      return validItem;
    });

    levelOfNesting--;

    return validCascade;
  };

  return prepare(cascade);
};
