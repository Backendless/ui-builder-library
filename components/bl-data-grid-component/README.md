# Data Grid

Data Grid is a component of Backendless UI-Builder designer. The main purpose of the component is to display data, and this data can be sorted and filtered.
If you want to know more about this component, you can [follow the link.](https://www.ag-grid.com/example/)

## Usage

Add the component to your page and add data to the `Row data` and `Column definition` properties.

### Component Elements

<dl>
<dt>Column</dt>
<dd>The column is the main part of the component. It consists of a header and content that is subject to this header.</dd>
<dt>Filter</dt>
<dd>If you need to filter a column, click the icon next to the column name and the filter options will be displayed. Also, if you have the `Floating filter` property enabled, you can immediately specify the filter parameters in it.</dd>
<dt>Sort</dt>
<dd>If you need to sort a column, click on the column name.</dd>
</dl>

### Component Properties

  Name              | Type     | Default value  | Description
 -------------------|----------|----------------|----------------------------------------------------------------
  Disable           | boolean  | false          | This property allows you to disable a component.
  Sortable          | boolean  | true           | This property allows you to control sorting for all columns of the grid. You can specify whether the columns have sorting property or not.
  Filter            | boolean  | true           | This property allows you to control filtering for all columns of the grid. You can specify whether the columns have filter property or not.
  Floating filter   | boolean  | true           | This property allows you to specify whether or not the floating filter is displayed.
  Column definition | [ <dt> { field: 'field name1', filter: false }, </dt> <dt> { field: 'field name2', sortable: true } </dt> ] | [] | This property allows you to add columns to the grid. Also, if you want a specific column to be without a filter or sorting, you can do so by specifying a `filter` or `sortable` properties and specifying `false` for it.
  Row data          | [{ property: value }]| [] | This property allows you to add data for the grid. The data must be an array of objects. Also, if you need some property from the objects to be displayed on the grid, you need to specify it in the `Column definition` property.
  Height            | 500px, 100% | 500px  | This property allows you to set the height of a component.
  Width             | 750px, 100% | 750px  | This property allows you to set the width of a component.

### Events

<dl>
<dt>On Cell Click</dt>
<dd>Triggers when the user clicks a cell of grid</dd>
</dl>
