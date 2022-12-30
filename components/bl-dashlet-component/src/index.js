import { useRef, useState, useEffect, useMemo } from 'react';
import { Dashlet } from './dashlet';
import { Storage } from './storage';

const { cn } = BackendlessUI.CSSUtils;

export default function DashletComponent({ component, eventHandlers, pods, instanceId }) {
  const { display, classList, style, height, width } = component;
  const { contextBlocksHandler } = eventHandlers;
  const dashletContentPod = pods['dashletContent'];

  const rootRef = useRef();

  const storage = useMemo(() => new Storage(instanceId), []);

  const [isOpen, setIsOpen] = useState(storage.isOpen);
  const [position, setPosition] = useState(storage.position || { x: 0, y: 0 });
  const [size, setSize] = useState(storage.size || { height, width });

  useComponentActions(component, size, setSize, position, setPosition, isOpen, setIsOpen);
  useLocalSettings(storage, position, size, isOpen);

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

const useLocalSettings = (storage, position, size, isOpen) => {
  useEffect(() => {
    storage.position = position;
  }, [position]);

  useEffect(() => {
    storage.size = size;
  }, [size]);

  useEffect(() => {
    storage.isOpen = isOpen;
  }, [isOpen]);
};
