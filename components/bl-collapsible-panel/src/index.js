import { useCallback, useEffect, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function CollapsiblePanelComponent({ component, elRef, eventHandlers, pods }) {
  const { classList, style, display, title, multiline, isExpanded } = component;
  const { onExpand, onCollapse } = eventHandlers;

  const [expanded, setExpanded] = useState(isExpanded);
  const [withAnimation, setWithAnimation] = useState(false);

  const className = cn('bl-customComponent-collapsiblePanel', classList, {
    'panel-expanded': expanded,
    'with-animation': withAnimation
  });

  const togglePanel = useCallback((expanded) => {
    setExpanded(!expanded);
    setWithAnimation(true);

    const handler = expanded ? onCollapse : onExpand;

    handler();
  }, []);

  useEffect(() => display && setWithAnimation(false), [display]);

  component.expand = () => !expanded && togglePanel(false);
  component.collapse = () => expanded && togglePanel(true);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ className } style={ style }>
      <PanelTitle title={ title } expanded={ expanded } onClick={ togglePanel } multiline={ multiline } />

      <div className={ cn('panel-content', { 'close': !expanded }) }>
        { pods['panelContent'].render() }
      </div>
    </div>
  );
}

function PanelTitle({ title, multiline, expanded, onClick }) {
  return (
    <div className="panel-title" aria-expanded={ expanded } role="button" onClick={ () => onClick(expanded) }>
      <span className={ cn('panel-title-text', multiline ? 'multiline' : 'oneline' ) }>{ title }</span>

      <svg
        className="collapse-icon"
        focusable="false"
        aria-hidden="true"
        strokeWidth="1.5"
        viewBox="0 0 24 24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        <path fill="none" d="M0 0h24v24H0V0z"></path>
      </svg>
    </div>
  );
}
