import { useCallback, useState } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export default function CollapsiblePanelComponent({ component, elRef, eventHandlers, pods }) {
  const { classList, style, display, title } = component;
  const { onExpand, onCollapse } = eventHandlers;

  const [expanded, setExpanded] = useState(false);
  const [withAnimation, setWithAnimation] = useState(false);

  const className = cn('bl-customComponent-collapsiblePanel', ...classList, {
    'panel-expanded': expanded,
    'with-animation': withAnimation
  });

  const showContent = useCallback(() => {
    setExpanded(true);
    setWithAnimation(true);
    onExpand();
  }, []);

  const hideContent = useCallback(() => {
    setExpanded(false);
    setWithAnimation(true);
    onCollapse();
  }, []);

  const togglePanel = useCallback(() => {
      expanded ? hideContent() : showContent();
    }, [expanded, hideContent, showContent]);

  component.expand = showContent;
  component.collapse = hideContent;

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ className } style={ style }>
      <PanelTitle title={ title } expanded={ expanded } onClick={ togglePanel } />

      <div className={ cn('panel-content', { 'close': !expanded }) }>
        { pods['panelContent'].render() }
      </div>
    </div>
  );
}

function PanelTitle({ title, expanded, onClick }) {
  return (
    <div className="panel-title" aria-expanded={ expanded } role="button" onClick={ onClick }>
      <span className="panel-title-text">{ title }</span>

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
