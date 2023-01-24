export const validate = (cascade, setItemsCascade, setParentItems, setItems) => {
  const { isCircular, cycleLocation } = analyzeCircularDependencies(cascade);

  if (isCircular) {
    throw new Error('cascade have cycling object in ' + cycleLocation);
  }

  if (cascade) {
    setItemsCascade(prepareCascade(cascade, setParentItems, setItems));
  }
};

function analyzeCircularDependencies(obj) {
  const keys = [];
  const stack = [];
  const stackSet = new Set();
  let isCircular = false;
  let cycleLocation;

  function detect(obj, key) {
    if (obj && typeof obj != 'object') {
      return;
    }

    if (stackSet.has(obj)) {
      cycleLocation = keys.join('.') + '.' + key;
      isCircular = true;

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

  return { isCircular, cycleLocation };
}

const prepareCascade = (cascade, setParentItems, setItems) => {
  let levelOfNesting = 0;
  const parentItems = [];
  const items = [];

  const prepare = cascade => {
    const validCascade = cascade.map(item => {
      let validItem = { ...item, levelOfNesting };

      if (item.children) {
        levelOfNesting++;
        validItem = {
          ...validItem,
          children: prepare(item.children),
        };

        parentItems.push({ code: item.code, isOpen: false, levelOfNesting });
      } else {
        items.push(validItem);
      }

      return validItem;
    });

    levelOfNesting--;

    return validCascade;
  };

  const preparedCascade = prepare(cascade);

  setParentItems(getNestedItems(parentItems, levelOfNesting));
  setItems(items);

  return preparedCascade;
};

const getNestedItems = (items, levelOfNesting) => {
  const groupParentItems = [];

  for (let i = 0; i <= -levelOfNesting; i++) {
    groupParentItems.push(items.filter(({ levelOfNesting }) => levelOfNesting === i));
  }

  return groupParentItems;
};

export const openCascade = (state, item) => {
  const currentParentItems = [...state];
  const { code, levelOfNesting } = item;

  for (let i = 0; i < currentParentItems[levelOfNesting].length; i++) {
    const { code: parentItemCode, isOpen } = currentParentItems[levelOfNesting][i];

    currentParentItems[levelOfNesting][i].isOpen = parentItemCode === code ? !isOpen : false;
  }

  return currentParentItems;
};

export const findParentItem = (parentItems, item) => {
  const { levelOfNesting, code } = item;

  return parentItems[levelOfNesting].find(item => item.code === code);
};
