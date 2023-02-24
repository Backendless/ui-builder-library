import { useCallback, useEffect, useMemo, useState } from 'react';

import primereact from './lib/primereact.min';
import {
  ensureMeasure, getSelectedItems, getSelectedKeys, updateKeysMap, updateNode, validateSelectedNodeKeys,
} from './helpers';

const { cn } = BackendlessUI.CSSUtils;
const { TreeSelect } = primereact.treeselect;

export default function TreeSelectComponent({ component, eventHandlers, elRef }) {
  const { display, classList, style, options, label, selectionMode, filterVisibility, chipsVisibility } = component;
  const { metaKeySelection, optionsPanelHeight, disabled, resetFilterOnHide, filterInputAutoFocus } = component;
  const { filterPlaceholder, selectedOptionKey, emptyMessage } = component;

  const { onShow, onHide } = eventHandlers;

  const [nodes, setNodes] = useState(options);
  const [selectedNodeKey, setSelectedNodeKey] = useState(selectedOptionKey);

  const scrollHeight = useMemo(() => ensureMeasure('max-height', optionsPanelHeight), [optionsPanelHeight]);

  const {
    expandAll, collapseAll, onSelectedNodeChange, onToggle, onNodeSelect,
    onNodeUnselect, onNodeExpand, onNodeCollapse, expandedKeys, updateNodesState,
  } = useNodeActions(nodes, eventHandlers, setSelectedNodeKey, selectionMode);

  useEffect(() => {
    if (!selectedOptionKey || !nodes?.length) {
      return;
    }

    const selectedNodeKeys = getSelectedKeys(selectedOptionKey, selectionMode);

    updateNodesState(selectedNodeKeys);
  }, [selectedOptionKey]);

  useEffect(() => {
    setNodes(options);
  }, [options]);

  Object.assign(component, {
    expandAll  : () => expandAll(),
    collapseAll: () => collapseAll(),
  });

  if (!display) {
    return null;
  }

  return (
    <TreeSelect
      ref={ el => elRef.current = el?.getElement() }
      className={ cn('bl-customComponent-treeSelect', classList) }
      style={ style }
      value={ selectedNodeKey }
      options={ nodes }
      display={ chipsVisibility ? 'chip' : 'comma' }
      panelClassName="bl-customComponent-treeSelect-options"
      scrollHeight={ scrollHeight }
      expandedKeys={ expandedKeys }
      selectionMode={ selectionMode }
      metaKeySelection={ metaKeySelection }
      placeholder={ label || ' ' }
      filter={ filterVisibility }
      resetFilterOnHide={ resetFilterOnHide }
      filterInputAutoFocus={ filterInputAutoFocus }
      filterPlaceholder={ filterPlaceholder }
      disabled={ disabled }
      emptyMessage={ emptyMessage }
      onToggle={ onToggle }
      onChange={ onSelectedNodeChange }
      onShow={ onShow }
      onHide={ onHide }
      onNodeSelect={ onNodeSelect }
      onNodeUnselect={ onNodeUnselect }
      onNodeExpand={ onNodeExpand }
      onNodeCollapse={ onNodeCollapse }
    />
  );
}

function useNodeActions(nodes, eventHandlers, setSelectedNodeKey, selectionMode) {
  const { onChange, onSelect, onUnselect, onExpand, onCollapse } = eventHandlers;

  const [expandedKeys, setExpandedKeys] = useState({});

  const keysMap = useMemo(() => {
    const keys = {};

    if (!nodes?.length) {
      return keys;
    }

    for (const childNode of nodes) {
      updateKeysMap(childNode, keys);
    }

    return keys;
  }, [nodes]);

  const onToggle = e => setExpandedKeys(e.value);
  const onNodeSelect = e => onSelect({ selectedItem: e.node });
  const onNodeUnselect = e => onUnselect({ unselectedItem: e.node });
  const onNodeExpand = e => onExpand({ expandedItem: e.node });
  const onNodeCollapse = e => onCollapse({ collapsedItem: e.node });
  const collapseAll = () => setExpandedKeys({});

  const expandAll = () => {
    const expandedKeys = {};

    for (const node of nodes) {
      expandNode(node, expandedKeys);
    }

    setExpandedKeys(expandedKeys);
  };

  const expandNode = (node, expandedKeys) => {
    if (!node.children?.length) {
      return;
    }

    expandedKeys[node.key] = true;

    for (const child of node.children) {
      expandNode(child, expandedKeys);
    }
  };

  const onSelectedNodeChange = useCallback(e => {
    const selectedItems = getSelectedItems(e.value, nodes, selectionMode);

    setSelectedNodeKey(e.value);
    onChange({ selectedItems });
  }, [nodes, onChange, selectionMode, setSelectedNodeKey]);

  const updateNodesState = useCallback(selectedNodeKeys => {
    const expandedKeysMap = { ...expandedKeys };
    const options = [...nodes];

    for (const childNode of options) {
      updateNode(childNode, null, selectedNodeKeys, expandedKeysMap, selectionMode);
    }

    validateSelectedNodeKeys(selectionMode, selectedNodeKeys, keysMap);
    setSelectedNodeKey(selectedNodeKeys);
    setExpandedKeys(expandedKeysMap);
  }, [expandedKeys, keysMap, nodes, selectionMode, setSelectedNodeKey]);

  return {
    expandAll, collapseAll, onSelectedNodeChange, onToggle, onNodeSelect,
    onNodeUnselect, onNodeExpand, onNodeCollapse, expandedKeys, updateNodesState,
  };
}
