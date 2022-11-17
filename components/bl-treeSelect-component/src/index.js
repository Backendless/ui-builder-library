import { useEffect, useState } from 'react';

import primereact from './lib/primereact.min';

const { cn } = BackendlessUI.CSSUtils;
const { TreeSelect } = primereact.treeselect;

export default function TreeSelectComponent({ component, eventHandlers }) {
  const { display, classList, style, options, label, selectionMode, filterVisibility, chipsDisplay } = component;
  const { metaKeySelection, scrollHeight, disabled, resetFilterOnHide, filterInputAutoFocus } = component;
  const { filterPlaceholder, selectedOptionKey, emptyMessage } = component;

  const { onShow, onHide } = eventHandlers;

  const [nodes, setNodes] = useState(options);
  const [selectedNodeKey, setSelectedNodeKey] = useState(selectedOptionKey);

  const {
    expandAll, collapseAll, onSelectedNodeChange, onToggle, onNodeSelect,
    onNodeUnselect, onNodeExpand, onNodeCollapse, expandedKeys,
  } = useNodes(nodes, eventHandlers, setSelectedNodeKey);

  useEffect(() => {
    setNodes(options);
  }, [options]);

  useEffect(() => {
    setSelectedNodeKey(selectedOptionKey);
  }, [selectedOptionKey]);

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
      display={ chipsDisplay ? 'chip' : 'comma' }
      panelClassName="bl-customComponent-treeSelect-options"
      scrollHeight={ ensureMeasure(scrollHeight) }
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

function useNodes(nodes, eventHandlers, setSelectedNodeKey) {
  const { onChange, onItemSelect, onItemUnselect, onItemExpand, onItemCollapse } = eventHandlers;

  const [expandedKeys, setExpandedKeys] = useState({});

  const onToggle = e => setExpandedKeys(e.value);
  const onNodeSelect = e => onItemSelect({ item: e.node });
  const onNodeUnselect = e => onItemUnselect({ item: e.node });
  const onNodeExpand = e => onItemExpand({ item: e.node });
  const onNodeCollapse = e => onItemCollapse({ item: e.node });
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

  return {
    expandAll, collapseAll, onSelectedNodeChange, onToggle, onNodeSelect,
    onNodeUnselect, onNodeExpand, onNodeCollapse, expandedKeys,
  };
}

function ensureMeasure(dimension) {
  return String(Number(dimension)) === dimension ? dimension + 'px' : dimension;
}
