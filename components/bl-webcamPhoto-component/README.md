# Webcam Photo

WebcamPhoto is a component of Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer.
The component allows taking a picture using a webcam on both mobile devices and desktops.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                        | Type       | Default value                                                                                        | Logic                        | Data Binding | UI Setting | Description                                                                           |
|---------------------------------|------------|------------------------------------------------------------------------------------------------------|------------------------------|--------------|------------|---------------------------------------------------------------------------------------|
| uploadButtonLabel               | *text*     | "Upload"                                                                                             |                              | NO           | YES        | controls label on the Upload button.                                                  |
| uploadButtonDisabled            | *checkbox* | `false`                                                                                              | Upload Button Disabled Logic | YES          | YES        | controls if the upload button is disabled.                                            |
| uploadButtonVisible             | *checkbox* | `true`                                                                                               | Upload Button Visible Logic  | YES          | YES        | controls if the upload button is visible.                                             |
| makePhotoButtonLabel            | *text*     | "Make photo"                                                                                         |                              | NO           | YES        | controls label on the Make photo button.                                              |
| makePhotoButtonDisabled         | *checkbox* | `false`                                                                                              | Photo Button Disabled Logic  | YES          | YES        | controls if the photo button is disabled.                                             |
| makePhotoButtonVisible          | *checkbox* | `true`                                                                                               | Photo Button Visible Logic   | YES          | YES        | controls if the photo button is visible.                                              |
| makeSnapshotButtonLabel         | *text*     | "Snapshot"                                                                                           |                              | NO           | YES        | controls label on the Make snapshot button.                                           |
| doneButtonLabel                 | *text*     | "Done"                                                                                               |                              | NO           | YES        | controls label on the Done button.                                                    |
| popupLinkLabel                  | *text*     | "Info..."                                                                                            |                              | NO           | YES        | controls link label in popup.                                                         |
| noYetPermissionPopupTitle       | *text*     | "Give access to the camera"                                                                          |                              | NO           | YES        | controls title in popup when the user has not yet allowed the use of the camera.      |
| noYetPermissionPopupDescription | *text*     | "To work properly, you must allow the app to access the camera."                                     |                              | NO           | YES        | controls description in popup when the user has not yet allowed the use of the camera.|
| noPermissionPopupTitle          | *text*     | "No camera access"                                                                                   |                              | NO           | YES        | controls title in popup when the user did not allow the use of the camera.            |
| noPermissionPopupDescription    | *text*     | "Blocked app access to the camera. Follow the link for detailed information on how to grant access." |                              | NO           | YES        | controls description in popup when the user did not allow the use of the camera.      |

## Events

| Name                | Triggers                                  | Context Blocks                             |
|---------------------|-------------------------------------------|--------------------------------------------|
| On Save Image Event | when the user clicks on the 'Done' button | Image Blob: `{size: Number, type: String}` |


## Styles

**Theme**
````
@bl-customComponent-webcamPhoto-themeColor: @themePrimary;
@bl-customComponent-webcamPhoto-backgroundColor: @appBackgroundColor;
@bl-customComponent-webcamPhoto-textColor: @appTextColor;
@bl-customComponent-webcamPhoto-disabledColor: @disabledColor;
@bl-customComponent-webcamPhoto-blockBorder: @appBlockBorder;
@bl-customComponent-webcamPhoto-borderRadius: @appComponentBorderRadius;
@bl-customComponent-webcamPhoto-fontSize: 12px;
@bl-customComponent-webcamPhoto-margin: 20px;
````

**Dimensions**
````
@bl-customComponent-webcamPhoto-justify-content: center;
````

**Buttons**
````

@bl-customComponent-webcamPhoto-button-margin: 2px;
@bl-customComponent-webcamPhoto-button-padding: 6px 16px;
@bl-customComponent-webcamPhoto-button-background: @bl-customComponent-webcamPhoto-themeColor;
@bl-customComponent-webcamPhoto-button-color: contrast(@bl-customComponent-webcamPhoto-button-background);
@bl-customComponent-webcamPhoto-button-shadowColor: @appComponentShadowColor;
@bl-customComponent-webcamPhoto-button-shadowHover:
    0px 2px 4px -1px fade(@bl-customComponent-webcamPhoto-button-shadowColor, 20%),
    0px 4px 5px 0px fade(@bl-customComponent-webcamPhoto-button-shadowColor, 14%),
    0px 1px 10px 0px fade(@bl-customComponent-webcamPhoto-button-shadowColor, 12%);
@bl-customComponent-webcamPhoto-button-shadowDisabled: none;
@bl-customComponent-webcamPhoto-button-disabledBackground: @bl-customComponent-webcamPhoto-disabledColor;
@bl-customComponent-webcamPhoto-button-disabledColor: contrast(@bl-customComponent-webcamPhoto-button-disabledBackground);

