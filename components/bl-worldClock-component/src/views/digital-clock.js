import { DigitalClockFlip } from './digital-types/DigitalClockFlip';
import { DigitalClockPixel } from './digital-types/DigitalClockPixel';
import { DigitalClockTechno } from './digital-types/DigitalClockTechno';

const { cn } = BackendlessUI.CSSUtils;

const DigitalClockTypes = {
  flip  : DigitalClockFlip,
  pixel : DigitalClockPixel,
  techno: DigitalClockTechno,
};

export function DigitalClock({ time, label, clockSubType, displaySeconds }) {
  const { hour, minute, second, isAmpm, ampm } = time;
  const Clock = DigitalClockTypes[clockSubType];

  return (
    <div className={ cn('digital', clockSubType) }>
      { Clock ? (
        <Clock time={ time } displaySeconds={ displaySeconds }/>
      ) : (
        <div className="clock-time">
          <span className="hour">{ hour }</span>
          <span className="separator">:</span>
          <span className="minute">{ minute }</span>

          { displaySeconds && (
            <>
              <span className="separator">:</span>
              <span className="second">{ second }</span>
            </>
          ) }

          { isAmpm && (
            <span className="ampm">{ ampm }</span>
          ) }
        </div>
      ) }

      <div className="clock-label"><span className="clock-label-text">{ label }</span></div>
    </div>
  );
}
