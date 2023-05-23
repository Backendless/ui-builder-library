import { getSaturationByCount } from './helpers';

export function Legend({ maxCount, hslColor, legend, margin, legendRef }) {
  return (
    <div ref={ legendRef } className="legend" style={{ marginLeft: `${ margin }px` }}>
      { legend && (
        <p className="legend-text">{ legend }</p>
      ) }
      <div className="legend-container">
        <span>Less</span>
        <svg className="legend-color-gradation">
          <rect width="10" height="10" x="0" y="0" fill="#eee"></rect>
          <rect width="10" height="10" x="15" y="0" fill={ getGraduatedColor(hslColor, maxCount, 1) }></rect>
          <rect width="10" height="10" x="30" y="0" fill={ getGraduatedColor(hslColor, maxCount, 2) }></rect>
          <rect width="10" height="10" x="45" y="0" fill={ getGraduatedColor(hslColor, maxCount, 3) }></rect>
          <rect width="10" height="10" x="60" y="0" fill={ getGraduatedColor(hslColor, maxCount, 4) }></rect>
        </svg>
        <span>More</span>
      </div>
    </div>
  );
}

const getGraduatedColor = (hslColor, maxCount, num) => {
  const part = maxCount / 4;
  const count = part * num;
  const rateOfSaturation = getSaturationByCount(maxCount, count);
  const { h, l } = hslColor;

  return `hsl(${ h }, ${ rateOfSaturation }%, ${ l }%)`;
};
