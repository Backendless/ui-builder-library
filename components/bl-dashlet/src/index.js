import { useEffect, useMemo, useRef, useState } from 'react';

import { Dashlet } from './dashlet';
import { Storage } from './storage';

const { cn } = BackendlessUI.CSSUtils;

export default function DashletComponent({ component, eventHandlers, pods, instanceId }) {
  const { display, classList, style, localStorageEnabled, height, width, dragging } = component;
  const { contextBlocksHandler } = eventHandlers;
  const dashletContentPod = pods['dashletContent'];

  const rootRef = useRef();

  const storage = useMemo(() => new Storage(instanceId), []);

  const [isOpen, setIsOpen] = useState(storage.isOpen);
  const [position, setPosition] = useState(storage.position || { x: 0, y: 0 });
  const [size, setSize] = useState(storage.size || { height, width });

  useEffect(() => {
    if (!storage.size) {
      setSize({ height, width });
    }
  }, [height, width]);

  useEffect(() => {
    if (!height && rootRef.current) {
      setSize(state => ({ ...state, height: rootRef.current.clientHeight }));
    }
  }, [rootRef, height]);

  useEffect(() => {
    if (!width && rootRef.current) {
      setSize(state => ({ ...state, width: rootRef.current.clientWidth }));
    }
  }, [rootRef, width]);

  useComponentActions(component, size, setSize, position, setPosition, isOpen, setIsOpen);
  useLocalSettings(localStorageEnabled, storage, position, size, isOpen);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ rootRef }
      className={ cn('bl-customComponent-dashlet', classList, { dragging }) }
      style={ style }>
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
    getIsOpen  : () => isOpen,
  });
};

const useLocalSettings = (localStorageEnabled, storage, position, size, isOpen) => {
  useEffect(() => {
    if (localStorageEnabled) {
      storage.position = position;
    }
  }, [position, localStorageEnabled]);

  useEffect(() => {
    if (localStorageEnabled) {
      storage.size = size;
    }
  }, [size, localStorageEnabled]);

  useEffect(() => {
    if (localStorageEnabled) {
      storage.isOpen = isOpen;
    }
  }, [isOpen, localStorageEnabled]);
};