@bl-customComponent-webcamPhoto-button-doneButton-color: @bl-customComponent-webcamPhoto-button-color;
@bl-customComponent-webcamPhoto-button-doneButton-background: @bl-customComponent-webcamPhoto-button-background;
@bl-customComponent-webcamPhoto-button-doneButton-shadowHover: @bl-customComponent-webcamPhoto-button-shadowHover;
@bl-customComponent-webcamPhoto-button-doneButton-disabledBackground: @bl-customComponent-webcamPhoto-button-disabledBackground;
@bl-customComponent-webcamPhoto-button-doneButton-disabledColor: @bl-customComponent-webcamPhoto-button-disabledColor;

@bl-customComponent-webcamPhoto-button-photoButton-color: @bl-customComponent-webcamPhoto-button-color;
@bl-customComponent-webcamPhoto-button-photoButton-background: @bl-customComponent-webcamPhoto-button-background;
@bl-customComponent-webcamPhoto-button-photoButton-shadowHover: @bl-customComponent-webcamPhoto-button-shadowHover;
@bl-customComponent-webcamPhoto-button-photoButton-disabledBackground: @bl-customComponent-webcamPhoto-button-disabledBackground;
@bl-customComponent-webcamPhoto-button-photoButton-disabledColor: @bl-customComponent-webcamPhoto-button-disabledColor;

@bl-customComponent-webcamPhoto-button-snapshotButton-color: @bl-customComponent-webcamPhoto-button-color;
@bl-customComponent-webcamPhoto-button-snapshotButton-background: @bl-customComponent-webcamPhoto-button-background;
@bl-customComponent-webcamPhoto-button-snapshotButton-shadowHover: @bl-customComponent-webcamPhoto-button-shadowHover;
@bl-customComponent-webcamPhoto-button-snapshotButton-disabledBackground: @bl-customComponent-webcamPhoto-button-disabledBackground;
@bl-customComponent-webcamPhoto-button-snapshotButton-disabledColor: @bl-customComponent-webcamPhoto-button-disabledColor;

@bl-customComponent-webcamPhoto-button-uploadButton-color: @bl-customComponent-webcamPhoto-button-color;
@bl-customComponent-webcamPhoto-button-uploadButton-background: @bl-customComponent-webcamPhoto-button-background;
@bl-customComponent-webcamPhoto-button-uploadButton-shadowHover: @bl-customComponent-webcamPhoto-button-shadowHover;
@bl-customComponent-webcamPhoto-button-uploadButton-disabledBackground: @bl-customComponent-webcamPhoto-button-disabledBackground;
@bl-customComponent-webcamPhoto-button-uploadButton-disabledColor: @bl-customComponent-webcamPhoto-button-disabledColor;
````

**Modal**
````
@bl-customComponent-webcamPhoto-modal-backgroundColor: fade(@bl-customComponent-webcamPhoto-disabledColor, 40%);
@bl-customComponent-webcamPhoto-modal-padding: 20px;

@bl-customComponent-webcamPhoto-modal-content-backgroundColor: @bl-customComponent-webcamPhoto-backgroundColor;
@bl-customComponent-webcamPhoto-modal-content-borderRadius: @bl-customComponent-webcamPhoto-borderRadius;
@bl-customComponent-webcamPhoto-modal-content-border: @bl-customComponent-webcamPhoto-blockBorder;
@bl-customComponent-webcamPhoto-modal-content-padding: 20px;
@bl-customComponent-webcamPhoto-modal-content-images-marginBottom: 20px;
@bl-customComponent-webcamPhoto-modal-content-image-border: @bl-customComponent-webcamPhoto-blockBorder;
@bl-customComponent-webcamPhoto-modal-content-image-borderRadius: @bl-customComponent-webcamPhoto-borderRadius;
@bl-customComponent-webcamPhoto-modal-content-video-marginRight: 20px;
@bl-customComponent-webcamPhoto-modal-content-buttonContainer-justify: center;
````

**Popup**
````
@bl-customComponent-webcamPhoto-popup-backgroundColor: @bl-customComponent-webcamPhoto-backgroundColor;
@bl-customComponent-webcamPhoto-popup-border: @bl-customComponent-webcamPhoto-blockBorder;
@bl-customComponent-webcamPhoto-popup-borderRadius: @bl-customComponent-webcamPhoto-borderRadius;
@bl-customComponent-webcamPhoto-popup-title-fontSize: 18px;
@bl-customComponent-webcamPhoto-popup-title-fontWeight: 700;
@bl-customComponent-webcamPhoto-popup-description-fontSize: 14px;
@bl-customComponent-webcamPhoto-popup-link-fontSize: 14px;
@bl-customComponent-webcamPhoto-popup-link-color: @bl-customComponent-webcamPhoto-themeColor;
````
