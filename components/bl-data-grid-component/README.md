# Data Grid

Data Grid is a component of Backendless UI-Builder designer. The main purpose of the component is to display data, and this data can be sorted and filtered.
If you want to know more about this component, you can [follow the link.](https://www.ag-grid.com/example/)

## Properties

| Property          | Type                                                                             | Default Value | Logic                   | Data Binding | UI Setting | Description                                                                                                                                                                                   |
|-------------------|----------------------------------------------------------------------------------|---------------|-------------------------|--------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Disabled          | Checkbox                                                                         | `false`       | Disabled Logic          | YES          | YES        | This handler allows you to disable a component.                                                                                                                                               |
| Sortable          | Checkbox                                                                         | `true`        | Sortable Logic          | YES          | YES        | This handler allows you to specify the sorting option for all grid columns.                                                                                                                   |
| Filter            | Checkbox                                                                         | `true`        | Filter Logic            | YES          | YES        | This handler allows you to add filtering capability to all grid columns.                                                                                                                      |
| Floating Filter   | Checkbox                                                                         | `true`        | Floating Filter Logic   | YES          | YES        | This handler allows you to specify whether or not the floating filter is displayed.                                                                                                           |
| Column Definition | JSON                                                                             | `[]`          | Column Definition Logic | YES          | YES        | This handler allows you to define columns for the component. Watch [Codeless Examples](#examples). Signature of column: List of object `{field: String, sortable: Boolean, filter: Boolean}`. |
| Rows Data         | JSON                                                                             | `[]`          | Rows Data Logic         | YES          | YES        | This handler allows you to set data to the component. Watch [Codeless Examples](#examples). Signature of data: List of object `{field: String \| Number}`.                                    |
| Height            | Number                                                                           | 500           | Height Logic            | YES          | YES        | This handler allows you to specify the height of the component in pixels.                                                                                                                     |
| Width             | Number                                                                           | 750           | Width Logic             | YES          | YES        | This handler allows you to specify the width of the component in pixels.                                                                                                                      |
| Theme             | Select <br/>"alpine" \| "alpine-dark" \| "balham" \| "balham-dark" \| "material" | "alpine"      | Theme Logic             | YES          | YES        | This handler allows you to specify the theme of the component.                                                                                                                                |

### Events

| Name                | Triggers                                                                  | Context Blocks              |
|---------------------|---------------------------------------------------------------------------|---------------------------- |
| On Cell Click Event | This event is fired when the user clicks the mouse or taps the grid cell. | Cell Params: `{key: value}` |

## <a id="examples"></a> Codeless Examples

Adding row data to the component:

![markers example](./example-images/adding-row-data.png)

Adding columns to the component:

![markers example](./example-images/adding-columns.png)
