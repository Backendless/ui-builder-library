# Tree View

Tree View is a component of the Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). Tree views can be used to represent a file system navigator displaying folders and files.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>


## Demo

View an example of how to install this component and how it works in your UI [here](https://app.arcade.software/share/W8ccr7qpYQ3gOPCFLQxG).

## Properties

| Property  | Type     | Default Value | Logic            | Data Binding | UI Setting | Description                                                                                                                                                             |
|-----------|----------|---------------|------------------|--------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| treeItems | *JSON*   |               | Tree Items Logic | YES          | YES        | Allows to determine tree items. Signature of data: `[{ label: string, value: string, ?children: [{ label, value, ?children }] }]`. Watch [Codeless Examples](#examples) |
| gap       | *Number* | 10            | Gap Logic        | YES          | YES        | Allows to determine gap for every nested element                                                                                                                        |

## Events

| Name     | Triggers                          | Context Blocks                   |
|----------|-----------------------------------|----------------------------------|
| On Click | when a user click on tree element | Label: `String`, Value: `String` |


## Actions

| Action    | Inputs | Returns |
|-----------|--------|---------|
| Close All |        |         |
| Open All  |        |         |

## Styles

**Theme**
````
@bl-customComponent-treeView-theme: @themePrimary;
@bl-customComponent-treeView-themeTextColor: @appTextColor;
````

**Dimensions**
```
@bl-customComponent-treeView-list-button-icon-size: 25px;
@bl-customComponent-treeView-list-item-button-border-radius: 3px;
```

**Colors**
````
@bl-customComponent-treeView-list-item-button-selected-background-color: fade(@bl-customComponent-treeView-theme, 8%);
@bl-customComponent-treeView-list-item-button-focus-background-color: fade(@bl-customComponent-treeView-theme, 20%);
@bl-customComponent-treeView-list-item-button-hover-background-color: if(@isLightTheme, rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.04));
````

**Others**
```
@bl-customComponent-treeView-button-transition: background-color 0.3s;
```

## <a id="examples"></a> Codeless Examples

Addition of files and folders in tree items:

![tree items example](./example-images/tree_items_example.png)
