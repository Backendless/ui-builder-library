const SelectionMode = {
  SINGLE  : 'single',
  MULTIPLE: 'multiple',
  CHECKBOX: 'checkbox',
};

const SelectedNodesState = {
  FULL   : { checked: true, partialChecked: false },
  PARTIAL: { checked: false, partialChecked: true },
};

const KeysSelector = {
  [SelectionMode.SINGLE]  : selectedOptionKey => selectedOptionKey,
  [SelectionMode.MULTIPLE]: selectedOptionKey => {
    const selectedOptions = {};

    selectedOptionKey.split(',').forEach(option => selectedOptions[option.trim()] = true);

    return selectedOptions;
  },
  [SelectionMode.CHECKBOX]: selectedOptionKey => {
    const selectedOptions = {};

    selectedOptionKey.split(',').forEach(option => {
      selectedOptions[option.trim()] = SelectedNodesState.FULL;
    });

    return selectedOptions;
  },
};

export function getSelectedKeys(selectedOptionKey, selectionMode) {
  return KeysSelector[selectionMode](selectedOptionKey);
}

export function updateNode(node, parent, selectedNodes, expandedKeysMap, selectionMode) {
  const isSelected = selectedNodes[node.key] || selectedNodes === node.key;

  if (parent) {
    addParentsInstance(node, parent);
  }

  if (isSelected && node.parents) {
    updateParentNodes(node, selectedNodes, expandedKeysMap, selectionMode);
  }

  if (node.children) {
    updateChildNodes(node, selectedNodes, expandedKeysMap, selectionMode);
  }
}

function addParentsInstance(node, parent) {
  node.parents = parent.parents ? [...parent.parents, parent.key] : [parent.key];
}

function updateParentNodes(node, selectedNodes, expandedKeysMap, selectionMode) {
  node.parents.forEach(parent => {
    expandedKeysMap[parent] = true;

    if (selectionMode === SelectionMode.CHECKBOX && !selectedNodes[parent]) {
      selectedNodes[parent] = SelectedNodesState.PARTIAL;
    }
  });
}

function updateChildNodes(node, selectedNodes, expandedKeysMap, selectionMode) {
  let count = 0;

  for (const childNode of node.children) {
    if (selectedNodes[childNode.key]?.checked) {
      count++;
    }

    if (selectedNodes[node.key]?.checked) {
      selectedNodes[childNode.key] = SelectedNodesState.FULL;
    }

    updateNode(childNode, node, selectedNodes, expandedKeysMap, selectionMode);
  }

  if (count === Object.keys(node.children).length) {
    selectedNodes[node.key] = SelectedNodesState.FULL;
  }
}

export function validateSelectedNodeKeys(selectionMode, selectedNodeKeys, keysMap) {
  const keys = selectionMode === SelectionMode.SINGLE ? { [selectedNodeKeys]: true } : { ...selectedNodeKeys };

  Object.keys(keys).forEach(key => {
    if (!keysMap[key]) {
      console.error(`Can't select a non existed option with key: ${ key }.`);
    }
  });
}

export function getSelectedItems(selectedNodeKeys, nodes, selectionMode) {
  if (!selectedNodeKeys || !Object.keys(selectedNodeKeys).length) {
    return null;
  }

  const selectedItems = selectionMode === SelectionMode.SINGLE ? { [selectedNodeKeys]: true } : { ...selectedNodeKeys };

  for (const childNode of nodes) {
    handleNode(childNode, selectedItems, selectionMode);
  }

  return selectedItems;
}

function handleNode(node, selectedItems, selectionMode) {
  if (selectedItems[node.key]) {
    updateSelectedItems(node, selectedItems, selectionMode);
  }

  if (!node.children) {
    return;
  }

  for (const childNode of node.children) {
    handleNode(childNode, selectedItems, selectionMode);
  }
}

function updateSelectedItems(node, selectedItems, selectionMode) {
  const { label, data } = node;

  if (selectionMode === SelectionMode.CHECKBOX) {
    selectedItems[node.key] = { ...selectedItems[node.key], data, label };
  } else {
    selectedItems[node.key] = { data, label };
  }
}

export function updateKeysMap(node, keys) {
  if (!node) {
    return;
  }

  keys[node.key] = true;

  for (const childNode of node.children || []) {
    updateKeysMap(childNode, keys);
  }
}

export function ensureMeasure(propertyName, value) {
  return CSS.supports(propertyName, value) ? value : value + 'px';
}
