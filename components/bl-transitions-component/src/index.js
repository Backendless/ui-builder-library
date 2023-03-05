import { useState } from 'react';

import { CollapseLeft } from './collapse-left';
import { CollapseTop } from './collapse-top';
import { useVisibility } from './helpers';
import { Others } from './others';

const transitionsViews = {
  'collapse-top' : CollapseTop,
  'collapse-left': CollapseLeft,
  'fade'         : Others,
  'grow'         : Others,
  'zoom'         : Others,
};

export default function Transitions({ component, eventHandlers, pods }) {
  const { variants, display, duration } = component;
  const { onEndAnimation } = eventHandlers;

  const [isOpen, setIsOpen] = useState(display);

  const transitionsContainerPod = pods['transitionsContainer'];
  const Transitions = transitionsViews[variants];

  useVisibility(display, isOpen, setIsOpen, duration, onEndAnimation);

  if (!isOpen) {
    return null;
  }

  return (
    <Transitions
      component={ component }
      eventHandlers={ eventHandlers }
      transitionsContainerPod={ transitionsContainerPod }
      display={ display }
    />
  );
}
