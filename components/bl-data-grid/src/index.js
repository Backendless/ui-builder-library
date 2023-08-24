import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';

import { EmptyMessage } from './empty-message';

import { useStyles } from './use-styles';
import { rowsValidation } from './utils';

import { AgGridReact } from './lib/ag-grid-react.min.js';

const { cn } = BackendlessUI.CSSUtils;

function CellComponent(params) {
  return (<span>{ params.value }</span>);
};

export default function DataGridComponent({ component, eventHandlers }) {
  const {
    classList, display, style, disabled, sortable, filter,
    floatingFilter, editable, resizable, suppressCellFocus, multipleRowsSelection,
    columnDefs, rowsData, height, width, theme, pagination, paginationAutoPageSize, paginationPageSize
  } = component;
  const { onCellClick, onColumnMoved } = eventHandlers;

  const gridRef = useRef();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const rowsToDisplay = useMemo(() => rowsValidation(rows), [rows]);

  useEffect(() => {
    setColumns(columnDefs || []);
    setRows(rowsData || []);
  }, [columnDefs, rowsData]);

  const defaultColDef = useMemo(() => ({
    filter,
    sortable,
    floatingFilter: filter ? floatingFilter : false,
    editable,
    resizable,
    cellRenderer: memo(CellComponent)
  }), [sortable, filter, floatingFilter, resizable]);

  const handleCellClick = useCallback(params => {
    onCellClick({ cellParams: params });
  }, []);

  const handleColumnMove = useCallback(() => {
    onColumnMoved({ columns: gridRef.current.columnApi.getColumnState() });
  }, []);

  const sortByColumnId = useCallback((columnId, direction) => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: columnId, sort: direction.toLowerCase() }], defaultState: { sort: null }
    });
  }, []);

  const clearSort = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({ defaultState: { sort: null } });
  }, []);

  useActions({ component, gridRef, sortByColumnId, clearSort });

  const styles = useStyles(style, width, height);
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
            rowData={ rowsToDisplay }
            columnDefs={ columns }
            defaultColDef={ defaultColDef }
            scrollbarWidth={ 14 }
            suppressCellFocus={ suppressCellFocus }
            pagination={ pagination }
            paginationPageSize={ paginationPageSize }
            paginationAutoPageSize={ paginationAutoPageSize }
            rowSelection={ multipleRowsSelection ? "multiple" : "single" }
            onCellClicked={ handleCellClick }
            onColumnMoved={ handleColumnMove }
          />
      }
    </div>
  );
}

function useActions({ component, gridRef, sortByColumnId, clearSort }) {
  Object.assign(component, {
    getRowsData: () => {
      const rowsData = [];

      gridRef.current.api.forEachNode(node => {
        rowsData.push(node.data);
      });

      return rowsData;
    },
    getColumnState : () => gridRef.current.columnApi.getColumnState(),
    getSelectedRows: () => gridRef.current.api.getSelectedNodes().map(node => node.data),
    sortByColumnId : (columnId, direction) => sortByColumnId(columnId, direction),
    clearSort      : () => clearSort()
  });
}
