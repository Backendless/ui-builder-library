# Autocomplete

Autocomplete is a component of Backendless UI-Builder designer. This allows you to select an item from a list of suggestoins.

## Usage

Add a component to your page and add the items to the list.

### Component Elements

<dl>
<dt>Text field</dt>
<dd>The component has a text field for filtering items from the list. When the user enters text, only those elements that match the entered value remain in the list.</dd>
<dt>List of suggestions</dt>
<dd>A list that displays all the suggestions that you specify in the `suggestion` propertie.</dd>
</dl>

### Component Properties

  Name              | Default value     | Description
 -------------------|-------------------|-------------------------------------------------------------------------------------
  Label             | Label             | This property allows you to select a label of autocomplete component.
  Suggestions       |                   | This property allows you to add items to be displayed in the suggestions list.

### Events

<dl>
<dt>On autocomplete change</dt>
<dd>Triggered when the user select an item from the list of suggestions.</dd>
<dt>On button clear click</dt>
<dd>Triggered when the user clicks the clear button.</dd>
</dl>
