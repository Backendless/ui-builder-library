import { useState, useEffect, useMemo } from 'react';

import { TabControl } from './tab-control';

const { cn } = BackendlessUI.CSSUtils;

export default function TabsComponent({ component, eventHandlers, appData, pageData, parentDataModel, pods }) {
  const { classList, style, display, disabled, variant, tabs } = component;
  const { onChange } = eventHandlers;

  const [currentTabId, setCurrentTabId] = useState(null);

  component.getCurrentTabId = () => currentTabId;
  component.setCurrentTabId = id => {
    setCurrentTabId(id);
    onChange({ currentTabId: id });
  };

  const podsContent = pods['Tabs Content'];

  const classes = cn(
    'bl-customComponent-tabs', classList,
    `bl-customComponent-tabs--${variant}`, { 'bl-customComponent-tabs--disabled': disabled }
  );

  const tabsList = useMemo(() => {
    if (!Array.isArray(tabs)) {
      return []
    }

    return tabs.filter(({ id, label, value }) => {
      if (id) {
        return true;
      }

      console.error(`Invalid tab item: {label: ${label}, value: ${value}}`);

      return false;
    });
  }, [tabs]);

  useEffect(() => {
    const currentTab = tabsList.find(tab => tab.id === currentTabId);

    if (!currentTab) {
      setCurrentTabId(tabsList[0]?.id || null);
    }
  }, [currentTabId, tabsList]);

  useEffect(() => {
    podsContent.dataModel.currentTabId = currentTabId;
  }, [currentTabId]);

  if (!display) {
    return null;
  }

  return (
    <div
      style={ style }
      className={ classes }>
      <TabControl
        tabs={ tabsList }
        currentTabId={ currentTabId }
        onChange={ onChange }
        setCurrentTabId={ setCurrentTabId }
      />

      <div className="tabs-content">
        { podsContent.render() }
      </div>
    </div>
  )
}
