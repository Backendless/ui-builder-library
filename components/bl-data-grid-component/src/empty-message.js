export function EmptyMessage({ noColumns, noRows }) {
  const message = getMessage(noColumns, noRows);

  return (
    <div className="ag-root-wrapper ag-overlay-panel">
      <div className="ag-overlay-wrapper">
        <div className="ag-overlay-background" />
        <div className="ag-overlay-no-rows-wrapper">
          <span className="ag-overlay-no-rows-center">{ message }</span>
        </div>
      </div>
    </div>
  );
}

function getMessage(noColumns, noRows) {
  const missingParts = [];

  if (noColumns) {
    missingParts.push('Columns');
  }

  if (noRows) {
    missingParts.push('Rows');
  }

  if (missingParts.length) {
    return `${ missingParts.join(' and ') } are empty.`;
  }
}
