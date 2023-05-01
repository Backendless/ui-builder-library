import { DigitalClockFlip } from './digital-types/DigitalClockFlip';
import { DigitalClockModern } from './digital-types/DigitalClockModern';
import { DigitalClockPixel } from './digital-types/DigitalClockPixel';
import { DigitalClockTechno } from './digital-types/DigitalClockTechno';

const { cn } = BackendlessUI.CSSUtils;

const DigitalClockTypes = {
  FLIP  : 'flip',
  MODERN: 'modern',
  PIXEL : 'pixel',
  TECHNO: 'techno',
};
const DigitalClockViews = {
  [DigitalClockTypes.FLIP]  : DigitalClockFlip,
  [DigitalClockTypes.MODERN]: DigitalClockModern,
  [DigitalClockTypes.PIXEL] : DigitalClockPixel,
  [DigitalClockTypes.TECHNO]: DigitalClockTechno,
};

export function DigitalClock({ time, label, type, displaySeconds }) {
  const Clock = DigitalClockViews[type];

  return (
    <div className={ cn('digital', type) }>
      { Clock && (
        <Clock time={ time } displaySeconds={ displaySeconds }/>
      ) }

      <div className="clock-label"><span className="clock-label-text">{ label }</span></div>
    </div>
  );
}
