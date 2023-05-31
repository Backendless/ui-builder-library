import { useEffect, useState } from 'react';

import { CollapseLeft } from './collapse-left';
import { CollapseTop } from './collapse-top';
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
  const { onEndAnimation, onStartAnimation, onMounted, onUnmounted } = eventHandlers;

  const [isContentLoaded, setIsContentLoaded] = useState(!dynamicContent);
  const [isOpen, setIsOpen] = useState(false);

  const transitionsContainerPod = pods['transitionsContainer'];
  const Transition = transitionsViews[variant];

  component.setContentLoaded = () => setIsContentLoaded(true);
  component.setIsOpen = isOpen => setIsOpen(isOpen);

  useEffect(() => {
    if (isOpen) {
      onStartAnimation();

      setTimeout(() => {
        onEndAnimation();
      }, duration);
    } else {
      setTimeout(() => {
        onEndAnimation();
      }, duration);
    }
  }, [isOpen, duration]);

  useEffect(() => {
    onMounted();

    return () => onUnmounted();
  }, []);

  if (!display) {
    return null;
  }

  return (
    <Transition
      component={ component }
      eventHandlers={ eventHandlers }
      transitionsContainerPod={ transitionsContainerPod }
      isOpen={ isOpen }
      isContentLoaded={ isContentLoaded }
    />
  );
}
