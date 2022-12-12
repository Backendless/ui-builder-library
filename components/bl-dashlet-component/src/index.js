import { useRef, useState, useEffect } from 'react';
import { Dashlet } from './dashlet';
import { LocalSettings } from './local-settings';

const { cn } = BackendlessUI.CSSUtils;

export default function DashletComponent({ component, eventHandlers, pods, instanceId }) {
  const { display, classList, style, height, width } = component;
  const { contextBlocksHandler } = eventHandlers;
  const dashletContentPod = pods['dashletContent'];

  const rootRef = useRef();

  const localSettings = new LocalSettings(instanceId);

  const [isOpen, setIsOpen] = useState(localSettings.isOpen);

  const [position, setPosition] = useState(localSettings.position);

  const [size, setSize] = useState(localSettings.size || { height, width });

  useComponentActions(component, size, setSize, position, setPosition, isOpen, setIsOpen);

  useEffect(() => {
    localSettings.position = position;
  }, [position]);

  useEffect(() => {
    localSettings.size = size;
  }, [size]);

  useEffect(() => {
    localSettings.isOpen = isOpen;
  }, [isOpen]);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ rootRef }
      className={ cn('bl-customComponent-dashlet', classList) }
      style={ { ...style } }>
      <Dashlet
        rootRef={ rootRef }
        component={ component }
        contextBlocksHandler={ contextBlocksHandler }
        dashletContentPod={ dashletContentPod }
        width={ size.width }
        height={ size.height }
        isOpen={ isOpen }
        setIsOpen={ setIsOpen }
        position={ position }
        setPosition={ setPosition }
        setSize={ setSize }
      />
    </div>
  );
}

const useComponentActions = (component, size, setSize, position, setPosition, isOpen, setIsOpen) => {
  Object.assign(component, {
    setSize    : size => setSize(size),
    getSize    : () => size,
    setPosition: position => setPosition(position),
    getPosition: () => position,
    setIsOpen  : isOpen => setIsOpen(isOpen),
    getIsOpen  : () => isOpen
  });
};
