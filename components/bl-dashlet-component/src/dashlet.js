import { useState, useMemo, useEffect, useCallback } from 'react';
import { useDraggable } from './helpers';
import { CollapseButtonIcon, ContextMenu, ContextBlockButtonIcon } from './subcomponents';

const { cn } = BackendlessUI.CSSUtils;

export function Dashlet(props) {
  const {
    title, rootRef, isOpen, height, width, setIsOpen, setPosition, position,
    dragging, contextBlock, contextBlockHandler, dashletContentPod
  } = props;

  const [isContextOpen, setIsContextOpen] = useState(false);

  const style = useMemo(() => ({
    height: isOpen ? height + 'px' : 'auto',
    width : width + 'px',
  }), [height, width, isOpen]);

  const onCollapseButtonClick = () => {
    setIsOpen(state => !state);
  };

  const onContextBlockButtonClick = () => {
    setIsContextOpen(state => !state);
  };

  useEffect(() => {
    if (position) {
      rootRef.current.style.transform = `translate(${ position.x }px, ${ position.y }px)`;
    }
  }, [position]);

  const rootOffsetTop = useMemo(() => {
    if (rootRef.current) {
      return rootRef.current.clientTop;
    }

    return 0;
  }, [rootRef.current]);

  const handleDrag = useCallback(({ x, y }) => {
    const position = {
      x: Math.max(0, Math.min(rootRef.current.parentElement.clientWidth - rootRef.current.clientWidth, x)),
      y: Math.max((0 - rootOffsetTop), Math.min(rootRef.current.parentElement.clientHeight - rootRef.current.clientHeight, y))
    };

    setPosition(position);

    return position;
  }, []);

  const [ref] = useDraggable({
    onDrag         : handleDrag,
    rootRef        : rootRef,
    initialPosition: position,
  });

  return (
    <div className={ cn('dashlet', { 'close': !isOpen }) } style={ style }>
      <div
        ref={ ref }
        className="dashlet__header"
        style={ { cursor: dragging ? 'move' : 'auto' } }>
        <button type="button" className="dashlet__collapse-button" onClick={ onCollapseButtonClick }>
          <CollapseButtonIcon isOpen={ isOpen }/>
        </button>
        <h4 className="dashlet__title">{ title }</h4>
        { contextBlock && (
          <button className="dashlet__context-block-button" onClick={ onContextBlockButtonClick }>
            <ContextBlockButtonIcon/>
            { isContextOpen && (
              <ContextMenu contextBlock={ contextBlock } contextBlockHandler={ contextBlockHandler }/>
            ) }
          </button>
        ) }
      </div>
      { isOpen && (
        <div className="dashlet__body">
          { dashletContentPod.render() }
        </div>
      ) }
    </div>
  );
}
