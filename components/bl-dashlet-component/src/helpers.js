import { useRef, useState, useEffect, useCallback } from 'react';

export const StyleVariants = {
  'default'    : '',
  'alternative': 'alternative'
};

export const ContextBlockItemTypes = {
  LINK  : 'link',
  ACTION: 'action'
};

export const useDraggable = ({ onDrag, rootRef, initialPosition, dragging }) => {
  if (dragging) {
    const [pressed, setPressed] = useState(false);

    const position = useRef({ x: initialPosition.x, y: initialPosition.y });
    const ref = useRef();

    const unsubscribe = useRef();
    const legacyRef = useCallback((elem) => {
      ref.current = elem;

      if (unsubscribe.current) {
        unsubscribe.current();
      }

      if (!elem) {
        return;
      }

      const handleMouseDown = (e) => {
        e.target.style.userSelect = 'none';
        setPressed(true);
      };

      elem.addEventListener('mousedown', handleMouseDown);
      unsubscribe.current = () => {
        elem.removeEventListener('mousedown', handleMouseDown);
      };
    }, []);

    useEffect(() => {
      if (!pressed) {
        return;
      }

      const handleMouseMove = throttle((event) => {
        if (!rootRef.current || !position.current) {
          return;
        }

        const pos = position.current;
        const elem = rootRef.current;

        position.current = onDrag({
          x: pos.x + event.movementX,
          y: pos.y + event.movementY
        });

        elem.style.transform = `translate(${ pos.x }px, ${ pos.y }px)`;
      });

      const handleMouseUp = (e) => {
        e.target.style.userSelect = 'auto';
        setPressed(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        handleMouseMove.cancel();

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [pressed, onDrag]);

    return [legacyRef, pressed];
  }

  return [null];
};

const throttle = (f) => {
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

  return {
    x: Math.max(
      0,
      Math.min(ref.current.parentElement.clientWidth - ref.current.clientWidth, coords.x)
    ),
    y: Math.max(
      (0 - rootOffsetTop),
      Math.min(ref.current.parentElement.clientHeight - ref.current.clientHeight, coords.y)
    )
  };
};
