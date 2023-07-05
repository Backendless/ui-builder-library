import { useEffect, useRef } from 'react';

export function useDocumentEvents(events, callback) {
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
