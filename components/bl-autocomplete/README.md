# Autocomplete

Autocomplete is a component of Backendless UI-Builder designer. This allows you to select an item from a list of options.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                                    | Type                                                                     | Default Value                                                                                                                                                                                                                                                                                                                                                   | Logic                     | Data Binding | UI Setting | Description                                                                                                                                                                                                                                                                                                              |
|---------------------------------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|--------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Disabled<br/>`disabled`                     | Checkbox                                                                 | `false`                                                                                                                                                                                                                                                                                                                                                         | Disabled Logic            | YES          | YES        | This handler allows you to disable a component.                                                                                                                                                                                                                                                                          |
| Placeholder<br/>`placeholder`               | Text                                                                     | "Placeholder"                                                                                                                                                                                                                                                                                                                                                   | Placeholder Logic         | YES          | YES        | This handler allows you to specify a label of autocomplete component.                                                                                                                                                                                                                                                    |
| Empty Options Label<br/>`emptyOptionsLabel` | Text                                                                     | "No options"                                                                                                                                                                                                                                                                                                                                                    | Empty Options Label Logic | YES          | YES        | This handler allows you to add a label that will be displayed when the dropdown menu is empty.                                                                                                                                                                                                                           |
| Variant<br/>`variant`                       | Select [Outlined:`outlined`<br/>Standard:`standard`<br/>Filled:`filled`] | Outlined:`outlined`                                                                                                                                                                                                                                                                                                                                             | Variant Logic             | YES          | YES        | This handler allows you to specify the variant of autocomplete.                                                                                                                                                                                                                                                          |
| Options<br/>`options`                       | JSON                                                                     | `[`<br/>`{"groupLabel":"Winter",`<br/>`"children": [{"label": "December", "value": "December"},{"label": "January", "value": "January"},{"label": "February", "value": "February"}]},`<br/>`{"groupLabel": "Summer",`<br/>`"children": [{"label": "June", "value": "June"},{"label": "July", "value": "July"},{"label": "August", "value": "August"}]}`<br/>`]` | Options Logic             | YES          | YES        | This handler allows you to add options to be displayed in the options list. Watch [Codeless Examples](#examples). Signature of options: list of objects `{value: String, label: String}`. Signature of grouped options: list of objects `{groupLabel: String, children: list of objects {value: String, label: String}}` |

## Events

| Name                        | Triggers                                    | Context Blocks                             |
|-----------------------------|---------------------------------------------|--------------------------------------------|
| On Change Event             | when the user enters text into a text field | Input Value: `String`                      |
| On Button Clear Click Event | when the user clicks the clear button       |                                            |

## Styles

**Theme**
````
@bl-customComponent-autocomplete-themeColor: @themePrimary;
@bl-customComponent-autocomplete-backgroundColor: @appBackgroundColor;
@bl-customComponent-autocomplete-textColor: @appTextColor;
````

**Dimensions**
````
@bl-customComponent-autocomplete-width: 300px;
@bl-customComponent-autocomplete-options-maxHeight: 40vh;
@bl-customComponent-autocomplete-option-padding: 6px 16px;
@bl-customComponent-autocomplete-groupLabel-padding: 6px 10px;
@bl-customComponent-autocomplete-borderRadius: 4px;
````

**Colors**
````
@bl-customComponent-autocomplete-boxShadow: @boxShadowPrimary;
@bl-customComponent-autocomplete-iconFill: @bl-customComponent-autocomplete-themeColor;
@bl-customComponent-autocomplete-groupLabel-color: @bl-customComponent-autocomplete-textColor;
@bl-customComponent-autocomplete-groupLabel-backgroundColor: rgba(@themePrimary, 0.5);
@bl-customComponent-autocomplete-option-backgroundColorOnHover: @backgroundColorOnHoverPrimary;
````

## <a id="examples"></a> Codeless Examples

Adding options to the component:

<img alt="adding options" src="./example-images/adding-options.png" width="720" />

Adding grouped options to the component:

<img alt="adding options" src="./example-images/grouped-options.png" width="780" />
