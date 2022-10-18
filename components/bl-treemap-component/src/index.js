import { useMemo } from 'react';
import TreeMap, { ColorModel, NumberOfChildrenPlacement } from './lib/treemap.min.js';

const { cn } = BackendlessUI.CSSUtils;

export default function TreemapComponent({ component }) {
  const {
    classList, style, display, disabled, label, width, height, valueUnit, paddingInner, nameFontSize, data,
    valueVisibility, breadcrumbVisibility, numberOfChildrenVisibility, model, numberOfChildrenPlacement
  } = component;

  const treemapId = useMemo(() => BackendlessUI.UUID.short(), []);

  if (!display) {
    return null;
  }

  return (
    <div className={ cn("bl-customComponent-treemap", classList, { disabled }) } style={ style }>
      <TreeMap
        id={ treemapId }
        width={ width }
        height={ height }
        valueUnit={ valueUnit }
        nodeStyle={{
          fontSize: nameFontSize,
          paddingLeft: 5
        }}
        tooltipOffsetY={ 400 }
        paddingInner={ paddingInner }
        hideValue={ !valueVisibility }
        colorModel={ ColorModel[model] }
        data={ { name: label, children: data } }
        disableBreadcrumb={ !breadcrumbVisibility }
        hideNumberOfChildren={ !numberOfChildrenVisibility }
        numberOfChildrenPlacement={ NumberOfChildrenPlacement[numberOfChildrenPlacement] }
      />
    </div>
  );
}
