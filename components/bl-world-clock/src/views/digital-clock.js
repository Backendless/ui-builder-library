import { DigitalClockFlip } from './digital-types/digital-clock-flip';
import { DigitalClockModern } from './digital-types/digital-clock-modern';
import { DigitalClockPixel } from './digital-types/digital-clock-pixel';
import { DigitalClockTechno } from './digital-types/digital-clock-techno';
import { Label } from './helpers';

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

export function DigitalClock({ time, label, clockStyle, displaySeconds, labelVisibility }) {
  const Clock = DigitalClockViews[clockStyle];

  return (
    <div className={ cn('digital', clockStyle) }>
      <Clock time={ time } displaySeconds={ displaySeconds }/>
      { labelVisibility && <Label content={ label }/> }
    </div>
  );
}
