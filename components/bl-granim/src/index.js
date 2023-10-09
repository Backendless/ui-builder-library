import { useEffect, useMemo, useRef } from 'react';

import './lib/granim.min';

const { cn } = BackendlessUI.CSSUtils;
const DIRECTIONS = ['left-right', 'diagonal', 'top-bottom', 'radial',  'custom'];
const DIRECTIONS_MAP = mapFromArray(DIRECTIONS);
const BLENDING_MODES = [
  'multiply', 'screen', 'normal', 'overlay', 'darken', 'lighten', 'lighter', 'color-dodge', 'color-burn',
  'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
const BLENDING_MODES_MAP = mapFromArray(BLENDING_MODES);
const DEFAULT_CUSTOM_DIRECTION = {
  x0: '0px',
  y0: '0px',
  x1: '100%',
  y1: '100%',
};
const DEFAULT_STATE = {
  gradients: [
    ['#834d9b', '#d04ed6'],
    ['#1CD8D2', '#93EDC7']],
  transitionSpeed: 5000,
  loop: true,
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
    if (display && states && !canvasInstRef.current) {
      if (!states['default-state']) {
        states['default-state'] = DEFAULT_STATE;
      }

      canvasInstRef.current = new window.Granim({
        element: canvasRef.current,
        customDirection: customDirection || DEFAULT_CUSTOM_DIRECTION,
        isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed,
        direction, image, states, onStart, onGradientChange, onEnd,
      });
    }

    return () => {
      if (canvasInstRef.current) {
        canvasInstRef.current.destroy();
        canvasInstRef.current = null;
      }
    };
  }, [display, direction, image, customDirection, states,
    isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed]);

  trackOptionChanges(canvasInstRef, direction, customDirection, states,
    isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed);

  component.changeState = stateName => {
    if (display && canvasInstRef.current) {
      if (states?.[stateName]) {
        canvasInstRef.current.changeState(stateName);
      } else {
        console.error(`Error: Invalid state name '${ stateName }'`);
      }
    }
  };

  component.changeDirection = directionName => {
    if (display && canvasInstRef.current) {
      if (DIRECTIONS_MAP[directionName]) {
        canvasInstRef.current.changeDirection(directionName);
      } else {
        console.error(`Error: Invalid direction name '${ directionName }'`);
      }
    }
  };

  component.changeBlendingMode = blendingModeName => {
    if (display && canvasInstRef.current) {
      if (BLENDING_MODES_MAP[blendingModeName]) {
        canvasInstRef.current.changeBlendingMode(blendingModeName);
      } else {
        console.error(`Error: Invalid blending mode name '${ blendingModeName }'`);
      }
    }
  };

  Object.assign(component, {
    play : () => canvasInstRef.current.play(),
    pause: () => canvasInstRef.current.pause(),
    clear: () => canvasInstRef.current.clear(),
  });

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-granim', ...classList) } style={ style } ref={ elRef }>
      <canvas className="canvas" ref={ canvasRef } />
      <div className="content">{ pods['granimContent'].render() }</div>
    </div>
  );
}

function mapFromArray(array) {
  return array.reduce((a, v) => ({ ...a, [v]: 1 }), {});
}

function useOptions(canvasInstRef, option, value) {
  useEffect(() => {
    if (canvasInstRef.current) {
      canvasInstRef.current[option] = value;
    }
  }, [canvasInstRef, value]);
}

function trackOptionChanges(canvasInstRef, direction, customDirection, states,
  isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed) {
  useOptions(canvasInstRef, 'direction', direction);
  useOptions(canvasInstRef, 'customDirection', customDirection || DEFAULT_CUSTOM_DIRECTION);
  useOptions(canvasInstRef, 'states', states);
  useOptions(canvasInstRef, 'isPausedWhenNotInView', isPausedWhenNotInView);
  useOptions(canvasInstRef, 'scrollDebounceThreshold', scrollDebounceThreshold);
  useOptions(canvasInstRef, 'stateTransitionSpeed', stateTransitionSpeed);
}
