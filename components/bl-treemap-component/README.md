# Treemap
Treemap is a component of Backendless UI-Builder designer. The main purpose of the component is proportional display of data. Also, the [igniteui-react-charts](https://www.infragistics.com/products/ignite-ui-react/react/components/charts/types/treemap-chart) library is used to create this component.

<p align="center">
  <img alt="main thumbnail" height="290" src="./thumbnail.png" width="370"/>
</p>

## Properties

| Property               | Type                                          | Default Value | Logic                        | Data Binding | UI Setting | Description                                                                                                                                                                                          |
|------------------------|-----------------------------------------------|---------------|------------------------------|--------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Disabled               | *Checkbox*                                    | `false`       | Disabled Logic               | YES          | YES        | This handler allows you to disable a component.                                                                                                                                                      |
| Label                  | *Text*                                        | 'Treemap'     | Label Logic                  | YES          | YES        | This handler allows you to specify a label for the component.                                                                                                                                        |
| Width                  | *Number*                                      | 500           | Width Logic                  | YES          | YES        | This handler allows you to specify the width of the component.                                                                                                                                       |
| Height                 | *Number*                                      | 400           | Height Logic                 | YES          | YES        | This handler allows you to specify the height of the component.                                                                                                                                      |
| Fill Brushes           | *Text*                                        | 'blue green'  | Fill Brushes Logic           | YES          | YES        | This handler allows you to specify the fill brushes.                                                                                                                                                 |
| Fill Scale Logarithmic | *Checkbox*                                    | `true`        | Fill Scale Logarithmic Logic | YES          | YES        | This handler allows you to control the logarithmic fill scale.                                                                                                                                       |
| Header Display Mode    | *Select* <br/>'Overlay' \| 'Header' \| 'Auto' | 'Overlay'     | Header Display Mode Logic    | YES          | YES        | This handler allows you to specify the header display mode.                                                                                                                                          |
| Data                   | *JSON*                                        | `[]`          | Data Logic                   | YES          | YES        | This handler allows you to add data to the component. Watch [Codeless Examples](#Examples). Signature of data: list of objects {label: `String`, value: `Number \| null`, parent: `String \| null`}. |

## <a name="Examples"></a> Codeless Examples

Adding of markers on treemap:

<img alt="adding-data" height="690" src="./example-images/adding-data.png" width="900"/>
