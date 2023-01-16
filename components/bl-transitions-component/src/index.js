import { useState, useEffect } from 'react';
import { useVisibility } from './use-visibility';
import { CollapseLeft } from './collapse-left';
import { CollapseTop } from './collapse-top';
import { Others } from './others';

const transitionsViews = {
  'collapse-top' : CollapseTop,
  'collapse-left': CollapseLeft,
  'fade'         : Others,
  'grow'         : Others,
  'zoom'         : Others
};

export default function Transitions({ component, eventHandlers, pods }) {
  const { variants, display, animationDuration } = component;

  const [transitionsContainerPod, setTransitionsContainerPod] = useState()
  const [visibility, setVisibility] = useState(display);
  const [isOpen, setIsOpen] = useState(display);

  useEffect(() => {
    try {
      setTransitionsContainerPod(pods['transitionsContainer']);
    } catch {
      console.warn('add content into pod for component "Transitions"');
    }
  }, []);

  const Transitions = transitionsViews[variants];

  useVisibility(display, setIsOpen, setVisibility, animationDuration);

  if (!visibility || !transitionsContainerPod) {
    return null;
  }

  return (
    <Transitions
      component={ component }
      eventHandlers={ eventHandlers }
      transitionsContainerPod={ transitionsContainerPod }
      isOpen={ isOpen }
      setIsOpen={ setIsOpen }
    />
  );
}
