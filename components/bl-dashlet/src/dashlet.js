import { useCallback, useEffect, useMemo, useState } from 'react';

import { getPosition, StyleVariants, useDraggable } from './helpers';
import { ResizableBox } from './react-resizable.min';
import { CollapseButtonIcon, ContextMenu } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export function Dashlet(props) {
  const {
    rootRef, isOpen, height, width, setIsOpen, setPosition, setSize,
    position, contextBlocksHandler, dashletContentPod, component,
  } = props;
  const {
    title, resizing, contextBlocks, minWidth, maxWidth,
    minHeight, maxHeight, draggable, styleVariant,
  } = component;

  const [resizeMaxWidth, setResizeMaxWidth] = useState(maxWidth);
  const [resizeMaxHeight, setResizeMaxHeight] = useState(maxHeight);

  const style = useMemo(() => {
    if (!resizing || !isOpen) {
      return {
        height: isOpen ? height + 'px' : 'auto',
        width : width + 'px',
      };
    }

    return {};
  }, [height, width, isOpen]);

  useEffect(() => setResizeMaxHeight(maxHeight), [maxHeight]);
  useEffect(() => setResizeMaxWidth(maxWidth), [maxWidth]);

  const onCollapseButtonClick = () => {
    setIsOpen(state => !state);
  };

  useEffect(() => {
    if (position) {
      rootRef.current.style.transform = `translate(${ position.x }px, ${ position.y }px)`;
    }
  }, [position]);

  const handleDrag = useCallback(coords => {
    const position = getPosition(rootRef, coords);

    setPosition(position);

    return position;
  }, []);

  const [ref] = useDraggable({
    onDrag         : handleDrag,
    rootRef        : rootRef,
    initialPosition: position,
    draggable,
  });

  const onResizeStop = useCallback((e, { size: { height, width } }) => {
    setResizeMaxWidth(maxWidth);
    setResizeMaxHeight(maxHeight);
    setSize({ width, height });
  }, [maxWidth, maxHeight]);

  const onResize = useCallback((e, data) => {
    const { top, left, width, height } = rootRef.current.parentElement.getBoundingClientRect();

    const parentElementOffsetLeft = left + window.pageXOffset;
    const parentElementOffsetTop = top + window.pageYOffset;

    const resizingRestrictionsInParentX = e.pageX >= width + parentElementOffsetLeft;
    const resizingRestrictionsInParentY = e.pageY >= height + parentElementOffsetTop;

    if (resizingRestrictionsInParentX) {
      setResizeMaxWidth(data.size.width);
    }

    if (resizingRestrictionsInParentY) {
      setResizeMaxHeight(data.size.height);
    }
  }, []);

  const DashletComponent = (
    <div className={ cn('dashlet', StyleVariants[styleVariant], { 'close': !isOpen }) } style={ style }>
      <div
        ref={ ref }
        className={ cn('dashlet__header', StyleVariants[styleVariant], { draggable }) }>
        <button type="button" className="dashlet__collapse-button" onClick={ onCollapseButtonClick }>
          <CollapseButtonIcon isOpen={ isOpen } styleVariant={ styleVariant }/>
        </button>
        <h4 className={ cn('dashlet__title', StyleVariants[styleVariant]) }>{ title }</h4>

        { contextBlocks && (
          <ContextMenu
            contextBlocks={ contextBlocks }
            contextBlocksHandler={ contextBlocksHandler }
            styleVariant={ styleVariant }
          />
        ) }

      </div>

      { isOpen && (
        <div className="dashlet__body">
          { dashletContentPod.render() }
        </div>
      ) }

    </div>
  );

  if (resizing && isOpen) {
    return (
      <ResizableBox
        onResizeStop={ onResizeStop }
        onResize={ onResize }
        height={ height }
        width={ width }
        minConstraints={ [minWidth, minHeight] }
        maxConstraints={ [resizeMaxWidth || Infinity, resizeMaxHeight || Infinity] }>
        { DashletComponent }
      </ResizableBox>
    );
  }

  return DashletComponent;
}
