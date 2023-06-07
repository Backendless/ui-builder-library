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
  const { variant, display, dynamicContent } = component;
  const { onEndAnimation, onStartAnimation, onMounted, onUnmounted } = eventHandlers;

  const [isContentLoaded, setIsContentLoaded] = useState(!dynamicContent);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpen, setHasOpen] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  const transitionsContainerPod = pods['transitionsContainer'];
  const Transition = transitionsViews[variant];

  component.setContentLoaded = () => setIsContentLoaded(true);
  component.getIsOpen = () => isOpen;
  component.setIsOpen = isOpen => setIsOpen(isOpen && isContentLoaded);

  useEffect(() => {
    if (isOpen) {
      setHasOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isTransition) {
      onStartAnimation();
    } else if (hasOpen) {
      onEndAnimation();
    }
  }, [isTransition]);

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
      setIsTransition={ setIsTransition }
      eventHandlers={ eventHandlers }
      transitionsContainerPod={ transitionsContainerPod }
      isOpen={ isOpen }
      isContentLoaded={ isContentLoaded }
      hasOpen={ hasOpen }
    />
  );
}
