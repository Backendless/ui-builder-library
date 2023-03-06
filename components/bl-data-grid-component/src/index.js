import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';

import { EmptyMessage } from './empty-message';

import { AgGridReact } from './lib/ag-grid-react.min.js';

const { cn } = BackendlessUI.CSSUtils;

function CellComponent(params) {
  return (<span>{ params.value }</span>);
};

export default function DataGridComponent({ component, eventHandlers }) {
  const {
    classList, display, style, disabled, sortable, filter, floatingFilter,
    resizable, columnDefs, rowData, height, width, theme
  } = component;
  const { onCellClick } = eventHandlers;

  const gridRef = useRef();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setColumns(columnDefs || []);
    setRows(rowData || []);
  }, [columnDefs, rowData]);

  const defaultColDef = useMemo(() => ({
    filter,
    sortable,
    floatingFilter: filter ? floatingFilter : false,
    resizable,
    cellRenderer: memo(CellComponent),
    filterParams: { buttons: ['apply', 'reset'] }
  }), [sortable, filter, floatingFilter, resizable]);

  const handleCellClick = useCallback(params => {
    onCellClick({ cellParams: params });
  }, []);

  const styles = { ...style, height: `${ height }px`, width: `${ width }px`, flexShrink: 0 };
  const classes = cn(
    'bl-customComponent-dataGrid', `ag-theme-${ theme }`, classList,
    { 'bl-customComponent-dataGrid--disabled': disabled }
  );

  if (!display) {
    return null;
  }

  return (
    <div
      style={ styles }
      className={ classes }>
      { !columns.length || !rows.length
        ? <EmptyMessage noColumns={ !columns.length } noRows={ !rows.length } />
        : <AgGridReact
            ref={ gridRef }
            rowData={ rows }
            columnDefs={ columns }
            defaultColDef={ defaultColDef }
            scrollbarWidth={ 14 }
            onCellClicked={ handleCellClick }
          />
      }
    </div>
  );
}
