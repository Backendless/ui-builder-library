import { useEffect, useMemo, useRef, useState } from 'react';

import { useItemsState } from './helpers';
import { Item } from './item';

const { cn } = BackendlessUI.CSSUtils;

export default function AccordionComponent({ component, eventHandlers }) {
  const { classList, display, accordionData, controlledAccordion, style } = component;
  const { onMouseOver, onMouseOut } = eventHandlers;

  const accordionRef = useRef(null);
  const accordionId = useMemo(() => BackendlessUI.UUID.short(), []);
  const [isLoaded, setIsLoaded] = useState(false);

  const data = useMemo(() => {
    return Array.isArray(accordionData) ? accordionData : null;
  }, [accordionData]);

  const error = useMemo(() => {
    const errorMessage = 'Invalid Accordion Data property in the Accordion Component. Make sure the property has ' +
      'defined an array of objects.';

    return isLoaded && !data ? errorMessage : null;
  }, [data, isLoaded]);

  const { stateStore, handleToggle, updateItemsState } = useItemsState(data, controlledAccordion, eventHandlers);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  component.el = accordionRef.current;
  component.closeAll = () => updateItemsState(() => false);
  component.openAll = () => updateItemsState(() => true);
  component.toggleAll = () => updateItemsState(oldState => !oldState);

  if (!display || error) {
    return null;
  }

  return (
    <div
      ref={ accordionRef }
      className={ cn('bl-customComponent-accordion', classList) }
      onMouseOver={ onMouseOver }
      onMouseOut={ onMouseOut }
      style={ style }>
      { data?.map((item, index) => (
        <Item
          key={ index }
          item={ item }
          index={ index }
          component={ component }
          accordionId={ accordionId }
          active={ stateStore[index] }
          onToggle={ () => handleToggle(item, index) }
        />
      )) }
    </div>
  );
}
