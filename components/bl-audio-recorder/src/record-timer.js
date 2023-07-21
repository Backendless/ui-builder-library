const { cn } = BackendlessUI.CSSUtils;

export const RecordTimer = ({ time, paused }) => (
  <>
    <span className={ cn('record-dot', { 'paused': paused }) }/>
    <span className="record-text">rec</span>
    <span className="record-time">{ time }</span>
  </>
);
