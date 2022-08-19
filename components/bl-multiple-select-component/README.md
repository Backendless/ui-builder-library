# Multiple Select

Multiple Select is a component of Backendless UI-Builder designer. This component allows you to handle multiple selections.

## Usage

Add a component to your page and add the options to the component.

### Component Elements

<dl>
<dt>Multiple select field</dt>
<dd>This is the field that displays all the options you selected.</dd>
<dt>Options</dt>
<dd>A drop down list that displays all the options that you specify in the `Options` propertie.</dd>
</dl>

### Component Properties

  Name         | Type       | Default value       | Description
 --------------|------------|---------------------|-------------------------------------------------------------------------------------
  Disable      | bool       | false               | This property allows you to disable component.
  Placeholder  | string     | 'Placeholder'       | This property allows you to select a label of component.
  Options      | { label: 'string', value: 'string' } |           | This property allows you to add items to be displayed in the drop down list. It's displayed on the component's logic page.
  Variant      | 'outlined', 'filled', 'standart' | 'outlined'  | This property allows you to select the variant of multiple select.
  Type         | 'default', 'checkmark', 'chip'   | 'checkmark' | This property allows you to change the appearance of this component.

### Events

<dl>
<dt>On Multiple Select Value Change</dt>
<dd>Triggered when the user select an item from the options.</dd>
</dl>
