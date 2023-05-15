export function DigitalClockModern({ time, displaySeconds }) {
  const { hour, minute, second, isAmpm, ampm } = time;

  return (
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
  );
}
