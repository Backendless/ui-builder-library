import { useRef, useMemo, useEffect, useCallback, useState } from "react";

const { cn } = BackendlessUI.CSSUtils;

const AxisClassesMap = {
  X: { left: "start-0", right: "end-0", center: "start-50 translate-middle-x" },
  Y: { top: "top-0", bottom: "bottom-0", center: "top-50  translate-middle-y" },
};

export default function TotopComponent({ component }) {
  const {
    classList, display, offset, position, backgroundColor, color, size, iconSize, indentX, indentY, element
  } = component;

  const [isTotopVisible, setIsTotopVisible] = useState(true);

  component.hide = () => {
    setIsTotopVisible(false);
  };

  component.show = () => {
    setIsTotopVisible(true);
  };

  const axisPositions = position.split("-");

  const classes = useMemo(() => {
    return [...classList, AxisClassesMap.X[axisPositions[1]], AxisClassesMap.Y[axisPositions[0]]];
  }, [axisPositions]);

  const styles = useMemo(() => {
    return {
      backgroundColor,
      width: size,
      height: size,
      "--totop-indent-x": indentX,
      "--totop-indent-y": indentY,
    };
  }, [backgroundColor, size, indentX, indentY]);

  const iconStyles = useMemo(() => {
    return { width: iconSize, height: iconSize, fill: color };
  }, [iconSize, color]);

  const offsetTop = element?.el?.offsetTop || 0;

  const handleScroll = useCallback(() => {
    window.scrollTo({ top: offsetTop + offset, behavior: "smooth" });
  }, [offsetTop, offset]);

  const totopRef = useRef();

  useEffect(() => {
    component.el = totopRef.current;
  }, [totopRef]);

  if (!display || !isTotopVisible) {
    return null;
  }

  return (
    <div ref={ totopRef } className={ cn("bl-customComponent-totop", classes) } style={ styles } onClick={ handleScroll }>
      <TotopIcon styles={ iconStyles } />
    </div>
  );
}

function TotopIcon({ styles }) {
  return (
    <div className="totop__icon" style={ styles }>
      <svg viewBox="0 0 330 330">
        <path d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z" />
      </svg>
    </div>
  );
}
