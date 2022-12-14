# PDF Viewer

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [PDF Viewer](https://github.com/wojtekmaj/react-pdf/tree/v4.x) library.

The component allows you to add a pdf viewer to your UI-Builder application

## Properties

| Property   | Type                    | Default Value | Logic             | Data Binding | UI Setting | Description                                                          |
|------------|-------------------------|---------------|-------------------|--------------|------------|----------------------------------------------------------------------|
| pdfUrl     | String                  |               | PDF URL Logic     | YES          | YES        | Allows write URL of PDF file, but file must be in Backendless Files. |
| renderType | Select ["canvas","svg"] | "canvas"      | Render Type Logic | NO           | YES        | Allows select type of render(`canvas`, `svg`).                       |
| width      | String                  | "0px"         | Width Logic       | YES          | YES        | Allows determine the width of the PDF Viewer.                        |
| height     | String                  | "0px"         | Height Logic      | YES          | YES        | Allows determine the height of the PDF Viewer.                       |

## Events

| Name            | Triggers                                     | Context Blocks       |
|-----------------|----------------------------------------------|----------------------|
| On Load Success | when the PDF file is successfully downloaded | Page Count: `Number` |
| On Load Error   | when a PDF download error                    | Message: `String`    |


## Action

| Action   | Inputs         | Returns |
|----------|----------------|---------|
| Set Page | page: `Number` |         |

## Styles

**Theme**
````
@bl-customComponent-pdfViewer-themeColor: @themePrimary;
@bl-customComponent-pdfViewer-themeTextColor: @appTextColor;
````

**Others**
````
@bl-customComponent-pdfViewer-input-background-color: if(@isLightTheme, darken(#fff, 10%), lighten(#000, 15%));
@bl-customComponent-pdfViewer-button-icon-size: 16px;
@bl-customComponent-pdfViewer-button-icon-color: contrast(@buttonContainedBackground);
@bl-customComponent-pdfViewer-no-data-icon-size: 40px;
````
