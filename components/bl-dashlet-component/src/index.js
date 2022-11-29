import { useRef, useState, useCallback, useEffect } from 'react';
import { ResizableBox } from './react-resizable.min';
import { Dashlet } from './dashlet';

const { cn } = BackendlessUI.CSSUtils;

export default function DashletComponent({ component, eventHandlers, pods, instanceId }) {
  const {
    display, classList, style, title, height, width, resizing,
    contextBlock, minWidth, maxWidth, minHeight, maxHeight, dragging
  } = component;
  const { contextBlockHandler } = eventHandlers;
  const dashletContentPod = pods['dashletContent'];

  const rootRef = useRef();

  const [resizeMaxWidth, setResizeMaxWidth] = useState(maxWidth);
  const [resizeMaxHeight, setResizeMaxHeight] = useState(maxHeight);

  const [isOpen, setIsOpen] = useState(() => {
    if (localStorage.getItem(instanceId + ' isOpen')) {
      return localStorage.getItem(instanceId + ' isOpen') === 'true';
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
      return JSON.parse(localStorage.getItem(instanceId + ' size'));
    }

    return { height: height, width: width };
  });

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

  const onResizeStop = useCallback((e, data) => {
    setResizeMaxWidth(maxWidth);
    setResizeMaxHeight(maxHeight);
    setSize({ width: data.size.width, height: data.size.height });
  }, []);

  const onResize = useCallback((e, data) => {
    const parentElementOffsetLeft = rootRef.current.parentElement.getBoundingClientRect().left + window.pageXOffset;
    const parentElementWidth = rootRef.current.parentElement.getBoundingClientRect().width;
    const parentElementOffsetTop = rootRef.current.parentElement.getBoundingClientRect().top + window.pageYOffset;
    const parentElementHeight = rootRef.current.parentElement.getBoundingClientRect().height;

    if (e.pageX >= parentElementWidth + parentElementOffsetLeft) {
      setResizeMaxWidth(data.size.width);
    }

    if (e.pageY >= parentElementHeight + parentElementOffsetTop) {
      setResizeMaxHeight(data.size.height);
    }
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
          onResize={ onResize }
          height={ size.height }
          width={ size.width }
          minConstraints={ [minWidth, minHeight] }
          maxConstraints={ [resizeMaxWidth, resizeMaxHeight] }>
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
