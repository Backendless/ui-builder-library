import { useEffect, useMemo, useRef } from 'react';

import { s } from './lib/granim.min';

const { cn } = BackendlessUI.CSSUtils;
const DIRECTIONS = ['left-right', 'diagonal', 'top-bottom', 'radial',  'custom'];
const DIRECTIONS_MAP = DIRECTIONS.reduce((a, v) => ({ ...a, [v]: 1}), {});
const BLENDING_MODES = ['multiply', 'screen', 'normal', 'overlay', 'darken', 'lighten', 'lighter', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
const BLENDING_MODES_MAP = BLENDING_MODES.reduce((a, v) => ({ ...a, [v]: 1}), {});
const DEFAULT_CUSTOM_DIRECTION = {
  x0: '0px',
  y0: '0px',
  x1: '100%',
  y1: '100%'
}

export default function GranimComponent({ component, elRef, eventHandlers, pods }) {
  const {
    style, classList, display, direction, customDirection, states, isPausedWhenNotInView, scrollDebounceThreshold,
    stateTransitionSpeed, imageSource, imagePosX, imagePosY, stretchModeX, stretchModeY, blendingMode,
  } = component;
  const { onStart, onGradientChange, onEnd } = eventHandlers;

  const image = useMemo(() => {
    return (imageSource && {
      source: imageSource,
      position: [imagePosX, imagePosY],
      stretchMode: [stretchModeX, stretchModeY],
      blendingMode,
    });
  }, [imageSource, imagePosX, imagePosY, stretchModeX, stretchModeY, blendingMode]);

  const canvasInstRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const shouldCreateCanvasInst = states && !canvasInstRef.current;
    const shouldUpdateCanvasInst = states && canvasInstRef.current;

    if (shouldCreateCanvasInst) {
      canvasInstRef.current = new Granim({
        element: canvasRef.current,
        isPausedWhenNotInView,
        scrollDebounceThreshold,
        stateTransitionSpeed,
        direction,
        customDirection: customDirection || DEFAULT_CUSTOM_DIRECTION,
        image,
        states,
        onStart,
        onGradientChange,
        onEnd,
      });
    } else if (shouldUpdateCanvasInst) {
      canvasInstRef.current.setDirection(direction);
      canvasInstRef.current.setCustomDirection(customDirection || DEFAULT_CUSTOM_DIRECTION);
      canvasInstRef.current.setImage(image);
      canvasInstRef.current.setStates(states);
      canvasInstRef.current.setPaused(isPausedWhenNotInView);
      canvasInstRef.current.setScrollDebounceThreshold(scrollDebounceThreshold);
      canvasInstRef.current.setStateTransitionSpeed(stateTransitionSpeed);
      canvasInstRef.current.setBlendingMode(blendingMode);
    }

    return () => {
      if (canvasInstRef.current) {
        canvasInstRef.current.destroy();
        canvasInstRef.current = null;
      }
    }
  }, [direction, customDirection, states, isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed]);

  component.changeState = (stateName) => {
    if(states?.[stateName]) {
      canvasInstRef.current.changeState(stateName);
    }
  }

  component.changeDirection = (directionName) => {
    if(DIRECTIONS_MAP[directionName]) {
      canvasInstRef.current.changeDirection(directionName);
    }
  }

  component.changeBlendingMode = (blendingModeName) => {
    if(BLENDING_MODES_MAP[blendingModeName]) {
      canvasInstRef.current.changeBlendingMode(blendingModeName);
    }
  }

  component.play = () => canvasInstRef.current.play();
  component.pause = () => canvasInstRef.current.pause();
  component.clear = () => canvasInstRef.current.clear();
  component.destroy = () => canvasInstRef.current.destroy();

  if(!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-granim', ...classList) } style={ style } ref={ elRef }>
      <canvas className="canvas" ref={ canvasRef } />
      <div className="content">{ pods['granimContent'].render() }</div>
    </div>
  );
}
