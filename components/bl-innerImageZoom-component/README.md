# InnerImageZoom

InnerImageZoom is the component that can be used in Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows the user to apply an image zoom effect inside that image in the application.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Configuration

Configuration can be done in the UI Builder or using the Codeless Logic. You have to specify the source of the image that will be displayed in the component and to which the zoom effect will be applied.

## Properties

| Property                   | Type   | Default value                                                                                                                        | Logic              | Data Binding | UI Setting | Description                         |
|----------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------|--------------------|--------------|------------|-------------------------------------|
| Image Source <br> `source` | *Text* | `https://content.r9cdn.net/rimg/dimg/6d/56/5bd0abd4-city-26896-1670df92320.jpg?width=1366&height=768&xhint=1567&yhint=925&crop=true` | Image Source Logic | YES          | YES        | Specifies the image source to zoom. |

## Events

| Name                | Triggers                                                           | Context Blocks    |
|---------------------|--------------------------------------------------------------------|-------------------|
| On Mouse Move Event | Triggered when the user moves the mouse over or touches the image. | `{event: Object}` |
| On Mouse Over Event | Triggered when the mouse pointer hovers over the image.            |                   |
| On Mouse Out Event  | Triggered when the mouse pointer leaves the image.                 |                   |

## Styles

**Theme**

````
@bl-customComponent-innerImageZoom-theme: @themePrimary;
@bl-customComponent-innerImageZoom-shadow: @appComponentShadow;
@bl-customComponent-innerImageZoom-border: @appBlockBorder;
@bl-customComponent-innerImageZoom-border-radius: @appComponentBorderRadius;
````

**General**

````
@bl-customComponent-innerImageZoom-background-color: if(@isLightTheme, rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 0.04));
````

**Dimensions**

````
@bl-customComponent-innerImageZoom-width: 50%;
@bl-customComponent-innerImageZoom-margin: 10px;
````
