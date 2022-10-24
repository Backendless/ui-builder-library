import { useState, useEffect, useMemo } from 'react';

import { Tab } from './tab';

const { cn } = BackendlessUI.CSSUtils;

export default function TabsComponent({ component, eventHandlers, appData, pageData, parentDataModel, pods }) {
  const { classList, style, display, disabled, tabs } = component;
  const { onTabChange } = eventHandlers;

  const [currentTabId, setCurrentTabId] = useState(null);

  component.setCurrentTabId = id => {
    setCurrentTabId(id);

    if (onTabChange) {
      onTabChange({ currentTabId: id });
    }
  };
  component.getCurrentTabId = () => currentTabId;

  const podsContent = pods["Tabs Content"];

  const tabsList = useMemo(() => {
    const result = [];

    if(Array.isArray(tabs)){
      tabs.forEach(tab => {
        if(tab.id && tab.label) {
          result.push({ id: tab.id, label: tab.label });
        }
      });
    }

    return result;
  }, [tabs]);

  useEffect(() => {
    const currentTab = tabsList.find(tab => tab.id === currentTabId);

    if (!currentTab) {
      setCurrentTabId(tabsList[0] && tabsList[0].id || null);
    }
  }, [currentTabId, tabsList]);

  useEffect(() => {
    podsContent.dataModel.currentTabId = currentTabId;
  }, [currentTabId]);

  const handleClickTab = id => {
    setCurrentTabId(id);

    if (onTabChange) {
      onTabChange({ currentTabId: id });
    }
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-tabs", classList, { disabled }) } style={ style }>
      <div className="tabs">
        { tabsList.map(({ id, label }) => (
          <Tab
            key={ id }
            id={ id }
            label={ label }
            isActive={ currentTabId === id }
            handleClick={ handleClickTab }
          />
        )) }
      </div>

      <div className="tabs-content">
        { podsContent.render() }
      </div>
    </div>
  )
}
