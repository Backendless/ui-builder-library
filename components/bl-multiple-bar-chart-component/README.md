# Multiple Bar Chart

Multiple Bar Chart is a component of Backendless UI-Builder designer. This is a bar chart whose purpose is to show the progress of each item.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property        | Type                                              | Default Value | Logic                 | Data Binding | UI Setting | Description                                                                                                                                                                     |
|-----------------|---------------------------------------------------|---------------|-----------------------|--------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Disabled        | *Checkbox*                                        | `false`       | Disabled Logic        | YES          | YES        | This handler allows you to disable a component.                                                                                                                                 |
| Grid Visibility | *Checkbox*                                        | `true`        | Grid Visibility Logic | YES          | YES        | This handler allows you to control the visibility of the grid.                                                                                                                  |
| Chart Data      | *JSON*                                            | `[]`          | Chart Data Logic      | YES          | YES        | This handler allows you to add chart items to the component. Watch [Codeless Examples](#Examples). Signature of the item: {name: `String`, goal: `Number`, progress: `Number`}. |
| Grid Marks      | *Select* <br/> "2" <br/> "4" <br/> "5" <br/> "10" | "4"           | Grid Marks Logic      | YES          | YES        | This handler allows you to specify the number of marks.                                                                                                                         |

## Styles

**Theme**
````
@bl-customComponent-multipleBarChart-themeColor: @themePrimary;
@bl-customComponent-multipleBarChart-backgroundColor: @appBackgroundColor;
@bl-customComponent-multipleBarChart-textColor: @appTextColor;
````

**Dimensions**
````
@bl-customComponent-multipleBarChart-width: 100%;
@bl-customComponent-multipleBarChart-labelWidth: 60px;
@bl-customComponent-multipleBarChart-labelMarginRight: 16px;
````

**Colors**
````
@bl-customComponent-multipleBarChart-chartBarColor: #212121;
@bl-customComponent-multipleBarChart-chartNameColor: @bl-customComponent-multipleBarChart-textColor;
@bl-customComponent-multipleBarChart-chartFillColor: @bl-customComponent-multipleBarChart-themeColor;
````

## <a name="Examples"></a> Codeless Examples

Adding of chart items to component:

<img alt="adding data" src="./example-images/adding-data-to-chart.png" width="620" />
