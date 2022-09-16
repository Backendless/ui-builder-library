# PDF Viewer

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [PDF Viewer](https://github.com/wojtekmaj/react-pdf/tree/v4.x) library.

The component allows you to add a pdf viewer to your UI-Builder application

## Properties

| Property   | Type                               | Default Value | Logic             | Data Binding | UI Setting | Description                                                          |
|------------|------------------------------------|---------------|-------------------|--------------|------------|----------------------------------------------------------------------|
| pdfUrl     | String                             |               | PDF URL Logic     | YES          | YES        | Allows write URL of PDF file, but file must be in Backendless Files. |
| renderType | Select ["canvas","svg"]            | "canvas"      | Render Type Logic | NO           | YES        | Allows select type of render(`canvas`, `svg`).                       |
| size       | Select ["small","normal", "large"] | "normal"      | Size Logic        | NO           | YES        | Allows select size of PDF Viewer(`small`, `normal`, `large`).        |

## Events

| Name            | Triggers                                     | Context Blocks      |
|-----------------|----------------------------------------------|---------------------|
| On Load Success | when the PDF file is successfully downloaded | `Num Pages: number` |
| On Load Error   | when a PDF download error                    | `Message: string`   |


## Action

| Action     | Inputs         | Returns |
|------------|----------------|---------|
| Go To Page | `page: number` |         |

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
@bl-customComponent-pdfViewer-no-data-icon-size: 40px;
````
