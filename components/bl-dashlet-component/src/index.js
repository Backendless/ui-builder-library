import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { ResizableBox } from './react-resizable.min';
import { Dashlet } from './dashlet';

const { cn } = BackendlessUI.CSSUtils;

export default function DashletComponent({ component, eventHandlers, pods, instanceId }) {
  const {
    display, classList, style, title, height, width, resizing,
    contextBlock, minWidth, maxWidth, minHeight, maxHeight, dragging
  } = component;
  const { contextBlockHandler } = eventHandlers;

  const [isOpen, setIsOpen] = useState(() => {
    if (localStorage.getItem(instanceId + ' isOpen')) {
      return setIsOpen(localStorage.getItem(instanceId + ' isOpen') === 'true');
    }

    return true;
  });

  const [position, setPosition] = useState(() => {
    if (localStorage.getItem(instanceId + ' position')) {
      return JSON.parse(localStorage.getItem(instanceId + ' position'));
    }

    return { x: 0, y: 0 };
  });

  const [size, setSize] = useState(() => {
    if (localStorage.getItem(instanceId + ' size')) {
      return setSize(JSON.parse(localStorage.getItem(instanceId + ' size')));
    }

    return { height: height, width: width };
  });

  const rootRef = useRef();

  const dashletContentPod = pods['dashletContent'];

  component.setSize = (size) => {
    setSize(size);
  };

  component.getSize = () => {
    return size;
  };

  component.setPosition = (position) => {
    setPosition(position);
  };

  component.getPosition = () => {
    return position;
  };

  component.setIsOpen = (isOpen) => {
    setIsOpen(isOpen);
  };

  component.getIsOpen = () => {
    return isOpen;
  };

  useEffect(() => {
    localStorage.setItem(instanceId + ' position', JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    localStorage.setItem(instanceId + ' size', JSON.stringify(size));
  }, [size]);

  useEffect(() => {
    localStorage.setItem(instanceId + ' isOpen', String(isOpen));
  }, [isOpen]);

  const dashletSize = useMemo(() => ({
    height: height,
    width : width,
  }), [height, width]);

  const onResizeStop = useCallback((e, data) => {
    dashletSize.height = data.size.height;
    dashletSize.width = data.size.width;

    setSize({ width: dashletSize.width, height: dashletSize.height });
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ rootRef }
      className={ cn('bl-customComponent-dashlet', classList) }
      style={ { ...style } }>
      { resizing && isOpen ? (
        <ResizableBox
          onResizeStop={ onResizeStop }
          height={ size.height }
          width={ size.width }
          minConstraints={ [minWidth, minHeight] }
          maxConstraints={ [maxWidth, maxHeight] }>
          <Dashlet
            rootRef={ rootRef }
            title={ title }
            contextBlock={ contextBlock }
            contextBlockHandler={ contextBlockHandler }
            dashletContentPod={ dashletContentPod }
            isOpen={ isOpen }
            setIsOpen={ setIsOpen }
            position={ position }
            setPosition={ setPosition }
            dragging={ dragging }
          />
        </ResizableBox>
      ) : (
        <Dashlet
          rootRef={ rootRef }
          title={ title }
          contextBlock={ contextBlock }
          contextBlockHandler={ contextBlockHandler }
          dashletContentPod={ dashletContentPod }
          width={ size.width }
          height={ size.height }
          isOpen={ isOpen }
          setIsOpen={ setIsOpen }
          position={ position }
          setPosition={ setPosition }
          dragging={ dragging }
        />
      ) }
    </div>
  );
}
