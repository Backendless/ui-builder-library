import { DigitalClockTechno } from './digital-subtypes/DigitalClockTechno';
import { DigitalClockFlip } from './digital-subtypes/DigitalClockFlip';
import { DigitalClockPixel } from './digital-subtypes/DigitalClockPixel';

const { cn } = BackendlessUI.CSSUtils;

export function DigitalClock({ time, label, clockSubType, displaySeconds }) {
  const hour = time.hour;
  const minute = time.minute;
  const second = time.second;
  const weekday = time.weekday;
  const isAmpm = time.isAmpm;
  const ampm = time.ampm;
  const isPM = ampm === 'PM' ? true : false;

  return (
    <div className={ cn('digital', clockSubType) }>
      { clockSubType === 'pixel' && (
        <DigitalClockPixel
          time={ [hour, minute, second] }
          displaySeconds={ displaySeconds }
          ampm={ ampm }
          isAmpm={ isAmpm }/>
      ) }

      { clockSubType === 'techno' && (
        <DigitalClockTechno
          hour={ hour }
          minute={ minute }
          second={ second }
          displaySeconds={ displaySeconds }
          weekday={ weekday }
          isAmpm={ isAmpm }
          isPM={ isPM } />
      ) }

      { clockSubType === 'flip' && (
        <DigitalClockFlip
          hour={ hour }
          minute={ minute }
          second={ second }
          displaySeconds={ displaySeconds }
          ampm={ ampm }
          isAmpm={ isAmpm } />
      ) }

      { clockSubType === 'modern' && (
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
