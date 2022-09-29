# Multiple Select

Multiple Select is a component of Backendless UI-Builder designer. This component allows you to handle multiple selections.

<p align="center">
  <img alt="main thumbnail" height="290" src="./thumbnail.png" width="320"/>
</p>

## Properties

| Property    | Type                                                 | Default value | Logic          | Data Binding | UI Setting | Description
|-------------|------------------------------------------------------|---------------|----------------|--------------|------------|-----------------------------------------------------------
| Disable     | *Checkbox*                                           | false         | Disable logic  | YES          | YES        | This handler allows you to disable the component.
| Placeholder | *Text*                                               | 'Placeholder' |                | NO           | YES        | This handler allows you to select a placeholder of component.
| Options     | *JSON* <br/>{ label: `<string>`, value: `<string>` } | []            | Options logic  | YES          | YES        | This handler allows you to add items to be displayed in the drop down list.  Watch [Codeless Examples](#Examples).
| Variant     | *Select* <br/>[`outlined`, `filled`, `standart`]     | 'outlined'    |                | NO           | YES        | This handler allows you to select the variant of multiple select.
| Type        | *Select* <br/>[`default`, `checkmark`, `chip`]       | 'checkmark'   |                | NO           | YES        | This handler allows you to change the appearance of this component.

## Events

| Name             | Triggers                                      | Context Blocks                                    |
|------------------|-----------------------------------------------|---------------------------------------------------|
| On Change        | when the user select an item from the options | `Select Value: string`                            |

## Styles

**Theme**
````
@bl-customComponent-multipleSelect-themeColor: @themePrimary;
@bl-customComponent-multipleSelect-backgroundColor: @appBackgroundColor;
@bl-customComponent-multipleSelect-textColor: @appTextColor;
````

**Dimensions**
````
@bl-customComponent-multipleSelect-width: 300px;
@bl-customComponent-multipleSelect-margin: 0;
````

## <a name="Examples"></a> Codeless Examples

Adding options to the selection list:

![markers example](./example-images/add-options.png)
