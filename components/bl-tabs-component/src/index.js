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
  }

  const podsContent = pods["Tabs Content"];

  const tabsList = useMemo(() => {
    if (Array.isArray(tabs)) {
      return tabs.filter((tab, index) => {
        if (tab.id && tab.label) {
          return true;
        }

        console.log(`Invalid tab item ${++index}`);

        return false;
      });
    }

    return [];
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
      className={ cn(
        "bl-customComponent-tabs", classList,
        `bl-customComponent-tabs--${variant}`, { "bl-customComponent-tabs--disabled": disabled }
      ) }>
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
