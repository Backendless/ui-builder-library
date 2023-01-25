import { useEffect, useMemo, useRef } from "react";

import s from "./lib/granim.min";

const { cn } = BackendlessUI.CSSUtils;

const COLORS_DEFAULT = [
  ["#ff9966", "#ff5e62"],
  ["#00F260", "#0575E6"],
  ["#e1eec3", "#f05053"],
];

export default function GranimComponent({ component, eventHandlers, pods }) {
  const {
    style,
    classList,
    direction,
    x0,
    y0,
    x1,
    y1,
    colors,
    imageSource,
    imagePosX,
    imagePosY,
    stretchModeX,
    stretchModeY,
    blendingMode,
    isPausedWhenNotInView,
    scrollDebounceThreshold,
    transitionSpeed,
    loop,
  } = component;

  const { onStart, onGradientChange, onEnd } = eventHandlers;

  const granimContentPod = pods["granimContent"];

  const canvasRef = useRef(null);
  const canvasId = useMemo(() => BackendlessUI.UUID.short(), []);

  useEffect(() => {
    canvasRef.current = new Granim({
      element: ".granim-canvas",
      name: "granim",
      opacity: [1, 1],
      isPausedWhenNotInView,
      scrollDebounceThreshold,
      image: imageSource
        ? {
            source: imageSource,
            position: [imagePosX, imagePosY],
            stretchMode: [stretchModeX, stretchModeY],
            blendingMode,
          }
        : undefined,
      direction,
      customDirection: direction === "custom" && x0 && y0 && x1 && y1 ? { x0: x0, y0: y0, x1: x1, y1: y1 } : {},
      states: {
        "default-state": {
          gradients: colors ? colors : COLORS_DEFAULT,
          transitionSpeed,
          loop,
        },
      },
      onStart,
      onGradientChange: (colorDetails) => onGradientChange({ colorDetails: colorDetails }),
      onEnd,
    });
  }, []);

  const granimRef = useRef(null);

  useEffect(() => {
    component.el = granimRef.current;
  }, []);

  return (
    <div className={ cn("bl-customComponent-granim", ...classList) } style={ style } ref={ granimRef }>
      <canvas className="granim-canvas" ref={ canvasRef } id={ canvasId } />
      <div className="granim-content">{ granimContentPod.render() }</div>
    </div>
  );
}
