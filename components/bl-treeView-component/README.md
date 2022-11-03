# Tree View

Tree View is a component of the Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). Tree views can be used to represent a file system navigator displaying folders and files.

## Properties

| Property | Type     | Default Value | Logic       | Data Binding | UI Setting | Description                                                                                                        |
|----------|----------|---------------|-------------|--------------|------------|--------------------------------------------------------------------------------------------------------------------|
| data     | *JSON*   |               | Data Logic  | YES          | YES        | Allows to determine data. Signature of data: `[{label, ?action, ?children}]`. Watch [Codeless Examples](#Examples) |
| space    | *Number* | 10            | Space Logic | YES          | YES        | Allows to determine space for every nested element                                                                 |

## Events

| Name     | Triggers                                       | Context Blocks   |
|----------|------------------------------------------------|------------------|
| On Click | when a user click on tree element (not folder) | Action: `String` |


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

## <a name="Examples"></a> Codeless Examples

Addition of files and folders in data:

![data example](./example-images/data_example.png)

How to use onClick events example:

![onClick example](./example-images/onClick_example.png)
