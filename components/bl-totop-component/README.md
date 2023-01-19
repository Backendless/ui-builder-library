# Totop

Totop is the component that can be used in Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows you to use the up button to scroll up the page or scroll up to a specific page element.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property    | Type                                                                                                                                 | Default value  | Logic                      | Data Binding | UI Setting | Description                                                                                           |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------|----------------|----------------------------|--------------|------------|-------------------------------------------------------------------------------------------------------|
| Position    | *Select* <br> [`bottom-right`, `bottom-left`, `bottom-center`, `top-right`, `top-left`, `top-center`, `center-right`, `center-left`] | `bottom-right` | Type Logic                 | NO           | YES        | Controls the position of the up button on the page.                                                   |
| Element     |                                                                                                                                      |                | Element To Scroll To Logic | NO           | NO         | The logic to determine the element to which the scroll will be. Watch [Codeless Examples](#Examples). |
| Offset      | *Number*                                                                                                                             |                |                            | NO           | YES        | Controls the scroll offset.                                                                           |
| Background  | *Color*                                                                                                                              |                |                            | NO           | YES        | Controls the up button background.                                                                    |
| Color       | *Color*                                                                                                                              |                |                            | NO           | YES        | Controls the color of the icon inside the up button.                                                  |
| Button Size | *Text*                                                                                                                               |                |                            | NO           | YES        | Controls the size(width/height) of the up button.                                                     |
| Icon Size   | *Text*                                                                                                                               |                |                            | NO           | YES        | Controls the size(width/height) of the icon inside the up button.                                     |
| Indent      | *Text*                                                                                                                               |                |                            | NO           | YES        | Controls the indent of the up button from the edge of the page.                                       |

## Styles

**Theme**
````
@bl-customComponent-totop-theme: @themePrimary;
@bl-customComponent-totop-themeTextColor: @appTextColor;
````

**Dimensions**
```
@bl-customComponent-totop-size: 40px;
@bl-customComponent-totop-icon-size: 20px;
@bl-customComponent-totop-border-radius: 50%;
@bl-customComponent-totop-z-index: 999;
```

**Colors**
````
@bl-customComponent-totop-background-color: if(@isLightTheme, rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.04));
@bl-customComponent-totop-hover-background-color: fade(@bl-customComponent-totop-background-color, 20%);
````

**Other**
````
@bl-customComponent-totop-cursor: pointer;
````

## Examples

Below is a Codeless Example highlighting how to use the Totop component:

![totop data example](example-images/totop-data-example.png)
![totop data example2](example-images/totop-data-example2.png)
![totop data example3](example-images/totop-data-example3.png)
