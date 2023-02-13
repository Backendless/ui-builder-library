import { useRef, useMemo, useCallback, memo } from 'react';
import { AgGridReact } from './lib/ag-grid-react.min.js';

const { cn } = BackendlessUI.CSSUtils;

function CellComponent(params) {
  return (<span>{ params.value }</span>);
};

export default function DataGridComponent({ component, eventHandlers }) {
  const {
    classList, display, style, disabled, sortable, filter, floatingFilter, height, width, columnDefs, rowData, theme
  } = component;
  const { onCellClick } = eventHandlers;

  const gridRef = useRef();
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

  if (!display) {
    return null;
  }

  return (
    <div
      style={ styles }
      className={
        cn(
          "bl-customComponent-dataGrid", `ag-theme-${ theme }`, classList,
          { "bl-customComponent-dataGrid--disabled": disabled }
        )
      }>
      <AgGridReact
        ref={ gridRef }
        rowData={ rowData }
        columnDefs={ columnDefs }
        defaultColDef={ defaultColDef }
        onCellClicked={ handleCellClick }
      />
    </div>
  );
}
