import { useCallback, useEffect, useMemo, useState } from 'react';

const { normalizeDimensionValue } = BackendlessUI.CSSUtils;

const ESCAPE_KEY_CODE = 27;

const Placement = {
  TOP   : 'top',
  RIGHT : 'right',
  BOTTOM: 'bottom',
  LEFT  : 'left',
};

const SizeMap = {
  [Placement.TOP]   : size => ({ height: size, bottom: 'auto' }),
  [Placement.RIGHT] : size => ({ width: size, left: 'auto' }),
  [Placement.BOTTOM]: size => ({ height: size, top: 'auto' }),
  [Placement.LEFT]  : size => ({ width: size, right: 'auto' }),
};

const TransformMap = {
  [Placement.TOP]   : 'translateY(-100%)',
  [Placement.RIGHT] : 'translateX(100%)',
  [Placement.BOTTOM]: 'translateY(100%)',
  [Placement.LEFT]  : 'translateX(-100%)',
};

export function useDrawerActions(component, eventHandlers, drawerContentRef, drawerContainerRef) {
  const { onOpen, onClose } = eventHandlers;
  const { placement, animationDuration, isOpen } = component;

  const [visibility, setVisibility] = useState(false);

  const openContent = event => {
    event?.stopPropagation();

    setVisibility(true);
    onOpen();
  };

  const closeContent = useCallback(event => {
    event?.stopPropagation();

    if (!visibility) {
      return;
    }

    drawerContentRef.current.style.transform = TransformMap[placement];
    drawerContainerRef.current.classList.remove('backdrop');

    setTimeout(() => setVisibility(false), animationDuration);
    onClose();
  }, [animationDuration, drawerContainerRef, drawerContentRef, onClose, placement, visibility]);

  useEffect(() => {
    setVisibility(isOpen);
  }, [isOpen]);

  component.open = event => openContent(event);
  component.close = event => closeContent(event);

  return { visibility, openContent, closeContent };
}

export function useDrawerStyles(component) {
  const { placement, size, backdropVisibility, animationDuration } = component;

  const sizeStyles = useMemo(() => {
    const validSize = normalizeDimensionValue(size);

    return SizeMap[placement](validSize);
  }, [placement, size]);

  const transitionDurationStyles = useMemo(() => (
    { transitionDuration: animationDuration + 'ms' }
  ), [animationDuration]);

  const containerStyles = useMemo(() => (
    backdropVisibility ? transitionDurationStyles : sizeStyles
  ), [backdropVisibility, sizeStyles, transitionDurationStyles]);

  const contentStyles = useMemo(() => {
    const animationStyles = { ...transitionDurationStyles, transform: TransformMap[placement] };

    return backdropVisibility ? { ...sizeStyles, ...animationStyles } : animationStyles;
  }, [backdropVisibility, placement, sizeStyles, transitionDurationStyles]);

  return { containerStyles, contentStyles };
}

export function useCloseEvents(drawerContentRef, closeContent, component) {
  const { closeOnClickOutside, closeOnEscape } = component;

  const handleEscClick = event => {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      closeContent(event);
    }
  };

  const handleClickOutsideDrawer = event => {
    if (!drawerContentRef.current.contains(event.target)) {
      closeContent(event);
    }
  };

  useEffect(() => {
    if (closeOnClickOutside) {
      document.addEventListener('click', handleClickOutsideDrawer);
    }

    if (closeOnEscape) {
      document.addEventListener('keydown', handleEscClick);
    }

    return () => {
      document.removeEventListener('click', handleClickOutsideDrawer);
      document.removeEventListener('keydown', handleEscClick);
    };
  }, []);
}
