# Multiple Bar Chart

Multiple Bar Chart is a component of Backendless UI-Builder designer. This is a bar chart whose purpose is to show the progress of each item.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property        | Type                                                                              | Default value | Logic                 | Data Binding | UI Setting | Description                                                                                                                                                                     |
|-----------------|-----------------------------------------------------------------------------------|---------------|-----------------------|--------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Disabled        | *Checkbox*                                                                        | `false`       | Disabled Logic        | YES          | YES        | This handler allows you to disable a component.                                                                                                                                 |
| Grid Visibility | *Checkbox*                                                                        | `true`        | Grid Visibility Logic | YES          | YES        | This handler allows you to control the visibility of the grid.                                                                                                                  |
| Chart Data      | *JSON*                                                                            | `[]`          | Chart Data Logic      | YES          | YES        | This handler allows you to add chart items to the component. Watch [Codeless Examples](#Examples). Signature of the item: {name: `String`, goal: `Number`, progress: `Number`}. |
| Grid Marks      | *Select* <br/> "2 columns" <br/> "4 columns" <br/> "5 columns" <br/> "10 columns" | "4 columns"   | Grid Marks Logic      | YES          | YES        | This handler allows you to specify the number of marks.                                                                                                                         |

## <a name="Examples"></a> Codeless Examples

Adding of chart items to component:

<img alt="adding data" src="./example-images/adding-data-to-chart.png" width="620" />
