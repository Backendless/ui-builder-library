import { useMemo } from 'react';

import { getSaturationByCount } from './helpers';

export function Legend({ maxCount, minCount, hslColor, legend, margin, legendRef }) {
  const colorsGradation = useMemo(() => (
    getGraduatedColors(hslColor, maxCount, minCount)
  ), [hslColor, maxCount, minCount]);

  return (
    <div ref={ legendRef } className="legend" style={{ marginLeft: `${ margin }px` }}>
      { legend && (
        <p className="legend-text">{ legend }</p>
      ) }
      <div className="legend-container">
        <span>Less</span>
        <svg className="legend-color-gradation">
          <rect width="10" height="10" x="0" y="0" fill={ colorsGradation[0] }></rect>
          <rect width="10" height="10" x="15" y="0" fill={ colorsGradation[1] }></rect>
          <rect width="10" height="10" x="30" y="0" fill={ colorsGradation[2] }></rect>
          <rect width="10" height="10" x="45" y="0" fill={ colorsGradation[3] }></rect>
          <rect width="10" height="10" x="60" y="0" fill={ colorsGradation[4] }></rect>
        </svg>
        <span>More</span>
      </div>
    </div>
  );
}

const getGraduatedColors = (hslColor, maxCount, minCount) => {
  const colorsGradation = [];
  const part = maxCount / 4;

  for (let i = 0; i < 5; i++) {
    const count = part * i;
    const rateOfSaturation = getSaturationByCount(maxCount, minCount, count);
    const { h, l } = hslColor;

    colorsGradation.push(`hsl(${ h }, ${ rateOfSaturation }%, ${ l }%)`);
  }

    return colorsGradation;
};
