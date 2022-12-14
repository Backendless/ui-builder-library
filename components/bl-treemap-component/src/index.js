import { useRef } from 'react';

import { IgrTreemap } from './lib/igr-treemap.umd.js';
import { IgrTreemapModule } from './lib/igr-treemap.umd.js';

const { cn } = BackendlessUI.CSSUtils;

IgrTreemapModule.register();

export default function TreemapComponent({ component }) {
  const {
    classList, style, display, disabled, label, width, height,
    fillBrushes, fillScaleLogarithmic, headerDisplayMode, data
  } = component;

  const treemapRef = useRef();

  const styles = {
    ...style,
    width: `${width}px`,
    height: `${height}px`,
  };

  if (!display) {
    return null;
  }

  return (
    <div
      style={ styles }
      className={ cn("bl-customComponent-treemap", classList, { "bl-customComponent-treemap--disabled": disabled }) }>
      <IgrTreemap
        ref={ treemapRef }
        height="100%"
        width="100%"
        rootTitle={ label }
        valueMemberPath="value"
        parentIdMemberPath="parent"
        labelMemberPath="label"
        idMemberPath="label"
        dataSource={ data }
        fillBrushes={ fillBrushes }
        headerDisplayMode={ headerDisplayMode }
        isFillScaleLogarithmic={ fillScaleLogarithmic }
      />
    </div>
  );
}
