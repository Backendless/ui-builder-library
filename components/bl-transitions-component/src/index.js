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
  const { variant, display, duration, dynamicContent } = component;
  const { onEndAnimation } = eventHandlers;

  const [isContentLoaded, setIsContentLoaded] = useState(!dynamicContent);

  const transitionsContainerPod = pods['transitionsContainer'];
  const Transitions = transitionsViews[variant];

  const isOpen = useVisibility(display, duration, onEndAnimation);

  component.setContentLoaded = () => setIsContentLoaded(true);

  if (!isOpen) {
    return null;
  }

  return (
    <Transitions
      component={ component }
      eventHandlers={ eventHandlers }
      transitionsContainerPod={ transitionsContainerPod }
      display={ display }
      dynamicContent={ dynamicContent }
      isContentLoaded={ isContentLoaded }
    />
  );
}
