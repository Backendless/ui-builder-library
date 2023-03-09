import { useCallback, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function CollapsiblePanelComponent({ component, elRef, eventHandlers, pods }) {
  const { classList, style, display, title } = component;
  const { onOpen, onClose } = eventHandlers;

  const [isActive, setIsActive] = useState(false);
  const [podClass, setPodClass] = useState('');

  const showContent = () => {
    setIsActive(true);
    setPodClass('open');
    onOpen();
  }

  const hideContent = () => {
    setIsActive(false);
    setPodClass('close');
    onClose();
  }

  const togglePanel = useCallback(() => {
    isActive ? hideContent() : showContent()
  }, [isActive, hideContent, showContent]);

  component.show = showContent;
  component.hide = hideContent;

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-collapsiblePanel', ...classList) } style={ style }>
      <PanelTitle title={ title } isActive={ isActive } onClick={ togglePanel } />
      <div className={ cn('panel-content', podClass) }>{ pods['panelContent'].render() }</div>
    </div>
  );
}

function PanelTitle({ title, isActive, onClick }) {
  return (
    <div className="panel-title" aria-expanded={ isActive } role="button" onClick={ onClick }>
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
