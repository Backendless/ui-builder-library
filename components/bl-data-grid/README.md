# Data Grid

Data Grid is a component of Backendless UI-Builder designer. The main purpose of the component is to display data, and
this data can be sorted and filtered.
If you want to know more about this component, you can [follow the link.](https://www.ag-grid.com/example/)

<p align="center">
  <img src="./thumbnail.png" alt="thumbnail" width="780"/>
</p>

## Demo

View an example of how to install this component and how it works in your
UI [here](https://app.arcade.software/share/CXVuAnEGfiqqQAmlzisU).

## Properties

| Property                                               | Type                                                                                                                             | Default Value                                                                                                                                                             | Logic                           | Data Binding | UI Setting | Description                                                                                                                                                                                   |
|--------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|--------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Disabled<br/>`disabled`                                | Checkbox                                                                                                                         | `false`                                                                                                                                                                   | Disabled Logic                  | YES          | YES        | This handler allows you to disable a component.                                                                                                                                               |
| Sortable<br/>`sortable`                                | Checkbox                                                                                                                         | `true`                                                                                                                                                                    | Sortable Logic                  | YES          | YES        | This handler allows you to specify the sorting option for all grid columns.                                                                                                                   |
| Filter<br/>`filter`                                    | Checkbox                                                                                                                         | `true`                                                                                                                                                                    | Filter Logic                    | YES          | YES        | This handler allows you to add filtering capability to all grid columns.                                                                                                                      |
| Floating Filter<br/>`floatingFilter`                   | Checkbox                                                                                                                         | `true`                                                                                                                                                                    | Floating Filter Logic           | YES          | YES        | This handler allows you to specify whether or not the floating filter is displayed.                                                                                                           |
| Editable<br/>`editable`                                | Checkbox                                                                                                                         | `true`                                                                                                                                                                    | Editable Logic                  | NO           | YES        | This handler allows you to control the ability to edit data in the cell.                                                                                                                      |
| Resizable<br/>`resizable`                              | Checkbox                                                                                                                         | `true`                                                                                                                                                                    | Resizable Logic                 | NO           | YES        | This handler allows you to add the ability to change column widths.                                                                                                                           |
| Suppress Cell Focus<br/>`suppressCellFocus`            | Checkbox                                                                                                                         | `false`                                                                                                                                                                   | Suppress Cell Focus Logic       | NO           | YES        | This handler allows you to disable cell focus and keyboard navigation.                                                                                                                        |
| Multiple Rows Selection<br/>`multipleRowsSelection`    | Checkbox                                                                                                                         | `true`                                                                                                                                                                    | Multiple Rows Selection Logic   | YES          | YES        | This handler adds the ability to select multiple rows. Watch [Adding Row Selections Guide](#adding-row-selections-guide).                                                                     |
| Column Definition<br/>`columnDefs`                     | JSON                                                                                                                             | `[`<br/>`{"field": "name", "flex": 1},`<br/>`{"field": "age", "sortable": true, "flex": 1},`<br/>`{"field": "city", "flex": 1}`<br/>`]`                                   | Column Definition Logic         | YES          | YES        | This handler allows you to define columns for the component. Watch [Codeless Examples](#examples). Signature of column: List of object `{field: String, sortable: Boolean, filter: Boolean}`. |
| Rows Data<br/>`rowsData`                               | JSON                                                                                                                             | `[`<br/>`{"name": "Jack", "age": 26, "city": "London"},`<br/>`{"name": "Kate", "age": 22, "city": "New York"},`<br/>`{"name": "Nick", "age": 28, "city": "Kyiv"}`<br/>`]` | Rows Data Logic                 | YES          | YES        | This handler allows you to set data to the component. Watch [Codeless Examples](#examples). Signature of data: List of object `{field: String \                                               | Number}`                                     |
| Height<br/>`height`                                    | Text                                                                                                                             | "500px"                                                                                                                                                                   | Height Logic                    | YES          | YES        | This handler allows you to specify the height of the component.                                                                                                                               |
| Width<br/>`width`                                      | Text                                                                                                                             | "750px"                                                                                                                                                                   | Width Logic                     | YES          | YES        | This handler allows you to specify the width of the component.                                                                                                                                |
| Theme<br/>`theme`                                      | Select [Alpine:`alpine`<br/>Alpine Dark:`alpine-dark`<br/>Balham:`balham`<br/>Balham Dark:`balham-dark`<br/>Material:`material`] | Alpine:`alpine`                                                                                                                                                           | Theme Logic                     | YES          | YES        | This handler allows you to specify the theme of the component.                                                                                                                                |
| Row Style<br/>`rowStyle`                               | JSON                                                                                                                             | `{"background": "#f8fcfd"}`                                                                                                                                               | Row Style Logic                 | NO           | YES        | This handler allows you to specify styles for component rows.                                                                                                                                 |
| Loading Text<br/>`loadingText`                         | Text                                                                                                                             | "Loading..."                                                                                                                                                              | Loading Text Logic              | NO           | YES        | This handler lets you specify the text displayed when loading data for the Data Grid component.                                                                                               |
| No Rows Text<br/>`noRowsText`                          | Text                                                                                                                             | "No Data"                                                                                                                                                                 | No Rows Text Logic              | NO           | YES        | This handler allows you to specify the text displayed when the Data Grid component has received no rows.                                                                                      |
| Pagination<br/>`pagination`                            | Checkbox                                                                                                                         | `false`                                                                                                                                                                   | Pagination Logic                | NO           | YES        | This handler allows you to add pagination.                                                                                                                                                    |
| Pagination Auto Page Size<br/>`paginationAutoPageSize` | Checkbox                                                                                                                         | `false`                                                                                                                                                                   | Pagination Auto Page Size Logic | NO           | YES        | This handler allows automatically showing as many rows on each page as possible.                                                                                                              |
| Pagination Page Size<br/>`paginationPageSize`          | Number                                                                                                                           | 10                                                                                                                                                                        | Pagination Page Size Logic      | NO           | YES        | This handler allows you to specify the required number of rows to display on each page. Does not work when Pagination Auto Page Size is selected!                                             |

## Events

| Name                        | Triggers                                                                    | Context Blocks                                                                       |
|-----------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| On Cell Value Changed Event | This event is fired when Enter is pressed after the cell value has changed. | Cell Params: `{key: value}`, Data Object: `{key: value}`                             |
| On Cell Click Event         | This event is fired when the user clicks the mouse or taps the grid cell.   | Cell Params: `{key: value}`                                                          |
| On Column Moved Event       | This event is fired when any column is moved.                               | Columns: list of moved columns                                                       |
| On Filtering Event          | This event is fired when text is entered into the filter fields.            | Filter Model: list of active filters `{filter: Text, filterType: Text, type: Text }` |

## Actions

| Action                         | Inputs                              | Returns                       |
|--------------------------------|-------------------------------------|-------------------------------|
| Get Selected Rows of Data Grid |                                     | `JSON`: list of selected rows |
| Get Columns of Data Grid       |                                     | `JSON`: list of moved columns |
| Get Rows Data of Data Grid     |                                     | `JSON`: list of rows          |
| Sort By Column Id in Data Grid | columnId: `Text`, direction: `Text` |                               |
| Clear Sort of Data Grid        |                                     |                               |

## <a id="examples"></a> Codeless Examples

Adding row data to the component:

![markers example](./example-images/rows.png)

Adding columns to the component:

![markers example](./example-images/columns.png)


> **If you have nested objects (as shown in the screenshot below) and you want it to display as a group, then you need
to do the following:**

1. Add row data with nested objects:

![markers example](./example-images/rows-with-nested-object.png)

2. Add a `children` property for the field with the nested object, and pass a list of nested properties as shown in the
   screenshot:

![markers example](./example-images/col-def-with-children-prop.png)

3. Result:

<img src="./example-images/result.png" alt="result" width="780"/>


> **If you want the properties of nested objects not to be displayed as a group, then do the following:**

1. Add the properties of the nested object in the same way as other properties:

![markers example](./example-images/add-nested-props-as-default-props.png)

2. Result:

<img src="./example-images/res-of-def.png" alt="res-of-def" width="780"/>

## <a id="adding-row-selections-guide"></a>Adding Row Selections Guide

Add `"checkboxSelection": true` property to the desired column:

![guide example](./example-images/add-checkboxSelection.png)

Add `"headerCheckboxSelection": true` to the desired column if you want to add the checkbox to the header to all rows
select:

![guide example](./example-images/add-headerCheckboxSelection.png)

There is also a `Multiple Rows Selection` property for selecting multiple rows. Uncheck the box if you want to make the
ability to select only one row:

![guide example](./example-images/control-selection-type.png)

Use `Get Selected Rows of Data Grid` action to get all selected rows:

![guide example](./example-images/get-selected-rows-action.png)

## <a id="adding-default-column-sorting-guide"></a>Adding Default Column Sorting Guide

For the required column, add a `sort` property with a value of `asc` or `desc` depending on what you need.

1. Using the settings:
   ![guide example](./example-images/add-default-column-sort-json.png)

2. Using the codeless:
   ![guide example](./example-images/add-default-column-sort-codeless.png)

## <a id="adding-cell-styles-guide"></a>Adding Styles For Column Guide

For the required Column, add a `cellStyle` property with an object that will contain the required styles.

![guide example](./example-images/add-cell-styles.png)

## <a id="adding-default-selected-rows"></a>Adding Selected Rows by Default Guide

For the desired row, add the `selected` property with the value `true`.

![guide example](./example-images/adding-default-selected-rows.png)

## <a id="on-cell-value-changed-guide"></a>On Cell Value Changed Event Guide

1. Open the `Data API` tab and select the `Upsert Object in Backendless` block:
   ![guide example](./example-images/add-upsert-object.png)

2. Specify the desired table and pass the `Data Object` block:
   ![guide example](./example-images/update-changed-cell-value.png)
