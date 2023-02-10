import { useEffect, useState, useMemo } from "react";

const { cn } = BackendlessUI.CSSUtils;

export default function CollapsiblePanelComponent({ component, elRef, eventHandlers, pods }) {
  const {
    style, classList, display, width, titleOpen, titleDefault, background, color, iconColor, fontSize, padding
  } = component;
  const { onOpen, onClose } = eventHandlers;

  const [active, setActive] = useState(null);

  const panelContentPod = pods["panelContent"];

  const titleStyles = {
    background,
    color,
    fontSize,
    padding,
  };

  const changeActive = () => setActive(active ? false : true);

  useEffect(() => {
    if (active) {
      onOpen();
    } else {
      onClose();
    }
  }, [active]);

  const title = useMemo(() => {
    if (!titleDefault) {
      return;
    }

    return active ? titleOpen || titleDefault : titleDefault;
  }, [active, titleOpen, titleDefault]);

  component.show = () => setActive(true);
  component.hide = () => setActive(false);

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn("bl-customComponent-collapsiblePanel", ...classList) }
      style={{ ...style, width }}
      ref={ elRef }
    >
      <PanelTitle
        styles={ titleStyles }
        onClickFunction={ changeActive }
        title={ title }
        isActive={ active }
        iconColor={ iconColor }
      />
      <div
        className={ `panel-content ${active ? "open" : active !== null ? "close" : ""}` }
        onOpen={ onOpen }
        onClose={ onClose }
      >
        { panelContentPod.render() }
      </div>
    </div>
  );
}

export function PanelTitle(props) {
  const { styles, title, isActive, onClickFunction, iconColor } = props;

  const handleClick = () => onClickFunction(isActive);

  return (
    <div className="panel-title" style={ styles } aria-expanded={ isActive } role="button" onClick={ handleClick }>
      { title }
      <CollapseIcon active={ isActive } fill={ iconColor } />
    </div>
  );
}

function CollapseIcon({ active, fill }) {
  return (
    <svg
      className={ `collapse-icon ${active ? "active" : ""}` }
      focusable="false"
      aria-hidden="true"
      stroke-width="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill={ fill }></path>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
    </svg>
  );
}
