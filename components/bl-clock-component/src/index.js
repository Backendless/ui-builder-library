import { ClockComponent } from './clock-component';
import { Stopwatch } from './stopwatch';
import { Timer } from './timer.js';

const { cn } = BackendlessUI.CSSUtils;

const ClockType = {
  DEFAULT: 'clock',
  STOPWATCH: 'stopwatch',
  TIMER: 'timer'
};

export default function Clock({ component, eventHandlers }) {
  const { display, classList, style, timeVariant, type, timerDate, animationDuration } = component;
  const { onTimerEnd } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-clock clock', classList) } style={ style }>
      { type === ClockType.DEFAULT && (
        <ClockComponent timeVariant={ timeVariant } animationDuration={animationDuration}/>
      ) }
      { type === ClockType.STOPWATCH && (
        <Stopwatch component={ component }/>
      ) }
      { type === ClockType.TIMER && (
        <Timer
          timerDate={ timerDate }
          timeVariant={ timeVariant }
          onTimerEnd={ onTimerEnd }
          animationDuration={ animationDuration }
        />
      ) }
    </div>
  );
}
