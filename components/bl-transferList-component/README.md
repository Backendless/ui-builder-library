# Transfer list

Transfer list is a component of Backendless UI-Builder designer. It allows you to move one or more list items between lists.

## Usage

Add a component to your page and add the items to the list.

### Component Elements

<dl>
<dt>List</dt>
<dd>The component has a right or left list. The list displays the items that belong to it.</dd>
<dt>Transfer buttons</dt>
<dd>The transfer buttons are a component with which you can translate selected list items to the opposite list.</dd>
</dl>

### Component Properties

  Name          | Type                | Default value    | Description
 ---------------|---------------------|------------------|------------------------------------------------------------------------------
  List type     | 'basic', 'enhanced' | 'basic'          | This property allows you to select a list with or without a title.
  Left items    | array               |                  | You can add items to be displayed in the left list.
  Right items   | array               |                  | You can add items to be displayed in the right list.
  Icon color    | string              |                  | This property allows you to change the color of checkbox icon.

### Events

<dl>
<dt>On change</dt>
<dd>Triggers when the user clicks on the transfer button</dd>
</dl>
