import { useRef, useMemo, useCallback, memo } from 'react';
import { AgGridReact } from './lib/ag-grid-react.min.js';

const { cn } = BackendlessUI.CSSUtils;

function CellComponent(params) {
  return (<span>{ params.value }</span>);
};

export default function DataGridComponent({ component, eventHandlers }) {
  const {
    classList,
    display,
    disable,
    sortable,
    filter,
    floatingFilter,
    height,
    width,
    columnDefs,
    rowData
  } = component;
  const { onCellClick } = eventHandlers;

  const gridRef = useRef();
  const tableData = useMemo(() => rowData, [rowData]);
  const columns = useMemo(() => columnDefs, [columnDefs]);
  const defaultColDef = useMemo(() => ({
    filter,
    sortable,
    floatingFilter,
    cellRenderer: memo(CellComponent),
    filterParams: { buttons: ['apply', 'reset'] }
  }));

  const handleCellClick = useCallback( params => {
    if (onCellClick) {
      onCellClick({ cellParams: params })
    }
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div
      style={{ height, width, flexShrink: 0 }}
      className={ cn("bl-customComponent-dataGrid", "ag-theme-alpine", classList, { disable }) }>
      <AgGridReact
        ref={gridRef}
        rowData={tableData}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        onCellClicked={ handleCellClick }
      />
    </div>
  );
}
