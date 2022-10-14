import { useState, useMemo, useEffect } from 'react';

const { cn } = BackendlessUI.CSSUtils;

export function Dashlet(props) {
  const {
    title, rootRef, width, height, isOpen, setIsOpen, setPosition, position,
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
      rootRef.current.style.left = position.left + 'px';
      rootRef.current.style.top = position.top + 'px';
    }
  }, [position]);

  const onMouseDown = (event) => {
    if (dragging) {
      event.preventDefault();

      const element = rootRef.current;

      let shiftX = event.clientX - element.getBoundingClientRect().left;
      let shiftY = event.clientY - element.getBoundingClientRect().top;

      const moveAt = (pageX, pageY) => {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
      };

      moveAt(event.pageX, event.pageY);

      const onMouseMove = (event) => {
        moveAt(event.pageX, event.pageY);
      };

      document.addEventListener('mousemove', onMouseMove);

      element.onmouseup = function(event) {
        const left = event.pageX - shiftX;
        const top = event.pageY - shiftY;

        setPosition({ left, top });

        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
      };
    }
  };

  return (
    <div className={ cn('dashlet', { 'close': !isOpen }) } style={ style }>
      <div
        draggable={ dragging }
        onDragStart={ onMouseDown }
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

function ContextMenu({ contextBlock, contextBlockHandler }) {
  return (
    <div className="dashlet__context-block">
      <ul className="dashlet__context-block-list">
        { contextBlock.map(({ label, type, content }) => {
          if (type === 'link') {
            return <ContextBlockLink content={ content } label={ label }/>;
          } else if (type === 'action') {
            return (
              <ContextBlockAction
                content={ content }
                label={ label }
                contextBlockHandler={ contextBlockHandler }
              />
            );
          }
        }) }
      </ul>
    </div>
  );
}

function ContextBlockLink({ content, label }) {
  return (
    <li>
      <a className="dashlet__context-block-item link" href={ content } target="_blank">
        <ContextBlockItemIcon/>
        { label }
      </a>
    </li>
  );
}

function ContextBlockAction({ content, label, contextBlockHandler }) {
  return (
    <li>
      <button
        className="dashlet__context-block-item action"
        type="button"
        onClick={ () => contextBlockHandler({ content }) }>
        <ContextBlockItemIcon/>
        { label }
      </button>
    </li>
  );
}

function ContextBlockButtonIcon() {
  return (
    <svg className="dashlet__context-block-button-icon" viewBox="0 0 24 24">
      <path
        d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
    </svg>
  );
}

function CollapseButtonIcon({ isOpen }) {
  return (
    <svg
      className="collapse-icon"
      style={ { transform: isOpen ? 'rotate(180deg)' : 'rotate(90deg)' } }
      viewBox="0 0 24 24">
      <path d="M24 22h-24l12-20z"/>
    </svg>
  );
}

function ContextBlockItemIcon() {
  return (
    <svg className="dashlet__context-block-item-icon" viewBox="0 0 24 24">
      <path
        d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/>
    </svg>
  );
}
