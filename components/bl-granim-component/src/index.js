import { useEffect, useMemo, useRef } from 'react';

import { s } from './lib/granim.min';

const { cn } = BackendlessUI.CSSUtils;
const DIRECTIONS = ['left-right', 'diagonal', 'top-bottom', 'radial',  'custom'];
const DIRECTIONS_MAP = dataMap(DIRECTIONS);
const BLENDING_MODES = [
  'multiply', 'screen', 'normal', 'overlay', 'darken', 'lighten', 'lighter', 'color-dodge', 'color-burn',
  'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
const BLENDING_MODES_MAP = dataMap(BLENDING_MODES);
const DEFAULT_CUSTOM_DIRECTION = {
  x0: '0px',
  y0: '0px',
  x1: '100%',
  y1: '100%'
};

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
    if(states) {
      if (!canvasInstRef.current) {
        canvasInstRef.current = new Granim({
          element: canvasRef.current,
          customDirection: customDirection || DEFAULT_CUSTOM_DIRECTION,
          isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed,
          direction, image, states, onStart, onGradientChange, onEnd
        });
      }
    }

    return () => {
      if (canvasInstRef.current) {
        canvasInstRef.current.destroy();
        canvasInstRef.current = null;
      }
    }
  }, [direction, customDirection, states, isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed]);

  useCanvasInstance(canvasInstRef, 'direction', direction);
  useCanvasInstance(canvasInstRef, 'customDirection', customDirection || DEFAULT_CUSTOM_DIRECTION);
  useCanvasInstance(canvasInstRef, 'states', states);
  useCanvasInstance(canvasInstRef, 'isPausedWhenNotInView', isPausedWhenNotInView);
  useCanvasInstance(canvasInstRef, 'scrollDebounceThreshold', scrollDebounceThreshold);
  useCanvasInstance(canvasInstRef, 'stateTransitionSpeed', stateTransitionSpeed);

  component.changeState = (stateName) => {
    if(states?.[stateName]) {
      canvasInstRef.current.changeState(stateName);
    } else {
      console.error(`Error: Invalid state name '${ stateName }'`);
    }
  }

  component.changeDirection = (directionName) => {
    if(DIRECTIONS_MAP[directionName]) {
      canvasInstRef.current.changeDirection(directionName);
    } else {
      console.error(`Error: Invalid direction name '${ directionName }'`);
    }
  }

  component.changeBlendingMode = (blendingModeName) => {
    if(BLENDING_MODES_MAP[blendingModeName]) {
      canvasInstRef.current.changeBlendingMode(blendingModeName);
    } else {
      console.error(`Error: Invalid blending mode name '${ blendingModeName }'`);
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

function dataMap(data) {
  return data.reduce((a, v) => ({ ...a, [v]: 1}), {});
}

function useCanvasInstance(canvasInstRef, option, value) {
  useEffect(() => {
    if (canvasInstRef.current) {
      canvasInstRef.current[option] = value;
    }
  }, [canvasInstRef, value]);
}
