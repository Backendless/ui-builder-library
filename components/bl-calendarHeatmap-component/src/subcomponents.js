const { cn } = BackendlessUI.CSSUtils;

export function Legend({ legend, space }) {
  return (
    <div className="legend">
      { legend && (
        <p className={ cn('legend-text', { 'space': space }) }>{ legend }</p>
      ) }
      <div className="legend-container">
        <span>None</span>
        <svg className="legend-color-gradation">
          <rect width="10" height="10" x="0" y="0" className="color-cell-0"><title></title></rect>
          <rect width="10" height="10" x="15" y="0" className="color-cell-1"><title></title></rect>
          <rect width="10" height="10" x="30" y="0" className="color-cell-2"><title></title></rect>
          <rect width="10" height="10" x="45" y="0" className="color-cell-3"><title></title></rect>
          <rect width="10" height="10" x="60" y="0" className="color-cell-4"><title></title></rect>
        </svg>
        <span>4+</span>
      </div>
    </div>
  );
}
