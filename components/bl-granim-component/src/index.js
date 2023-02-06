import { useEffect, useRef } from "react";

import { s } from "./lib/granim.min";

const { cn } = BackendlessUI.CSSUtils;

const DIRECTIONS = ["left-right", "diagonal", "top-bottom", "radial", "custom"];
const BLENDING_MODE = [
  "multiply", "screen", "normal", "overlay", "darken", "lighten", "lighter", "color-dodge", "color-burn",
  "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity",
];

export default function GranimComponent({ component, elRef, eventHandlers, pods }) {
  const {
    style, classList, display, direction, customDirection, states, isPausedWhenNotInView, scrollDebounceThreshold,
    stateTransitionSpeed, imageSource, imagePosX, imagePosY, stretchModeX, stretchModeY, blendingMode,
  } = component;
  const { onStart, onGradientChange, onEnd } = eventHandlers;

  const granimContentPod = pods["granimContent"];

  const canvasInstRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (direction === "custom" && !customDirection) {
      return;
    }

    if (!states) {
      return;
    }

    canvasInstRef.current = new Granim({
      element: canvasRef.current,
      name: "granim",
      isPausedWhenNotInView,
      scrollDebounceThreshold,
      stateTransitionSpeed,
      direction,
      customDirection: direction === "custom" ? customDirection : {},
      image: imageSource
        ? {
            source: imageSource,
            position: [imagePosX, imagePosY],
            stretchMode: [stretchModeX, stretchModeY],
            blendingMode,
          }
        : undefined,
      states,
      onStart,
      onGradientChange,
      onEnd,
    });
  }, [
    direction, customDirection, states, isPausedWhenNotInView, scrollDebounceThreshold, stateTransitionSpeed,
    imageSource, imagePosX, imagePosY, stretchModeX, stretchModeY, blendingMode,
  ]);

  component.changeState = (stateName) => {
    if (states && states.hasOwnProperty(stateName)) {
      canvasInstRef.current.changeState(stateName);
    }
  };

  component.changeDirection = (directionName) => {
    if (DIRECTIONS.includes(directionName)) {
      canvasInstRef.current.changeDirection(directionName);
    }
  };

  component.changeBlendingMode = (blendingModeName) => {
    if (BLENDING_MODE.includes(blendingModeName)) {
      canvasInstRef.current.changeBlendingMode(blendingModeName);
    }
  };

  component.play = () => canvasInstRef.current.play();
  component.pause = () => canvasInstRef.current.pause();
  component.clear = () => canvasInstRef.current.clear();
  component.destroy = () => canvasInstRef.current.destroy();

  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-granim", ...classList) } style={ style } ref={ elRef }>
      <canvas className="granim-canvas" ref={ canvasRef } />
      <div className="granim-content">{ granimContentPod.render() }</div>
    </div>
  );
}
