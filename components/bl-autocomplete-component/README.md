# Autocomplete

Autocomplete is a component of Backendless UI-Builder designer. This allows you to select an item from a list of options.

## Usage

Add a component to your page and add the items to the list.

### Component Elements

<dl>
<dt>Text field</dt>
<dd>The component has a text field for filtering items from the list. When the user enters text, only those elements that match the entered value remain in the list.</dd>
<dt>List of options</dt>
<dd>A list that displays all the options that you specify in the `Options` propertie.</dd>
</dl>

### Component Properties

  Name                | Type   | Default value     | Description
 ---------------------|--------|-------------------|-------------------------------------------------------------------------------------
  Disabled            | bool   | False             | This property allows you to disable autocomplete.
  Placeholder         | string | Placeholder       | This property allows you to select a label of autocomplete component.
  Options             | array  |                   | This property allows you to add items to be displayed in the options list.
  Autocomplete variant| string | outlined          | This property allows you to select the variant of autocomplete. Autocomplete has three variants: `outlined`, `standart`, `filled`.

### Events

<dl>
<dt>On autocomplete change</dt>
<dd>Triggered when the user select an item from the options.</dd>
<dt>On button clear click</dt>
<dd>Triggered when the user clicks the clear button.</dd>
<dt>On change</dt>
<dd>Triggered when the user enters text into a text field.</dd>
</dl>
