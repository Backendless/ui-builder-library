# List

List is the component that can be used in Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows you to add a standard list to your application.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="643"/>
</p>

Additional properties allow customizing the font size, background color, text color, padding and behavior of the component. Refer to the Properties section below.

## Configuration

The configuration can be done in the UI Builder or using the Codeless Logic. You need to select the type of list (ordered/unordered) and specify the data that will be displayed inside the list.

## Properties

| Property                 | Type       | Default value | Logic              | Data Binding | UI Setting | Description                                                        |
|--------------------------|------------|---------------|--------------------|--------------|------------|-------------------------------------------------------------------|
| Type                     | *Select*   | `"Unordered"` | Type Logic         | NO           | YES        | Controls the type of list(ul/ol).                                                               |
| List Items               | *JSON*     |               | ListItems Logic    | YES          | NO         | Specifies a JSON array containing data for the list items. Watch [Codeless Examples] #codeless-examples). |
| Background               | *Color*    |               |                    | NO           | YES        | Controls the background color of the main block.                                                        |
| Width                    | *Text*     |               |                    | NO           | YES        | Controls the width of the main block.                                                             |
| Color                    | *Color*    |               |                    | NO           | YES        | Controls the color of the list items.                                                             |
| Font Size                | *Text*     |               |                    | NO           | YES        | Controls the font size of the list items.                                                             |

## Events

| Name                      | Triggers                                               | Context Blocks |
|---------------------------|--------------------------------------------------------|----------------|
| On Click List Item        | when the user click any item of the list               | `List Item`    |

## Styles

**Theme**
````
@bl-customComponent-list-theme: @themePrimary;
@bl-customComponent-list-themeTextColor: @appTextColor;
````

**Dimensions**
```
@bl-customComponent-list-item-size: 20px;
```

**Colors**
````
@bl-customComponent-list-item-hover-background-color: if(@isLightTheme, rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.04));
````

## Codeless Examples

Below is a Codeless Example highlighting how to use the List component:

![list data example](example-images/list-data-example.png)
