import { ClockComponent } from './clock-component';
import { Stopwatch } from './stopwatch';
import { Timer } from './timer.js';

const { cn } = BackendlessUI.CSSUtils;

const ClockTypes = {
  DEFAULT  : 'clock',
  STOPWATCH: 'stopwatch',
  TIMER    : 'timer',
};

const ClockViews = {
  [ClockTypes.DEFAULT]  : ClockComponent,
  [ClockTypes.STOPWATCH]: Stopwatch,
  [ClockTypes.TIMER]    : Timer,
};

export default function Clock({ component, eventHandlers }) {
  const { display, classList, style, type } = component;

  const Clock = ClockViews[type];

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-clock clock', classList) } style={ style }>
      { Clock && (
        <Clock component={ component } eventHandlers={ eventHandlers }/>
      ) }
    </div>
  );
}
