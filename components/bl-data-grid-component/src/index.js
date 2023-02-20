import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { AgGridReact } from './lib/ag-grid-react.min.js';

const { cn } = BackendlessUI.CSSUtils;

const messages = {
  ROWS: 'Rows Are Empty',
  COLUMNS: 'Columns Are Empty',
  ROWSANDCOLUMNS: 'Columns And Rows Are Empty'
};

function CellComponent(params) {
  return (<span>{ params.value }</span>);
};

export default function DataGridComponent({ component, eventHandlers }) {
  const {
    classList, display, style, disabled, sortable, filter, floatingFilter, height, width, columnDefs, rowData, theme
  } = component;
  const { onCellClick } = eventHandlers;

  const gridRef = useRef();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setColumns(() => (columnDefs ? columnDefs : []));
    setRows(() => (rowData ? rowData : []));
  }, [columnDefs, rowData]);

  const defaultColDef = useMemo(() => ({
    filter,
    sortable,
    floatingFilter,
    cellRenderer: memo(CellComponent),
    filterParams: { buttons: ['apply', 'reset'] }
  }), []);

  const handleCellClick = useCallback(params => {
    onCellClick({ cellParams: params });
  }, []);

  const styles = { ...style, height: `${ height }px`, width: `${ width }px`, flexShrink: 0 };
  const message = getMessage(columns, rows);
  const classes = cn(
    'bl-customComponent-dataGrid', `ag-theme-${ theme }`, classList,
    { 'bl-customComponent-dataGrid--disabled': disabled }
  );

  if (!display) {
    return null;
  }

  if (!columns.length || !rows.length) {
    return (
      <div style={ styles } className={ classes }>
        <div className="ag-root-wrapper ag-overlay-panel">
          <div className="ag-overlay-wrapper">
            <div className="ag-overlay-background" />
            <div className="ag-overlay-no-rows-wrapper">
              <span className="ag-overlay-no-rows-center">{ message }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={ styles }
      className={ classes }>
      <AgGridReact
        ref={ gridRef }
        rowData={ rows }
        columnDefs={ columns }
        defaultColDef={ defaultColDef }
        onCellClicked={ handleCellClick }
      />
    </div>
  );
}

const getMessage = (columns, rows) => {
  if (!columns.length && !rows.length) {
    return messages.ROWSANDCOLUMNS;
  }

  if (!columns.length) {
    return messages.COLUMNS;
  }

  if (!rows.length) {
    return messages.ROWS;
  }

  return '';
};
