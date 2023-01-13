import { useState } from 'react';
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
  const transitionsContainerPod = pods['transitionsContainer'];

  const [visibility, setVisibility] = useState(display);
  const [isOpen, setIsOpen] = useState(display);

  const Transitions = transitionsViews[variants];

  useVisibility(display, setIsOpen, setVisibility, animationDuration);

  if (!visibility) {
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
