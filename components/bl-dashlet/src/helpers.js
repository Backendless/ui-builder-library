import { useCallback, useEffect, useRef, useState } from 'react';

export const StyleVariants = {
  'default'    : '',
  'alternative': 'alternative',
};

export const ContextMenuItemTypes = {
  LINK  : 'link',
  ACTION: 'action',
};

export const useDraggable = ({ onDrag, rootRef, initialPosition, draggable, setPosition }) => {
  const [pressed, setPressed] = useState(false);

  const position = useRef({ x: initialPosition.x, y: initialPosition.y });
  const ref = useRef();

  const unsubscribe = useRef();
  const legacyRef = useCallback(elem => {
    if (draggable) {
      ref.current = elem;

      if (unsubscribe.current) {
        unsubscribe.current();
      }

      if (!elem) {
        return;
      }

      const handleMouseDown = e => {
        e.target.style.userSelect = 'none';
        setPressed(true);
      };

      elem.addEventListener('mousedown', handleMouseDown);
      unsubscribe.current = () => {
        elem.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [draggable]);

  useEffect(() => position.current = initialPosition, [initialPosition]);

  useEffect(() => {
    if (!pressed) {
      return;
    }

    if (draggable) {
      const handleMouseMove = throttle(event => {
        if (!rootRef.current || !position.current) {
          return;
        }

        const pos = position.current;
        const elem = rootRef.current;

        position.current = onDrag({
          x: pos.x + event.movementX,
          y: pos.y + event.movementY,
        });

        elem.style.transform = `translate(${ pos.x }px, ${ pos.y }px)`;
      });

      const handleMouseUp = e => {
        e.target.style.userSelect = 'auto';
        setPosition(position.current);
        setPressed(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        handleMouseMove.cancel();

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [pressed, onDrag, draggable]);

  if (!draggable) {
    return [null];
  }

  return [legacyRef, pressed];
};

const throttle = f => {
  let token = null, lastArgs = null;

  const invoke = () => {
    f(...lastArgs);
    token = null;
  };

  const result = (...args) => {
    lastArgs = args;

    if (!token) {
      token = requestAnimationFrame(invoke);
    }
  };

  result.cancel = () => token && cancelAnimationFrame(token);

  return result;
};

export const getPosition = (ref, coords) => {
  const rootOffsetTop = ref.current.clientTop;
  const { clientWidth: refClientWidth, clientHeight: refClientHeight } = ref.current;
  const { clientWidth: parentClientWidth, clientHeight: parentClientHeight } = ref.current.parentElement;

  return {
    x: Math.max(
      0,
      Math.min(parentClientWidth - refClientWidth, coords.x)
    ),
    y: Math.max(
      (0 - rootOffsetTop),
      Math.min(parentClientHeight - refClientHeight, coords.y)
    ),
  };
};

export const handleOverflow = (button, menu) => {
  if (!button || !menu) {
    return {};
  }

  return {
    right: button.getBoundingClientRect().left + menu.getBoundingClientRect().width < window.innerWidth,
    top  : button.getBoundingClientRect().bottom + menu.getBoundingClientRect().height > window.innerHeight,
  };
};

function useDocumentEvents(events, callback) {
  const callbackRef = useRef();

  callbackRef.current = callback;

  useEffect(() => {
    const handler = event => {
      callbackRef.current(event);
    };

    for (const eventName of events) {
      on(document, eventName, handler);
    }

    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  }, [events]);
}

function on(obj, ...args) {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...args);
  }
}

function off(obj, ...args) {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...args);
  }
}

const defaultEvents = ['mousedown', 'touchstart'];

export function useClickAway(elements, onClickAway, events = defaultEvents) {
  elements = Array.isArray(elements) ? elements : [elements];

  useDocumentEvents(events, event => {
    let clickedByElement = false;

    for (const el of elements) {
      if (el && el.contains && el.contains(event.target)) {
        clickedByElement = true;
      }
    }

    if (!clickedByElement) {
      onClickAway();
    }
  });
}
