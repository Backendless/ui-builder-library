import { useState, useMemo } from 'react';

import { useItemsState } from './helpers';
import { Item } from './item';

const { cn } = BackendlessUI.CSSUtils;

export default function AccordionComponent({ component, eventHandlers }) {
  const { classList, display, accordionData, controlledAccordion, style } = component;
  const { onClick, onMouseOver, onMouseOut } = eventHandlers;
  
  const accordionId = useMemo(() => BackendlessUI.UUID.short(), []);

  const { stateStore, handleToggle, updateItemsState } = useItemsState(accordionData, onClick, controlledAccordion);

  component.closeAll = () => updateItemsState(() => false);
  component.openAll = () => updateItemsState(() => true);
  component.toggleAll = () => updateItemsState(oldState => !oldState);

  if (!display || !Array.isArray(accordionData)) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-accordion', classList) } 
      onMouseOver={ onMouseOver } 
      onMouseOut={ onMouseOut } 
      style={ style }>
      { accordionData.map((item, index) => {
        return (
          <Item
            key={ index }
            item={ item }
            index={ index }
            component={ component }
            accordionId={ accordionId }
            active={ stateStore[index] }
            onToggle={ () => handleToggle(item, index) }
          />
        );
      })}
    </div>
  );
}
 