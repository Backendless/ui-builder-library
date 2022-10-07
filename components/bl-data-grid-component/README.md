# Data Grid

Data Grid is a component of Backendless UI-Builder designer. The main purpose of the component is to display data, and this data can be sorted and filtered.
If you want to know more about this component, you can [follow the link.](https://www.ag-grid.com/example/)

## Properties

| Property          | Type                                                                               | Default value | Logic                   | Data Binding | UI Setting | Description                                                                                          |
|-------------------|------------------------------------------------------------------------------------|---------------|-------------------------|--------------|------------|-----------------------------------------------------------------------------------------------------|
| Disabled          | *Checkbox*                                                                         | false         | Disabled Logic          | YES          | YES        | This handler allows you to disable a component.                                                                                         |
| Sortable          | *Checkbox*                                                                         | true          | Sortable Logic          | YES          | YES        | This handler allows you to specify the sorting option for all grid columns.                                                             |
| Filter            | *Checkbox*                                                                         | true          | Filter Logic            | YES          | YES        | This handler allows you to specify a filter option for all grid columns.                                                                |
| Floating Filter   | *Checkbox*                                                                         | true          | Floating Filter Logic   | YES          | YES        | This handler allows you to specify whether or not the floating filter is displayed.                                                     |
| Column Definition | *JSON*                                                                             |               | Column Definition Logic | YES          | YES        | This handler allows you to add columns to the component. Signature of column `{field: String, sortable: Boolean, filter: Boolean}`. |
| Row Data          | *JSON*                                                                             |               | Row Data Logic          | YES          | YES        | This handler allows you to add data to the component. Watch [Codeless Examples](#Examples).                                              |
| Height            | *Number*                                                                           | 500           | Height Logic            | YES          | YES        | This handler allows you to specify the height of the component.                                                                         |
| Width             | *Number*                                                                           | 750           | Width Logic             | YES          | YES        | This handler allows you to specify the width of the component.                                                                          |
| Theme             | *Select* <br> "alpine" \| "alpine-dark" \| "balham" \| "balham-dark" \| "material" | "alpine"      | Theme Logic             | YES          | YES        | This handler allows you to specify a component theme.                                                                                   |

### Events

| Name                       | Triggers                                     | Context Blocks                                                                 |
|----------------------------|----------------------------------------------|--------------------------------------------------------------------------------|
| On Cell Click Event        | when the user clicks a cell of grid          | Cell Params: `{key: value}`                                                    |

## <a name="Examples"></a> Codeless Examples

Adding data to the component:

![markers example](./example-images/adding-data.png)
