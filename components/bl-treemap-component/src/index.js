import { useMemo } from 'react';
import TreeMap from "./lib/treemap.min.js";

const { cn } = BackendlessUI.CSSUtils;

export default function MyCustomComponent({ component }) {
  const { classList, display, disabled, label, valueUnit, width, height, data } = component;

  const treemapId = useMemo(() => BackendlessUI.UUID.short(), []);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-treemap", classList, { disabled }) }>
      <TreeMap
        id={ treemapId }
        width={ width }
        height={ height }
        data={ { name: label, children: data } }
        valueUnit={ valueUnit }
      />
    </div>
  );
}
