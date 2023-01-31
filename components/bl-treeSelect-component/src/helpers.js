const SelectionMode = {
  single  : 'single',
  multiple: 'multiple',
  checkbox: 'checkbox',
};

export function ensureMeasure(propertyName, value) {
  return CSS.supports(propertyName, value) ? value : value + 'px';
}

export function getSelectedKeys(selectedOptionKey, selectionMode) {
  if (selectionMode === SelectionMode.single) {
    return selectedOptionKey;
  } else if (selectionMode === SelectionMode.multiple) {
    const selectedOptions = {};

    selectedOptionKey.split(',').forEach(option => selectedOptions[option.trim()] = true);

    return selectedOptions;
  } else {
    const selectedOptions = {};

    selectedOptionKey.split(',').forEach(option => {
      selectedOptions[option.trim()] = { checked: true, partialChecked: false };
    });

    return selectedOptions;
  }
}

function updateNodeKeys(keysMap, node, parent) {
  keysMap[node.key] = true;

  if (parent) {
    node.parents = parent.parents ? [...parent.parents, parent.key] : [parent.key];
  }
}

export function findNodes(node, parent, selectedNodes, expandedKeysState, keysMap, selectionMode) {
  if (!node) {
    return;
  }

  const isSelected = selectionMode === SelectionMode.single ? selectedNodes === node.key : selectedNodes[node.key];

  updateNodeKeys(keysMap, node, parent);

  if (isSelected && node.parents) {
    node.parents.forEach(parent => expandedKeysState[parent] = true);
  }

  if (node.children) {
    for (const childNode of node.children) {
      findNodes(childNode, node, selectedNodes, expandedKeysState, keysMap, selectionMode);
    }
  }
}

export function findNodesInCheckboxMode(node, parent, selectedNodes, expandedKeysState, keysMap) {
  if (!node) {
    return;
  }

  updateNodeKeys(keysMap, node, parent);

  if (selectedNodes[node.key] && node.parents) {
    node.parents.forEach(parent => {
      expandedKeysState[parent] = true;

      if (!selectedNodes[parent]) {
        selectedNodes[parent] = { checked: false, partialChecked: true };
      }
    });
  }

  if (node.children) {
    let count = 0;

    for (const childNode of node.children) {
      if (selectedNodes[childNode.key]?.checked) {
        count++;
      }

      if (selectedNodes[node.key]?.checked) {
        selectedNodes[childNode.key] = { checked: true, partialChecked: false };
      }

      findNodesInCheckboxMode(childNode, node, selectedNodes, expandedKeysState, keysMap);
    }

    if (count === Object.keys(node.children).length) {
      selectedNodes[node.key] = { checked: true, partialChecked: false };
    }
  }
}

export function validateSelectedNodeKeys(selectionMode, selectedNodeKeys, keysMap) {
  const keys = selectionMode === SelectionMode.single ? { [`${ selectedNodeKeys }`]: true } : { ...selectedNodeKeys };

  for (const key of Object.keys(keys)) {
    if (!keysMap[key]) {
      console.error('Error: trying to select non existed option.');
    }
  }
}

function updateSelectedItems(node, selectedNodes, selectionMode) {
  if (!node) {
    return;
  }

  if (selectedNodes[node.key]) {
    const { label, data } = node;

    if (selectionMode === SelectionMode.checkbox) {
      selectedNodes[node.key].data = data;
      selectedNodes[node.key].label = label;
    } else {
      selectedNodes[node.key] = { data, label };
    }
  }

  if (node.children) {
    for (const childNode of node.children) {
      updateSelectedItems(childNode, selectedNodes, selectionMode);
    }
  }
}

export function getSelectedItems(selectedNodeKeys, nodes, selectionMode) {
  if (!selectedNodeKeys) {
    return null;
  }

  const selectedItems = selectionMode === SelectionMode.single ? { [selectedNodeKeys]: true } : { ...selectedNodeKeys };

  if (Object.keys(selectedItems).length) {
    for (const childNode of nodes) {
      updateSelectedItems(childNode, selectedItems, selectionMode);
    }
  }

  return selectedItems;
}
