import { useMemo, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function CollapsiblePanelComponent({ component, elRef, eventHandlers, pods }) {
  const { classList, style, display, title, activeTitle } = component;
  const { onOpen, onClose } = eventHandlers;

  const [isActive, setIsActive] = useState(false);
  const [podClass, setPodClass] = useState('');

  const togglePanel = activeState => {
    if(activeState) {
      setIsActive(false);
      setPodClass('close');
      onClose();
    } else {
      setIsActive(true);
      setPodClass('open');
      onOpen();
    }
  };

  const titleToShow = useMemo(() => {
    if (!title) {
      return null;
    }

    return isActive ? activeTitle || title : title;
  }, [isActive, activeTitle, title]);

  component.show = () => togglePanel();
  component.hide = () => togglePanel(true);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-collapsiblePanel', ...classList) } style={ style }>
      <PanelTitle title={ titleToShow } isActive={ isActive } onClick={ togglePanel } />
      <div className={ cn('panel-content', podClass) }>
        { pods['panelContent'].render() }
      </div>
    </div>
  );
}

export function PanelTitle({ title, isActive, onClick }) {
  return (
    <div className="panel-title" aria-expanded={ isActive } role="button" onClick={ () => onClick(isActive) }>
      <span className="panel-title-text">{ title }</span>
      <CollapseIcon active={ isActive } />
    </div>
  );
}

function CollapseIcon({ active }) {
  return (
    <svg
      className={ cn('collapse-icon', { 'active': active }) }
      focusable="false"
      aria-hidden="true"
      stroke-width="1.5"
      viewBox="0 0 24 24">
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
    </svg>
  );
}
