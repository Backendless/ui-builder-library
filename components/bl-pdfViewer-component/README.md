# PDF Viewer

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [PDF Viewer](https://github.com/wojtekmaj/react-pdf/tree/v4.x) library.

The component allows you to add a pdf viewer to your UI-Builder application

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780" />
</p>

## Properties

| Property                                    | Type     | Default Value | Logic                      | Data Binding | UI Setting | Description                                                                                                            |
|---------------------------------------------|----------|---------------|----------------------------|--------------|------------|------------------------------------------------------------------------------------------------------------------------|
| PDF URL:`pdfUrl`                            | Text     |               | PDF URL Logic              | YES          | YES        | Allows write URL of PDF file, but file must be in Backendless Files.                                                   |
| Width:`width`                               | Text     | "0px"         | Width Logic                | YES          | YES        | Allows determine the width of the PDF Viewer.                                                                          |
| Height:`height`                             | Text     | "0px"         | Height Logic               | YES          | YES        | Allows determine the height of the PDF Viewer.                                                                         |
| Scale:`scale`                               | Number   | 1             |                            | NO           | YES        | Allows determine the default scale value.                                                                              |
| Show Print Button:`showPrintButton`         | Checkbox | `false`       | Show Print Button Logic    | YES          | YES        | Allows determine if the print button should be visible. If the handler returns true, the component will be visible.    |
| Show Download Button:`showDownloadButton`   | Checkbox | `false`       | Show Download Button Logic | YES          | YES        | Allows determine if the download button should be visible. If the handler returns true, the component will be visible. |

## Events

| Name            | Triggers                                     | Context Blocks       |
|-----------------|----------------------------------------------|----------------------|
| On Load Success | when the PDF file is successfully downloaded | Page Count: `Number` |
| On Load Error   | when a PDF download error                    | Message: `String`    |


## Action

| Action                  | Inputs         | Returns |
|-------------------------|----------------|---------|
| Set Page for PDF Viewer | page: `Number` |         |

## Styles

**Root**
````
@bl-customComponent-pdfViewer-button-icon-size: 16px;
@bl-customComponent-pdfViewer-button-icon-color: contrast(@buttonContainedBackground);
@bl-customComponent-pdfViewer-button-height: 20px;
@bl-customComponent-pdfViewer-button-width: 60px;
@bl-customComponent-pdfViewer-border-radius: 5px;
@bl-customComponent-pdfViewer-border: 1.5px solid rgba(42, 42, 46, 1);
@bl-customComponent-pdfViewer-background-color: rgba(42, 42, 46, 1);
@bl-customComponent-pdfViewer-color: #ffffff;
@bl-customComponent-pdfViewer-overflow: auto;
@bl-customComponent-pdfViewer-flex-shrink: 0;
````

**Input**
```
@bl-customComponent-pdfViewer-input-background-color: rgba(64, 64, 68, 1);
@bl-customComponent-pdfViewer-input-height: 18px;
@bl-customComponent-pdfViewer-input-width: 40px;
@bl-customComponent-pdfViewer-input-max-width: 100%;
@bl-customComponent-pdfViewer-input-font-size: 16px;
```

**Controls**
```
@bl-customComponent-pdfViewer-controls-position: relative;
@bl-customComponent-pdfViewer-controls-padding: 5px;
@bl-customComponent-pdfViewer-controls-background-color: rgba(56, 56, 61, 1);
@bl-customComponent-pdfViewer-controls-box-shadow: 0 1px 0 rgba(12, 12, 13, 1);
```

**Controls button**
```
@bl-customComponent-pdfViewer-controls-button-border: 0;
@bl-customComponent-pdfViewer-controls-button-border-radius: 4px;
@bl-customComponent-pdfViewer-controls-button-background-color: transparent;
@bl-customComponent-pdfViewer-controls-button-padding: 6px;
@bl-customComponent-pdfViewer-controls-button-cursor: pointer;

@bl-customComponent-pdfViewer-controls-button-hover-background-color: rgba(102, 102, 103, 1);

@bl-customComponent-pdfViewer-controls-button-disabled-opacity: 0.5;
@bl-customComponent-pdfViewer-controls-button-disabled-cursor: auto;
```

**Controls button icon**
```
@bl-customComponent-pdfViewer-controls-button-icon-color: rgba(255, 255, 255, 1);
@bl-customComponent-pdfViewer-controls-button-icon-size: 16px;
```

**Controls scale**
```
@bl-customComponent-pdfViewer-controls-scale-position: absolute;
@bl-customComponent-pdfViewer-controls-scale-left: 50%;
@bl-customComponent-pdfViewer-controls-scale-transform: translateX(-50%);
```

**Controls scale text**
```
@bl-customComponent-pdfViewer-controls-scale-text-width: 23px;
@bl-customComponent-pdfViewer-controls-scale-text-align: center;
@bl-customComponent-pdfViewer-controls-scale-text-margin: 0 5px;
```

**Controls page info**
```
@bl-customComponent-pdfViewer-controls-page-info-outline: 0;
@bl-customComponent-pdfViewer-controls-page-info-color: inherit;
@bl-customComponent-pdfViewer-controls-page-info-padding: 0 1px 0 0;
@bl-customComponent-pdfViewer-controls-page-info-margin-left: 5px;
@bl-customComponent-pdfViewer-controls-page-info-border-radius: 2px;
@bl-customComponent-pdfViewer-controls-page-info-background-clip: padding-box;
@bl-customComponent-pdfViewer-controls-page-info-border: 1px solid rgba(115, 115, 115, 1);
@bl-customComponent-pdfViewer-controls-page-info-text-align: center;
@bl-customComponent-pdfViewer-controls-page-info-disabled-opacity: 0.5;
@bl-customComponent-pdfViewer-controls-page-info-disabled-cursor: auto;
```

**Container**
```
@bl-customComponent-pdfViewer-container-height: 100%;
@bl-customComponent-pdfViewer-container-width: 100%;
@bl-customComponent-pdfViewer-container-padding: 10px;
@bl-customComponent-pdfViewer-container-overflow: auto;
```

**Pdf**
```
@bl-customComponent-pdfViewer-pdf-viewer-margin: auto;
```

**No data**
```
@bl-customComponent-pdfViewer-no-data-icon-size: 40px;
@bl-customComponent-pdfViewer-no-data-font-color: #fff;
@bl-customComponent-pdfViewer-no-data-font-size: 24px;
@bl-customComponent-pdfViewer-no-data-font-weight: bold;
@bl-customComponent-pdfViewer-no-data-text-align: center;
@bl-customComponent-pdfViewer-no-data-border-height: 100%;
@bl-customComponent-pdfViewer-no-data-border-width: 100%;
@bl-customComponent-pdfViewer-no-data-icon-fill: #fff;
```
