import { useRef } from 'react';

import { useStyles } from './use-styles';

import { IgrTreemap, IgrTreemapModule } from './lib/igr-treemap.umd.js';

const { cn } = BackendlessUI.CSSUtils;

IgrTreemapModule.register();

export default function TreemapComponent({ component, elRef }) {
  const {
    classList, style, display, disabled, title, width, height,
    fillBrushes, fillScaleLogarithmic, headerDisplayMode, data
  } = component;

  const treemapRef = useRef();
  const styles = useStyles(style, width, height);

  if (!display) {
    return null;
  }

  return (
    <div
      ref={ elRef }
      style={ styles }
      className={ cn("bl-customComponent-treemap", classList, { "bl-customComponent-treemap--disabled": disabled }) }>

      <IgrTreemap
        ref={ treemapRef }
        height="100%"
        width="100%"
        rootTitle={ title }
        valueMemberPath="value"
        parentIdMemberPath="parent"
        labelMemberPath="label"
        dataSource={ data }
        fillBrushes={ fillBrushes }
        headerDisplayMode={ headerDisplayMode }
        isFillScaleLogarithmic={ fillScaleLogarithmic }
      />
    </div>
  );
}
