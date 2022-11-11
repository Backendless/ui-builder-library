import { ClockComponent } from './clock-component';
import { Stopwatch } from './stopwatch';
import { Timer } from './timer.js';

const { cn } = BackendlessUI.CSSUtils;

export default function Clock({ component, eventHandlers }) {
  const { display, classList, style, timeVariant, type, timerDate } = component;
  const { onTimerEnd } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-clock clock', classList) } style={ style }>
      { type === 'clock' && (
        <ClockComponent timeVariant={ timeVariant }/>
      ) }
      { type === 'stopwatch' && (
        <Stopwatch component={ component }/>
      ) }
      { type === 'timer' && (
        <Timer
          timerDate={ timerDate }
          timeVariant={ timeVariant }
          onTimerEnd={ onTimerEnd }
        />
      ) }
    </div>
  );
}
