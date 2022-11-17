# TreeSelect

TreeSelect is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) based on the [PrimeReact](https://www.primefaces.org/primereact/treeselect/) library. It is used to generate select input fields and allows users to choose from hierarchical data.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                | Type                                                | Default value      | Logic                        | Data Binding | UI Setting | Description                                                                                                                                                                 |
|-------------------------|-----------------------------------------------------|--------------------|------------------------------|--------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Label                   | *Text*                                              | "Select Items"     | Label Logic                  | NO           | YES        | controls the hint text for the input field                                                                                                                                  |
| Options                 | *JSON*                                              | `[]`               | Options Logic                | NO           | YES        | Specifies an array of options to display. Signature of option: `{key: any, label: string, data: any, children: TreeNode[]}`. Watch [Codeless Examples](#codeless-examples). |
| Selected Option Key(s)  | *Text*                                              |                    | Selected Option Key(s) Logic | NO           | YES        | controls the selection state of the component                                                                                                                               |
| Selection Mode          | *Select* <br/> "Single" \| "Multiple" \| "Checkbox" | "Single"           |                              | NO           | YES        | controls the selection mode of the options                                                                                                                                  |
| Chips Display           | *Checkbox*                                          | `false`            |                              | NO           | YES        | enables chips display of the selected items                                                                                                                                 |
| Disabled                | *Checkbox*                                          | `false`            | Disabled State Logic         | NO           | YES        | specifies that the component should be disabled                                                                                                                             |
| Filter Visibility       | *Checkbox*                                          | `true`             |                              | NO           | YES        | enables showing an input field to filter the items                                                                                                                          |
| Reset Filter On Hide    | *Checkbox*                                          | `false`            |                              | NO           | YES        | enables clearing the filter value when hiding the dropdown list                                                                                                             |
| Filter Input Auto Focus | *Checkbox*                                          | `true`             |                              | NO           | YES        | enables focusing the filter input automatically when the dropdown list is opened                                                                                            |
| Filter Placeholder      | *Text*                                              |                    |                              | NO           | YES        | controls placeholder text to show when filter input is empty                                                                                                                |
| Scroll Height           | *Text*                                              | "400px"            |                              | NO           | YES        | controls maximum height of the options panel                                                                                                                                |
| Meta Key Selection      | *Checkbox*                                          | `false`            |                              | NO           | YES        | enables pressing meta-keys to select or unselect an item for multiple selection                                                                                             |
| Empty Message           | *Text*                                              | "No results found" |                              | NO           | YES        | controls text to display when there is no data                                                                                                                              |

## Events

| Name                   | Triggers                             | Context Blocks                      |
|------------------------|--------------------------------------|-------------------------------------|
| On Show Event          | when the overlay is shown            |                                     |
| On Hide Event          | when the overlay is hidden           |                                     |
| On Change Event        | when the user changes selected items | Changed Value: `String` \| `Object` |
| On Item Select Event   | when the user selects the item       | Item: `Object`                      |
| On Item Unselect Event | when the user deselects the item     | Item: `Object`                      |
| On Item Expand Event   | when the user expands the item       | Item: `Object`                      |
| On Item Collapse Event | when the user collapses the item     | Item: `Object`                      |

## Actions

| Action       | Inputs | Returns |
|--------------|--------|---------|
| Expand All   |        |         |
| Collapse All |        |         |

## Styles

**Theme**

````
@bl-customComponent-treeSelect-themeColor: @themePrimary;
@bl-customComponent-treeSelect-backgroundColor: @appBackgroundColor;
@bl-customComponent-treeSelect-textColor: @appTextColor;
@bl-customComponent-treeSelect-disabledColor: @disabledColor;
@bl-customComponent-treeSelect-shadowColor: @appComponentShadowColor;
@bl-customComponent-treeSelect-borderRadius: @appComponentBorderRadius;
@bl-customComponent-treeSelect-borderWidth: @appComponentBorderWidth;
````

**General**

````
@bl-customComponent-treeSelect-color: @bl-customComponent-treeSelect-textColor;
@bl-customComponent-treeSelect-tree-background: @bl-customComponent-treeSelect-backgroundColor;
@bl-customComponent-treeSelect-tree-color: @bl-customComponent-treeSelect-color;
@bl-customComponent-treeSelect-tree-toggler-background: transparent;
@bl-customComponent-treeSelect-icon-color: @bl-customComponent-treeSelect-themeColor;
@bl-customComponent-treeSelect-options-color: @bl-customComponent-treeSelect-tree-color;
@bl-customComponent-treeSelect-options-background: @bl-customComponent-treeSelect-tree-background;
@bl-customComponent-treeSelect-header-background: @bl-customComponent-treeSelect-tree-background;
@bl-customComponent-treeSelect-filter-icon-color: fade(@bl-customComponent-treeSelect-color, 60%);
@bl-customComponent-treeSelect-close-icon-background: transparent;
@bl-customComponent-treeSelect-close-icon-hover-background: fade(@bl-customComponent-treeSelect-themeColor, 10%);
@bl-customComponent-treeSelect-checkbox-icon-color: @bl-customComponent-treeSelect-color;
@bl-customComponent-treeSelect-checkbox-background: @bl-customComponent-treeSelect-backgroundColor;
@bl-customComponent-treeSelect-checkbox-highlight-background: @bl-customComponent-treeSelect-themeColor;
@bl-customComponent-treeSelect-emptyMessage-color: fade(@bl-customComponent-treeSelect-textColor, 80%);
@bl-customComponent-treeSelect-emptyMessage-background: transparent;
@bl-customComponent-treeSelect-input-color: @bl-customComponent-treeSelect-textColor;
@bl-customComponent-treeSelect-input-background: transparent;
@bl-customComponent-treeSelect-toggler-hover-background: fade(@bl-customComponent-treeSelect-themeColor, 10%);
@bl-customComponent-treeSelect-trigger-background: transparent;
@bl-customComponent-treeSelect-content-highlight-color: @bl-customComponent-treeSelect-themeColor;
@bl-customComponent-treeSelect-content-highlight-background: fade(@bl-customComponent-treeSelect-themeColor, 5%);
@bl-customComponent-treeSelect-content-hover-color: @bl-customComponent-treeSelect-textColor;
@bl-customComponent-treeSelect-content-hover-background: @bl-customComponent-treeSelect-content-highlight-background;
````

**Dimensions**

````
@bl-customComponent-treeSelect-tree-padding: 20px;
@bl-customComponent-treeSelect-tree-toggler-marginRight: 8px;
@bl-customComponent-treeSelect-tree-toggler-width: 32px;
@bl-customComponent-treeSelect-tree-toggler-height: 32px;
@bl-customComponent-treeSelect-tree-treenode-padding: 2px;
@bl-customComponent-treeSelect-tree-treenodeChildren-paddingLeft: 16px;
@bl-customComponent-treeSelect-tree-treenodeContent-padding: 8px;
@bl-customComponent-treeSelect-icon-search-marginTop: -12px;
@bl-customComponent-treeSelect-header-padding: 12px 20px;
@bl-customComponent-treeSelect-header-margin: 0;
@bl-customComponent-treeSelect-filter-marginRight: 8px;
@bl-customComponent-treeSelect-filter-paddingRight: 38px;
@bl-customComponent-treeSelect-filter-icon-position-right: 12px;
@bl-customComponent-treeSelect-close-icon-width: 32px;
@bl-customComponent-treeSelect-close-icon-height: 32px;
@bl-customComponent-treeSelect-checkbox-width: 20px;
@bl-customComponent-treeSelect-checkbox-height: 20px;
@bl-customComponent-treeSelect-checkbox-marginRight: 8px;
@bl-customComponent-treeSelect-emptyMessage-padding: 12px 20px;
@bl-customComponent-treeSelect-input-padding: 12px;
@bl-customComponent-treeSelect-label-padding: 17px 14px;
@bl-customComponent-treeSelect-trigger-width: 48px;
````

**Typography**

````
@bl-customComponent-treeSelect-fontSize: inherit;
@bl-customComponent-treeSelect-icon-fontSize: 24px;
@bl-customComponent-treeSelect-icon-fontFamily: 'Material Icons Round';
@bl-customComponent-treeSelect-checkbox-fontSize: 14px;
@bl-customComponent-treeSelect-input-fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
@bl-customComponent-treeSelect-input-fontSize: 16px;
````

**Decoration**

````
@bl-customComponent-treeSelect-borderType: solid;
@bl-customComponent-treeSelect-borderColor: @bl-customComponent-treeSelect-themeColor;
@bl-customComponent-treeSelect-border: @bl-customComponent-treeSelect-borderWidth @bl-customComponent-treeSelect-borderType @bl-customComponent-treeSelect-borderColor;
@bl-customComponent-treeSelect-tree-border: 0 none;
@bl-customComponent-treeSelect-tree-toggler-border: 0 none;
@bl-customComponent-treeSelect-tree-toggler-borderRadius: 50%;
@bl-customComponent-treeSelect-tree-toggler-transition: background-color 0.2s;
@bl-customComponent-treeSelect-options-boxShadow: 0 2px 12px 0 fade(@bl-customComponent-treeSelect-shadowColor, 60%);
@bl-customComponent-treeSelect-header-borderBottom: 1px solid fade(@bl-customComponent-treeSelect-tree-color, 80%);
@bl-customComponent-treeSelect-close-icon-borderRadius: 50%;
@bl-customComponent-treeSelect-close-icon-transition: background-color 0.2s;
@bl-customComponent-treeSelect-close-icon-border: 0 none;
@bl-customComponent-treeSelect-checkbox-highlight-borderColor: @bl-customComponent-treeSelect-checkbox-highlight-background;
@bl-customComponent-treeSelect-checkbox-hover-borderColor: @bl-customComponent-treeSelect-checkbox-highlight-borderColor;
@bl-customComponent-treeSelect-checkbox-borderRadius: 4px;
@bl-customComponent-treeSelect-checkbox-border: 2px solid fade(@bl-customComponent-treeSelect-color, 30%);
@bl-customComponent-treeSelect-checkbox-transition: background-color 0.2s, border-color 0.2s;
@bl-customComponent-treeSelect-checkbox-transitionDuration: 0.2s;
@bl-customComponent-treeSelect-input-hover-borderColor: @bl-customComponent-treeSelect-borderColor;
@bl-customComponent-treeSelect-input-hover-boxShadow: 0 0 0 0.1rem fade(@bl-customComponent-treeSelect-themeColor, 60%);
@bl-customComponent-treeSelect-input-border: 1px solid fade(@bl-customComponent-treeSelect-color, 20%);
@bl-customComponent-treeSelect-input-transition: border-color 0.2s, box-shadow 0.2s;
````

## Codeless Examples

Below is a Codeless Example highlighting how to add options to the component:

![options example](example-images/options-example.png)
