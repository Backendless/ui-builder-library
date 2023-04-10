const { cn } = BackendlessUI.CSSUtils;

export function DigitalClock({ time, label, timeFormat, clockSubType }) {
  const hourFormat = timeFormat === 24 ? time.toFormat('HH') : time.toFormat('hh');
  const minuteFormat = time.toFormat('mm');
  const secondFormat = time.toFormat('ss');
  const ampmFormat = time.toFormat('a');

   return (
    <div className={ cn('digital', clockSubType) }>
      <div className="clock-time">
        <span className="hour">{ hourFormat }</span>
        <span className="separator">:</span>
        <span className="minute">{ minuteFormat }</span>
        <span className="separator">:</span>
        <span className="second">{ secondFormat }</span>

        {timeFormat === 12 && (
          <span className="ampm">{ ampmFormat }</span>
        )}
      </div>
      <div className="clock-label"><span className="clock-label-text">{ label }</span></div>
    </div>
  );
}
