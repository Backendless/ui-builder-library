import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';

import { useStyles } from './use-styles';
import { rowsValidation } from './utils';

import { AgGridReact } from './lib/ag-grid-react.min.js';

const { cn } = BackendlessUI.CSSUtils;

function CellComponent(params) {
  return (<span>{ params.value }</span>);
}

function LoadingComponent({ loadingText }) {
  return (<div className="ag-overlay-loading-center">{ loadingText }</div>);
}

function NoRowsComponent({ noRowsText }) {
  return (<div className="ag-overlay-loading-center">{ noRowsText }</div>);
}

export default function DataGridComponent({ component, eventHandlers }) {
  const {
    classList, display, style, disabled, sortable, filter, floatingFilter,
    editable, resizable, suppressCellFocus, multipleRowsSelection, columnDefs, rowsData,
    height, width, theme, loadingText, noRowsText, pagination, paginationAutoPageSize, paginationPageSize
  } = component;
  const { onCellClick, onColumnMoved } = eventHandlers;

  const gridRef = useRef();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState();

  const rowsToDisplay = useMemo(() => rowsValidation(rows), [rows]);

  useActions({ component, gridRef });

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

  const loadingOverlayComponent = useMemo(() => LoadingComponent, []);
  const loadingOverlayComponentParams = useMemo(() => ({ loadingText }), [loadingText]);
  const noRowsOverlayComponent = useMemo(() => NoRowsComponent, []);
  const noRowsOverlayComponentParams = useMemo(() => ({ noRowsText }), [noRowsText]);

  const handleCellClick = useCallback(params => {
    onCellClick({ cellParams: params });
  }, []);

  const handleColumnMove = useCallback(() => {
    onColumnMoved({ columns: gridRef.current.columnApi.getColumnState() });
  }, []);

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
      <AgGridReact
        ref={ gridRef }
        rowData={ rowsToDisplay }
        columnDefs={ columns }
        defaultColDef={ defaultColDef }
        scrollbarWidth={ 14 }
        suppressCellFocus={ suppressCellFocus }
        pagination={ pagination }
        loadingOverlayComponent={ loadingOverlayComponent }
        loadingOverlayComponentParams={ loadingOverlayComponentParams }
        noRowsOverlayComponent={ noRowsOverlayComponent }
        noRowsOverlayComponentParams={ noRowsOverlayComponentParams }
        paginationPageSize={ paginationPageSize }
        paginationAutoPageSize={ paginationAutoPageSize }
        rowSelection={ multipleRowsSelection ? "multiple" : "single" }
        onCellClicked={ handleCellClick }
        onColumnMoved={ handleColumnMove }
      />
    </div>
  );
}

function useActions({ component, gridRef }) {
  Object.assign(component, {
    getRowsData: () => {
      const rowsData = [];

      gridRef.current.api.forEachNode(node => {
        rowsData.push(node.data);
      });

      return rowsData;
    },
    getColumnState: () => gridRef.current.columnApi.getColumnState(),
    getSelectedRows: () => gridRef.current.api.getSelectedNodes().map(node => node.data)
  });
}
