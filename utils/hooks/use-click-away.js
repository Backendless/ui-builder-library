import { useDocumentEvents } from './use-document-events';

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
