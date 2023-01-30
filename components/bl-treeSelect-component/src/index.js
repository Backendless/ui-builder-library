import { useEffect, useState } from 'react';

import primereact from './lib/primereact.min';
import { ensureMeasure, findNodes, findNodesInCheckboxMode, getSelectedKeys } from './helpers';

const { cn } = BackendlessUI.CSSUtils;
const { TreeSelect } = primereact.treeselect;

export default function TreeSelectComponent({ component, eventHandlers }) {
  const { display, classList, style, options, label, selectionMode, filterVisibility, chipsVisibility } = component;
  const { metaKeySelection, optionsPanelHeight, disabled, resetFilterOnHide, filterInputAutoFocus } = component;
  const { filterPlaceholder, selectedOptionKey, emptyMessage } = component;

  const { onShow, onHide } = eventHandlers;

  const [nodes, setNodes] = useState(options);
  const [selectedNodeKey, setSelectedNodeKey] = useState(selectedOptionKey);

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
      className={ cn('bl-customComponent-treeSelect', classList) }
      style={ style }
      value={ selectedNodeKey }
      options={ nodes }
      display={ chipsVisibility ? 'chip' : 'comma' }
      panelClassName="bl-customComponent-treeSelect-options"
      scrollHeight={ ensureMeasure('max-height', optionsPanelHeight) }
      expandedKeys={ expandedKeys }
      selectionMode={ selectionMode }
      metaKeySelection={ metaKeySelection }
      placeholder={ label }
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

  const onSelectedNodeChange = e => {
    const changedValue = e.value;

    setSelectedNodeKey(changedValue);
    onChange({ changedValue });
  };

  const updateNodesState = selectedNodeKeys => {
    const keysMap = {};
    const expandedKeysState = { ...expandedKeys };
    const options = [...nodes];

    if (selectionMode === 'checkbox') {
      for (const childNode of options) {
        findNodesInCheckboxMode(childNode, null, selectedNodeKeys, expandedKeysState, keysMap);
      }
    } else {
      for (const childNode of options) {
        findNodes(childNode, null, selectedNodeKeys, expandedKeysState, keysMap, selectionMode);
      }
    }

    setSelectedNodeKey(selectedNodeKeys);
    setExpandedKeys(expandedKeysState);
  };

  return {
    expandAll, collapseAll, onSelectedNodeChange, onToggle, onNodeSelect,
    onNodeUnselect, onNodeExpand, onNodeCollapse, expandedKeys, updateNodesState,
  };
}
